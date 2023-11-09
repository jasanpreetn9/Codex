import {
	formatDetails,
	anilistUrl,
	detailsQueryIdMal,
	watchListQuery
} from '$lib/providers/anilist/utils';
import { apiUrl, proxyUrl } from '$lib/utils';
import { ANIME } from '@consumet/extensions';

export async function load({ params, fetch, locals, url }) {
	const fetchAnilistDetails = async () => {
		try {
			const anilistResp = await fetch(proxyUrl + anilistUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: detailsQueryIdMal,
					variables: { id: params.idMal }
				})
			});

			const anilist = await anilistResp.json();
			const formattedAnilist = formatDetails(anilist.data.Media);

			return formattedAnilist;
		} catch (error) {
			throw new Error(error);
		}
	};

	const fetchEpisodes = async () => {
		const episode = url.searchParams.get('episode');
		const page = Math.ceil(episode / 100);
		const episodesResp = await fetch(`${apiUrl}/episodes/${params.idMal}?page=${page}`);
		const episodes = await episodesResp.json();
		return episodes;
	};

	const fetchAnimeList = async () => {
		try {
			const animeList = await locals.pb
				.collection('lists')
				.getFirstListItem(`animeId="${params.idMal}"`);
			return animeList;
		} catch (error) {
			return null;
		}
	};

	const fetchContinueWatching = async () => {
		try {
			const continueWatching = await locals.pb
				.collection('continue_watching')
				.getFirstListItem(`animeId="${params.idMal}"`);
			return continueWatching;
		} catch (error) {
			return null;
		}
	};

	const fetchEpisodeSources = async () => {
		const episodeId = url.searchParams.get('episodeId');
		const gogoanime = new ANIME.Gogoanime();
		const episodesSources = await gogoanime.fetchEpisodeSources(episodeId);
		const sources = episodesSources.sources
			.filter((source) => source.quality !== 'default' && source.quality !== 'backup')
			.map((source) => {
				return {
					url: source.url,
					quality: parseInt(source.quality.replace('p', '')),
					html: source.quality
				};
			});
		const highestQuality = sources.reduce((max, source) =>
			source.quality > max.quality ? source : max
		);
		highestQuality.default = true;
		return sources;
	};
	const anime = {
		animeList: fetchAnimeList(),
		continueWatching: fetchContinueWatching(),
		details: fetchAnilistDetails(),
		episodesSources: fetchEpisodeSources(),
		episodesList: fetchEpisodes()
		// streamed: {
		// }
	};

	return anime;
}
