export const fetchKitsuEpisodes = async (idMal) =>{
	const currentDateTime = new Date();

	const kitsuResp = await fetch('https://kitsu.io/api/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: `
			{
                lookupMapping(externalId: "${idMal}", externalSite: MYANIMELIST_ANIME) {
                    ... on Anime {
                        episodes(first: 2000) {
                            nodes {
                                number
								titles {
									canonical
								}
                                thumbnail {
                                    original {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
            `
		})
	});
	const {
		data: {
			lookupMapping: {
				episodes: { nodes }
			}
		}
	} = await kitsuResp.json();
	const kitsu = nodes
		.map((episode) => {
			const releasedAt = new Date(episode?.releasedAt);

			if (releasedAt > currentDateTime) {
				return {
					number: undefined
				};
			}
			return {
				number: episode?.number,
				image: episode?.thumbnail?.original?.url,
				title: episode?.titles?.canonical
			};
		})
		.filter((episode) => episode.number !== undefined);
	return kitsu;
}