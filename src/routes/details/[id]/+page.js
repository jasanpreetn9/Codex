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
import {formatDetails} from '$lib'
export async function load({ params, fetch }) {
    try {
        // Fetch episodes
        const epResp = await fetch(`https://api.enime.moe/mapping/anilist/${params.id}`);
        const episodes = await epResp.json();

        // Fetch GraphQL query for anime details
        const query = await fetch('../graphql/details.graphql');
        const queryText = await query.text();

        // Fetch anime details
        const detailsResp = await fetch('https://graphql.anilist.co/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query: queryText,
                variables: { id: params.id },
            }),
        });

        const animeDetails = await detailsResp.json();
        const media = animeDetails.data.Media;
		
		const details = formatDetails(media,episodes)
        // // Filter and format relations
        // const relations = media.relations.edges
        //     .filter((relation) => relation.node && relation.node.relationType)
        //     .map((relation) => {
        //         // Ensure relation.node is not null and has a relationType property
        //         return {
        //             relationType: relation.node.relationType.replace(
        //                 // ... (replace logic)
        //             ),
        //             // ... (other properties you want to include)
        //         };
        //     });

        // // Format studios
        // const studios = media.studios.edges.map((studio) => studio.node.name).join(', ');

        // // Format airing date
        // if (media.nextAiringEpisode) {
        //     const airingDate = new Date(media.nextAiringEpisode.airingAt * 1000);
        //     media.nextAiringEpisode.airingAt = airingDate.toDateString();
        // }

        // // Format date fields
        // const formatDate = (date) => {
        //     const formattedDate = new Date(date.year, date.month - 1, date.day);
        //     return formattedDate.toLocaleString('en-US', {
        //         month: 'short',
        //         day: 'numeric',
        //         year: 'numeric',
        //     });
        // };

        // media.startDate = formatDate(media.startDate);
        // media.endDate = formatDate(media.endDate);

        // // Remove HTML tags and trim description
        // media.description = media.description.split('*')[0].trim().replace(/<br\s*\/?>/gi, '');

        // // Extract and format recommendations
        // const recommendations = media.recommendations.edges.map(
        //     (recommendation) => recommendation.node.mediaRecommendation
        // );

        // // Sort episodes
		// media.episodes = episodes.episodes
        // media.episodes.sort((a, b) => a.number - b.number);

        // // Update the media object with the formatted data
        // media.relations = relations;
        // media.studios = studios;
        // media.genres = media.genres.join(', ');
        // media.recommendations = recommendations;
console.log(details)
        return details;
    } catch (error) {
        throw new Error(error);
    }
}