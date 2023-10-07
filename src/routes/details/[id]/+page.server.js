import { redis } from '$lib/server/redis';
import {
	formatDetails,
	anilistUrl,
	detailsQuery,
	watchListQuery
} from '$lib/providers/anilist/utils';
import { proxyUrl,combineSubAndDub } from '$lib/utils';
import { episodeQuery, kitsuUrl } from '$lib/providers/kitsu/utils';
import { META } from '@consumet/extensions';

export async function load({ params, fetch, locals, url, setHeaders }) {
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
		// try {
		// 	const kitsuRes = await fetch(proxyUrl + kitsuUrl, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify({
		// 			query: episodeQuery(params.id)
		// 		})
		// 	});
		// 	// const kitsu = await kitsuRes.json();
		// 	// console.log(kitsu);
		// 	return kitsuRes;
		// } catch (error) {
		// 	console.log(error);
		// }
		const cached = await redis.get(`consumet-episodes-gogoanime-${params.id}`);
		if (cached) {
			console.log('Cache hit consumet gogoanime episodes in /details!');
			return await JSON.parse(cached);
		}
		const anilist = new META.Anilist(undefined, {
			url: proxyUrl
		});

		const [episodesSubArray, episodesDubArray] = await Promise.all([
			anilist.fetchEpisodesListById(params.id, false, true),
			anilist.fetchEpisodesListById(params.id, true, true)
		]);
		await redis.set(
			`consumet-episodes-gogoanime-${params.id}`,
			JSON.stringify(combineSubAndDub(episodesSubArray, episodesDubArray)),
			'EX',
			600
		);
		return combineSubAndDub(episodesSubArray, episodesDubArray);
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
		details: fetchAnilist(),
		streamed: {
			episodes: fetchEpisodes()
		}
	};
	return anime;
}

export const actions = {
	addToList: async ({ request, locals }) => {
		const data = await request.formData();
		const animeId = data.get('animeId');
		try {
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
				listType: 'watching'
			});
		} catch (error) {
			throw new Error(error);
		}
	}
};
