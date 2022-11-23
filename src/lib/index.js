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
                coverImage {
                  extraLarge
                  large
                }
                title {
                  english
                }
              }
            }
          }
        }
      }
      `;
};
export const recommendationsFormat = (recommendations) => {
	let formatted = [];
	recommendations.forEach((recommenced) => {
		formatted.push({
			image: recommenced.node.mediaRecommendation.coverImage.extraLarge,
			id: recommenced.node.mediaRecommendation.id,
			title: {
				english: recommenced.node.mediaRecommendation.title.english
			}
		});
	});
	return formatted.slice(0,24);
};
export const relationsFormat = (relations) => {
	let formatted = [];
	relations.forEach((relation) => {
		formatted.push({
			image: relation.node.coverImage.extraLarge,
			id: relation.node.id,
			title: {
				english: relation.node.title.english
			}
		});
	});
	return formatted;
};
