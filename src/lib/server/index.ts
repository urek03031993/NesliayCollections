// Local development environment variables 
// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
import * as schema from './db/index';
// import { env } from '$env/dynamic/private';

// if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// const client = postgres(env.DATABASE_URL);

// export const db = drizzle(client, { schema });


// Production environment variables
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });



