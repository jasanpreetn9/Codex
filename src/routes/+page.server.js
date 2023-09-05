export async function load({ fetch }) {
    const query = await fetch('graphql/home.graphql');

    let animes = null;
    let enime = null;

    try {
        const responsePromise = fetch('https://graphql.anilist.co/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query: await query.text(),
            }),
        });

        const enimePromise = new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                reject(new Error('Enime request timed out'));
            }, 500);

            fetch('https://api.enime.moe/recent?page=1&perPage=30')
                .then((enimeResp) => {
                    clearTimeout(timeoutId); // Clear the timeout since the request completed within 500ms
                    resolve(enimeResp.json());
                })
                .catch((error) => {
                    clearTimeout(timeoutId); // Clear the timeout in case of an error
                    reject(error);
                });
        });

        const [response, enimeData] = await Promise.all([responsePromise, enimePromise]);
        animes = await response.json();

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
    } catch (error) {
        console.log(error);
    }

    const results = {
        trendingAnimes: animes?.data?.trending?.media || [],
        popularAnimes: animes?.data?.popular?.media || [],
        recentAiringAnimes: enime || [],
    };
    return results;
}
