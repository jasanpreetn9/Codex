import { formatTime } from '$lib/utils';

export let kitsuUrl = 'https://kitsu.io/api/graphql';

export const episodeMapping = (kitsu) => {
	const currentDateTime = new Date();
	const kitsuEpisodes = kitsu.data.lookupMapping.episodes.nodes
		.map((episode) => {
			const releasedAt = new Date(episode?.releasedAt);

			if (releasedAt > currentDateTime) {
				return {
					number: undefined,
					length: undefined,
					releasedAt: undefined,
					image: undefined,
					title: undefined,
					description: undefined
				};
			}
			return {
				number: episode?.number,
				length: episode?.length,
				releasedAt: formatTime(null, episode?.releasedAt),
				image: episode?.thumbnail?.original?.url,
				title: episode?.titles?.canonical,
				description: episode?.description
			};
		})
		.filter((episode) => episode.number !== undefined);
	return kitsuEpisodes;
};


export const kitsuOptions = (id) =>{
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: `
			query LookupMapping {
				lookupMapping(externalId: "${id}", externalSite: ANILIST_ANIME) {
					... on Anime {
						id
						episodes(first: 2000) {
							nodes {
								id
								length
								number
								releasedAt
								thumbnail {
									original {
										url
									}
								}
								titles {
									canonical
								}
								description
							}
						}
						
					}
				}
			}`
		})
	}
}