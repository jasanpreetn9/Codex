export async function load({ fetch, params }) {
	const resp = await fetch(`https://api.consumet.org/meta/anilist/info/${params.id}`);
	const respData = await resp.json(resp);
	return respData;
}
