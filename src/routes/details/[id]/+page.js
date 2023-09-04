// import { META } from '@consumet/extensions';
// import { proxyUrl } from '$lib';

// export async function load({params}) {

// 	try {
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
import { formatDetails } from '$lib';
export async function load({ params, fetch }) {
	try {
		// Fetch episodes
		const enimeResp = await fetch(`https://api.enime.moe/mapping/anilist/${params.id}`);
		const enime = await enimeResp.json();

		// Fetch GraphQL query for anime details
		const query = await fetch('../graphql/details.graphql');
		const queryText = await query.text();

		// Fetch anime details
		const anilistResp = await fetch('https://graphql.anilist.co/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: queryText,
				variables: { id: params.id }
			})
		});

		const anilist = await anilistResp.json();
		const media = anilist.data.Media;

		const details = formatDetails(media, enime);
		
		return details;
	} catch (error) {
		throw new Error(error);
	}
}
