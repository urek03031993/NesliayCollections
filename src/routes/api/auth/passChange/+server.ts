import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server';
import { user } from '$lib/server/db';
import { encriptPass, isValidPass } from '$lib/utils/utils';
import { eq } from 'drizzle-orm';
import type { User } from '$lib/server/types/models';


export const POST: RequestHandler = async ({ request, cookies }) => {
    if(!cookies.get('session')) return new Response('Unauthorized', { status: 401 });

	const { previousPass, newPass, confirmPass } = await request.json();

	if (!previousPass || !newPass || !confirmPass) {
		return json({ success: false, message: 'Fields are missing' }, { status: 400 });
	}

	if (newPass !== confirmPass) {
		return json({ success: false, message: 'New passwords do not match' }, { status: 400 });
	}

	if (newPass.length < 6) {
		return json({ success: false, message: 'Minimum 6 characters for the new password' }, { status: 400 });
	}

	const userExist = await db.query.user.findFirst({
		where: eq(user.username, 'neliay.admin')
	});

	if (!userExist) {
		return json({ success: false, message: 'User not found' }, { status: 404 });
	}
	
	const passPreviousValid = isValidPass(previousPass, userExist.password);

	if (!passPreviousValid) {
		return json({ success: false, message: 'The previous password is incorrect' }, { status: 400 });
	}

	const encriptedPass = encriptPass(newPass);	
	const changePass: User[] = await db.update(user)
							.set({ password: encriptedPass })
							.where( eq(user.username, 'neliay.admin') )
							.returning();

	if (changePass.length === 0) {
		return json({ success: false, message: 'The password could not be updated. The previous password is incorrect' }, { status: 400 });
	}

	return json({ success: true, message: 'Password changed' });
};