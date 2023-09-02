// import { proxyUrl } from '$lib';
// import { META } from '@consumet/extensions';
// export async function load({ fetch, params }) {
// 	const anilist = new META.Anilist(undefined, {url: proxyUrl});
// 	const respData = await anilist.search(params.query)
// 	// const respData = await (await fetch(`${apiUrl}/meta/anilist/advanced-search${params.query}&perPage=27?page=1`)).json();
// 	return {
// 		searchAnimes: respData.results,
// 		params: params.query
// 	};
// }

export async function load({ fetch,params }) {
	const query = await fetch("../graphql/search.graphql");
  
	let animes = null;
	try {
	  const response = await fetch('https://graphql.anilist.co/', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  Accept: 'application/json'
		},
		body: JSON.stringify({
		  query: await query.text(),
		  variables: {
			search:params.query
		  }
		})
	  });
	  animes = await response.json();
	} catch (error) {
	  console.log(error);
	}
  
  
  console.log(animes)
	return {
		page: animes?.data?.Page?.pageinfo || {},
		results: animes?.data?.Page?.media || [],
		params: params.query
	};
  }