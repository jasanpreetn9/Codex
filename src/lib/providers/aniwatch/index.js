import * as cheerio from 'cheerio';

const ANIWATCH_URL = 'https://aniwatch.to';

export const fetchAniwatchEpisodes = async (id) => {
	if (id == null) return [];
	const getText = (selector) => {
		return $$(selector)
			.first()
			.contents()
			.filter(function () {
				return this.type === 'text';
			})
			.text();
	};
	const [episodesData, dubTotalResp] = await Promise.all([
		fetch(`${ANIWATCH_URL}/ajax/v2/episode/list/${id.split('-').pop()}`).then((response) =>
			response.json()
		),
		fetch(`${ANIWATCH_URL}/${id}`).then((response) => response.text())
	]);
	const $ = cheerio.load(episodesData.html);
	const $$ = cheerio.load(dubTotalResp);
	const episodes = [];
	const dubEps = getText('.tick-dub');
	$('.ep-item').each((index, element) => {
		const number = Number($(element).attr('data-number'));
		episodes.push({
			title: $(element).attr('title'),
			number,
			filler: $(element).hasClass('ssl-item-filler'),
			hasDub: dubEps >= number
		});
	});
	return episodes;
};

export const fetchHome = async () => {
	const result = {
		spotlight: [],
		trending: [],
		topAiring: [],
		mostPopular: [],
		mostFavorite: [],
		latestCompleted: [],
		latestEpisodes: [],
		newOnAniwatch: [],
		estimatedSchedule: [],
		topUpcoming: []
	};
	const resp = await fetch(`${ANIWATCH_URL}/home`);
	const text = await resp.text();
	const $ = cheerio.load(text);

	$('.deslide-wrap .swiper-slide').each((index, element) => {
		result.spotlight.push({
			id: $(element).find('.desi-buttons a.btn-secondary').attr('href').replaceAll('/', ''),
			title: $(element).find('.desi-head-title').text().trim(),
			description: $(element).find('.desi-description').text().trim(),
			banner: $(element).find('.film-poster-img').attr('data-src'),
			format: $(element).find('.sc-detail .fa-play-circle').parent().text().trim(),
        	duration: $(element).find('.sc-detail .fa-clock').parent().text().trim(),
        	releaseDate: $(element).find('.sc-detail .fa-calendar').parent().text().trim(),
        	quality: $(element).find('.sc-detail .quality').text().trim(),
        	subtitleCount: $(element).find('.sc-detail .tick-sub').text().trim(),
        	dubCount: $(element).find('.sc-detail .tick-dub').text().trim(),
        	episodeCount: $(element).find('.sc-detail .tick-eps').text().trim(),
		});
	});
	$('#anime-trending .swiper-slide').each((index, element) => {
		result.trending.push({
			title: $(element).find('.number .film-title').attr('data-jname').trim(),
			id: $(element).find('.film-poster').attr('href').replaceAll('/', ''),
			image: $(element).find('.film-poster-img').attr('data-src')
		});
	});
	return result;
};
