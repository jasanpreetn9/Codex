import { redirect } from '@sveltejs/kit';

export const POST = ({ request }) => {
	const body = Object.fromEntries(await request.formData());
	locals.user = undefined;

	throw redirect(303, '/login');
};