import { SIMKL_CLIENT_ID } from '$env/static/private';
import { fetchSimkl } from '$lib/providers/simkl';
import { fetchKitsuEpisodes } from '$lib/providers/kitsu';
import { fetchAniwatchEpisodes } from '$lib/providers/aniwatch';

const SIMKL_URL = 'https://api.simkl.com';
const ANIWATCH_URL = 'https://aniwatch.to';

async function getMapping(idMal) {
	try {
		console.log(`${SIMKL_URL}/search/id?mal=${idMal}&client_id=${SIMKL_CLIENT_ID}`)
		const [malSyncResponse, simklResponse] = await Promise.all([
			fetch(`https://api.malsync.moe/mal/anime/${idMal}`).then((response) => response.json()),
			fetch(`${SIMKL_URL}/search/id?mal=${idMal}&client_id=${SIMKL_CLIENT_ID}`).then((response) =>
				response.json()
			)
		]);
		const { Zoro, Gogoanime } = malSyncResponse.Sites;
		const aniwatch = Zoro ? Zoro[Object.keys(Zoro)[0]].url.replace(ANIWATCH_URL, '') : null;
		const gogoanimeKeys = Object.keys(Gogoanime);
		const mappingData = {
			aniwatch,
			mal: idMal,
			gogoanime: {
				sub: gogoanimeKeys.find((key) => !key.includes('-dub')),
				dub: gogoanimeKeys.find((key) => key.includes('-dub'))
			},
			simkl: simklResponse[0].ids.simkl
		};
		return mappingData;
	} catch (error) {
		console.error('Error fetching mapping:', error);
		return {
			error
		};
	}
}

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
