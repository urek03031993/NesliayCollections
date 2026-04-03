import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// Local development environment variables 
// export default defineConfig({
// 	schema: './src/lib/server/db',
// 	dialect: 'postgresql',
// 	dbCredentials: { 
// 		host: '127.0.0.1',
// 		port: 5432, 
// 		user: 'admin', 
// 		password: '123', 
// 		database: 'NesliayCollections'
// 	},
// 	verbose: true,
// 	strict: true
// });


// Production environment variables
export default defineConfig({
	schema: './src/lib/server/db',
	out: './drizzle',
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
