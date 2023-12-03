import { redis } from '$lib/server/redis';
import {
	formatDetails,
	anilistUrl,
	detailsQueryIdMal,
	watchListQuery
} from '$lib/providers/anilist/utils';
import { apiUrl, proxyUrl } from '$lib/utils';

export async function load({ params, fetch, locals, url,setHeaders }) {
	const fetchAnilistDetails = async () => {
		const cached = await redis.get(`anilist-details-${params.idMal}`);
		if (cached) {
			return JSON.parse(cached);
		}
		try {
			const anilistResp = await fetch(proxyUrl + anilistUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: detailsQueryIdMal,
					variables: { id: params.idMal }
				})
			});
			setHeaders({
				age: anilistResp.headers.get('age'),
				'cache-control': anilistResp.headers.get('cache-control')
			});
			const anilist = await anilistResp.json();
			const formattedAnilist = formatDetails(anilist.data.Media);
			redis.set(`anilist-details-${params.idMal}`, JSON.stringify(formattedAnilist), 'EX', 600);
			return formattedAnilist;
		} catch (error) {
			throw new Error(error);
		}
	};

	const fetchEpisodes = async () => {
		const page = url.searchParams.get('page') || 1;
		const cached = await redis.get(`gogoanime-episodes-${params.idMal}-${page}`);
		if (cached) {
			return JSON.parse(cached);
		}
		try {
			console.log(`${apiUrl}/episodes/${params.idMal}?page=${page}`);
			const episodesResp = await fetch(`${apiUrl}/episodes/${params.idMal}?page=${page}`);
			// setHeaders({
			// 	// age: episodesResp.headers.get('age'),
			// 	'cache-control': episodesResp.headers.get('cache-control')
			// });
			const episodes = await episodesResp.json();
			redis.set(`gogoanime-episodes-${params.idMal}-${page}`, JSON.stringify(episodes), 'EX', 600);
			return episodes;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const fetchAnimeList = async () => {
		try {
			const animeList = await locals.pb
				.collection('lists')
				.getFirstListItem(`animeId="${params.idMal}"`);
			return animeList;
		} catch (error) {
			return null;
		}
	};

	const fetchContinueWatching = async () => {
		try {
			const continueWatching = await locals.pb
				.collection('continue_watching')
				.getFirstListItem(`animeId="${params.idMal}"`);
			return continueWatching;
		} catch (error) {
			return null;
		}
	};

	const anime = {
		animeList: fetchAnimeList(),
		continueWatching: fetchContinueWatching(),
		details: fetchAnilistDetails(),
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
