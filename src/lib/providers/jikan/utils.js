export let jikanUrl = 'https://api.jikan.moe/v4';

export const convertJikanCardsToAnilist = (animes) => {
	const { data } = animes;
	return data.map((anime) => {
		return {
            idMal: anime.mal_id,
			coverImage: {
				extraLarge: anime.images.jpg.large_image_url
			},
            title: {
                english: anime.title_english,
                romaji: anime.title,
				native: anime.title_japanese
            },
            format: anime.type,
            genres: anime.genres.map((genre) => genre.name),
            status: anime.status,
		};
	});
};

export const convertJikanDetailsToAnilist = (anime) => {
	return {
		idMal: anime?.mal_id,
		coverImage: {
			extraLarge: anime?.images.jpg.large_image_url
		},
		title: {
			english: anime?.title_english,
			romaji: anime?.title,
			native: anime?.title_japanese
		},
		format: anime?.type,
		genres: anime?.genres.map((genre) => genre.name),
		status: anime?.status,
		description: anime?.synopsis,
		episodes: anime?.episodes,
		duration: anime?.duration,
		averageScore: anime?.score,
		season: anime?.season_name,
		seasonYear: anime?.season_year,
		airingSchedule: anime?.airing,
		externalLinks: anime?.external_links,
		characters: anime?.characters,
		staff: anime?.staff,
		relations: anime?.related,
		mediaListEntry: anime?.my_list_status
	};
}