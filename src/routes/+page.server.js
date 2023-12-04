import { stripHtml } from 'string-strip-html';
import { redis } from '$lib/server/redis';
import { homeQuery, anilistUrl } from '$lib/providers/anilist/utils';
export async function load() {
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
							return {
								...slide,
								description: stripHtml(slide.description).result
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
	return {
		anilist: fetchAnilist()
	};
}
