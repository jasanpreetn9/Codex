<script>
	import { onMount } from 'svelte';
	import Artplayer from 'artplayer';
	import { EpisodeCard, pre, nxt } from '$lib/components';
	export let data;
	const { details, episodeSources, currentEpisodeDetail } = data;
	let artplayer;

	onMount(() => {
		artplayer = new Artplayer({
			id: `${details.id}-${currentEpisodeDetail.number}`,
			title: `${currentEpisodeDetail.number} - ${currentEpisodeDetail.title}`,
			container: '.artplayer-container',
			autoPlayback: true,
			pip: true,
			fullscreen: true,
			airplay: true,
			theme: '#23ade5',
			quality: episodeSources,
			autoMini: false,
			hotkey: true,
			controls: [
				{
					position: 'right',
					html: `<img width="10" src="${nxt}">`,
					index: 1,
					tooltip: 'Next Episode',
					style: { marginRight: '5px' },
					click: function () {
						console.info('You clicked on the next control');
					}
				},
				{
					position: 'right',
					html: `<img width="10" src="${pre}">`,
					index: 1,
					tooltip: 'Previous Episode',
					style: { marginRight: '5px' },
					click: function () {
						console.info('You clicked on the previous control');
					}
				}
			]
		});
		// artplayer.on('video:timeupdate', () => {
		// 	console.info(artplayer.played);
		// });
	});
	// setInterval(function () {
	// 	let storedValue = localStorage.getItem('artplayer_settings');
	// 	console.log(storedValue);
	// }, 3000);
</script>

<main>
	<div class="video">
		<div class="artplayer-container" />
	</div>

	<div class="details">
		<div class="container-left">
			<div class="detailmeta">
				<h1 class="title">E{currentEpisodeDetail.number} - {currentEpisodeDetail.title}</h1>
				<div class="sub-dubBtn">
					<button class="logout-login-btn">SUB</button>
					<button class="logout-login-btn">DUB</button>
				</div>
			</div>

			<p class="description">{currentEpisodeDetail.description}</p>
			<EpisodeCard episodes={details.episodes} animeId={details.id} />
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
	.description {
	}
	.title {
		display: flex;
		justify-content: center;
	}

	.video {
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	.detailmeta {
		display: flex;
		justify-content: center;
		gap: 20px;
		padding: 20px;
	}
	.artplayer-container {
		aspect-ratio: 16/9;
		height: 500px;
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
		margin-top: 2px;
	}
	@media (max-width: 756px) {
		.artplayer-container {
			aspect-ratio: 16/9;
			height: max-content;
			widows: 1000px;
		}
	}
</style>
