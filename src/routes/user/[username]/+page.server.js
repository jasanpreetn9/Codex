import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	const username = params.username;

	const user = await locals.pb.collection('users').getFirstListItem('username="jasanpreetn9"', {});
	console.log(user)

}
