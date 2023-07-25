<script>
	import { onMount } from 'svelte';
	import Artplayer from 'artplayer';
	import {EpisodeCard} from '$lib/components'
	
	export let data;
	const { details, episode, currentEpisode } = data;
	let artplayer;
	let episodeSources = [];
	let sourcesQuality = [];
	let defaultUrl;
	
	episode.sources.forEach((element) => {
		if (element.quality !== 'default' && element.quality !== 'backup') {
			episodeSources.push({
				url: element.url,
				html: element.quality,
				default: false
			});
			sourcesQuality.push(parseInt(element.quality.replace('p', '')));
		}
	});
	
	episodeSources.forEach((element) => {
		if (element.html == Math.max(...sourcesQuality) + 'p') {
			element.default = true;
			defaultUrl = element.url;
		}
	});
	
	onMount(() => {
		artplayer = new Artplayer({
			id: `${details.id}-${currentEpisode.number}`,
			title: `${currentEpisode.number} - ${currentEpisode.title}`,
			container: '.artplayer-container',
			url: defaultUrl,
			autoPlayback: true,
			pip: true,
			fullscreen: true,
			airplay: true,
			theme: '#23ade5',
			quality: episodeSources,
			autoMini: false,
			controls: [
				{
					position: 'right',
					html: 'Next Ep',
					index: 1,
					tooltip: 'Next Episode',
					style: { marginRight: '20px' },
					click: function () {
						console.info('You clicked on the custom control');
					}
				},
				{
					position: 'right',
					html: 'Previous Ep',
					index: 1,
					tooltip: 'Previous Episode',
					style: { marginRight: '20px' },
					click: function () {
						console.info('You clicked on the custom control');
					}
				}
			]
		});
	});
</script>

<main>
	<div class="video">
		<EpisodeCard episodes={details.episodes} animeId={details.id}/>
		<div class="artplayer-container"></div>

	</div>

	<div class="details">
		<div class="container-left">
			<h1>E{currentEpisode.number} - {currentEpisode.title}</h1>
			<div class="sub-dubBtn">
				<button class="logout-login-btn">SUB</button>
				<button class="logout-login-btn">DUB</button>
			</div>
			<p>{currentEpisode.description}</p>
		</div>
		<div class="container-right">
			<!-- <EpisodeCard episodes={details.episodes} animeId={details.id} /> -->
		</div>
	</div>
</main>

<style>
	* {
		color: white;
	}
	
	:root {
		--ep-card-width: 150px;
	}
	
	.video {
		display: flex;
		flex-direction: row;
	}
	.artplayer-container {
		aspect-ratio: 16/9;
		height: 500px;
	}
	
	
	.container-left {
		width: 80%;
	}
	.logout-login-btn {
		background: #1f80e0;
		height: 30px;
		padding: 0 20px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		font-weight: 500;
		font-size: 15px;
		/* margin: 0 10px; */
		cursor: pointer;
	}
	@media (max-width: 756px) {
		.artplayer-container {
		aspect-ratio: 16/9;
		height: max-content;
		widows: 1000px;
	}
	}
	
</style>
