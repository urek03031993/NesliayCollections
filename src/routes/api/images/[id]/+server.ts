import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { eq } from 'drizzle-orm';
import { image } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

		const productImage = await db.select({
										id: image.id,
									    url: image.url,
										short_description: image.short_description,
									})
									.from(image)
									.where(eq(image.id, id));		
		
		return json( productImage , { status: 200 });						
		
	}catch (error) {
		console.error('Error fetching product:', error);
		return json({ error: 'Failed to fetch product' }, { status: 500 });
	}
}


export const DELETE: RequestHandler = async ({ params, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const result = await db.delete(image)
								.where(eq(image.id, parseInt(params.id)))
								.returning();	
		
		if (!result) {
			return json('Image not found', { status: 404 });
		}

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error deleting image:', error);
		return json('Failed to delete image', { status: 500 });
	}
}
