import { apiUrl } from '$lib/components';

export async function load({ fetch, params }) {
	const resp = await fetch(`${apiUrl}/meta/anilist/info/${params.id}`);
	const respData = await resp.json(resp);
	let sortedRelations = [];
	if (respData.relations.length !== 0) {
		respData.relations.forEach((relation, index) => {
			if (
				(relation.relationType == 'PREQUEL' || relation.relationType == 'SEQUEL') &&
				relation.type !== 'OVA'
			) {
				sortedRelations.push(relation);
			}
		});
	}
	respData.relations = sortedRelations;
	if (respData.nextAiringEpisode){
		var airingDate = new Date(respData.nextAiringEpisode.airingTime*1000);
		respData.nextAiringEpisode.airingTime = airingDate.toDateString()
	}

	return respData;
}
