import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { eq } from 'drizzle-orm';
import { image, product, product_size, size } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';
import type { ProductCategory } from '$lib/server/types/models';


interface ProductSizes {
    size_id: number;
    size: string;
    price: string;
    quantity: number;
};


interface productUpdateData {
	name: string;
	description?: string;
	color: string;
	category: ProductCategory;
	activo: boolean;
	sizes: ProductSizes[],
	url?: string,
	file_name?: string,
	short_description?: string
}


export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

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

		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

		const body: productUpdateData = await request.json();

		const transaction = await db.transaction( async(tx) => {

			const productUpdate = await tx.update(product)
									.set({ name: body.name, description: body.description, color: body.color, category: body.category })
									.where(eq(product.id, id))
									.returning();
		
			if (!productUpdate) {
				return json({ error: 'Product not found' }, { status: 404 });
			}

			if(body.url && body.short_description && body.file_name){

				const productImageUpdate = await tx.update(image)
										.set({ url: body.url, file_name: body.file_name, short_description: body.short_description })
										.where(eq(image.product_id, id))
										.returning();
			
				if (!productImageUpdate) {
					return json({ error: 'Product not found' }, { status: 404 });
				}
			}


			await tx.delete(product_size).where(eq(product_size.product_id, parseInt(params.id)));
	
			const sizesUpdate = await tx.insert(product_size).values(
				body.sizes.map((size: { size_id: number, size: string; price: string; quantity: number }) => ({
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
