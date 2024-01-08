export async function load({ fetch, params }) {
	try {
		const response = await fetch('https://graphql.anilist.co/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: `
				query ($page: Int, $search: String,  $size: Int) {
					Page(page: $page, perPage: $size) {
					  pageInfo {
						currentPage
						lastPage
						hasNextPage
					  }
					  media(search: $search,type: ANIME, format_not_in: [MUSIC,MANGA,NOVEL,ONE_SHOT]) {
					  id
					  idMal
					  title {
						romaji
						english
					  }
					  coverImage {
						extraLarge
						large
					  }
					
					  format
					
					  genres
					
					  }
					}
					}
				  `,
				variables: {
					search: params.query
				}
			})
		});
		const animes = await response.json();
		return {
			page: animes?.data?.Page?.pageinfo || {},
			results: animes?.data?.Page?.media || [],
			params: params.query
		};
	} catch (error) {
		console.log(error);
		throw error(error.message, error.status);
	}
}
