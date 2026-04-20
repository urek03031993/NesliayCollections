import Stripe from 'stripe';
import { json, error } from '@sveltejs/kit';
import { stripeConnection, computeRentalAmounts } from '$lib/stripe/stripe';
import type { RequestHandler } from './$types';
import { db } from '$lib/server';
import { payment_orders, rental } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { and } from 'drizzle-orm';


export const POST: RequestHandler = async ({ request }) => {
    try {
        const { rentalId } = await request.json();

        const paymentOrder = await db.query.payment_orders.findFirst({
            where: eq(payment_orders.rental_id, rentalId),
            columns: {
                amount: true,
                orderId: true,
                customerId: true,
                state: true,
                rental_id: true,
                reference: true,
            }    
        });

        if (!paymentOrder) {
            return json('Payment order not found for the given rental ID', { status: 404 });
        }

        const amounts = computeRentalAmounts(parseFloat(paymentOrder.amount));

        const finalPayment = await stripeConnection.paymentIntents.create({
            amount: amounts.finalPayment * 100,
            currency: 'usd',
            customer: paymentOrder.customerId,
            payment_method: paymentOrder.reference,
            off_session: true,
            confirm: true,
            metadata: {
                orderId: paymentOrder.orderId,
                payment_phase: 'final_with_tax',
                base_price: amounts.basePrice * 100,
                remaining_amount: amounts.remaining * 100,
                tax_amount: amounts.tax * 100,
                tax_rate: '7%'
            },
            description: `prebook dress ${paymentOrder.orderId} - Rest amount: $${amounts.finalPayment} + Taxes: $${amounts.tax}`,
        });

        if (finalPayment.status === 'requires_action') {
            return json({
                requiresAction: true,
                clientSecret: finalPayment.client_secret,
                paymentIntentId: finalPayment.id
            });
        }

        const paymentTransaction = await db.transaction( async(tx) => {
            const updateRental = await tx.update(rental).set({            
                state: 'reserved',
            }).where(and(eq(rental.id, paymentOrder.rental_id), eq(rental.state, 'prebook'))).returning();

            if(!updateRental){
                throw new Error('Failed to update the rental, it may not be in the correct state for this rental');
            }

            const updateOrder = await tx.update(payment_orders).set({            
                state: 'confirmed',
            }).where(and(eq(payment_orders.rental_id, paymentOrder.rental_id), eq(payment_orders.state, 'pending'))).returning();

            if(!updateOrder){
                throw new Error('Failed to update the rental, it may not be in the correct state for this rental');
            }

            return { updateRental: updateRental[0], updateOrder: updateOrder[0] };
         });

        return json({
            success: true,
            paymentIntentId: finalPayment.id,
            amountCharged: amounts.finalPayment,
            ...paymentTransaction,
            breakdown: {
                remaining: amounts.remaining,
                tax: amounts.tax,
                total: amounts.finalPayment
            }
        });

    } catch (err: unknown) {
        if (err instanceof Stripe.errors.StripeError && err.code === 'card_declined') {
            return json({
                success: false,
                error: 'payment_failed',
                message: 'The card was declined for the final payment',
                requiresManualPayment: true
            }, { status: 400 });
        }

        throw error(500, 'Error processing final payment');
    }
};