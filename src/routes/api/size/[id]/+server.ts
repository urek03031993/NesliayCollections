import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { size } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';
import type { SizeDto } from '$lib/server/types/Dto';


export const GET: RequestHandler = async ({ params }) => {
	try {		
		const result = await db.query.size.findFirst({
			where: eq(size?.id, parseInt(params.id))
		});

		if (!result) {
			return json('Size not found', { status: 404 });
		}
		
		return json(result , { status: 200 });						
		
	}catch (error) {
		console.error('Error fetching size:', error);
		return json('Failed to fetch size', { status: 500 });
	}
}


export const PUT: RequestHandler = async ({ request, params, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body: Partial<SizeDto> = await request.json();		

		const update = await db.update(size)
								.set(body)
								.where(eq(size.id, parseInt(params.id)))
								.returning();
		
		if (!update) {
			return json('Size not found', { status: 404 });
		}

		return json( update[0], { status: 200 });

	} catch (error) {
		console.error('Error updating size:', error);
		return json('Failed to updating size', { status: 500 });
	}
};


export const DELETE: RequestHandler = async ({ params, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json('Unauthorized', { status: 401 });
		}

		const result = await db.delete(size)
								.where(eq(size.id, parseInt(params.id)))
								.returning()

		
		if (!result) {
			return json('Size not found', { status: 404 });
		}

		return new Response( null, { status: 204 });
	} catch (error) {
		console.error('Error deleting size:', error);
		return json('Failed to delete size', { status: 500 });
	}
}
