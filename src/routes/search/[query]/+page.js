import { proxyUrl } from '$lib';
import { META } from '@consumet/extensions';
export async function load({ fetch, params }) {
	const anilist = new META.Anilist(undefined, {url: proxyUrl});
	const respData = await anilist.search(params.query)
	// const respData = await (await fetch(`${apiUrl}/meta/anilist/advanced-search${params.query}&perPage=27?page=1`)).json();
	return {
		searchAnimes: respData.results,
		params: params.query
	};
}
