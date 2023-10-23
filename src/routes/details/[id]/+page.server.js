import * as cheerio from 'cheerio';
import { redis } from '$lib/server/redis';
import { formatDetails, anilistUrl, detailsQuery, watchListQuery } from '$lib/providers/anilist/utils';
import { proxyUrl } from '$lib/utils';
import { kitsuUrl, episodeQuery, episodeMapping } from '$lib/providers/kitsu/utils';

async function fetchAnilistDetails(params, fetch) {
  try {
    const cached = await redis.get(`anilist-details-${params.id}`);
    if (cached) {
      return JSON.parse(cached);
    }
    
    const anilistResp = await fetch(proxyUrl + anilistUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: detailsQuery,
        variables: { id: params.id }
      })
    });

    const anilist = await anilistResp.json();
    const formattedAnilist = formatDetails(anilist.data.Media);

    redis.set(`anilist-details-${params.id}`, JSON.stringify(formattedAnilist), 'EX', 600);
    return formattedAnilist;
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchMalSyncData(params, fetch) {
  const fetchMalId = await fetch(anilistUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          idMal
        }
      }`,
      variables: { id: params.id }
    })
  });

  const { data: { Media: { id: mediaId, idMal } } } = await fetchMalId.json();
  const malSyncResp = await fetch(`https://api.malsync.moe/mal/anime/${idMal}`);
  return malSyncResp.json();
}

async function fetchKitsuData(params, fetch) {
  const malSync = await fetchMalSyncData(params, fetch);
  const gogoanimeIdentifier = malSync.Sites.Gogoanime[Object.keys(malSync.Sites.Gogoanime).find((key) => !key.includes('-dub'))].identifier;

  const [kitsuResp, fetchGogoanimeId] = await Promise.all([
    fetch(kitsuUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: episodeQuery(params.id)
      })
    }),
    fetch(`https://gogoanimehd.io/category/${gogoanimeIdentifier}`)
  ]);

  const kitsuRaw = await kitsuResp.json();
  let kitsuFormatted = episodeMapping(kitsuRaw);

  const gogoanimeHTML = await fetchGogoanimeId.text();
  const gogoanimeEps = cheerio.load(gogoanimeHTML);
  const numList = [];

  const id = gogoanimeEps('.movie_id').attr('value');
  gogoanimeEps('#episode_page li').each((i, el) => {
    numList.push({
      start: gogoanimeEps(el).find('a').attr('ep_start'),
      end: gogoanimeEps(el).find('a').attr('ep_end')
    });
  });

  let maxEnd = -Infinity;

  for (const item of numList) {
    const end = parseInt(item.end);
    if (!isNaN(end) && end > maxEnd) {
      maxEnd = end;
    }
  }

  const [gogoanimeList] = await Promise.all([fetch(`https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=1&ep_end=${maxEnd}&id=${id}&default_ep=0&alias=${gogoanimeIdentifier}`)]);

  const gogoanimeListHTML = await gogoanimeList.text();
  const gogoanimeListEps = cheerio.load(gogoanimeListHTML);
  const epList = [];

  gogoanimeListEps("ul li a").each((i, el) => {
    epList.push({
      id: gogoanimeListEps(el).attr("href").trim().replace("/",""),
      number: parseInt(gogoanimeListEps(el).find('.name').text().replace("EP ", "")),
      subOrDub: gogoanimeListEps(el).find(".cate").text(),
    });
  });

  kitsuFormatted = kitsuFormatted.map((ep) => ({
    ...ep,
    ...epList.find((e) => e.number === ep.number)
  }));

  console.log(kitsuFormatted);
  return kitsuFormatted;
}

async function fetchAnimeList(locals, params) {
  try {
    const animeList = await locals.pb.collection('lists').getFirstListItem(`animeId="${params.id}"`);
    return animeList;
  } catch (error) {
    return null;
  }
}

async function fetchContinueWatching(locals, params) {
  try {
    const continueWatching = await locals.pb.collection('continue_watching').getFirstListItem(`animeId="${params.id}"`);
    return continueWatching;
  } catch (error) {
    return null;
  }
}

export async function load({ params, fetch, locals, url }) {
  const anime = {
    animeList: await fetchAnimeList(locals, params),
    continueWatching: await fetchContinueWatching(locals, params),
    details: await fetchAnilistDetails(params, fetch),
    streamed: {
      episodesList: await fetchKitsuData(params, fetch)
    }
  };

  return anime;
}

export const actions = {
	addToList: async ({ request, locals }) => {
		const data = await request.formData();
		const animeId = data.get('animeId');
		const databaseId = data.get('databaseId');
		const listType = data.get('listType');
		try {
			if (databaseId !== '') {
				await locals.pb.collection('lists').update(databaseId, {
					listType
				});
			} else {
				const anilistResp = await fetch('https://graphql.anilist.co/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					body: JSON.stringify({
						query: watchListQuery,
						variables: { id: animeId }
					})
				});

				const anilist = await anilistResp.json();
				const media = anilist.data.Media;
				await locals.pb.collection('lists').create({
					user: locals.user.id,
					animeId: media.id,
					coverImage: media.coverImage,
					title: media.title,
					genres: media.genres,
					format: media.format,
					listType
				});
			}
		} catch (error) {
			throw new Error(error);
		}
	}
};
