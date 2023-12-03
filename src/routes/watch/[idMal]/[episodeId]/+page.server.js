import { formatDetails, anilistUrl, detailsQueryIdMal } from '$lib/providers/anilist/utils';
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
		const episodeId = params.episodeId;
		console.log(episodeId)
		// const episode = params.episodeNum;
		// const page = Math.ceil(episode / 100);
		// const episodesResp = await fetch(`${apiUrl}/episodes/${params.idMal}?page=${page}`);
		// const episodes = await episodesResp.json();
		// const currentEpisode = episodes.data.filter((ep) => ep.number == episode)[0];
		// return { episodes, currentEpisode };
		return { episodes: [], currentEpisode: {} };
	};
	const fetchEpisodeSources = async () => {
		const episodeId = params.episodeId;
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
		details: fetchAnilistDetails(),
		episodeSources: fetchEpisodeSources(),
		streamed: {
			episodesList: fetchEpisodes()
		}
	};

	return anime;
}
