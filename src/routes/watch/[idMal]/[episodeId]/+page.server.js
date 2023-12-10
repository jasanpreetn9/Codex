import { redis } from '$lib/server/redis';
import { formatDetails, anilistUrl, detailsQueryIdMal } from '$lib/providers/anilist/utils';
import { apiUrl } from '$lib/utils';
import { ANIME } from '@Consumet/extensions';

export async function load({ params }) {
	const fetchAnilistDetails = async () => {
		const cached = await redis.get(`anilist-details-${params.idMal}`);
		if (cached) {
			return JSON.parse(cached);
		}
		try {
			const anilistResp = await fetch(anilistUrl, {
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
			redis.set(`anilist-details-${params.idMal}`, JSON.stringify(formattedAnilist), 'EX', 600);
			return formattedAnilist;
		} catch (error) {
			throw new Error(error);
		}
	};

	const fetchEpisodes = async () => {
		const cached = await redis.get(`gogoanime-episodes-${params.idMal}`);
		if (cached) {
			const episodes = JSON.parse(cached);
			const currentEpisode = episodes.find(
				(episode) =>
					episode.gogoanime.dub === params.episodeId || episode.gogoanime.sub === params.episodeId
			);
			return { episodes, currentEpisode };
		}

		try {
			const episodesResp = await fetch(`${apiUrl}/episodes/${params.idMal}`);
			if (!episodesResp.ok) {
				throw new Error('Failed to fetch episodes');
			}

			const episodes = await episodesResp.json();
			const currentEpisode = episodes.find(
				(episode) =>
					episode.gogoanime.dub === params.episodeId || episode.gogoanime.sub === params.episodeId
			);

			await redis.set(`gogoanime-episodes-${params.idMal}`, JSON.stringify(episodes), 'EX', 600);

			return { episodes, currentEpisode };
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};

	const fetchEpisodeSources = async () => {
		const episodeId = params.episodeId;
		const gogoanime = new ANIME.Gogoanime();
		const episodesSources = await gogoanime.fetchEpisodeSources(episodeId);
		const sources = episodesSources.sources
			.filter((source) => source.quality !== 'default' && source.quality !== 'backup')
			.map((source) => ({
				url: source.url,
				quality: parseInt(source.quality.replace('p', '')),
				html: source.quality
			}));
		const highestQuality = sources.reduce((max, source) =>
			source.quality > max.quality ? source : max
		);
		highestQuality.default = true;
		return sources;
	};

	const anime = {
		details: await fetchAnilistDetails(),
		episodeSources: await fetchEpisodeSources(),
		allEpisodes: await fetchEpisodes(),
		episodeId: params.episodeId
	};

	return anime;
}
