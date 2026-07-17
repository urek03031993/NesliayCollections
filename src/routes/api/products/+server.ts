import { db } from '$lib/server/index.js';
import { json } from '@sveltejs/kit';
import { image, product, product_size } from '$lib/server/db/schema.js';
import type { RequestHandler } from './$types';
import { Categories } from '$lib/interfaces';
import { sql } from 'drizzle-orm/sql/sql';
import { productApiSchemaZod } from '$lib/zod/schema';
import z from 'zod';


export const GET: RequestHandler = async ({ url }) => {
	try {		
		const category = url.searchParams.get('category');
				
		if(category && !(category in Categories)) return json({ message: 'You must write an existing category' }, { status: 400 });

		const products = await db.query.product.findMany({
			where: category && (category in Categories) ? sql`${product.category} = ${category}` : undefined,
			columns:{
				id: true,
				name: true,
				description: true,
				color: true,
				category: true,
				activo: true
			},
			with:{
				sizes:{
					columns:{
						price: true
					},
					limit: 1,
				},
				images:{
					columns:{
						url: true
					},
				}

			}
		});
			
		return json( products , { status: 200 });

	} catch (error) {
		console.error('Error fetching products:', error);
		return json({ message: 'Failed to fetch products' }, { status: 500 });
	}
}


export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		const data = await request.json();
		const data_validated = await productApiSchemaZod.safeParseAsync(data);

		if (!data_validated.success) {
			return json({ errors: z.flattenError(data_validated.error).fieldErrors }, { status: 400 });
		}

		const transactionResult = await db.transaction(
			async(tx) => {

				const insertedProduct = await tx.insert(product).values({
					name: data_validated.data.name,
					description: data_validated.data.description,				
					color: data_validated.data.color,
					category: data_validated.data.category,
					activo: data_validated.data.activo,
				}).returning();

				if(!insertedProduct){
					throw new Error('Failed to create product')
				}

				const insertedProductSize = await tx.insert(product_size).values(
					data_validated.data.sizes.map((size) =>	({
						product_id: insertedProduct[0].id,
						size_id: size.size_id,
						price: size.price,               
						quantity: size.quantity,
					}))).returning();

				if(!insertedProductSize){
					throw new Error('Failed to link product with his size')
				}

				const insertedProductImage = await tx.insert(image).values(
					data_validated.data.imagesData.map((image) => ({
						product_id: insertedProduct[0].id,
						url: image.url,
						file_name: image.file_name,               
						short_description: image.short_description,
					}))).returning();

				if(!insertedProductImage){
					throw new Error('Failed to upload the image for the product')
				}

				return { product: insertedProduct, product_size: insertedProductSize, image: insertedProductImage }				
			}
		);
		
		return json({ transactionResult }, { status: 201 });
		
	} catch (error) {
		console.error('Error creating product:', error);
		return json({ message: 'Failed to create product' }, { status: 500 });
	}
};
