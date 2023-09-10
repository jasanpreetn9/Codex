import { redis } from '$lib/server/redis';
import { META } from '@consumet/extensions';
import { redirect } from '@sveltejs/kit';
import { proxyUrl, formatDetails } from '$lib/utils';

export async function load({ fetch, params, url }) {
	const episodeNumber = url.searchParams.get('episode') || 1;
	const dubStr = url.searchParams.get('dub') || false;
	const dubBool = dubStr?.toLowerCase?.() === 'true';
	const detailsCacheKey = `details-${params.id}`;

	try {
		const anilistMeta = new META.Anilist(undefined, { url: proxyUrl });
		let details = null;
		const detailsAnilistCached = await redis.get(detailsCacheKey);

		if (!detailsAnilistCached) {
			console.log('Cache hit details!');
			// Fetch episodeUrlsSub and episodeUrlsDub concurrently
			const [enimeResp, anilistResp] = await Promise.all([
				fetch(`https://api.enime.moe/mapping/anilist/${params.id}`),
				fetch('https://graphql.anilist.co/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({
						query: await (await fetch('../graphql/details.graphql')).text(),
						variables: { id: params.id }
					})
				})
			]);

			const enimeCacheControl = enimeResp.headers.get('cache-control');

			if (enimeCacheControl) {
				setHeaders({ 'cache-control': enimeCacheControl });
			}

			const enime = await enimeResp.json();
			const anilist = await anilistResp.json();

			details = formatDetails(anilist.data.Media, enime);
			redis.set(detailsCacheKey, JSON.stringify(details), 'EX', 600);

		} else if (detailsAnilistCached) {
			
			console.log('Cache hit watch details!');
			details = JSON.parse(detailsAnilistCached);
		}

		let currentEpObject = details.episodes.find(
			(episode) => parseInt(episode.number) == parseInt(episodeNumber)
		);

		const currentEpIdSub = currentEpObject.sources[0].target;
		const currentEpIdDub = currentEpIdSub.replace('episode', 'dub-episode');

		const [episodeUrlsSub, episodeUrlsDub] = await Promise.all([
			anilistMeta.fetchEpisodeSources(currentEpIdSub),
			anilistMeta.fetchEpisodeSources(currentEpIdDub).catch((error) => null) // Handle errors and set to null
		]);

		currentEpObject.sourcesSub = episodeUrlsSub?.sources;
		currentEpObject.sourcesDub = episodeUrlsDub?.sources;

		return {
			animeDetails: details,
			currentEpObject
		};
	} catch (error) {
		console.error('An error occurred:', error);
		throw error;
	}
}
