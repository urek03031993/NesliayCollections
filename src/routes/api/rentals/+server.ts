import { db } from '$lib/server/index.js';
import { json } from '@sveltejs/kit';
import { rental } from '$lib/server/db/schema.js';
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async () => {
    try {	
        const rentals = await db.query.rental.findMany({
            columns:{
                id: true,
                rentalId: true,
                start_date: true,
                end_date: true,
                tax_amount: true,
                tax_percent: true,
                subtotal: true,
                total: true,
                state: true,
                notes: true,
                creadoAt: true,
                updatedAt: true,
            },            
        });
            
        return json( rentals , { status: 200 });

    } catch (error) {

        console.error('Error fetching rentals:', error);
        return json({ error: 'Failed to fetch rentals' }, { status: 500 });
    }
}


export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        if (!cookies.get('session')) {
            return json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const data = await request.json();

        const insertedRental = await db.insert(rental).values({
            rentalId: data.rentalId,
            clientId: data.clientId,
            start_date: data.start_date,
            end_date: data.end_date,
            subtotal: data.subtotal,
            total: data.total,
            tax_amount: data.tax_amount,
            state: "draft", 
            notes: data.notes,
        }).returning();
        
        return json({ insertedRental }, { status: 201 });

    } catch (error) {
        console.error('Error creating product:', error);
        return json('Failed to create product', { status: 500 });
    }
}
