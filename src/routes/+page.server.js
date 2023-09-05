import { proxyUrl } from '$lib/utils';


export async function load({ fetch }) {
    try {
        const queryResponse = await fetch('graphql/home.graphql');
        const queryText = await queryResponse.text();

        const anilistRes = await fetch('https://graphql.anilist.co/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query: queryText,
            }),
        });
        let anilistData = await anilistRes.json();

        const enimeResponse = await fetch( proxyUrl + 'https://api.enime.moe/recent?page=1&perPage=30');
        const enimeData = await enimeResponse.json();

        let enime = null;

        if (enimeData) {
            enime = enimeData?.data?.map((item) => ({
                id: item.anime.anilistId.toString(),
                genres: item.anime.genre,
                format: item.anime.format,
                coverImage: { extraLarge: item.anime.coverImage },
                title: {
                    english: item.anime.title.english,
                    romaji: item.anime.title.romaji,
                },
            }));
            enime = enime.filter((item) => item.format === 'TV').slice(0, 16);
        }

        const results = {
            trendingAnimes: anilistData?.data?.trending?.media || [],
            popularAnimes: anilistData?.data?.popular?.media || [],
            recentAiringAnimes: enime || [],
        };
        return results;
    } catch (error) {
        console.log(error);
        return {
            trendingAnimes: [],
            popularAnimes: [],
            recentAiringAnimes: [],
        };
    }
}
