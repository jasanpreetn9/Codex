import { apiUrl } from '$lib/components';

export async function load({ fetch, url }) {
	let params = url.search || '';
	const respData = await (
		await fetch(`${apiUrl}/meta/anilist/advanced-search${params}&perPage=27?page=1&type=ANIME&`)
	).json();
	return {
		searchAnimes: respData.results,
		params: params
	};
}
