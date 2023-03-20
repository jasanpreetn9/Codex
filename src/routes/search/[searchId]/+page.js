import { apiUrl } from '$lib/components';

export async function load({ fetch, params }) {
    const resp = await fetch(`${apiUrl}/meta/anilist/${params.searchId}`);
	const respData = await resp.json(resp);

	return {
		searchAnimes: respData.results,
		searchId: params.searchId
	};
};