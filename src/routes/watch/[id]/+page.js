import { apiUrl } from '$lib/components';

export async function load({ fetch, params, url }) {
	const episodeNumber = url.searchParams.get('episode') || 1;
	let provider = url.searchParams.get('provider') || 'gogoanime';
	let dub = url.searchParams.get('dub') || false;
	const infoData = await (
		await fetch(`${apiUrl}/meta/anilist/info/${params.id}?provider=${provider}&dub=${dub}`)
	).json();
	const currentEpisode = infoData.episodes.find((episode) => episode.number == episodeNumber);

	if (!currentEpisode) {
		throw new Error(`Episode ${episodeNumber} not found`);
	}

	const episodeData = await (
		await fetch(`${apiUrl}/meta/anilist/watch/${currentEpisode.id}`)
	).json();

	return {
		details: infoData,
		episode: episodeData,
		currentEpisode
	};
}
