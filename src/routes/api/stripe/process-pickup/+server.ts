import Stripe from 'stripe';
import { json, error } from '@sveltejs/kit';
import { stripeConnection, computeRentalAmounts } from '$lib/stripe/stripe';
import type { RequestHandler } from './$types';
import { db } from '$lib/server';
import { payment_orders } from '$lib/server/db';
import { eq } from 'drizzle-orm';


export const POST: RequestHandler = async ({ request, cookies }) => {

    if (!cookies.get('session')) {
        return json({ message: 'Unauthorized'}, { status: 401 });
    }

    const { rentalOrderId } = await request.json();

    const paymentOrder = await db.query.payment_orders.findFirst({
        where: eq(payment_orders.orderId, rentalOrderId),
        columns: {
            amount: true,
            orderId: true,
            customerId: true,
            state: true,
            rental_id: true,
            reference: true,
        }, 
        with: {
            rental:{
                columns: {
                        subtotal: true
                }
            }
        }   
    });

    if (!paymentOrder) {
        return json({message: 'Payment order not found for the given rental ID'}, { status: 404 });
    }

    const amounts = computeRentalAmounts(parseFloat(paymentOrder.rental.subtotal));


    try {

        const finalPayment = await stripeConnection.paymentIntents.create({
            amount: amounts.finalPayment * 100,
            currency: 'usd',
            customer: paymentOrder.customerId,
            payment_method: paymentOrder.reference,
            off_session: true,
            confirm: true,
            metadata: {
                rentalId: paymentOrder.orderId,
                checkout_type: 'final_with_tax',
                base_price: amounts.basePrice * 100,
                remaining_amount: amounts.remaining * 100,
                tax_amount: amounts.tax * 100,
                tax_rate: '7%'
            },
            description: `Prebook dress ${paymentOrder.orderId} - Rest amount: $${amounts.finalPayment} + Taxes: $${amounts.tax}`,
        });

        if (finalPayment.status === 'requires_action') {
            return json({
                requiresAction: true,
                clientSecret: finalPayment.client_secret,
                paymentIntentId: finalPayment.id
            });
        }        

        const paymentsOrder = await db.insert(payment_orders).values({
                orderId: paymentOrder.orderId,
                customerId: paymentOrder.customerId,
                rental_id: paymentOrder.rental_id,
                state: "pending",
                amount: amounts.basePrice.toString(),
                reference: finalPayment.id,
            }).returning();

        if(!paymentsOrder){
            console.error('Failed to create the payment order');
            error(500, 'Failed to create the payment order');
        }
         

        return json({
            success: true,
            paymentIntentId: finalPayment.id,
            amountCharged: amounts.finalPayment,
            paymentOrder: paymentsOrder,
            breakdown: {
                remaining: amounts.remaining,
                tax: amounts.tax,
                total: amounts.finalPayment
            }
        });

    } catch (err: unknown) {

        console.error('No se puedo hacer el pago', err);


        if (err instanceof Stripe.errors.StripeError && err.code === 'card_declined') {
            return json({
                success: false,
                error: 'payment_failed',
                message: 'The card was declined for the final payment',
                requiresManualPayment: true
            }, { status: 400 });
        }

        error(500, 'Error processing final payment');
    }
};