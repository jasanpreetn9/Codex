import { error, redirect, fail } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export async function load({ local }) {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
}
export const actions = {
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);
		// const body = Object.fromEntries(await request.formData());
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}
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
