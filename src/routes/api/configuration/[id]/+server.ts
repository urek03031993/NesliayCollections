import z from 'zod';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { configuration } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';
import { configurationUpdateSchema } from '$lib/server/types/models';


export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

		const result = await db.query.configuration.findFirst({ where: eq(configuration.id, id) });

		if (!result) {
			return json({ message: 'Configuration not found'}, { status: 404 });
		}
		
		return json(result , { status: 200 });				
		
	}catch (error) {
		console.error('Error fetching configuration:', error);
		return json({ message: 'Failed to fetch configuration' }, { status: 500 });
	}
};


export const PUT: RequestHandler = async ({ request, params, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ message: 'Unauthorized' }, { status: 401 });
		}

		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

		const response = await request.json();
		const data_validated = await configurationUpdateSchema.safeParseAsync(response);

		if(!data_validated.success){
			return json({
				errors: z.flattenError(data_validated.error).fieldErrors
			});
		}

		const existing = await db.select().from(configuration).where(eq(configuration.id, id)).limit(1);

		if (existing.length === 0) {
			return json({ message: 'Configuration not found' }, { status: 404 });
		}

		const update = await db.update(configuration)
								.set(response)
								.where( eq(configuration.id, id) )
								.returning();
		
		if (!update) {
			return json({ message: 'Configuration not found' }, { status: 404 });
		}

		return json( update, { status: 200 });

	} catch (error) {
		console.error('Error updating configuration:', error);
		return json({ message: 'Failed to updating configuration'}, { status: 500 });
	}
};


export const DELETE: RequestHandler = async ({ params, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json({ message: 'Unauthorized'}, { status: 401 });
		}

		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

		const existing = await db.select().from(configuration).where(eq(configuration.id, id)).limit(1);

		if (existing.length === 0) {
			return json({ message: 'Configuration not found' }, { status: 404 });
		}

		const result = await db.delete(configuration)
								.where( eq(configuration.id, id) )
								.returning();

		if (!result) {
			return json({ message: 'Size not found'}, { status: 404 });
		}

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error deleting size:', error);
		return json({ message: 'Failed to delete size' }, { status: 500 });
	}
};
