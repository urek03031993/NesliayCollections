import { asc } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import type { RequestHandler } from './$types';
import { size } from '$lib/server/db/schema.js';
import { sizeInsertSchema } from '$lib/server/types/models';
import z from 'zod';


export const GET: RequestHandler = async () => {
	try {
		const sizes = await db.select()
							  .from(size)
							  .orderBy( asc(size.id) );
		
		return json( sizes , { status: 200 });
		
	} catch (error) {
		console.error('Error fetching sizes:', error);
		return json({ message: 'Failed to fetch sizes' }, { status: 500 });
	}
};


export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ message: 'Unauthorized'}, { status: 401 });
		}

		const response = await request.json();
		const data_validated = await sizeInsertSchema.safeParseAsync(response);

		if(!data_validated.success){
			return json({
				errors: z.flattenError(data_validated.error).fieldErrors
			});
		}
		
		const insertedSize = await db.insert(size).values({
			size: data_validated.data.size,
			height: data_validated.data.height
		}).returning({ id: size.id, size: size.size, height: size.height });
		
		return json( insertedSize , { status: 201 });

	} catch (error) {
		console.error('Error creating size:', error);
		return json({ message: 'Failed to create a new size'}, { status: 500 });
	}
};
