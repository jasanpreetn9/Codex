export const load = async ({ fetch }) => {
	const fetchTrending = await fetch('https://api.consumet.org/meta/anilist/trending?perPage=16');
	const fetchTrendingData = await fetchTrending.json();

	return {
		trendingAnimes: fetchTrendingData.results,
	};
};
