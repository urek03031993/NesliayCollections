import { env } from '$env/dynamic/private';
import * as schema from './db/index';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// Local development environment variables
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(env.DATABASE_URL, {prepare: false, ssl: 'require'});
export const db = drizzle(client, { schema });


// Production  
// import { createClient } from "@supabase/supabase-js";
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from "$env/static/public"

// const supabaseUrl = PUBLIC_SUPABASE_URL;
// const supabaseKey = PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);
// export const db = drizzle(supabase, { schema });


















