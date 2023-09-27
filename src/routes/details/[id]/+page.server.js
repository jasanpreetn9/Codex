import { redis } from '$lib/server/redis';
import { formatDetails, combineSubAndDub, proxyUrl, serializeNonPOJOs } from '$lib/utils';
import { watchListQuery } from '$lib/anilistGraphqlQuery';
import { META } from '@consumet/extensions';
import { detailsQuery } from '$lib/anilistGraphqlQuery';

export async function load({ params, fetch, locals, url }) {
	const fetchDetails = async () => {
		try {
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
			return formatDetails(anilist.data.Media);
		} catch (error) {
			throw new Error(error);
		}
	};

	const fetchEpisodes = async () => {
		const anilist = new META.Anilist(undefined, {
			url: proxyUrl
		});

		const [episodesSubArray, episodesDubArray] = await Promise.all([
			anilist.fetchEpisodesListById(params.id, false, true),
			anilist.fetchEpisodesListById(params.id, true, true)
		]);
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
		details: fetchDetails(),
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
