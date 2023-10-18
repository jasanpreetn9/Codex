import { redis } from '$lib/server/redis';
import { serializeNonPOJOs } from '$lib/utils';
import { homeQuery } from '$lib/providers/anilist/utils';
export async function load({ locals, fetch, setHeaders }) {
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
					trendingAnimes:
						anilistData?.data?.trending?.media?.filter((anime) => anime?.bannerImage !== null) ||
						[],
					popularAnimes: anilistData?.data?.popular?.media || []
				};
				redis.set('anilist-trending-popular', JSON.stringify(result), 'EX', 600);
				return result;
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
		};
		const fetchContinueWatching = async (userId) => {
			if (locals.pb.authStore.isValid) {
				try {
					const lists = serializeNonPOJOs(
						await locals.pb.collection('continue_watching').getFullList(undefined, {
							filter: `user = "${userId}"`
						})
					);
					return {
						authStore: {
							isValid: true
						},
						list: lists
					};
				} catch (err) {
					console.log('Error: ', err);
					throw Error(err.status, err.message);
				}
			} else {
				return {
					authStore: {
						isValid: false
					}
				};
			}
		};
		return {
			...(await fetchAnilist()),
			continueWatching: await fetchContinueWatching()
		};
	} catch (error) {
		console.log(error);
	}
}
