// // import { apiUrl } from '$lib';
// import { META, PROVIDERS_LIST, ANIME } from '@consumet/extensions';
// import { redirect } from '@sveltejs/kit';
// import { proxyUrl, formatDetails } from '$lib/utils';
// export async function load({ fetch, params, url }) {
// 	const episodeNumber = url.searchParams.get('episode') || 1;
// 	const dubStr = url.searchParams.get('dub') || false;
// 	const dubBool = dubStr?.toLowerCase?.() === 'true';

// 	try {
// 		const anilistMeta = new META.Anilist(undefined, { url: proxyUrl });
//         const animeGogoanime  = new ANIME.Gogoanime()
// 		const enimeResp = await fetch(`https://api.enime.moe/mapping/anilist/${params.id}`);
// 		const enime = await enimeResp.json();

// 		// Fetch GraphQL query for anime details
// 		const query = await fetch('../graphql/details.graphql');
// 		const queryText = await query.text();

// 		// Fetch anime details
// 		const anilistResp = await fetch('https://graphql.anilist.co/', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json'
// 			},
// 			body: JSON.stringify({
// 				query: queryText,
// 				variables: { id: params.id }
// 			})
// 		});

// 		const anilist = await anilistResp.json();
// 		const details = formatDetails(anilist.data.Media, enime);
// 		let currentEpObject = details.episodes.find((episode) => parseInt(episode.number) == parseInt(episodeNumber));

// 		const currentEpIdSub = currentEpObject.sources[0].target;
//         const currentEpIdDub = currentEpIdSub.replace('episode', 'dub-episode');

//         const episodeUrlsSub = await anilistMeta.fetchEpisodeSources(currentEpIdSub);
// 		let episodeUrlsDub;
//         try {
//             episodeUrlsDub = await anilistMeta.fetchEpisodeSources(currentEpIdDub);
//         } catch (error) {
//             episodeUrlsDub = null;
//         }

//         currentEpObject.sourcesSub = episodeUrlsSub?.sources;
//         currentEpObject.sourcesDub = episodeUrlsDub?.sources;

//         return {
// 			animeDetails: details,
// 			currentEpObject,
// 			success: true
// 		};
// 	} catch (error) {
// 		console.error('An error occurred:', error);
// 		throw error;
// 	}
// }
// import { apiUrl } from '$lib';
import { META } from '@consumet/extensions';
import { redirect } from '@sveltejs/kit';
import { proxyUrl, formatDetails } from '$lib/utils';

export async function load({ fetch, params, url }) {
    const episodeNumber = url.searchParams.get('episode') || 1;
    const dubStr = url.searchParams.get('dub') || false;
    const dubBool = dubStr?.toLowerCase?.() === 'true';

    try {
        const anilistMeta = new META.Anilist(undefined, { url: proxyUrl });

        // Fetch episodeUrlsSub and episodeUrlsDub concurrently
        const [enimeResp, anilistResp] = await Promise.all([
            fetch(`https://api.enime.moe/mapping/anilist/${params.id}`),
            fetch('https://graphql.anilist.co/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    query: await (await fetch('../graphql/details.graphql')).text(),
                    variables: { id: params.id }
                })
            })
        ]);

        const enime = await enimeResp.json();
        const anilist = await anilistResp.json();
        
		const details = formatDetails(anilist.data.Media, enime);
        
		let currentEpObject = details.episodes.find((episode) => parseInt(episode.number) == parseInt(episodeNumber));

        const currentEpIdSub = currentEpObject.sources[0].target;
        const currentEpIdDub = currentEpIdSub.replace('episode', 'dub-episode');

        const [episodeUrlsSub, episodeUrlsDub] = await Promise.all([
            anilistMeta.fetchEpisodeSources(currentEpIdSub),
            anilistMeta.fetchEpisodeSources(currentEpIdDub).catch(error => null) // Handle errors and set to null
        ]);

        currentEpObject.sourcesSub = episodeUrlsSub?.sources;
        currentEpObject.sourcesDub = episodeUrlsDub?.sources;

        return {
            animeDetails: details,
            currentEpObject,
            success: true
        };
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
