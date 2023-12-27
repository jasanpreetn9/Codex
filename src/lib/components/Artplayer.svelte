<script>
	import { onMount, onDestroy } from 'svelte';
	import { Icon, ChevronRight, ChevronLeft } from 'svelte-hero-icons';

	import Hls from 'hls.js';
	import Artplayer from 'artplayer';

	// Destructuring the necessary properties from data
	export let sources;
	export let continueWatching;
	export let currentEp;
	export let details;
	export let episodeId;
	let artplayer;

	// Function to handle HLS streaming
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

	// Function to initialize the Artplayer
	async function initPlayer() {
		artplayer = new Artplayer({
			container: '.artplayer-container',
			url: sources?.filter((ep) => ep.default == true)[0]?.url,
			id: `${details.idMal}-${currentEp.number}`,
			quality: sources,
			autoPlayback: true,
			autoplay: true,
			autoOrientation: true,
			pip: true,
			hotkey: true,
			autoSize: true,
			fullscreen: true,
			playsInline: true,
			airplay: true,
			theme: '#23ade5',
			type: 'm3u8',
			customType: {
				m3u8: playM3u8
			}
		});

		// Event listener to update the playback position
		artplayer.on('ready', () => {
			console.info(artplayer.currentTime);
			if (continueWatching) {
				artplayer.currentTime = continueWatching.currentTime;
				artplayer.seek = continueWatching.currentTime;
			}
			console.info(artplayer.currentTime);
		});
		artplayer.on('video:playing', async () => {
			console.info(artplayer.currentTime);
			if (!continueWatching) {
				const resp = await fetch('/database/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						duration: artplayer.duration,
						idMal: details.idMal,
						continueWatching,
						currentEp,
						episodeId
					})
				});

				const respData = await resp.json();
				continueWatching = respData.record;
			}
			setInterval(async () => {
				if (artplayer.playing) {
					const resp = await updatePlaybackPosition({
						currentTime: Math.round(artplayer.currentTime),
						duration: artplayer.duration,
						idMal: details.idMal,
						continueWatching,
						currentEp,
						episodeId
					});
				}
			}, 2000);
		});
	}
	async function updatePlaybackPosition(data) {
		try {
			// Replace with your API endpoint and payload
			const resp = await fetch('/database/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			return await resp.json();
		} catch (error) {
			console.error('Failed to update playback position', error);
		}
	}
	// Reactive statement to update the video URL when sources changes
	$: if (sources && artplayer) {
		artplayer.switchUrl(sources.filter((ep) => ep.default == true)[0]?.url);
	}

	onMount(() => {
		initPlayer();
	});
	// Lifecycle hook for component destruction
	onDestroy(() => {
		if (artplayer) {
			artplayer.destroy();
		}
	});
</script>

<div class="artplayer-container" />

<style>
	.artplayer-container {
		width: 100%;
		/* height: 400px; */
		aspect-ratio: 16/9;
	}
</style>
