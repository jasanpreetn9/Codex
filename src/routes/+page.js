export const load = async ({ fetch }) => {
	const fetchTrending = await fetch('https://api.consumet.org/meta/anilist/trending?perPage=16');
	const fetchTrendingData = await fetchTrending.json();

	const fetchPopular = await fetch('https://api.consumet.org/meta/anilist/popular?perPage=8');
	const fetchPopularData = await fetchPopular.json();

	const fetchRecentAiring = await fetch('https://api.consumet.org/meta/anilist/advanced-search?status=RELEASING&format=TV&perPage=8');
	const fetchRecentAiringData = await fetchRecentAiring.json();

	const fetchActionAdventure = await fetch('https://api.consumet.org/meta/anilist/advanced-search?genre=action&sort=[%22POPULARITY_DESC%22]&format=TV&perPage=8');
	const fetchActionAdventureData = await fetchActionAdventure.json();
	return {
		trendingAnimes: fetchTrendingData.results,
		popularAnimes: fetchPopularData.results,
		recentAiring: fetchRecentAiringData.results,
		actionAdventure: fetchActionAdventureData.results
	};
};
