import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { size } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';
import type { SizeDto } from '$lib/server/types/Dto';


export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return json({ message: 'invalid ID '}, { status: 400 });
		}

		const result = await db.query.size.findFirst({
			where: eq(size.id, id)
		});

		if (!result) {
			return json({ message: 'Size not found'}, { status: 404 });
		}
		
		return json(result , { status: 200 });				
		
	}catch (error) {
		console.error('Error fetching size:', error);
		return json({ message: 'Failed to fetch size' }, { status: 500 });
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

		const body: Partial<SizeDto> = await request.json();

		const update = await db.update(size)
								.set(body)
								.where( eq(size.id, id) )
								.returning({ id: size.id, size: size.size, height: size.height });
		
		if (!update) {
			return json({ message: 'Size not found' }, { status: 404 });
		}

		return json( update, { status: 200 });

	} catch (error) {
		console.error('Error updating size:', error);
		return json({ message: 'Failed to updating size'}, { status: 500 });
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

		const result = await db.delete(size)
								.where( eq(size.id, id) )
								.returning({ id: size.id, size: size.size, height: size.height});

		
		if (!result) {
			return json({ message: 'Size not found'}, { status: 404 });
		}

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Error deleting size:', error);
		return json({ message: 'Failed to delete size' }, { status: 500 });
	}
};
