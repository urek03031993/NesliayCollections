import { json, error } from '@sveltejs/kit';
import { stripeConnection } from '$lib/stripe/stripe';
import type { RequestHandler } from './$types';
import { and, eq } from 'drizzle-orm';
import { payment_orders, rental } from '$lib/server/db';
import { db } from '$lib/server';



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

        const refund = await stripeConnection.refunds.create({
            payment_intent: paymentOrder.reference,
            reason: 'requested_by_customer',
            metadata: { 
                rentalId: paymentOrder.rental_id, 
            }
        });

        if(!refund.status || refund.status !== 'succeeded'){
            throw new Error('Failed to refund the payment');
        }
        
        const paymentTransaction = await db.transaction( async(tx) => {
            const updateRental = await tx.update(rental).set({            
                state: 'cancelled',
            }).where(and(eq(rental.id, paymentOrder.rental_id), eq(rental.state, 'prebook'))).returning();

            if(!updateRental){
                throw new Error('Failed to update the rental, it may not be in the correct state for this rental');
            }

            const updateOrder = await tx.update(payment_orders).set({            
                state: 'failed',
            }).where(and(eq(payment_orders.rental_id, paymentOrder.rental_id), eq(payment_orders.state, 'pending'))).returning();

            if(!updateOrder){
                throw new Error('Failed to update the rental, it may not be in the correct state for this rental');
            }

            return { updateRental: updateRental[0], updateOrder: updateOrder[0] };
        });
        
        
        return json({
            success: true,
            paymentIntentId: paymentOrder.reference,
            amountCharged: paymentOrder.amount,
            ...paymentTransaction            
        });

    } catch (err) {
        console.error('Error cancelling:', err);
        throw error(500, 'Error al cancelar la reserva');
    }
};