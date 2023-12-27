import { error, redirect, fail } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { loginUserSchema } from '$lib/schemas';

export async function load({ locals, url }) {

	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
}

export const actions = {
	login: async ({ locals, request, url }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);
		const redirectTo = formData.redirectTo;
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}
		try {
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			throw error(err.status, err.message);
		}
		if (redirectTo) {
			throw redirect(303, `/${redirectTo.slice(1)}`);
		}
		throw redirect(303, '/');
	}
};