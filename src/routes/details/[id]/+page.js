// import { apiUrl } from '$lib/components';

// export async function load({ fetch, params, headers }) {
// 	const resp = await fetch(`${apiUrl}/meta/anilist/info/${params.id}`);
// 	const cacheControl = resp.headers.get('cache-control');
// 	if (cacheControl) {
// 		setHeaders({ 'cache-control': cacheControl });
// 	}
// 	const respData = await resp.json();
// 	const relationTypes = new Set(['PREQUEL', 'SEQUEL']);
// 	respData.relations = respData.relations.filter(
// 		(relation) => relationTypes.has(relation.relationType) && relation.type !== 'OVA'
// 	);

// 	if (respData.nextAiringEpisode) {
// 		const airingDate = new Date(respData.nextAiringEpisode.airingTime * 1000);
// 		respData.nextAiringEpisode.airingTime = airingDate.toDateString();
// 	}

// 	return respData;
// }
import { apiUrl } from '$lib/components';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export async function load({ fetch, params, headers }) {
	let retryCount = 0;
	while (retryCount < MAX_RETRIES) {
		try {
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
		} catch (error) {
			console.log(error);
			if (retryCount === MAX_RETRIES - 1) {
				throw new Error(`Failed to fetch anime info for id ${params.id} after multiple retries.`);
			}
			retryCount++;
			await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
		}
	}
}
