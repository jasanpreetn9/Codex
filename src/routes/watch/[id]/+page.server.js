import { redis } from '$lib/server/redis';
import { formatDetails, combineSubAndDub, proxyUrl, serializeNonPOJOs } from '$lib/utils';
import { watchListQuery } from '$lib/anilistGraphqlQuery';
import { META } from '@consumet/extensions';
import { detailsQuery } from '$lib/anilistGraphqlQuery';

export async function load({ params, fetch, locals, url }) {
	const fetchDetails = async () => {
		try {
			const cached = await redis.get(`anilist-details-${params.id}`);
			if (cached) {
				console.log('Cache hit anilist details in /watch!');
				return JSON.parse(cached);
			}
			const anilistResp = await fetch('https://graphql.anilist.co/', {
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

			const anilist = await anilistResp.json();

			const formattedAnilist = formatDetails(anilist.data.Media);
			redis.set(`anilist-details-${params.id}`, JSON.stringify(formattedAnilist), 'EX', 600);
			return formattedAnilist;
		} catch (error) {
			throw new Error(error);
		}
	};

	const fetchEpisodes = async () => {
		const cached = await redis.get(`consumet-episodes-gogoanime-${params.id}`);
		if (cached) {
			console.log('Cache hit consumet gogoanime episodes in /watch!');
			return JSON.parse(cached);
		}
		const anilist = new META.Anilist(undefined, {
			url: proxyUrl
		});

		const [episodesSubArray, episodesDubArray] = await Promise.all([
			anilist.fetchEpisodesListById(params.id, false, true),
			anilist.fetchEpisodesListById(params.id, true, true)
		]);
		const combinedSubAndDub = combineSubAndDub(episodesSubArray, episodesDubArray);
		redis.set(`consumet-episodes-gogoanime-${params.id}`, JSON.stringify(combinedSubAndDub), 'EX', 600);
		return combineSubAndDub;
	};

	const fetchList = async () => {
		try {
			const list = await locals.pb.collection('lists').getFirstListItem(`animeId="${params.id}"`);
			return list;
		} catch (error) {
			return null;
		}
	};

	const anime = {
		list: fetchList(),
		details: fetchDetails(),
		streamed: {
			episodes: fetchEpisodes()
		}
	};
	return anime;
}
