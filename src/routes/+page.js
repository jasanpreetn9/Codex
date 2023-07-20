import { META } from '@consumet/extensions';

export const load = async ({ fetch, context }) => {
	try {
		
		const anilist = new META.Anilist();
		const trendingAnimes = await anilist.fetchTrendingAnime(1,16);
		const trending = trendingAnimes.results
		.filter((anime) => anime.cover !== anime.image && anime.totalEpisodes !== null)
		.slice(0, 10)
		.map((anime) => ({
			...anime,
			description: anime.description.replace(/<br>|\n/g, '')
		}));
		const popularAnimes = await anilist.fetchPopularAnime(1,16);
		return {
			trendingAnimes: trending,
			popularAnimes: popularAnimes.results,
			recentAiringAnimes: []
		};
	} catch (error) {
		throw new Error('Failed to load anime data after multiple retries.');
	}
};
