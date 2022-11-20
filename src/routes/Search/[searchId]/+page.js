export const load = async({ fetch, params }) => {
		const resp = await fetch(`https://api.consumet.org/meta/anilist/${params.searchId}`);
		const respData = await resp.json(resp);

	return {
		searchAnime: respData.results
	};
};
