// import { apiUrl } from '$lib/components';

// export async function load({ fetch, params, url }) {
// 	let currentEpisode;
// 	let currentEpisodeIndex;
// 	let episodeId = url.searchParams.get('episode');
// 	const info = await fetch(`${apiUrl}/meta/anilist/info/${params.id}`);
// 	const infoData = await info.json(info);

// 	for (let index = 0; index < infoData.episodes.length; index++) {
// 		const element = infoData.episodes[index];
// 		if (element.number == episodeId) {
// 			currentEpisodeIndex = index;
// 			currentEpisode = element;
// 		}
// 	}
// 	const episode = await fetch(`${apiUrl}/meta/anilist/watch/${currentEpisode.id}`);
// 	const episodeData = await episode.json(episode);
// 	return {
// 		details: infoData,
// 		episode: episodeData,
// 		currentEpisode: infoData.episodes[currentEpisodeIndex]
// 	};
// }
import { apiUrl } from '$lib/components';

export async function load({ fetch, params, url }) {
  const episodeNumber = url.searchParams.get('episode');
  const infoData = await (await fetch(`${apiUrl}/meta/anilist/info/${params.id}`)).json();
  const currentEpisode = infoData.episodes.find(episode => episode.number == episodeNumber);

  if (!currentEpisode) {
    throw new Error(`Episode ${episodeNumber} not found`);
  }

  const episodeData = await (await fetch(`${apiUrl}/meta/anilist/watch/${currentEpisode.id}`)).json();

  return {
    details: infoData,
    episode: episodeData,
    currentEpisode,
  };
}
