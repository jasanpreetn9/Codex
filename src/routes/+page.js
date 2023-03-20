import { apiUrl } from '$lib/components';

export const load = async ({ fetch }) => {
	const fetchTrending = await fetch(`${apiUrl}/meta/anilist/trending?perPage=16`);
	const fetchTrendingData = await fetchTrending.json();

	const fetchPopular = await fetch(`${apiUrl}/meta/anilist/popular?perPage=8`);
	const fetchPopularData = await fetchPopular.json();

	const fetchRecentAiring = await fetch(`${apiUrl}/meta/anilist/advanced-search?status=RELEASING&format=TV&perPage=16`);
	const fetchRecentAiringData = await fetchRecentAiring.json();

	return {
		trendingAnimes: fetchTrendingData.results,
		popularAnimes: fetchPopularData.results,
		recentAiringAnimes: fetchRecentAiringData.results
	};
};
