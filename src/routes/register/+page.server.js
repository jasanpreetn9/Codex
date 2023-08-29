import { error, redirect } from '@sveltejs/kit';

export const actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pb.collection('users').create({ ...body });
			await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			console.log('Error: ', JSON.stringify(err));
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/login');
	}
};
