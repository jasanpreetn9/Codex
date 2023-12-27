export let jikanUrl = 'https://api.jikan.moe/v4';

export const convertJikanToAnilist = (animes) => {
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
