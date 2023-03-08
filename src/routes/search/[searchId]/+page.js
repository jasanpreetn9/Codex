export async function load({ fetch, params }) {
    const resp = await fetch(`https://consumet-ten.vercel.app/meta/anilist/${params.searchId}`);
	const respData = await resp.json(resp);

	return {
		searchAnimes: respData.results,
		searchId: params.searchId
	};
};