import axios from 'axios';
import * as cheerio from 'cheerio';
import { SIMKL_CLIENT_ID } from '$env/static/private';

const SIMKL_URL = 'https://api.simkl.com';
const ANIWATCH_URL = 'https://aniwatch.to';

const getMapping = async (idMal) => {
	try {
		const [malSyncResponse, simklResponse] = await Promise.all([
			axios.get(`https://api.malsync.moe/mal/anime/${idMal}`),
			axios.get(`${SIMKL_URL}/search/id?mal=${idMal}&client_id=${SIMKL_CLIENT_ID}`)
		]);

		const { Zoro, Gogoanime } = malSyncResponse.data.Sites;
		const aniwatch = Zoro ? Zoro[Object.keys(Zoro)[0]].url.replace(ANIWATCH_URL, '') : null;

		const gogoanimeKeys = Object.keys(Gogoanime);
		const sub = gogoanimeKeys.find((key) => !key.includes('-dub'));
		const dub = gogoanimeKeys.find((key) => key.includes('-dub'));

		const mappingData = {
			aniwatch,
			mal: idMal,
			gogoanime: { sub, dub },
			simkl: simklResponse.data[0].ids.simkl
		};

		return mappingData;
	} catch (error) {
		console.error('Error fetching mapping:', error);
		return { error };
	}
};

const fetchAniwatchEpisodes = async (id) => {
	if (id == null) return [];

	const getText = (selector, $) => {
		return $(selector)
			.first()
			.contents()
			.filter(function () {
				return this.type === 'text';
			})
			.text();
	};

	try {
		const [episodesData, dubTotalResp] = await Promise.all([
			fetch(`https://aniwatch.to/ajax/v2/episode/list/${id.split('-').pop()}`).then((response) => response.json()),
			fetch(`https://aniwatch.to/${id}`).then((response) => response.text())
		]);

		const $episodesData = cheerio.load(episodesData.html);
		const $dubTotalResp = cheerio.load(dubTotalResp);

		const episodes = [];
		const dubEps = getText('.tick-dub', $dubTotalResp);

		$episodesData('.ep-item').each((index, element) => {
			const $element = $episodesData(element);
			const number = Number($element.attr('data-number'));
			episodes.push({
				title: $element.attr('title'),
				number,
				filler: $element.hasClass('ssl-item-filler'),
				hasDub: dubEps >= number
			});
		});

		return episodes;
	} catch (error) {
		console.error('Error fetching Aniwatch episodes:', error);
		return [];
	}
};

const fetchKitsuEpisodes = async (idMal) => {
	const currentDateTime = new Date();

	const kitsuResp = await fetch('https://kitsu.io/api/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query: ` { lookupMapping(externalId: "${idMal}", externalSite: MYANIMELIST_ANIME) { ... on Anime { episodes(first: 2000) { nodes { number titles { canonical } thumbnail { original { url } } } } } } }`
		})
	});
	const {
		data: {
			lookupMapping: {
				episodes: { nodes }
			}
		}
	} = await kitsuResp.json();
	const kitsu = nodes
		.map((episode) => {
			const releasedAt = new Date(episode?.releasedAt);

			if (releasedAt > currentDateTime) {
				return {
					number: undefined
				};
			}
			return {
				number: episode?.number,
				image: episode?.thumbnail?.original?.url,
				title: episode?.titles?.canonical
			};
		})
		.filter((episode) => episode.number !== undefined);
	return kitsu;
};

const fetchSimkl = async (simkl) => {
	const episodesResp = await fetch(`https://api.simkl.com/anime/episodes/${simkl}`);
	const episodesUnformatted = await episodesResp.json();
	const episodes = episodesUnformatted
		.filter((ep) => ep.type === 'episode' && ep.aired)
		.map((simklEp) => {
			const timestamp = new Date(simklEp.date);
			const options = {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			};
			const episode = {
				number: simklEp.episode,
				airedAt: timestamp.toLocaleDateString('en-US', options),
				image: simklEp.img ? `https://simkl.in/episodes/${simklEp.img}_w.webp` : undefined
			};
			return episode;
		});
	return episodes;
};

export const getEpisodes = async (idMal) => {
	const mapping = await getMapping(idMal);
	if (mapping.error) {
		return mapping.error;
	}
	const { simkl, aniwatch, gogoanime } = mapping;
	const [simklEpisodes, aniwatchEps, kitsuEps] = await Promise.all([
		fetchSimkl(simkl),
		fetchAniwatchEpisodes(aniwatch),
		fetchKitsuEpisodes(idMal)
	]);

	const data = simklEpisodes.map((simklEps) => {
		const aniwatchEp = aniwatchEps.find((aniwatchEp) => aniwatchEp.number === simklEps.number);
		const kitsuEp = kitsuEps.find((kitsuEp) => kitsuEp.number === simklEps.number);
		return {
			...kitsuEp,
			...simklEps,
			...aniwatchEp,
			gogoanime: {
				sub: `${gogoanime.sub}-episode-${simklEps.number}`,
				dub: aniwatchEp?.hasDub ? `${gogoanime.dub}-episode-${simklEps.number}` : null
			}
		};
	});

	return data;
};
