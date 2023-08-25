import { META } from '@consumet/extensions';
export const load = async ({ fetch, context }) => {
	try {
		const anilist = new META.Anilist();
		const trendingAnimes = await anilist.fetchTrendingAnime(1, 16);
		const trending = trendingAnimes.results
			.filter((anime) => anime.cover !== anime.image && anime.totalEpisodes !== null)
			.slice(0, 10)
			.map((anime) => ({
				...anime,
				description: anime.description.replace(/<br>|\n/g, '')
			}));
		const popularAnimes = await anilist.fetchPopularAnime(1, 16);

		// const recentAiringAnimes = await anilist.advancedSearch()

		// Check if page was rendered using SSR
		// if (!import.meta.env.SSR) {
		// 	// get local storage
		// 	let artplayer_settings = localStorage.getItem('artplayer_settings');

		// 	// Parse the JSON data from localStorage
		// 	if (artplayer_settings) {
		// 		let parsedData = JSON.parse(artplayer_settings);
		// 		let continueWatching = artPlayerSettings(parsedData);
		// 		console.log(continueWatching);
		// 	}
		// }

		return {
			trendingAnimes: trending,
			popularAnimes: popularAnimes.results
			// recentAiringAnimes: recentAiringAnimes.result
		};
	} catch (error) {
		console.log(error);
		throw new Error('Failed to load anime data after multiple retries.');
	}
};
