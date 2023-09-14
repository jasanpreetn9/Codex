import { redis } from '$lib/server/redis';
import { formatDetails } from '$lib/utils';
import { META } from '@consumet/extensions';
import { redirect } from '@sveltejs/kit';
export async function load({ params, fetch, url }) {
	const dubBool = url.searchParams.get('dub')?.toLowerCase?.() === 'true' || false;
	const fetchDetails = async () => {
		try {
			const query = await fetch('../../graphql/details.graphql');
			const queryText = await query.text();

			const anilistResp = await fetch('https://graphql.anilist.co/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: queryText,
					variables: { id: params.id }
				})
			});

			const anilist = await anilistResp.json();
			return formatDetails(anilist.data.Media);
		} catch (error) {
			throw new Error(error);
		}
	};
	const fetchEpisodes = async () => {
		const anilist = new META.Anilist();
		const episodesArray = await anilist.fetchEpisodesListById(params.id, dubBool,true);
		// if(episodesArray.length <= 0) {
		// 	throw redirect(300,`/details/${params.id}?dub=false`)
		// 	// console.log("dub does not exits")
		// }
		return episodesArray;
	};
	const anime = {
		details: fetchDetails(),
		dubBool,
		streamed: {
			episodes: fetchEpisodes()
		}
	};
	return anime;
}
