export const load = async ({ fetch, params }) => {
	var formattedId = params.viewMoreId
		.trim() //might need polyfill if you need to support older browsers
		.toLowerCase() //lower case everything
		.replace(
			/([^A-Z0-9]+)(.)/gi, //match multiple non-letter/numbers followed by any character
			function (match) {
				return arguments[2].toUpperCase(); //3rd index is the character we need to transform uppercase
			}
		);

	
    
        // const fetchPopular = await fetch('https://api.consumet.org/meta/anilist/popular?perPage=16');
	// const respData = await resp.json(resp);
	// return { animeDetail: respData };
};
