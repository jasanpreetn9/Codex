import { animeDetailQuery } from '../../../lib/index';

export const load = async ({ fetch, params }) => {
	const query = animeDetailQuery();
	const resp = await fetch('https://graphql.anilist.co', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: query,
			variables: { id: params.animeId }
		})
	});
	const respData = await resp.json(resp);
	return { animeDetail: respData.data.Media };
};
