// import { META } from '@consumet/extensions';
// import { proxyUrl } from '$lib';

// export async function load({params,fetch}) {

// 	try {
// 		const response = await fetch("https://api.enime.moe/mapping/anilist/" + params.id);
// 		const episodes = await response.json().episodes;
// 		const anilist = new META.Anilist(undefined, {url: proxyUrl});
// 		const respData = await anilist.fetchAnimeInfo(params.id);
// 		respData.relations = respData.relations.filter(
// 			(relation) => relation.relationType === 'PREQUEL' || relation.relationType === 'SEQUEL'
// 		);

// 		if (respData.nextAiringEpisode) {
// 			const airingDate = new Date(respData.nextAiringEpisode.airingTime * 1000);
// 			respData.nextAiringEpisode.airingTime = airingDate.toDateString();
// 		}
// 		if (respData.status.toLowerCase() !== 'ongoing') {
// 			respData.episodes.reverse();
// 		}

// 		// Combine studios into a single string
// 		respData.studios = respData.studios.join(', ');

// 		// Convert startDate into "Oct 20, 1999" format
// 		const startDate = new Date(
// 			respData.startDate.year,
// 			respData.startDate.month - 1,
// 			respData.startDate.day
// 		);
// 		respData.startDate = startDate.toLocaleString('en-US', {
// 			month: 'short',
// 			day: 'numeric',
// 			year: 'numeric'
// 		});

// 		// Remove anything after the asterisk (*)
// 		respData.description = respData.description.split('*')[0].trim();

// 		// Remove <br> tags
// 		respData.description = respData.description.replace(/<br\s*\/?>/gi, '');

// 		respData.genres = respData.genres.join(', ')

// 		return respData;
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// }

import { META } from '@consumet/extensions';
import { proxyUrl } from '$lib';

export async function load({ params, fetch }) {
	try {
		const EpResp = await fetch('https://api.enime.moe/mapping/anilist/' + params.id);
		const episodes = await EpResp.json();

		const query = await fetch('../graphql/details.graphql');

		let animeDetails = null;
		const detailsResp = await fetch('https://graphql.anilist.co/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: await query.text(),
				variables: {
					id: params.id
				}
			})
		});
		animeDetails = await detailsResp.json();
		animeDetails = animeDetails.data.Media;

		animeDetails.relations = animeDetails.relations.edges.filter(
			(relation) => relation.relationType === 'PREQUEL' || relation.relationType === 'SEQUEL'
		);

		let studiosArray = [];
		animeDetails.studios.edges.forEach((studio) => {
			studiosArray.push(studio.node.name);
		});

		animeDetails.studios = studiosArray.join(', ');

		if (animeDetails.nextAiringEpisode) {
			const airingDate = new Date(animeDetails.nextAiringEpisode.airingAt * 1000);
			animeDetails.nextAiringEpisode.airingAt = airingDate.toDateString();
		}
		animeDetails.genres = animeDetails.genres.join(', ');

		animeDetails.episodes = episodes.episodes;

		// // Convert startDate into "Oct 20, 1999" format
		const startDate = new Date(
			animeDetails.startDate.year,
			animeDetails.startDate.month - 1,
			animeDetails.startDate.day
		);
		animeDetails.startDate = startDate.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});

		const endDate = new Date(
			animeDetails.endDate.year,
			animeDetails.endDate.month - 1,
			animeDetails.endDate.day
		);
		animeDetails.endDate = endDate.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});

		animeDetails.description = animeDetails.description.split('*')[0].trim();
		animeDetails.description = animeDetails.description.replace(/<br\s*\/?>/gi, '');
		let relationsArray = [];
		animeDetails.relations.forEach((relation) => {
			relation.node.relationType = relation.relationType;
			relationsArray.push(relation.node);
		});
		animeDetails.relations = relationsArray;
		let recommendationsArray = [];
		animeDetails.recommendations.edges.forEach((recommendation) => {
			recommendationsArray.push(recommendation.node.mediaRecommendation);
		});
		animeDetails.recommendations = recommendationsArray;
		console.log(animeDetails);
		animeDetails.episodes.sort((a, b) => a.number - b.number);

		return animeDetails;
	} catch (error) {
		throw new Error(error);
	}
}
