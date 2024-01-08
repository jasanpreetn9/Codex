import { getEpisodes } from '$lib/api';
import { redis } from '$lib/server/redis';
import { serializeNonPOJOs } from '$lib/utils';
import { formatDetails, anilistUrl, detailsQuery } from '$lib/utils';
export async function load({ params, locals, setHeaders, url }) {
	const fetchAnilistDetails = async () => {
		const cached = await redis.get(`anilist-details-${params.idMal}`);
		if (cached) {
			return JSON.parse(cached);
		}
		try {
			const anilistResp = await fetch(anilistUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: detailsQuery,
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
		const cached = await redis.get(`gogoanime-episodes-${params.idMal}`);
		if (cached) {
			return JSON.parse(cached);
		}
		try {
			const episodes = await getEpisodes(params.idMal);
			redis.set(`gogoanime-episodes-${params.idMal}`, JSON.stringify(episodes), 'EX', 600);
			return episodes;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const fetchContinueWatching = async () => {
		if (locals.pb.authStore.isValid) {
			const userId = locals.pb.authStore.baseModel.id;
			try {
				const list = await locals.pb
					.collection('continue_watching')
					.getFirstListItem(`user = "${userId}" && idMal = "${params.idMal}"`);
				const continueWatching = serializeNonPOJOs(list);
				return continueWatching;
			} catch (error) {
				return null;
			}
		}
	};

	const anime = {
		details: await fetchAnilistDetails(),
		database: {
			continueWatching: await fetchContinueWatching()
		},
		streamed: {
			episodesList: fetchEpisodes()
		}
	};

	return anime;
}
