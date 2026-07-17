import { asc, inArray } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import type { RequestHandler } from './$types';
import { configuration } from '$lib/server/db/schema.js';
import { configurationInsertSchema } from '$lib/server/types/models';
import z from 'zod';


export const GET: RequestHandler = async ( { url } ) => {
	try {
		const keys = url.searchParams.getAll('key');	
	
		const configuration_vals = await db.select()
								  .from(configuration)
								  .where( keys.length > 0 ? inArray(configuration.key, keys) : undefined )
								  .orderBy( asc(configuration.id) );
		
		return json( configuration_vals , { status: 200 });		
	} catch (error) {
		console.error('Error fetching configuration:', error);
		return json({ message: 'Failed to fetch configuration' }, { status: 500 });
	}
};


export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ message: 'Unauthorized'}, { status: 401 });
		}

		const response = await request.json();
		const data_validated = await configurationInsertSchema.safeParseAsync(response);

		if(!data_validated.success){
			return json({
				errors: z.flattenError(data_validated.error).fieldErrors
			});
		}
		
		const insertedConfiguration = await db.insert(configuration).values({
			key: data_validated.data.key,
			value: data_validated.data.value
		}).returning();
		
		return json( insertedConfiguration , { status: 201 });

	} catch (error) {
		console.error('Error creating configuration:', error);
		return json({ message: 'Failed to create a new configuration'}, { status: 500 });
	}
};
