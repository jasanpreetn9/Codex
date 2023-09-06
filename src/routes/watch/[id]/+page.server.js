// import { apiUrl } from '$lib';
import { META,PROVIDERS_LIST } from '@consumet/extensions';
import { redirect } from '@sveltejs/kit';
import {proxyUrl} from '$lib/utils'
export async function load({ fetch, params, url }) {
    const episodeNumber = url.searchParams.get('episode') || 1;
    const dubStr = url.searchParams.get('dub') || false;
    var dubBool = (dubStr?.toLowerCase?.() === 'true');

    try {
		const anilist = new META.Anilist(undefined, {url: proxyUrl});
        const animeDetails = await anilist.fetchAnimeInfo(params.id, dubBool);

        const currentEpisodeDetail = animeDetails.episodes.find(episode => episode.number == episodeNumber);


        const episodeUrlsResponse = await fetch(`https://api.consumet.org/meta/anilist/watch/${currentEpisodeDetail.id}`);
        // const episodeUrls = await episodeUrlsResponse.json();

        const episodeUrls = await anilist.fetchEpisodeSources(currentEpisodeDetail.id)
        // const episodeUrls = await episodeUrlsResponse.json();

        if (!episodeUrls) {
            return redirect(`/watch/${animeDetails.id}?episode=1`);
        }
        const episodeSources = episodeUrls.sources.filter(element =>
            element.quality !== 'default' && element.quality !== 'backup'
        ).map(element => ({
            url: element.url,
            html: element.quality.replace('p', ''),
            default: false
        }));
        // const episodeSources = filteredSources.map(element => ({
        //     url: element.url,
        //     html: element.quality.replace('p', ''),
        //     default: false
        // }));

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
                // providerList: PROVIDERS_LIST
        };
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
