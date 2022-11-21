export const load = async ({ fetch }) => {
	const fetchTrending = await fetch('https://api.consumet.org/meta/anilist/trending');
	const fetchTrendingData = await fetchTrending.json();
	const trending = fetchTrendingData.results;

	const fetchPopular = await fetch('https://api.consumet.org/meta/anilist/popular?perPage=16');
	const fetchPopularData = await fetchPopular.json();
	let popular = fetchPopularData.results;

	const fetchRecentAiring = await fetch('https://api.consumet.org/meta/anilist/recent-episodes?perPage=16');
	const fetchRecentAiringData = await fetchRecentAiring.json();
	let recentAiring = fetchRecentAiringData.results;
	
	// const fetchAction= await fetch('https://api.consumet.org/meta/anilist/advanced-search?genres=["Action","Adventure"]');
	// const fetchActionData = await fetchRecentAiring.json();
	// let genreAction = fetchRecentAiringData.results;
	// console.log(genreAction)
	return {
		trendingAnimes: trending,
		popularAnimes: popular,
		recentAiring: recentAiring
	};
};
