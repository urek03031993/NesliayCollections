import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';
import { isValidPass } from '$lib/utils/utils.js';


export async function POST({ request, cookies }) {
	try {
		const { username, password }: { username: string, password: string }  = await request.json();		

		const userData = await db.query.user.findFirst({
			where: (users, { eq }) => eq(users.username, username)
		});

		const validPass = isValidPass(password, userData?.password ?? '')

		if (userData && validPass) {
			cookies.set('session', userData.username, {
				httpOnly: true,
				secure: false,
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 8,
			});

			return json({ userData	}, {status: 200} );
		}
		
		return json('Invalid credentials' , { status: 401 });
	} catch (error) {
		console.error('Login error:', error);
		return json('Login failed', { status: 500 });
	}
};
