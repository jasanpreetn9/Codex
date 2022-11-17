export const load = ({ fetch, params }) => {
	const fetchAnime = async (id) => {
		const resp = await fetch(`https://api.consumet.org/meta/anilist/${id}`);
		const respData = await resp.json(resp);
		return respData.results;
	};

	return {
		searchAnime: fetchAnime(params.searchId),
        searchId: params.searchId
	};
};
