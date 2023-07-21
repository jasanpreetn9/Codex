import { apiUrl } from '$lib/components';
import { META } from '@consumet/extensions';

export async function load({ fetch, params, url }) {
	const episodeNumber = url.searchParams.get('episode') || 1;
	let provider = url.searchParams.get('provider') || 'gogoanime';
	let dub = url.searchParams.get('dub') || false;

	const anilist = new META.Anilist();
	// const infoData = await (await fetch(`${apiUrl}/meta/anilist/info/${params.id}?provider=${provider}&dub=${dub}`)).json();
	const infoData = await anilist.fetchAnimeInfo(params.id, dub);
	const currentEpisode = infoData.episodes.find((episode) => episode.number == episodeNumber);

	if (!currentEpisode) {
		throw new Error(`Episode ${episodeNumber} not found`);
	}

	// const episodeData = await (await fetch(`${apiUrl}/meta/anilist/watch/${currentEpisode.id}`)).json();
	const episodeData = await anilist.fetchEpisodeSources(currentEpisode.id)

	return {
		details: infoData,
		episode: episodeData,
		currentEpisode
	};
}
