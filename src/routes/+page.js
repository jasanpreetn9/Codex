import { apiUrl } from '$lib/components';

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000;

export const load = async ({ fetch, context }) => {
	let retryCount = 0;
	while (retryCount < MAX_RETRIES) {
		try {
			const [trendingRes, popularRes, airingRes] = await Promise.all([
				fetch(`${apiUrl}/meta/anilist/trending?perPage=16`, {
					headers: {
						'Cache-Control': context && context.preview ? 'no-cache' : 'max-age=3600'
					}
				}),
				fetch(`${apiUrl}/meta/anilist/popular?perPage=8`, {
					headers: {
						'Cache-Control': context && context.preview ? 'no-cache' : 'max-age=3600'
					}
				}),
				fetch(`${apiUrl}/meta/anilist/advanced-search?status=RELEASING&perPage=16`, {
					headers: {
						'Cache-Control': context && context.preview ? 'no-cache' : 'max-age=3600'
					}
				})
			]);

			const [trendingAnimes, popularAnimes, airingAnimes] = await Promise.all([
				trendingRes.json(),
				popularRes.json(),
				airingRes.json()
			]);

			const trending = trendingAnimes.results
				.filter(anime => anime.cover !== anime.image && anime.totalEpisodes !== null)
				.slice(0, 10)
				.map(anime => ({
					...anime,
					description: anime.description.replace(/<br>|\n/g, '')
				}));

			return {
				trendingAnimes: trending,
				popularAnimes: popularAnimes.results,
				recentAiringAnimes: airingAnimes.results
			};
		} catch (error) {
			console.log(error);
			if (retryCount === MAX_RETRIES - 1) {
				throw new Error('Failed to load anime data after multiple retries.');
			}
			retryCount++;
			await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
		}
	}
};
