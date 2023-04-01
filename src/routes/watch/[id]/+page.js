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
