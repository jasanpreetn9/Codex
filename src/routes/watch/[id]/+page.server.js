// import { apiUrl } from '$lib';
import { META } from '@consumet/extensions';
import { redirect } from '@sveltejs/kit';
export async function load({ fetch, params, url }) {
    const episodeNumber = url.searchParams.get('episode') || 1;
    const dubStr = url.searchParams.get('dub') || false;
    var dubBool = (dubStr?.toLowerCase?.() === 'true');
    
    try {
        const anilist = new META.Anilist();
        const animeDetails = await anilist.fetchAnimeInfo(params.id, dubBool);

        const currentEpisodeDetail = animeDetails.episodes.find(episode => episode.number == episodeNumber);
        

        const episodeUrlsResponse = await fetch(`https://api.consumet.org/meta/anilist/watch/${currentEpisodeDetail.id}`);
        const episodeUrls = await episodeUrlsResponse.json();
        
        const filteredSources = episodeUrls.sources.filter(element =>
            element.quality !== 'default' && element.quality !== 'backup'
        );

        const episodeSources = filteredSources.map(element => ({
            url: element.url,
            html: element.quality.replace('p', ''),
            default: false
        }));

        const maxQualitySource = episodeSources.reduce((maxSource, currentSource) => {
            const currentQuality = parseInt(currentSource.html);
            const maxQuality = parseInt(maxSource.html);
            return currentQuality > maxQuality ? currentSource : maxSource;
        }, episodeSources[0]);
        maxQualitySource.default = true;
        return {
                details: animeDetails,
                episodeSources,
                currentEpisodeDetail,
        };
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
