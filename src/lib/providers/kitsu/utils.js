export let kitsuUrl = "https://kitsu.io/api/graphql"
export const episodeQuery = async (anilistId) => {
    return `
    query LookupMapping {
        lookupMapping(externalId: "${anilistId}", externalSite: MYANIMELIST_ANIME) {
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
    }
    `
}