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

		let continueWatching = ''; // Initialize continueWatching
		let parsedData = null; // Initialize parsedData
		let transformedArray = []; // Initialize transformedArray
	
		if (!import.meta.env.SSR) {
			// Only use localStorage in the browser environment
			continueWatching = localStorage.getItem('artplayer_settings');
	
			// Parse the JSON data from localStorage
			if (continueWatching) {
				parsedData = JSON.parse(continueWatching);
	
				// Transform the nested object into an array of objects
				if (parsedData && parsedData.times) {
					transformedArray = Object.entries(parsedData.times).map(([key, time]) => {
						const [id, ep] = key.split('-');
						return {
							id: parseInt(id),
							time: time,
							ep: parseInt(ep)
						};
					});
				}
			}
		}
		// Filter the array to keep only the highest ep values for each id
		let filteredArray = [];
		const idToMaxEp = {}; // Lookup object for max ep values
	
		transformedArray.forEach((item) => {
			const { id, ep } = item;
			if (!idToMaxEp[id] || ep > idToMaxEp[id]) {
				idToMaxEp[id] = ep;
			}
		});
	
		filteredArray = transformedArray.filter((item) => {
			const { id, ep } = item;
			return ep === idToMaxEp[id];
		});
		console.log(filteredArray);
		
		for (let index = 0; index < filteredArray.length; index++) {
			const anime = filteredArray[index];
			const respData = await anilist.fetchAnimeInfo(anime.id);
			const matchedEp = respData.episodes.find(epItem => {
				return parseInt(epItem.number) === anime.ep;
			});
			console.log(matchedEp)
			
		}


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
