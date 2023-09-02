
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
			search: params.query
		  }
		})
	  });
	  animes = await response.json();
	} catch (error) {
	  console.log(error);
	}
  

  console.log()
	return {
		animes: animes?.data?.Page?.media,
		page: animes?.data?.Page?.pageinfo,
		params: params.query
	};
  }