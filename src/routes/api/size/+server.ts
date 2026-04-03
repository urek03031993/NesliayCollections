import { db } from '$lib/server/index.js';
import { json } from '@sveltejs/kit';
import { size } from '$lib/server/db/schema.js';
import type { RequestHandler } from './$types';
import { console } from 'inspector';
import type { SizeDto } from '$lib/server/types/Dto';


export const GET: RequestHandler = async () => {
	try {		
		const sizes = await db.select({
			id: size.id,
			size: size.size,
			height: size.height,
		}).from(size)
		
		return json( sizes , { status: 200 });

	} catch (error) {

		console.error('Error fetching sizes:', error);
		return json('Failed to fetch sizes', { status: 500 });
	}
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		if (!cookies.get('session')) {
			return json('Unauthorized', { status: 401 });
		}

		const data: SizeDto = await request.json();
		
		const insertedSize = await db.insert(size).values({
			size: data.size,
			height: data.height
		}).returning();
		
		return json({ insertedSize }, { status: 201 });

	} catch (error) {

		console.error('Error creating size:', error);
		return json('Failed to create size', { status: 500 });
	}
}
