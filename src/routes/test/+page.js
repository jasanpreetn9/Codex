
export async function load({fetch}) {
    let resp = await fetch('https://graphql.anilist.co/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            query: `
            {
                Page(page: 1, perPage: 10) {
                  media(type: ANIME, sort: [TRENDING_DESC, POPULARITY_DESC]) {
                    id
                    bannerImage
                    description
                    title {
                      english
                      romaji
                    }
                    format
                    genres
                    meanScore
                    episodes
                    
                  }
                }
              }
              
            `
        })
    });    
    let respData = await resp.json();
    return respData.data.Page;
}