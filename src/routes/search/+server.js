import { redirect } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	const formData = await request.formData();
	const body = Object.fromEntries(formData);
	throw redirect(303, '/search/' + body.search);
};
