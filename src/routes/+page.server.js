import { redis } from '$lib/server/redis';
import { serializeNonPOJOs } from '$lib/utils';
import { homeQuery,anilistUrl } from '$lib/providers/anilist/utils';
export async function load({ locals, fetch }) {
	try {
		const fetchAnilist = async () => {
			try {
				const cached = await redis.get('anilist-trending-popular');
				if (cached) {
					return JSON.parse(cached);
				}
				const anilistRes = await fetch(anilistUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({
						query: homeQuery
					})
				});
				let { data } = await anilistRes.json();

				const result = {
					trendingAnimes:
						data?.trending?.media
							.map((slide) => {
								// Remove <b>, </b>, <i>, and </i> tags from description
								return {
									...slide,
									description: slide.description.replace(/<[^>]*>/g, '')
								};
							})
							.filter((anime) => anime?.bannerImage !== null) || [],
					popularAnimes: data?.popular?.media || []
				};
				redis.set('anilist-trending-popular', JSON.stringify(result), 'EX', 600);
				return result;
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
		};
		const fetchContinueWatching = async () => {
			if (locals.pb.authStore.isValid) {
				const userId = locals.pb.authStore.baseModel.id
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
