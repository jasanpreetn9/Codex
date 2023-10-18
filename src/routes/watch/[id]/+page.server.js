import { redis } from '$lib/server/redis';
import {
	formatDetails,
	anilistUrl,
	detailsQuery,
	watchListQuery
} from '$lib/providers/anilist/utils';
import { proxyUrl, combineSubAndDub } from '$lib/utils';
import { META } from '@consumet/extensions';

export async function load({ params, fetch, locals, url, setHeaders }) {
	const anilist = new META.Anilist(undefined, {
		url: proxyUrl
	});
	const episodeId = url.searchParams.get('episodeId');

	const fetchAnilist = async () => {
		try {
			const cached = await redis.get(`anilist-details-${params.id}`);
			if (cached) {
				return JSON.parse(cached);
			}
			const anilistResp = await fetch(anilistUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: detailsQuery,
					variables: { id: params.id }
				})
			});
			const cacheControl = anilistResp.headers.get('cache-control');

			if (cacheControl) {
				setHeaders({ 'cache-control': cacheControl });
			}
			const anilist = await anilistResp.json();

			const formattedAnilist = formatDetails(anilist.data.Media);
			redis.set(`anilist-details-${params.id}`, JSON.stringify(formattedAnilist), 'EX', 600);
			return formattedAnilist;
		} catch (error) {
			throw new Error(error);
		}
	};

	const fetchEpisodes = async () => {
		// const cached = await redis.get(`consumet-episodes-gogoanime-${params.id}`);
		// if (cached) {
		// 	console.log('Cache hit consumet gogoanime episodes in /details!');
		// 	return await JSON.parse(cached);
		// }

		const [episodesSubArray, episodesDubArray] = await Promise.all([
			anilist.fetchEpisodesListById(params.id, false, true),
			anilist.fetchEpisodesListById(params.id, true, true)
		]);
		const combined = combineSubAndDub(episodesSubArray, episodesDubArray);
		await redis.set(
			`consumet-episodes-gogoanime-${params.id}`,
			JSON.stringify(combined),
			'EX',
			600
		);
		return {
			currentEpObject: combined.find((ep) => ep.id === episodeId),
			episodesList: combined
		};
	};
	const fetchSources = async () => {
		const episodeSources = anilist.fetchEpisodeSources(episodeId);
		return episodeSources;
	};
	const anime = {
		details: await fetchAnilist(),
		...(await fetchEpisodes()),
		episodeSources: await fetchSources()
	};
	return anime;
}
