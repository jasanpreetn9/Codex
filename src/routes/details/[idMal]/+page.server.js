import { redis } from '$lib/server/redis';
import { formatDetails, anilistUrl, detailsQueryIdMal } from '$lib/providers/anilist/utils';
import { apiUrl, proxyUrl } from '$lib/utils';

export async function load({ params, fetch, locals, url, setHeaders }) {
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
		const cached = await redis.get(`gogoanime-episodes-${params.idMal}`);
		if (cached) {
			return JSON.parse(cached);
		}
		try {
			const episodesResp = await fetch(`${apiUrl}/episodes/${params.idMal}`);
			const episodes = await episodesResp.json();
			redis.set(`gogoanime-episodes-${params.idMal}`, JSON.stringify(episodes), 'EX', 600);
			return episodes;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const anime = {
		details: fetchAnilistDetails(),
		episodesList: fetchEpisodes()
	};

	return anime;
}
