export const animeDetailQuery = () => {
	return `query ($id: Int) {
        Media (id: $id, type: ANIME)  {
          id
          idMal
          title {
            english
          }
          coverImage {
            extraLarge
          }
          seasonYear
          description
          format
          status(version: 0)
          episodes
          averageScore
          genres
          recommendations {
            edges {
              node {
                mediaRecommendation {
                  id
                  title {
                    english
                    romaji
                  }
                  coverImage {
                    extraLarge
                  }
                }
              }
            }
          }
          relations {
            edges {
              id
              relationType
              node {
                id
                type
                description
                coverImage {
                  extraLarge
                  large
                }
                title {
                  english
                  romaji
                }
              }
            }
          }
        }
      }
      `;
};
