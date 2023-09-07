import { proxyUrl } from '$lib/utils';

export async function load({ fetch }) {
    const queryResponse = await fetch('graphql/home.graphql');
    const queryText = await queryResponse.text();

    // Fetch data from Anilist and Enime concurrently using Promise.all
    const [anilistData, enimeData] = await Promise.all([fetchAnilist(queryText), fetchEnime()]);

    return {
        trendingAnimes: anilistData.trendingAnimes,
        popularAnimes: anilistData.popularAnimes,
        recentAiringAnimes: enimeData
    };
}

const fetchAnilist = async (queryText) => {
    try {
        const anilistRes = await fetch('https://graphql.anilist.co/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                query: queryText
            })
        });
        let anilistData = await anilistRes.json();
        return {
            trendingAnimes: anilistData?.data?.trending?.media || [],
            popularAnimes: anilistData?.data?.popular?.media || []
        };
    } catch (error) {
        console.log(error);
        return {
            trendingAnimes: [],
            popularAnimes: []
        };
    }
};

const fetchEnime = async () => {
    const enimeResponse = await fetch(proxyUrl + 'https://api.enime.moe/recent?page=1&perPage=30');
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
                romaji: item.anime.title.romaji
            }
        }));
        enime = enime.filter((item) => item.format === 'TV').slice(0, 16);
    }
    return enime || [];
};
