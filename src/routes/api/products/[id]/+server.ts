import z from 'zod';
import { and } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import type { RequestHandler } from './$types';
import { eq, gte, inArray } from 'drizzle-orm';
import { productApiSchemaZod } from '$lib/zod/schema';
import { image, product, product_size, rental, rental_items, size } from '$lib/server/db/schema';


export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

		const now = new Date();
		const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

		const productTransaction = await db.transaction( async(tx) => {
			
			const productSelect = await tx.query.product.findFirst({
				where: eq(product.id, id),
				columns: {
					id: true,
					name: true,
					description: true,
					color: true,
					category: true,
					activo: true
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
										quantity: product_size.quantity,
										available_quantity: product_size.available_quantity,
										reserved_quantity: product_size.reserved_quantity
									})
									.from(product_size)
									.innerJoin(size, eq(product_size.size_id, size.id))
									.where(eq(product_size.product_id, productSelect?.id));
			

			const productImage = await tx.select({
										id: image.id,
									    url: image.url,
										file_name: image.file_name,
										short_description: image.short_description,
									})
									.from(image)
									.where(eq(image.product_id, productSelect?.id));
			

			const productRentals = await tx.select({
												id: rental.id,
												start: rental.start_date,
												end: rental.end_date,
												state: rental.state,
												quantity: rental_items.quantity
											})
											.from(rental)
											.innerJoin(rental_items, eq(rental_items.rental_id, rental.id))
											.innerJoin(product_size, eq(product_size.id, rental_items.product_size_id))
											.where(
												and( 
													eq(product_size.product_id, productSelect?.id), 
													inArray(rental.state, ["prebook", "reserved"]),
													gte(rental.start_date, thisMonth.toISOString())
													)
												);


			return { product: productSelect, sizes: productSizeName, images: productImage, rentals: productRentals }
		});		

		if (!productTransaction) {
			return json('Product not found', { status: 404 });
		}
		
		return json({...productTransaction.product, 
						sizes: productTransaction.sizes, 
						images: productTransaction.images,
						rentals: productTransaction.rentals } , { status: 200 });						
		
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

		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

		const body = await request.json();

		const body_validated = await productApiSchemaZod.safeParseAsync(body);
		
		if (!body_validated.success) {
			return json({ errors: z.flattenError(body_validated.error).fieldErrors }, { status: 400 });
		}

		const transaction = await db.transaction( async(tx) => {

			const productUpdate = await tx.update(product)
									.set({ 
										name: body_validated.data.name, 
										description: body_validated.data.description, 
										color: body_validated.data.color, 
										category: body_validated.data.category 
									})
									.where(eq(product.id, id))
									.returning();
		
			if (!productUpdate) {
				return json({ error: 'Product not found' }, { status: 404 });
			}

			if(body_validated.data.imagesData.length > 0){

				const insertedProductImage = await tx.insert(image).values(
					body_validated.data.imagesData.map((image) => ({
						product_id: productUpdate[0].id,
						url: image.url,
						file_name: image.file_name,               
						short_description: image.short_description,
					}))).returning();

				if(!insertedProductImage){
					throw new Error('Failed to upload the image for the product')
				}
			}

			await tx.delete(product_size).where(eq(product_size.product_id, parseInt(params.id)));
	
			const sizesUpdate = await tx.insert(product_size).values(
				body_validated.data.sizes.map((size) => ({
					product_id: productUpdate[0].id,
					size_id: size.size_id,
					price: size.price.toString(),
					quantity: size.quantity,
				}))).returning();

			if (!sizesUpdate) {
				return json({ error: 'Product not found' }, { status: 404 });
			}

			return { productUpdate, sizesUpdate }
		});


		if (!transaction) return json({ error: 'Product not updated' }, { status: 404 });		

		return json({ success: true }, { status: 200 });

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
