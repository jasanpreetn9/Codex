export const load = async ({ fetch, params }) => {
	let page = 1;
	const list = {
		Popular_Animes: 'https://api.consumet.org/meta/anilist/popular?perPage=48',
		Recent_Episodes: 'https://api.consumet.org/meta/anilist/recent-episodes?perPage=48',
		Trending_Action_and_Adventure_Animes:
			'https://api.consumet.org/meta/anilist/advanced-search?genre=action&sort=[%22POPULARITY_DESC%22]&format=TV&perPage=48'
	};
	const viewMoreId = params.viewMoreId.replace(/\s+/g, '_').split('-', 2)[0];
	const pageNum = params.viewMoreId.replace(/\s+/g, '_').split('-', 2)[1];
	const resp = await fetch(`${list[viewMoreId]}&${pageNum}`);
	const respData = await resp.json();
	return {
		currentPage: respData.currentPage,
		animes: respData.results,
		params: params.viewMoreId.split('-', 2)[0]
	};
};
