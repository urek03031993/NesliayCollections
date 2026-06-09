import { db } from '$lib/server';
import { json } from '@sveltejs/kit';
import { size } from '$lib/server/db/schema.js';
import { asc, like} from 'drizzle-orm';

export async function GET({ url }) {
    try {
        const search = url.searchParams.get('q');
        const pageParam = url.searchParams.get('page');
        let page: number = 1;

        if(pageParam) page = parseInt(pageParam);        

        if (isNaN(page)) {
			return json({ message: 'invalid page'}, { status: 400 });
		}

        const pattern = '%'+ search + '%'
        const sizes = await db.select({ id: size.id, size: size.size, height: size.height })
                                 .from(size)
                                 .where(search ? like(size.size, pattern) : undefined)
                                 .orderBy(asc( size.createdAt))
                                 .limit(10)
                                 .offset((page - 1)*10);
        
        return json( sizes , { status: 200 });
    } catch (error) {
        console.error('Error fetching sizes:', error);
        return json({ error: 'Failed to fetch sizes' }, { status: 500 });
    }
};