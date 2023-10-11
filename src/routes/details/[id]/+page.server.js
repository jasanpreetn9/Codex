import { redis } from '$lib/server/redis';
import {
	formatDetails,
	anilistUrl,
	detailsQuery,
	watchListQuery,
} from '$lib/providers/anilist/utils';
import { proxyUrl, combineSubAndDub } from '$lib/utils';
import { META } from '@consumet/extensions';

export async function load({ params, fetch, locals, url, setHeaders }) {
	const fetchAnilist = async () => {
		try {
			// const cached = await redis.get(`anilist-details-${params.id}`);
			// if (cached) {
			// 	return JSON.parse(cached);
			// }
			const anilistResp = await fetch(proxyUrl+ anilistUrl, {
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
			// redis.set(`anilist-details-${params.id}`, JSON.stringify(formattedAnilist), 'EX', 600);
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
		const anilist = new META.Anilist(undefined, {
			url: proxyUrl
		});

		const [episodesSubArray, episodesDubArray] = await Promise.all([
			anilist.fetchEpisodesListById(params.id, false, true),
			anilist.fetchEpisodesListById(params.id, true, true)
		]);
		// await redis.set(
		// 	`consumet-episodes-gogoanime-${params.id}`,
		// 	JSON.stringify(combineSubAndDub(episodesSubArray, episodesDubArray)),
		// 	'EX',
		// 	600
		// );
		return combineSubAndDub(episodesSubArray, episodesDubArray);
	};

	const fetchAnimeList = async () => {
		try {
			// const continueWatching = await locals.pb.collection('continue_watching').getFirstListItem(`animeId="${params.id}"`);
			const animeList = await locals.pb
				.collection('lists')
				.getFirstListItem(`animeId="${params.id}"`);
			return animeList;
		} catch (error) {
			return null;
		}
	};

	const fetchContinueWatching = async () => {
		try {
			const continueWatching = await locals.pb
				.collection('continue_watching')
				.getFirstListItem(`animeId="${params.id}"`);
			return continueWatching;
		} catch (error) {
			return null;
		}
	};
	const anime = {
		animeList: fetchAnimeList(),
		continueWatching: fetchContinueWatching(),
		details: fetchAnilist(),
		streamed: {
			episodesList: fetchEpisodes()
		}
	};
	return anime;
}

export const actions = {
	addToList: async ({ request, locals }) => {
		const data = await request.formData();
		const animeId = data.get('animeId');
		const databaseId = data.get('databaseId');
		const listType = data.get('listType');
		try {
			if (databaseId !== '') {
				await locals.pb.collection('lists').update(databaseId, {
					listType
				});
			} else {
				const anilistResp = await fetch('https://graphql.anilist.co/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({
						query: watchListQuery,
						variables: { id: animeId }
					})
				});

				const anilist = await anilistResp.json();
				const media = anilist.data.Media;
				await locals.pb.collection('lists').create({
					user: locals.user.id,
					animeId: media.id,
					coverImage: media.coverImage,
					title: media.title,
					genres: media.genres,
					format: media.format,
					listType
				});
			}
		} catch (error) {
			throw new Error(error);
		}
	}
};
