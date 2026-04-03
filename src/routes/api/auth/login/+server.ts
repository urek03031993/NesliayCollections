import { json } from '@sveltejs/kit';
import { db } from '$lib/server/index.js';


export async function POST({ request, cookies }) {
	try {
		const { username, password } = await request.json();
		

		const user_data = await db.query.user.findFirst({
			where: (users, { eq }) => eq(users.username, username)
		});

		if (user_data && password === '123') {
			cookies.set('session', 'admin-token', {
				httpOnly: true,
				secure: false,
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 8,
			});

			return json({ user_data	}, {status: 200} );
		}
		
		return json('Invalid credentials' , { status: 401 });
	} catch (error) {
		console.error('Login error:', error);
		return json('Login failed', { status: 500 });
	}
};
