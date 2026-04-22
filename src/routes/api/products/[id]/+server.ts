import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { eq } from 'drizzle-orm';
import { image, product, product_size, size } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

import type { UpdateProductDto } from '$lib/server/types/Dto.js';


export const GET: RequestHandler = async ({ params }) => {
	try {
		const productTransaction = await db.transaction( async(tx) => {
			
			const productSelect = await tx.query.product.findFirst({
				where: eq(product.id, parseInt(params.id)),
				columns: {
					id: true,
					name: true,
					description: true,
					color: true,
					category: true
				}				
			});

			if(!productSelect){
				throw new Error('Product not found')
			}

			const productSizeName = await tx.select({
										id: product_size.id,
									    size_id: product_size.size_id,
										size: size.size,
										price: product_size.price,
										available_quantity: product_size.available_quantity,
									})
									.from(product_size)
									.innerJoin(size, eq(product_size.size_id, size.id))
									.where(eq(product_size.product_id, productSelect?.id))
			

			const productImage = await tx.select({
										id: image.id,
									    url: image.url,
										short_description: image.short_description,
									})
									.from(image)
									.where(eq(image.product_id, productSelect?.id))


			return { product: productSelect, sizes: productSizeName, images: productImage }
		});		

		if (!productTransaction) {
			return json('Product not found', { status: 404 });
		}
		
		return json({...productTransaction.product, sizes: productTransaction.sizes, images: productTransaction.images } , { status: 200 });						
		
	}catch (error) {
		console.error('Error fetching product:', error);
		return json({ error: 'Failed to fetch product' }, { status: 500 });
	}
}


export const PUT: RequestHandler = async ({ request, params, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body: UpdateProductDto = await request.json();		

		const update = await db.update(product)
								.set(body)
								.where(eq(product.id, parseInt(params.id)))
								.returning();
		
		if (!update) {
			return json({ error: 'Product not found' }, { status: 404 });
		}

		return json( update[0], { status: 200 });

	} catch (error) {
		console.error('Error updating product:', error);
		return json({ error: 'Failed to updating product' }, { status: 500 });
	}
};


export const DELETE: RequestHandler = async ({ params, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const result = await db.delete(product)
								.where(eq(product.id, parseInt(params.id)))
								.returning();	
		
		if (!result) {
			return json('Product not found', { status: 404 });
		}

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error deleting product:', error);
		return json('Failed to delete product', { status: 500 });
	}
}
