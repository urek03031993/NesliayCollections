import { db } from '$lib/server';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isValidRentalPeriod } from '$lib/utils/utils';
import { stripeConnection, computeRentalAmounts } from '$lib/stripe/stripe';
import { client, payment_orders, rental, rental_items } from '$lib/server/db';
import type { ShoppingCarItem } from '$lib/components/forms/ProductForm/interfaces';


interface paymentIntentRequest {
    startDate: Date;
    endDate: Date;
    basePrice: number;
    orderItems: ShoppingCarItem[];
    termsAccepted: boolean;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    document_type: string;
    identification_document: string;
}


export const POST: RequestHandler = async ({ request }) => {
    try {
        const {  startDate, endDate, basePrice, orderItems, termsAccepted, 
                 email, name, last_name, phone, document_type, identification_document }: paymentIntentRequest = await request.json();

        if (!termsAccepted) error(400, 'You must accept the terms and conditions');
        if (isValidRentalPeriod(startDate, endDate)) error(400, 'The rental period must be less than 3 days');

        let customer;
        const rentalId = uuidv4();
        const amounts = computeRentalAmounts(basePrice);
        const customerExist = await stripeConnection.customers.list({ email: email, limit: 1 });


        if( customerExist.data.length > 0 ){
            customer = customerExist.data[0]
        } else {
            customer = await stripeConnection.customers.create({
                email: email,
                name: name + ' ' + last_name,
                metadata: {
                    document_type: document_type,
                    identification_document: identification_document,
                    terms_accepted: 'true',
                    terms_date: new Date().toISOString()
                }
            });
        }        

        const paymentIntent = await stripeConnection.paymentIntents.create({
            amount: amounts.deposit * 100,
            currency: 'usd',
            customer: customer.id,
            // capture_method: 'manual',
            setup_future_usage: 'off_session',
            automatic_payment_methods: { enabled: true },
            metadata: {
                rentalId: rentalId,
                payment_phase: 'deposit_hold',
                base_price: amounts.basePrice * 100,
                deposit_amount: amounts.deposit * 100,
                expected_final_payment: amounts.finalPayment * 100,
                tax_amount: amounts.tax * 100,
                terms_accepted: termsAccepted.toString()
            },
            description: `Sign to prebook dress ${rentalId} - $${amounts.deposit}`
        });

        if (!paymentIntent) {
            error(400, 'Failed to create payment intent');
        }

        const paymentTransaction = await db.transaction( async(tx) => {
            let clientId;			
            
            const clientExists = await tx.query.client.findFirst({
                where: eq(client.email, email)
            });

            if (clientExists) {
                clientId = clientExists.id;				
            } else {
                const clientCreate = await tx.insert(client).values({
                    name: name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    document_type: document_type,
                    identification_document: identification_document,			
                }).returning();

                if(!clientCreate){
                    error(400, 'Failed to create the client')
                }

                clientId = clientCreate[0].id;
            }			

            const insertRental = await tx.insert(rental).values({
                rentalId: rentalId,
                clientId: clientId,
                start_date: new Date(startDate).toISOString(),
                end_date: new Date(endDate).toISOString(),
                subtotal: amounts.basePrice.toString(),
                tax_amount: amounts.tax.toString(),
                total: amounts.totalWithTax.toString(),
                state: 'prebook',
            }).returning();

            if(!insertRental){
                throw new Error('Failed to create the rental');
            }

            const rentalItems = await tx.insert(rental_items).values(				
                orderItems.map(item => ({
                    rental_id: insertRental[0].id,
                    product_size_id: item.product.product_size_id,
                    quantity: item.quantity,
                    unit_price: item.product.price.toString(),
                    subtotal: (item.product.price * item.quantity).toString(),
                    product_name: item.product.name,
                    size_size: item.product.size.toString(),
                })
            )).returning();

            if(!rentalItems){
                throw new Error('Failed to create the items of rental')
            }

            const paymentsOrder = await tx.insert(payment_orders).values({
                orderId: insertRental[0].rentalId,
                customerId: customer.id,
                rental_id: insertRental[0].id,
                state: "pending",
                amount: amounts.basePrice.toString(),
                reference: paymentIntent.id,
            }).returning();

            if(!paymentsOrder){
                throw new Error('Failed to create the payment order')
            }

            return { rental: insertRental, rentalItems: rentalItems, paymentsOrder: paymentsOrder }
        });	

        return json({
            clientSecret: paymentIntent.client_secret,
            depositAmount: amounts.deposit,
            finalPaymentAmount: amounts.finalPayment,
            taxAmount: amounts.tax,
            totalWithTax: amounts.totalWithTax,
            customerId: customer.id,
            rentalId: rentalId,
            ...paymentTransaction
        }, { status: 201 });

    } catch (err) {
        console.error('Error creating payment intent:', err);
        throw error(500, 'Error creating payment intent');
    }
};