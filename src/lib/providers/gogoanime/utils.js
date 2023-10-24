import * as cheerio from 'cheerio';
import { episodeMapping } from '$lib/providers/kitsu/utils';
export const gogoanimeDetailsUrl = (gogoanimeIdentifier) => {
	return `https://gogoanimehd.io/category/${gogoanimeIdentifier}`;
};

export const gogoanimeEpisodesUrl = (maxEnd, id, gogoanimeIdentifier) => {
	return `https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=1&ep_end=${maxEnd}&id=${id}&default_ep=0&alias=${gogoanimeIdentifier}`;
};

export const getGogoanimeIdentifier = (malSync) => {
	return malSync.Sites.Gogoanime[
		Object.keys(malSync.Sites.Gogoanime).find((key) => !key.includes('-dub'))
	].identifier;
};

export const getMaxEnd = (gogoanimeHTML) => {
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
	return { maxEnd, id };
};

export const formattedEpisodes = (gogoanimeListHTML, kitsuRaw) => {
	const gogoanimeListEps = cheerio.load(gogoanimeListHTML);
	const epList = [];

	gogoanimeListEps('ul li a').each((i, el) => {
		epList.push({
			id: gogoanimeListEps(el).attr('href').trim().replace('/', ''),
			number: parseInt(gogoanimeListEps(el).find('.name').text().replace('EP ', '')),
			subOrDub: gogoanimeListEps(el).find('.cate').text()
		});
	});
	let kitsuFormatted = episodeMapping(kitsuRaw);
	kitsuFormatted = kitsuFormatted.map((ep) => ({
		...ep,
		...epList.find((e) => e.number === ep.number)
	}));
	return kitsuFormatted;
};
