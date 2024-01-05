<!-- <script>
	import { onMount, onDestroy } from 'svelte';

	import Hls from 'hls.js';
	import Artplayer from 'artplayer';

	// Destructuring the necessary properties from data
	export let sources;
	export let continueWatching;
	export let currentEp;
	export let details;
	export let episodeId;
	let artplayer;
	const chevronLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>`;
	const chevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>`;
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
			},
			controls: [
				{
					position: 'right',
					html: chevronRight,
					index: 1,
					tooltip: 'Next Episode',
					style: {
						marginRight: '10px'
					},
					click: function () {
						console.info('You clicked on the custom control');
					}
				},
				{
					position: 'right',
					html: chevronLeft,
					index: 1,
					tooltip: 'Previous Episode',
					style: {
						marginRight: '0px'
					},
					click: function () {
						console.info('You clicked on the custom control');
					}
				}
			]
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
					await updatePlaybackPosition({
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
</script> -->

<script>
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import Hls from 'hls.js';
	import Artplayer from 'artplayer';
	export let sources, continueWatching, currentEp, details, episodeId, episodes, user;

	let artplayer;
	let intervalId;
	const chevronLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>`;
	const chevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>`;

	async function initPlayer() {
		const defaultSource = sources?.find((ep) => ep.default)?.url;
		artplayer = new Artplayer({
			container: '.artplayer-container',
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
			url: defaultSource,
			customType: { m3u8: playM3u8 },
			controls: createControls()
		});
		handlePlayerReady()
		// artplayer.on('canplay', handlePlayerReady);
		artplayer.on('video:playing', handleVideoPlaying);
	}

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

	function createControls() {
		const controls = [];
		let maxEpisodeNumber = Math.max(...episodes.map((episode) => episode.number));

		if (currentEp.number < maxEpisodeNumber) {
			controls.push({
				html: chevronRight,
				position: 'right',
				index: 1,
				tooltip: 'Next Episode',
				click: function () {
					const nextEp = episodes.find((episode) => episode.number === currentEp.number + 1);
					if (user && user.alwaysDub && nextEp.hasDub) {
						goto(`/watch/${details.idMal}/${nextEp.gogoanime.dub}`);
					} else {
						goto(`/watch/${details.idMal}/${nextEp.gogoanime.sub}`);
					}
				}
			});
		}
		if (currentEp.number > 1) {
			controls.push({
				html: chevronLeft,
				position: 'right',
				index: 1,
				tooltip: 'Previous Episode',
				click: function () {
					const prevEp = episodes.find((episode) => episode.number === currentEp.number - 1);
					if (user && user.alwaysDub && prevEp.hasDub) {
						goto(`/watch/${details.idMal}/${prevEp.gogoanime.dub}`);
					} else {
						goto(`/watch/${details.idMal}/${prevEp.gogoanime.sub}`);
					}
				}
			});
		}
		return controls;
	}

	function handlePlayerReady() {
        if (continueWatching) {
			console.log("Attempting to set current time to: ", continueWatching.currentTime);
            artplayer.currentTime = continueWatching.currentTime;
            console.log("Current time after setting: ", artplayer.currentTime);
		}
	}
	async function handleVideoPlaying() {
		intervalId = setInterval(async () => {
			if (artplayer.playing) {
				try {
					await fetch('/database/update', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							currentTime: Math.round(artplayer.currentTime),
							duration: artplayer.duration,
							idMal: details.idMal,
							continueWatching,
							currentEp,
							episodeId
						})
					});
				} catch (error) {
					console.error('Failed to update playback position', error);
				}
			}
		}, 2000);
	}
	// $: if (sources && artplayer) {
	// 	artplayer.switchUrl(sources.find((ep) => ep.default)?.url);
	// }

	onMount(initPlayer);
	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
		if (artplayer) artplayer.destroy();
	});
</script>

<div class="artplayer-container" />

<style>
	.artplayer-container {
		width: 100%;
		aspect-ratio: 16/9;
	}
</style>
