import { apiUrl } from '$lib/components';

export async function load({ fetch, params }) {
	const respData = await (await fetch(`${apiUrl}/meta/anilist/advanced-search${params.query}&perPage=27?page=1`)
	).json();
	return {
		searchAnimes: respData.results,
		params: params.query
	};
}
