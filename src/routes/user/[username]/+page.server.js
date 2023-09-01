import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	const username = params.username;

	let users = await locals.pb.collection('users').getFullList({
		sort: '-created'
	});
	const resultList = await pb.collection('users').getList(1, 50, {
		filter: 'created >= "2022-01-01 00:00:00"',
	});
	console.log(resultList)
	console.log("Users: " + resultList)

}
