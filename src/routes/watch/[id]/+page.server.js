import { redis } from '$lib/server/redis';
import { formatDetails, combineSubAndDub } from '$lib/utils';
import { META } from '@consumet/extensions';
import { homeQuery } from '$lib/anilistGraphqlQuery';
export async function load({ params, fetch, url }) {
	const anilist = new META.Anilist();
	const fetchDetails = async () => {
		try {
			const anilistResp = await fetch('https://graphql.anilist.co/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: homeQuery,
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
		const [episodesSubArray, episodesDubArray] = await Promise.all([
			anilist.fetchEpisodesListById(params.id, false, true),
			anilist.fetchEpisodesListById(params.id, true, true)
		]);
		return combineSubAndDub(episodesSubArray, episodesDubArray);
	};
	const fetchEpisodeSources = async () => {
		const episodesArray = await fetchEpisodes();
		const episodesSources = await anilist.fetchEpisodeSources();
	};
	const anime = {
		details: fetchDetails()
	};
	return anime;
}
