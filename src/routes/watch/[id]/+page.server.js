export async function load({ fetch, params }) {
	const resp = await fetch(`https://api.consumet.org/meta/anilist/watch/${params.id}`);
	const respData = await resp.json(resp);
	return respData;
}
