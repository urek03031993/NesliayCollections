import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { inArray } from 'drizzle-orm';
import { image } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async ({ url }) => {
	try {	
        const productIds = url.searchParams.get('products') ?? '';

		if(!productIds){
			const productImages = await db.select().from(image);	

			return json( productImages , { status: 200 });
		}

		const idsArray = productIds.split(',').map((id) => parseInt(id.trim()));

		const productImages = await db.select({
										id: image.id,
									    url: image.url,
										product_id: image.product_id,
										short_description: image.short_description,
									})
									.from(image)
									.where(inArray(image.product_id, idsArray))
			
		return json( productImages , { status: 200 });

	} catch (error) {

		console.error('Error fetching products:', error);
		return json({ error: 'Failed to fetch products' }, { status: 500 });
	}
}