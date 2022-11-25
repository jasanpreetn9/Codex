export const load = async ({ fetch }) => {
	const fetchTrending = await fetch('https://api.consumet.org/meta/anilist/trending');
	const fetchTrendingData = await fetchTrending.json();
	const trending = fetchTrendingData.results;

	const fetchPopular = await fetch('https://api.consumet.org/meta/anilist/popular?perPage=16');
	const fetchPopularData = await fetchPopular.json();
	let popular = fetchPopularData.results;

	const fetchRecentAiring = await fetch(
		'https://api.consumet.org/meta/anilist/recent-episodes?perPage=16'
	);
	const fetchRecentAiringData = await fetchRecentAiring.json();
	let recentAiring = fetchRecentAiringData.results;

	const fetchAction = await fetch('https://api.consumet.org/meta/anilist/advanced-search?genre=action&sort=[%22TRENDING_DESC%22]&perPage=16');
	const fetchActionData = await fetchAction.json();
	
	const fetchAdventure = await fetch('https://api.consumet.org/meta/anilist/advanced-search?genre=Adventuren&sort=[%22TRENDING_DESC%22]&perPage=16');
	const fetchAdventureData = await fetchAdventure.json();
	return {
		trendingAnimes: fetchTrendingData.results,
		popularAnimes: fetchPopularData.results,
		recentAiring: fetchRecentAiringData.results,
		actionAnime: fetchActionData.results,
		adventureAnime: fetchAdventureData.results
	};
};
