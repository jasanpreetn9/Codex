// import { apiUrl } from '$lib/components';

// export async function load({ fetch, params }) {
//     const resp = await fetch(`${apiUrl}/meta/anilist/${params.searchId}`);
// 	const respData = await resp.json(resp);

// 	return {
// 		searchAnimes: respData.results,
// 		searchId: params.searchId
// 	};
// };
import { apiUrl } from '$lib/components';

export async function load({ fetch, params }) {
	const respData = await (await fetch(`${apiUrl}/meta/anilist/${params.searchId}`)).json();
	return {
		searchAnimes: respData.results,
		searchId: params.searchId
	};
}
