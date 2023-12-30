import { searchQuery } from '$lib/providers/anilist/utils';
export async function load({ fetch, params }) {
	try {
		const response = await fetch('https://graphql.anilist.co/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: searchQuery,
				variables: {
					search: params.query
				}
			})
		});
		const animes = await response.json();
		return {
			page: animes?.data?.Page?.pageinfo || {},
			results: animes?.data?.Page?.media || [],
			params: params.query
		};
	} catch (error) {
		console.log(error);
		throw error(error.message, error.status);
	}
}
