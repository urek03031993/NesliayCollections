import { db } from '$lib/server/index.js';
import { json } from '@sveltejs/kit';
import { image, product, product_size } from '$lib/server/db/schema.js';
import type { RequestHandler } from './$types';


export const GET: RequestHandler = async () => {
	try {	
		const products = await db.query.product.findMany({
			columns:{
				id: true,
				name: true,
				description: true,
				color: true,
			},
			with:{
				sizes:{
					columns:{
						price: true
					},
				},
				images:{
					columns:{
						url: true
					}
				}

			}
		});
			
		return json( products , { status: 200 });

	} catch (error) {

		console.error('Error fetching products:', error);
		return json({ error: 'Failed to fetch products' }, { status: 500 });
	}
}


export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		const data = await request.json();

		const transactionResult = await db.transaction(
			async(tx) => {

				const insertedProduct = await tx.insert(product).values({
					name: data.name,
					description: data.description,				
					color: data.color,
					activo: true,
				}).returning();

				if(!insertedProduct){
					throw new Error('Failed to create product')
				}

				const insertedProductSize = await tx.insert(product_size).values({
					product_id: insertedProduct[0].id,
					size_id: data.size_id,
					price: data.price,               
					quantity: data.quantity,
				}).returning();

				if(!insertedProductSize){
					throw new Error('Failed to link product with his size')
				}

				const insertedProductImage = await tx.insert(image).values({
					product_id: insertedProduct[0].id,
					url: data.url,
					file_name: data.file_name,               
					short_description: data.short_description,
				}).returning();

				if(!insertedProductImage){
					throw new Error('Failed to upload the image for the product')
				}

				return { product: insertedProduct, product_size: insertedProductSize, image: insertedProductImage }				
			}
		);
		
		return json({ transactionResult }, { status: 201 });

	} catch (error) {
		console.error('Error creating product:', error);
		return json('Failed to create product', { status: 500 });
	}
}
