import { env } from '$env/dynamic/private';
import * as schema from './db/index';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// Local development environment variables
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });


// Production  
// import { Pool } from '@neondatabase/serverless';
// import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// export const db = drizzleNeon(pool, { schema });

















