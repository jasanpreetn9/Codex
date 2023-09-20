import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({ locals }) {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getUsersLists = async (userId) => {
		try {
			const lists = serializeNonPOJOs(await locals.pb.collection('lists').getFullList(undefined, {
				filter: `user = "${userId}"`
			}));
			return lists;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
        animeList: getUsersLists(locals.user.id)
    };
}
