// import { META } from '@consumet/extensions';
// import {proxyUrl} from '$lib'

// export const load = async ({ fetch, context }) => {
// 	try {
// 		const anilist = new META.Anilist(undefined, {url: proxyUrl});

// 		const trending = await anilist.fetchTrendingAnime(1, 16);
// 		const filteredTrending = trending.results
// 			.filter(anime => anime.cover !== anime.image && anime.totalEpisodes !== null)
// 			.slice(0, 10)
// 			.map(anime => ({
// 				...anime,
// 				description: anime.description.replace(/<br>|\n/g, '')
// 			}));

// 		const popular = await anilist.fetchPopularAnime(1, 16);
// 		const recentAiring = await anilist.fetchRecentEpisodes("gogoanime", 1, 16);

// 		return {
// 			trendingAnimes: filteredTrending,
// 			popularAnimes: popular.results,
// 			recentAiringAnimes: recentAiring.results,
// 		};
// 	} catch (error) {
// 		console.log(error);
// 		throw new Error('Failed to load anime data after multiple retries.');
// 	}
// };

export async function load({ fetch }) {
	const query = await fetch("graphql/home.graphql");
  
	let animes = null;
	try {
	  const response = await fetch('https://graphql.anilist.co/', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  Accept: 'application/json'
		},
		body: JSON.stringify({
		  query: await query.text(),
		})
	  });
	  animes = await response.json();
	} catch (error) {
	  console.log(error);
	}
	const results = {
	  trendingAnimes: animes?.data?.trending?.media || [],
	  popularAnimes: animes?.data?.popular?.media || [],
	  recentAiringAnimes: animes?.data?.recent?.media || [],
	};
	return results;
  }