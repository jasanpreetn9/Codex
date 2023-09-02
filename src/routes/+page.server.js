export async function load({ fetch }) {
	const query = await fetch("graphql/home.graphql");
  
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
		})
	  });
	  animes = await response.json();
	} catch (error) {
	  console.log(error);
	}
  
  
	const results = {
	  trendingAnimes: animes?.data?.trending?.media || [],
	  popularAnimes: animes?.data?.popular?.media || [],
	  recentAiringAnimes: animes?.data?.recent?.media || [],
	};
  
	return results;
  }