import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};
export const actions = {
	resendVerification: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			console.log('Error: ', JSON.stringify(err));
			throw error(500, 'Something went wrong');
		}

        return {
           success: true
        }
	}
};
