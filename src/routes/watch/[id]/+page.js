import { apiUrl } from '$lib/components';
import { META, PROVIDERS_LIST } from '@consumet/extensions';

export async function load({ fetch, params, url }) {
    try {
        const episodeNumber = url.searchParams.get('episode') || 1;
        const dub = url.searchParams.get('dub') || false;

        const anilist = new META.Anilist();

        // Fetch infoData
        const animeDetails = await anilist.fetchAnimeInfo(params.id);

        // Find currentEpisodeDetail
        const currentEpisodeDetail = animeDetails.episodes.find(
            (episode) => episode.number == episodeNumber
        );
        if (!currentEpisodeDetail) {
            throw new Error(`Episode ${episodeNumber} not found`);
        }

        // Fetch episodeUrls
        // const episodeUrls = await anilist.fetchEpisodeSources(currentEpisodeDetail.id);
        const episodeUrlsResponse = await fetch(`${apiUrl}/meta/anilist/watch/${currentEpisodeDetail.id}`);
		const episodeUrls = await episodeUrlsResponse.json();

        // Filter out 'default' and 'backup' sources
        const filteredSources = episodeUrls.sources.filter(
            (element) => element.quality !== 'default' && element.quality !== 'backup'
        );

        // Calculate episodeSources on the server-side
        const episodeSources = filteredSources.map((element) => ({
            url: element.url,
            html: element.quality.replace('p', ''),
            default: false
        }));

        // Find the highest quality source and set default to true
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
