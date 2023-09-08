import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login?message=You are not logged in&redirect=/user/profile');
	} else {
		throw redirect(303, '/user/profile');
	}
};