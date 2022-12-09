import { animeDetailQuery } from '../../../lib/index';

export const load = async ({ fetch, params }) => {
	const query = animeDetailQuery();
	const resp = await fetch(`https://api.consumet.org/meta/anilist/info/${params.animeId}`);
	const respData = await resp.json(resp);
	return respData;
};
