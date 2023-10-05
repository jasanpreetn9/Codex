export const watchListQuery = `
query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        english
        native
      }
      coverImage {
        extraLarge
      }
      format
      genres
    }
  }`;

export const homeQuery = `
{
  trending: Page(page: 1, perPage: 10) {
    media(type: ANIME, sort: [TRENDING_DESC]) {
      id
      bannerImage
      description(asHtml: false)
      title {
        english
        romaji
      }
      format
      genres
      meanScore
      episodes
      nextAiringEpisode {
        episode
      }
    }
  }
  popular: Page(page: 1, perPage: 16) {
    media(type: ANIME, sort: [POPULARITY_DESC]) {
      id
      coverImage {
        extraLarge
      }
      title {
        english
        romaji
      }
      format
      genres
    }
  }
}`

export const detailsQuery = `
query ($id: Int) {
	Media(id: $id, type: ANIME) {
		id
		title {
			english
			native
		}
		coverImage {
			extraLarge
		}
		startDate {
			year
			month
			day
		}
		endDate {
			year
			month
			day
		}
		bannerImage
		seasonYear
		description(asHtml: false)
		format
		status(version: 2)
		genres
		meanScore
		nextAiringEpisode {
			airingAt
			timeUntilAiring
			episode
		}
		recommendations {
			edges {
				node {
					mediaRecommendation {
						id
						title {
							romaji
							english
						}

						coverImage {
							extraLarge
						}
						genres
						format
					}
				}
			}
		}
		relations {
			edges {
				relationType
				node {
					id
					title {
						romaji
						english
					}
				}
			}
		}
		studios(isMain: true) {
			edges {
				node {
					name
				}
			}
		}
	}
}

`