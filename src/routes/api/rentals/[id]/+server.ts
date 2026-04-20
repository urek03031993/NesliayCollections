import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { rental } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';
import type { RentalDto } from '$lib/server/types/Dto';


export const GET: RequestHandler = async ({ params }) => {
    try {		
        const result = await db.query.rental.findFirst({
            where: eq(rental.id, parseInt(params.id)),
            with: {
                items: true
            }
        });

        if (!result) {
            return json('Rental not found', { status: 404 });
        }
        
        return json( result , { status: 200 });						
        
    }catch (error) {
        console.error('Error fetching rental:', error);
        return json('Failed to fetch rental', { status: 500 });
    }
}


export const PUT: RequestHandler = async ({ request, params, cookies }) => {
    try {
        if (!cookies.get('session')) {
            return json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body: Partial<RentalDto> = await request.json();		

        const update = await db.update(rental)
                                .set(body)
                                .where(eq(rental.id, parseInt(params.id)))
                                .returning();
        
        if (!update) {
            return json('Rental not found', { status: 404 });
        }

        return json( update[0], { status: 200 });

    } catch (error) {
        console.error('Error updating rental:', error);
        return json('Failed to updating rental', { status: 500 });
    }
};


export const DELETE: RequestHandler = async ({ params, cookies }) => {
    try {
        if (!cookies.get('session')) {
            return json('Unauthorized', { status: 401 });
        }

        const result = await db.delete(rental)
                                .where(eq(rental.id, parseInt(params.id)))
                                .returning()

        
        if (!result) {
            return json('Rental not found', { status: 404 });
        }

        return new Response( null, { status: 204 });
    } catch (error) {
        console.error('Error deleting rental:', error);
        return json('Failed to delete rental', { status: 500 });
    }
}
