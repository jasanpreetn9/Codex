import { apiUrl } from '$lib/components';

export async function load({ fetch, params, url }) {
    let episode = url.searchParams.get('episode');
    const resp = await fetch(`${apiUrl}/meta/anilist/info/${episode}`);
	const respData = await resp.json(resp);
	return {
        respData
    };
}
