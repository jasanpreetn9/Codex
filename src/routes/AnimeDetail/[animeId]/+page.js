export const load = async ({ fetch, params }) => {
	const resp = await fetch(`https://api.consumet.org/meta/anilist/info/${params.animeId}`);
	const respData = await resp.json(resp);
	return { animeDetail: respData };
};
