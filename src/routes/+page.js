export const load = async ({ fetch }) => {
	const fetchTrending = await fetch('https://api.consumet.org/meta/anilist/trending?perPage=16');
	const fetchTrendingData = await fetchTrending.json();
	const trending = fetchTrendingData.results;

	const fetchPopular = await fetch('https://api.consumet.org/meta/anilist/popular?format=TV&perPage=8');
	const fetchPopularData = await fetchPopular.json();
	let popular = fetchPopularData.results;

	const fetchRecentAiring = await fetch(
		'https://api.consumet.org/meta/anilist/recent-episodes?format=TV&perPage=10'
	);
	const fetchRecentAiringData = await fetchRecentAiring.json();
	let recentAiring = fetchRecentAiringData.results;

	const fetchActionAdventure = await fetch(
		'https://api.consumet.org/meta/anilist/advanced-search?genre=action&sort=[%22POPULARITY_DESC%22]&format=TV&perPage=8'
	);
	const fetchActionAdventureData = await fetchActionAdventure.json();
	return {
		trendingAnimes: fetchTrendingData.results,
		popularAnimes: fetchPopularData.results,
		recentAiring: fetchRecentAiringData.results,
		actionAdventure: fetchActionAdventureData.results,
	};
};
