export async function load({ fetch, params }) {
	const resp = await fetch(`https://consumet-ten.vercel.app/meta/anilist/info/${params.id}?provider=zoro`);
	const respData = await resp.json(resp);
	let sortedRelations = [];
	if (respData.relations.length !== 0) {
		respData.relations.forEach((relation, index) => {
			if (relation.relationType == 'PREQUEL' || relation.relationType == 'SEQUEL') {
				sortedRelations.push(relation)
			}
		});
	}
	respData.relations = sortedRelations;
	return respData;
}
