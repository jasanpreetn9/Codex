<script>
	import { onMount } from 'svelte';
	import Hls from 'hls.js';
	import Artplayer from 'artplayer';
	export let data;
	import { EpisodeCard, GradientBackground } from '$lib/components';
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	$: ({ details, streamed, episodeSources } = data);
	let artplayer;
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
				quality: episodeSources,
				autoplay: true,
				pip: true,
				autoSize: true,
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
		}
	}

	onMount(() => {
		initPlayer();
	});

	afterUpdate(() => {
		initPlayer();
	});
	function handleUrlChange(node) {
		return {
			update() {
				const newEpisode = $page.url.searchParams.get('episode');
				if (newEpisode !== currentEpisode) {
					currentEpisode = newEpisode;
					initPlayer();
				}
			}
		};
	}
</script>

<GradientBackground bannerImage={details.bannerImage}>
	<div class="container">
		<div class="container-top">
			<div class="artplayer-container" use:handleUrlChange />
			{#await streamed.episodesList then { currentEpisode }}
				<div class="summary">
					<h1 class="anime-title">
						{details.title.english?.toLowerCase() ?? details.title.native?.toLowerCase()}
					</h1>

					<h1 class="anime-title-native">{currentEpisode.number}: {currentEpisode.title}</h1>
					<p class="anime-des">
						{details.description}
					</p>
				</div>
			{/await}
		</div>
		<div class="container-bottom">
			{#await streamed.episodesList}
				Loading...
			{:then { episodes }}
				{#if episodes}
					<EpisodeCard
						episodes={episodes.data}
						pagination={episodes.pagination}
						animeId={details.idMal}
						scrollAble={true}
						header={'Episodes'}
						filter={true}
						{page}
						posterImg={details.coverImage?.extraLarge}
					/>
				{/if}
			{:catch error}
				{error.message}
			{/await}
		</div>
	</div>
</GradientBackground>

<style>
	.artplayer-container {
		width: 700px;
		height: 500px;
		aspect-ratio: 16/9;
	}
	.container {
		margin-left: 40px;
	}
	.container-top {
		display: flex;
		flex-direction: row;
	}
	.summary {
		margin-left: 30px;
	}
	.anime-title {
		text-transform: capitalize;
		margin-top: 80px;
		font-weight: 550;
		font-size: 26px;
	}
	.anime-title-native {
		font-size: 18px;
		font-weight: 400;
	}
	.anime-des {
		width: 94%;
		line-height: 22px;
		margin-top: 15px;
		opacity: 0.8;
		font-size: 14px;
		margin-bottom: 15px;
	}
</style>
