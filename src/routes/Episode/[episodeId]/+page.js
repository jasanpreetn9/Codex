export const load = ({ fetch, params }) => {
	const fetchAnimeStreamingLinks = async (id) => {
        console.log(id)
		const resp = await fetch(`https://api.consumet.org/meta/anilist/watch/${id}`);
		const respData = await resp.json(resp);
		return respData;
	};

	return {
		streamingLinks: fetchAnimeStreamingLinks(params.episodeId)
	};
};