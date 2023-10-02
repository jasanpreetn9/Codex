import { redis } from '$lib/server/redis';
import { formatDetails, combineSubAndDub, proxyUrl, serializeNonPOJOs } from '$lib/utils';
import { META } from '@consumet/extensions';
import { detailsQuery } from '$lib/anilistQuery';

export async function load({ params, fetch, locals, url }) {
	const fetchDetails = async () => {
		try {
			const cached = await redis.get(`anilist-details-${params.id}`);
			if (cached) {
				console.log('Cache hit anilist details in /watch!');
				return JSON.parse(cached);
			}
			const anilistResp = await fetch('https://graphql.anilist.co/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: detailsQuery,
					variables: { id: params.id }
				})
			});

			const anilist = await anilistResp.json();

			const formattedAnilist = formatDetails(anilist.data.Media);
			redis.set(`anilist-details-${params.id}`, JSON.stringify(formattedAnilist), 'EX', 600);
			return formattedAnilist;
		} catch (error) {
			throw new Error(error);
		}
	};
	const anime = {
		details: fetchDetails()
	};
	return anime;
}
