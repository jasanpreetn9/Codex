const SIMKL_URL = 'https://api.simkl.com';

export const fetchSimkl = async (simkl) => {
	const episodesResp = await fetch(`${SIMKL_URL}/anime/episodes/${simkl}`);
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
