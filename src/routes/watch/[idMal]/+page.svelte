<script>
	import { onMount, watch } from 'svelte';
	import Hls from 'hls.js';
	import Artplayer from 'artplayer';
	export let data;
	import { EpisodeCard } from '$lib/components';
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	$: ({ details, streamed, episodeSources } = data);
	let artplayer;
	let currentEpisode = $page.url.searchParams.get('episode');
	
    function playM3u8(video, url, art) {
		if (Hls.isSupported()) {
			if (art.hls) art.hls.destroy();
			const hls = new Hls();
			hls.loadSource(url);
			hls.attachMedia(video);
			art.hls = hls;
			art.on('destroy', () => hls.destroy());
		} else if (video.canPlayType('application/vnd.apple.m3u8')) {
			video.src = url;
		} else {
			art.notice.show = 'Unsupported playback format: m3u8';
		}
	}
	function initPlayer() {
		if (!artplayer) {
			artplayer = new Artplayer({
				container: '.artplayer-container',
				url: episodeSources.filter((ep) => ep.default == true)[0].url,
				autoplay: false,
				pip: true,
				autoSize: true,
				setting: true,
				aspectRatio: true,
				fullscreen: true,
				playsInline: true,
				autoPlayback: true,
				airplay: true,
				theme: '#23ade5',
				type: 'm3u8',
				customType: {
					m3u8: playM3u8
				}
			});
		} else {
			artplayer.switchUrl(episodeSources.filter((ep) => ep.default == true)[0].url);
		}
	}

	onMount(() => {
		initPlayer();
	});

	afterUpdate(() => {
		initPlayer();
	});

	function handleUrlChange() {
		const newEpisode = $page.url.searchParams.get('episode');
		if (newEpisode !== currentEpisode) {
			currentEpisode = newEpisode;
			initPlayer();
		}
	}

	watch($page.url, handleUrlChange);
</script>

<div class="container">
	<div class="artplayer-container" />
	{#await streamed.episodesList}
        <!-- streamed. is pending -->
    {:then _}
    <div class="summary">
        <h1 class="anime-title">
            {currentEpisode}
        </h1>

        <h1 class="anime-title-native">{details.title.native}</h1>
        <p class="anime-des">
            {details.description}
        </p>
    </div>
    {:catch error}
        <!-- streamed. was rejected -->
    {/await}
</div>

{#await streamed.episodesList}
	Loading...
{:then value}
	{#if value}
		<EpisodeCard
			episodes={value.data}
			pagination={value.pagination}
			animeId={details.idMal}
			scrollAble={false}
			header={'Episodes'}
			filter={true}
			{page}
			posterImg={details.coverImage?.extraLarge}
		/>
	{/if}
{:catch error}
	{error.message}
{/await}

<style>
	.artplayer-container {
		width: 700px;
		height: 500px;
		aspect-ratio: 16/9;
	}
	.container {
		display: flex;
		flex-direction: row;
	}
</style>
