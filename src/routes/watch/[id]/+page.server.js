// import { apiUrl } from '$lib/components';
// import { META } from '@consumet/extensions';

// export async function load({ fetch, params, url }) {
// 	const episodeNumber = url.searchParams.get('episode') || 1;
// 	let provider = url.searchParams.get('provider') || 'gogoanime';
// 	let dub = url.searchParams.get('dub') || false;

// 	const anilist = new META.Anilist();
// 	const infoData = await (await fetch(`${apiUrl}/meta/anilist/info/${params.id}?provider=${provider}&dub=${dub}`)).json();
// 	const currentEpisode = infoData.episodes.find((episode) => episode.number == episodeNumber);

// 	if (!currentEpisode) {
// 		throw new Error(`Episode ${episodeNumber} not found`);
// 	}

// 	const episodeData = await (await fetch(`${apiUrl}/meta/anilist/watch/${currentEpisode.id}`)).json();

// 	return {
// 		details: infoData,
// 		episode: episodeData,
// 		currentEpisode
// 	};
// }
import { apiUrl } from '$lib/components';
import { META } from '@consumet/extensions';

export async function load({ fetch, params, url }) {
	const episodeNumber = url.searchParams.get('episode') || 1;
	let provider = url.searchParams.get('provider') || 'gogoanime';
	let dub = url.searchParams.get('dub') || false;

	const anilist = new META.Anilist();
	const infoData = await (await fetch(`${apiUrl}/meta/anilist/info/${params.id}?provider=${provider}&dub=${dub}`)).json();
	const currentEpisode = infoData.episodes.find((episode) => episode.number == episodeNumber);

	if (!currentEpisode) {
		throw new Error(`Episode ${episodeNumber} not found`);
	}

	const episodeData = await (await fetch(`${apiUrl}/meta/anilist/watch/${currentEpisode.id}`)).json();

	// Calculate defaultUrl and episodeSources on the server-side
	let episodeSources = [];
	let sourcesQuality = [];
	let defaultUrl;

	episodeData.sources.forEach((element) => {
		if (element.quality !== 'default' && element.quality !== 'backup') {
			episodeSources.push({
				url: element.url,
				html: element.quality,
				default: false
			});
			sourcesQuality.push(parseInt(element.quality.replace('p', '')));
		}
	});

	episodeSources.forEach((element) => {
		if (element.html == Math.max(...sourcesQuality) + 'p') {
			element.default = true;
			defaultUrl = element.url;
		}
	});

	return {
		details: infoData,
		episode: episodeData,
		currentEpisode,
		defaultUrl,
		episodeSources
	};
}
