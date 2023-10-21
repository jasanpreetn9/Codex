import { redis } from '$lib/server/redis';
import {
	formatDetails,
	anilistUrl,
	detailsQuery,
	watchListQuery
} from '$lib/providers/anilist/utils';
import { proxyUrl } from '$lib/utils';
import { kitsuUrl, episodeQuery, episodeMapping } from '$lib/providers/kitsu/utils';
import { META,PROVIDERS_LIST } from '@consumet/extensions';

export async function load({ params, fetch, locals, url }) {
	const fetchAnilist = async () => {
		try {
			const cached = await redis.get(`anilist-details-${params.id}`);
			if (cached) {
				return JSON.parse(cached);
			}
			const anilistResp = await fetch(proxyUrl + anilistUrl, {
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
		const kitsuResp = await fetch(kitsuUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: episodeQuery(params.id)
			})
		});
		const kitsuRaw = await kitsuResp.json();
		const kitsuFormatted = episodeMapping(kitsuRaw);
		return kitsuFormatted;
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
		episodesList: fetchEpisodes()
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
