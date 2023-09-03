
// export async function load({ params, fetch }) {
// 	try {
// 		const EpResp = await fetch('https://api.enime.moe/mapping/anilist/' + params.id);
// 		const episodes = await EpResp.json();

// 		const query = await fetch('../graphql/details.graphql');

// 		let animeDetails = null;
// 		const detailsResp = await fetch('https://graphql.anilist.co/', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json'
// 			},
// 			body: JSON.stringify({
// 				query: await query.text(),
// 				variables: {
// 					id: params.id
// 				}
// 			})
// 		});
// 		animeDetails = await detailsResp.json();
// 		animeDetails = animeDetails.data.Media;

// 		animeDetails.relations = animeDetails.relations.edges.filter(
// 			(relation) => relation.relationType === 'PREQUEL' || relation.relationType === 'SEQUEL'
// 		);

// 		let studiosArray = [];
// 		animeDetails.studios.edges.forEach((studio) => {
// 			studiosArray.push(studio.node.name);
// 		});

// 		animeDetails.studios = studiosArray.join(', ');

// 		if (animeDetails.nextAiringEpisode) {
// 			const airingDate = new Date(animeDetails.nextAiringEpisode.airingAt * 1000);
// 			animeDetails.nextAiringEpisode.airingAt = airingDate.toDateString();
// 		}
// 		animeDetails.genres = animeDetails.genres.join(', ');

// 		animeDetails.episodes = episodes.episodes;

// 		// // Convert startDate into "Oct 20, 1999" format
// 		const startDate = new Date(
// 			animeDetails.startDate.year,
// 			animeDetails.startDate.month - 1,
// 			animeDetails.startDate.day
// 		);
// 		animeDetails.startDate = startDate.toLocaleString('en-US', {
// 			month: 'short',
// 			day: 'numeric',
// 			year: 'numeric'
// 		});

// 		const endDate = new Date(
// 			animeDetails.endDate.year,
// 			animeDetails.endDate.month - 1,
// 			animeDetails.endDate.day
// 		);
// 		animeDetails.endDate = endDate.toLocaleString('en-US', {
// 			month: 'short',
// 			day: 'numeric',
// 			year: 'numeric'
// 		});

// 		animeDetails.description = animeDetails.description.split('*')[0].trim();
// 		animeDetails.description = animeDetails.description.replace(/<br\s*\/?>/gi, '');
// 		let relationsArray = [];
// 		animeDetails.relations.forEach((relation) => {
// 			relation.node.relationType = relation.relationType;
// 			relationsArray.push(relation.node);
// 		});
// 		animeDetails.relations = relationsArray;
// 		let recommendationsArray = [];
// 		animeDetails.recommendations.edges.forEach((recommendation) => {
// 			recommendationsArray.push(recommendation.node.mediaRecommendation);
// 		});
// 		animeDetails.recommendations = recommendationsArray;
// 		console.log(animeDetails);
// 		animeDetails.episodes.sort((a, b) => a.number - b.number);

// 		return animeDetails;
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// }
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
        // Filter and format relations
        const relations = media.relations.edges
            .filter((relation) => relation.node && relation.node.relationType)
            .map((relation) => {
                // Ensure relation.node is not null and has a relationType property
                return {
                    relationType: relation.node.relationType.replace(
                        // ... (replace logic)
                    ),
                    // ... (other properties you want to include)
                };
            });

        // Format studios
        const studios = media.studios.edges.map((studio) => studio.node.name).join(', ');

        // Format airing date
        if (media.nextAiringEpisode) {
            const airingDate = new Date(media.nextAiringEpisode.airingAt * 1000);
            media.nextAiringEpisode.airingAt = airingDate.toDateString();
        }

        // Format date fields
        const formatDate = (date) => {
            const formattedDate = new Date(date.year, date.month - 1, date.day);
            return formattedDate.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        };

        media.startDate = formatDate(media.startDate);
        media.endDate = formatDate(media.endDate);

        // Remove HTML tags and trim description
        media.description = media.description.split('*')[0].trim().replace(/<br\s*\/?>/gi, '');

        // Extract and format recommendations
        const recommendations = media.recommendations.edges.map(
            (recommendation) => recommendation.node.mediaRecommendation
        );

        // Sort episodes
		media.episodes = episodes.episodes
        media.episodes.sort((a, b) => a.number - b.number);

        // Update the media object with the formatted data
        media.relations = relations;
        media.studios = studios;
        media.genres = media.genres.join(', ');
        media.recommendations = recommendations;

        return media;
    } catch (error) {
        throw new Error(error);
    }
}
