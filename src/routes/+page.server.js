import { redis } from '$lib/server/redis';
import { proxyUrl } from '$lib/utils';

export async function load({ fetch, setHeaders }) {
	try {
		const queryResponse = await fetch('graphql/home.graphql');
		const queryText = await queryResponse.text();
		const enimeRedisKey = 'enime-recentAiring';
		const anilistRedisKey = 'anilist-trending-popular';

		const fetchAnilist = async () => {
			const anilistCached = await redis.get(anilistRedisKey);

			if (anilistCached) {
				const anilistTtl = redis.ttl(anilistRedisKey);
				return JSON.parse(anilistCached);
			}

			const anilistRes = await fetch('https://graphql.anilist.co/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: queryText
				})
			});

			let anilistData = await anilistRes.json();

			const result = {
				trendingAnimes: anilistData?.data?.trending?.media || [],
				popularAnimes: anilistData?.data?.popular?.media || []
			};
			redis.set(anilistRedisKey, JSON.stringify(result), 'EX', 600);
			return result;
		};

		const fetchEnime = async () => {
			const enimeCached = await redis.get(enimeRedisKey);

			if (enimeCached) {
				return JSON.parse(enimeCached);
			}

			const enimeResponse = await fetch(proxyUrl + 'https://api.enime.moe/recent?page=1&perPage=30');
			const enimeCacheControl = enimeResponse.headers.get('cache-control');

			if (enimeCacheControl) {
				setHeaders({ 'cache-control': enimeCacheControl });
			}
			const enimeData = await enimeResponse.json();

			let enime = null;

			if (enimeData) {
				enime = enimeData?.data?.map((item) => ({
					id: item.anime.anilistId.toString(),
					genres: item.anime.genre,
					format: item.anime.format,
					coverImage: { extraLarge: item.anime.coverImage },
					title: {
						english: item.anime.title.english,
						romaji: item.anime.title.romaji
					}
				}));
				enime = enime.filter((item) => item.format === 'TV').slice(0, 16);
			}
			redis.set(enimeRedisKey, JSON.stringify(enime), 'EX', 600);
			return enime || [];
		};

		// Fetch data from Anilist and Enime concurrently using Promise.all
		const [anilistData, enimeData] = await Promise.all([fetchAnilist(queryText), fetchEnime()]);

		// Set cache-control header here
		const enimeTtl = redis.ttl(enimeRedisKey);
		setHeaders({ 'cache-control': `max-age=${enimeTtl}` });

		return {
			trendingAnimes: anilistData.trendingAnimes,
			popularAnimes: anilistData.popularAnimes,
			recentAiringAnimes: enimeData
		};
	} catch (error) {
		console.error(error);
		return {
			trendingAnimes: [],
			popularAnimes: [],
			recentAiringAnimes: []
		};
	}
}
