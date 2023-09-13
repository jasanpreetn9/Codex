import { redis } from '$lib/server/redis';
import { formatDetails } from '$lib/utils';
export async function load({ params, fetch }) {
	const cacheKey = `details-${params.id}`
	try {
		const detailsAnilistCached = await redis.get(cacheKey);
		if (detailsAnilistCached) {
			return JSON.parse(detailsAnilistCached);
		}
		// Fetch episodes
		const enimeResp = await fetch(`https://api.enime.moe/mapping/anilist/${params.id}`);
		
		const enimeCacheControl = enimeResp.headers.get("cache-control")

		if (enimeCacheControl) {
			setHeaders({ "cache-control": enimeCacheControl })
		}
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
		redis.set(cacheKey, JSON.stringify(details), 'EX', 600);
		
		return details;
	} catch (error) {
		throw new Error(error);
	}
}
