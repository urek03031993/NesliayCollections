import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { encriptPass } from '$lib/utils/utils.js';
import type { NewUser } from '$lib/server/types/models.js';
import { user } from '$lib/server/db/schema.js';
import { env } from '$env/dynamic/private';


export async function POST({ request }) {
    try {
        const { username, password, email }: NewUser = await request.json();

        if(request.headers.get('authorization') !== `Bearer ${env.ADMIN_SECRET}`){
            return json('Invalid credentials' , { status: 401 });
        }

        const encriptedPass = encriptPass(password);

        const newUser = await db.insert(user)
                                .values({
                                    username: username,
                                    email: email,
                                    password: encriptedPass,
                                })
                                .returning();

        if( newUser ){
            return json( newUser[0] , {status: 200} );
        }

        return json('Invalid credentials' , { status: 401 });
    } catch (error) {
        console.error('Register error:', error);
        return json('Register error', { status: 500 });
    }
};