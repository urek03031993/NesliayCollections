import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { stripeConnection } from "$lib/stripe/stripe";
import { STRIPE_WEBHOOK_SECRET } from "$env/static/private";
import { db } from "$lib/server";
import { payment_orders, rental } from "$lib/server/db";
import { eq } from "drizzle-orm";


export const POST: RequestHandler = async ({ request }) => {
    let event;
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        console.error('Missing Stripe signature');
        return json({message: 'Webhook error: Missing signature'}, { status: 404 });
    }

    try {
        event = stripeConnection.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Error verifying Stripe webhook signature:', err);
        return json({message: 'Webhook error'}, { status: 400 });
    }


    if (event.type === 'payment_intent.succeeded') {
        const session = event.data.object;

        switch(session.metadata.checkout_type){

            case 'deposit_hold':
                try {
                    const paymentTransaction = await db.transaction(async(tx) => {
                    
                        const updateOrder = await tx.update(rental)
                                                    .set({state: 'prebook'})
                                                    .where(eq(rental.rentalId, session.metadata.rentalId))
                                                    .returning();
                        
                        if(!updateOrder){
                            console.error('Failed to update the order state to reserved for prebooking');
                            throw new Error('Failed to update the order state to reserved for prebooking');
                        }
                        
                        const updatePayment = await tx.update(payment_orders)
                                                        .set({state: 'confirmed', reference: session.payment_method?.toString()})
                                                        .where(eq(payment_orders.orderId, session.metadata.rentalId))
                                                        .returning();
        
                        if(!updatePayment){
                            console.error('Failed to update the payment state to confirmed for prebooking');
                            throw new Error('Failed to update the payment state to confirmed for prebooking');
                        }
        
                        return { order: updateOrder, payment: updatePayment }                    
                    });
        
                    if(!paymentTransaction){
                        console.error('Failed to update the payment transaction for prebooking');
                        error(400, 'Failed to update the payment transaction for prebooking');
                    }
        
                    console.log('Pago exitoso:', session.id, 'rental', session.metadata.rentalId);
        
                } catch(err){
                    console.error(`Error updating order and payment state from webhook for prebooking: ${session.metadata.rentalId}`, err);
                    error(500, 'Error updating order state from webhook for prebooking');
                }

                break;

            case 'complete-payment':
                try {
                    const paymentTransaction = await db.transaction(async(tx) => {
                    
                        const updateOrder = await tx.update(rental)
                                                    .set({state: 'reserved'})
                                                    .where(eq(rental.rentalId, session.metadata.rentalId))
                                                    .returning();
                        
                        if(!updateOrder){
                            console.error('Failed to update the order state to reserved for reservation');
                            throw new Error('Failed to update the order state to reserved for reservation');
                        }
                        
                        const updatePayment = await tx.update(payment_orders)
                                                        .set({state: 'confirmed'})
                                                        .where(eq(payment_orders.orderId, session.metadata.rentalId))
                                                        .returning();
        
                        if(!updatePayment){
                            console.error('Failed to update the payment state to confirmed for reservation');
                            throw new Error('Failed to update the payment state to confirmed for reservation');
                        }
        
                        return { order: updateOrder, payment: updatePayment }                    
                    });
        
                    if(!paymentTransaction){
                        console.error('Failed to update the payment transaction for reservation');
                        error(400, 'Failed to update the payment transaction for reservation');
                    }
        
                    console.log('Pago exitoso:', session.id, 'rental', session.metadata.rentalId);
        
                } catch(err){
                    console.error(`Error updating order and payment state for reservation from webhook: ${session.metadata.rentalId}`, err);
                    error(500, 'Error updating order state from webhook for reservation');
                }

                break;

            case 'final_with_tax':
                try {
                    const paymentTransaction = await db.transaction(async(tx) => {
                    
                        const updateOrder = await tx.update(rental)
                                                    .set({state: 'reserved'})
                                                    .where(eq(rental.rentalId, session.metadata.rentalId))
                                                    .returning();
                        
                        if(!updateOrder){
                            console.error('Failed to update the order state to reserved for pickup dress');
                            throw new Error('Failed to update the order state to reserved for pickup dress');
                        }
                        
                        const updatePayment = await tx.update(payment_orders)
                                                        .set({state: 'confirmed'})
                                                        .where(eq(payment_orders.orderId, session.metadata.rentalId))
                                                        .returning();
        
                        if(!updatePayment){
                            console.error('Failed to update the payment state to confirmed for pickup dress');
                            throw new Error('Failed to update the payment state to confirmed for pickup dress');
                        }
        
                        return { order: updateOrder, payment: updatePayment }                    
                    });
        
                    if(!paymentTransaction){
                        console.error('Failed to update the payment transaction for pickup dress');
                        error(400, 'Failed to update the payment transaction for pickup dress');
                    }
        
                    console.log('Pago exitoso:', session.id, 'rental', session.metadata.rentalId);
        
                } catch(err){
                    console.error(`Error updating order and payment state for pickup dress from webhook: ${session.metadata.rentalId}`, err);
                    error(500, 'Error updating order state from webhook for pickup dress');
                }

                break;
        }   
    }    

    return json({success: true}, {status: 200});
};