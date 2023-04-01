import { apiUrl } from '$lib/components';

export const load = async ({ fetch, context }) => {
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

		const filteredTrending = trendingAnimes.results.filter(anime =>
			anime.cover !== anime.image && anime.totalEpisodes !== null
		).slice(0, 10).map(anime => ({
			...anime,
			description: anime.description.replace(/<br>|\n/g, '')
		}));

		return {
			trendingAnimes: filteredTrending,
			popularAnimes: popularAnimes.results,
			recentAiringAnimes: airingAnimes.results
		};
	} catch (error) {
		throw new Error('Failed to load anime data.');
	}
};
