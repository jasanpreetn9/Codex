import { apiUrl } from '$lib/components';

export async function load({ fetch, params, headers }) {
	const resp = await fetch(`${apiUrl}/meta/anilist/info/${params.id}`);
	const cacheControl = resp.headers.get('cache-control');
	if (cacheControl) {
		setHeaders({ 'cache-control': cacheControl });
	}
	const respData = await resp.json();
	const relationTypes = new Set(['PREQUEL', 'SEQUEL']);
	respData.relations = respData.relations.filter(
		(relation) => relationTypes.has(relation.relationType) && relation.type !== 'OVA'
	);

	if (respData.nextAiringEpisode) {
		const airingDate = new Date(respData.nextAiringEpisode.airingTime * 1000);
		respData.nextAiringEpisode.airingTime = airingDate.toDateString();
	}

	return respData;
}
