import { redis } from '$lib/server/redis';
import { homeQuery } from '$lib/providers/anilist/utils';
export async function load({ locals,fetch, setHeaders }) {
	try {
		const fetchAnilist = async () => {
			try {
				const cached = await redis.get('anilist-trending-popular');
				if (cached) {
					console.log('Cache hit homepage!');
					return JSON.parse(cached);
				}
				const anilistRes = await fetch('https://graphql.anilist.co/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({
						query: homeQuery
					})
				});
				setHeaders({
					anilistRes,
					'cache-control': 'max-age=60'
				});
				let anilistData = await anilistRes.json();

				const result = {
					trendingAnimes: anilistData?.data?.trending?.media || [],
					popularAnimes: anilistData?.data?.popular?.media || []
				};
				redis.set('anilist-trending-popular', JSON.stringify(result), 'EX', 600);
				return result;
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
		};

		return fetchAnilist();
	} catch (error) {
		console.log(error);
	}
}
