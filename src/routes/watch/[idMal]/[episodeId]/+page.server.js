import { redis } from '$lib/server/redis';
import { formatDetails, anilistUrl, detailsQuery } from '$lib/utils';
import { serializeNonPOJOs } from '$lib/utils';
import { ANIME } from '@consumet/extensions';
import { getEpisodes } from '$lib/api';

export async function load({ params, locals }) {
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
					query: detailsQuery,
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
		// const cached = await redis.get(`gogoanime-episodes-${params.idMal}`);
		// if (cached) {
		// 	const episodes = JSON.parse(cached);
		// 	const currentEpisode = episodes.find(
		// 		(episode) =>
		// 			episode.gogoanime.dub === params.episodeId || episode.gogoanime.sub === params.episodeId
		// 	);
		// 	// return { episodes, currentEpisode };
		// }

		try {
			const episodes = await getEpisodes(params.idMal);
			const currentEpisode = episodes.find((episode) =>episode.aniwatchId === params.episodeId);

			await redis.set(params.episodeId, JSON.stringify(episodes), 'EX', 600);

			return { episodes, currentEpisode };
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};

	const fetchEpisodeSources = async () => {
		const episodeId = params.episodeId;
		// const cached = await redis.get(`gogoanime-episode-sources-${episodeId}`);
		// if (cached) {
		// 	return JSON.parse(cached);
		// }
		const zoro = new ANIME.Zoro();
		console.log(episodeId)
		const {sources,subtitles} = await zoro.fetchEpisodeSources(episodeId);
		const source = sources.filter((source) => source.quality == 'auto')[0]
		// await redis.set(`gogoanime-episode-sources-${episodeId}`, JSON.stringify(sources), 'EX', 600);
		return {
			source,
			subtitles
		};
	};
	const fetchContinueWatching = async () => {
		if (locals.pb.authStore.isValid) {
			const userId = locals.pb.authStore.baseModel.id;
			try {
				const list = await locals.pb
					.collection('continue_watching')
					.getFirstListItem(`user = "${userId}" && idMal = "${params.idMal}"`);
				const continueWatching = serializeNonPOJOs(list);
				return continueWatching;
			} catch (error) {
				return null;
			}
		}
	};
	
	const anime = {
		episodeId: params.episodeId,
		details: await fetchAnilistDetails(),
		allEpisodes: await fetchEpisodes(),
		database: {
			continueWatching: await fetchContinueWatching()
		},
		streamed: {
			streamingData: fetchEpisodeSources()
		}
	};

	return anime;
}
