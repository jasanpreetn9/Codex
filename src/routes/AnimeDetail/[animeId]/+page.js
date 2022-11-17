export const load = ({ fetch, params }) => {
	const fetchAnimeDetail = async (id) => {
		const resp = await fetch(`https://api.consumet.org/meta/anilist/info/${id}`);
		const respData = await resp.json(resp);
		return respData;
	};

	return {
		animeDetail: fetchAnimeDetail(params.animeId)
	};
};
