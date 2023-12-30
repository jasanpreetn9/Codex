import * as cheerio from 'cheerio';
import { stripHtml } from 'string-strip-html';
import { redis } from '$lib/server/redis';
import { serializeNonPOJOs } from '$lib/utils';
import { homeQuery, anilistUrl } from '$lib/providers/anilist/utils';
import { jikanUrl, convertJikanToAnilist } from '$lib/providers/jikan/utils';
import { fetchHome } from '$lib/providers/aniwatch';
import { fail, redirect } from '@sveltejs/kit';
export async function load({ locals, setHeaders }) {
	const fetchAnilist = async () => {
		try {
			const cached = await redis.get('anilist-trending-popular');
			if (cached) {
				return JSON.parse(cached);
			}
			const anilistResp = await fetch(anilistUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					query: homeQuery
				})
			});
			const cacheControl = anilistResp.headers.get('cache-control');
			if (cacheControl) {
				setHeaders({ 'cache-control': cacheControl });
			}
			let { data } = await anilistResp.json();

			const result = {
				trendingAnimes: data?.trending?.media
					.filter((anime) => anime?.bannerImage !== null)
					.map((slide) => {
						return {
							...slide,
							description: slide.description ? stripHtml(slide.description).result : null
						};
					}),
				popularAnimes: data?.popular?.media || []
			};
			redis.set('anilist-trending-popular', JSON.stringify(result), 'EX', 600);
			return result;
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};

	const fetchTopAiring = async () => {
		const cached = await redis.get('jikan-top-airing');
		if (cached) {
			return JSON.parse(cached);
		}
		try {
			const resp = await fetch(`${jikanUrl}/top/anime?filter=airing&type=tv&limit=16`);
			const cacheControl = resp.headers.get('cache-control');
			if (cacheControl) {
				setHeaders({ 'cache-control': cacheControl });
			}
			const topAiringResp = await resp.json();
			const topAiring = convertJikanToAnilist(topAiringResp);
			redis.set('jikan-top-airing', JSON.stringify(topAiring), 'EX', 600);
			return topAiring;
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};
	const fetchContinueWatching = async () => {
		if (locals.pb.authStore.isValid) {
			const userId = locals.pb.authStore.baseModel.id;
			try {
				const lists = serializeNonPOJOs(
					await locals.pb.collection('continue_watching').getFullList(undefined, {
						filter: `user = "${userId}"`,
						sort: `-updated`
					})
				);
				return {
					authStore: {
						isValid: true
					},
					list: lists
				};
			} catch (err) {
				console.log('Error from homepage: ', err);
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
		anilist: await fetchAnilist(),
		database: {
			continueWatching: await fetchContinueWatching()
		},
		// jikan: {
		// 	// topAiring: await fetchTopAiring()
		// }
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	deleteRecord: async ({ locals, request }) => {
		const fromData = Object.fromEntries(await request.formData());
		try {
			const record = await locals.pb.collection('continue_watching').delete(fromData.recordId);
			throw redirect(303, '/');
		} catch (error) {
			console.log(error);
		}
	}
};
