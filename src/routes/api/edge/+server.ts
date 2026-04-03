// src/routes/api/admin/migrate/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const config = { runtime: 'edge' };

export const POST: RequestHandler = async ({ request }) => {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    throw error(401, 'Unauthorized');
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);

    const { migrate } = await import('drizzle-orm/neon-http/migrator');
    
    await migrate(db, { migrationsFolder: './drizzle' });

    return json({ success: true });

  } catch (err) {
    throw error(500, err instanceof Error ? err.message : 'Error');
  }
};