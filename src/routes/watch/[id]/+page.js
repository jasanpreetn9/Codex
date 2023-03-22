import { apiUrl } from '$lib/components';

export async function load({ fetch, params, url }) {
	let currentEpisode;
	let currentEpisodeIndex;
	let episodeId = url.searchParams.get('episode');
	const info = await fetch(`${apiUrl}/meta/anilist/info/${params.id}`);
	const infoData = await info.json(info);

	for (let index = 0; index < infoData.episodes.length; index++) {
		const element = infoData.episodes[index];
		if (element.number == episodeId) {
			currentEpisodeIndex = index;
			currentEpisode = element;
		}
	}
	const episode = await fetch(`${apiUrl}/meta/anilist/watch/${currentEpisode.id}`);
	const episodeData = await episode.json(episode);
	return {
		details: infoData,
		episode: episodeData,
		currentEpisode: infoData.episodes[currentEpisodeIndex]
	};
}
