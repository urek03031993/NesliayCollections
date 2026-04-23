import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';


export const actions: Actions = {
	default: async ({ request, fetch }) => {

		const data = await request.formData();
		const previousPass = data.get('previousPass')?.toString() ?? '';
		const newPass = data.get('newPass')?.toString() ?? '';
		const confirmPass = data.get('confirmPass')?.toString() ?? '';

		if (!previousPass || !newPass || !confirmPass   ) {
			return fail(400, { error: 'All fields are required' });
		}

		if (newPass !== confirmPass) {
			return fail(400, { error: 'The new passwords do not match' });
		}

		if (newPass.length < 6) {
			return fail(400, { error: 'The new password must have at least 6 characters' });
		}

		try {
			const response = await fetch('/api/auth/passChange', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					previousPass,
					newPass,
					confirmPass
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				return fail(response.status, { error: errorData.message || 'Failed to update password' });
			}

			return { success: true, message: 'Password updated successfully' };

		} catch (error) {
			console.error('Error updating password:', error);
			return fail(500, { error: 'An unexpected error occurred' });
		}
	}
};