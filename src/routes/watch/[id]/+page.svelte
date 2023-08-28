<script>
	export let data;
	const { details, episodeSources, currentEpisodeDetail } = data;
	import Artplayer from 'artplayer';
	import { onMount } from 'svelte';
	import { EpisodeCard } from '$lib/components';
	import { pre, nxt } from '$lib';
console.log(episodeSources)
	let continueWatching = [];

	const storedData = localStorage.getItem('continueWatching');
	if (storedData) {
		continueWatching = JSON.parse(storedData);
	}

	let currentWatchingIndex = continueWatching.findIndex(
		(item) => item.animeId === parseInt(details.id)
	);
	if (currentWatchingIndex < 0) {
		continueWatching.push(currentEpisodeDetail);
		currentWatchingIndex = continueWatching.length - 1;
	}
	continueWatching[currentWatchingIndex].animeTitle = details.title.english;
	continueWatching[currentWatchingIndex].animeId = details.id;

	let artplayer;
	onMount(() => {
		artplayer = new Artplayer({
			id: `${details.id}-${currentEpisodeDetail.number}`,
			title: `${currentEpisodeDetail.number} - ${currentEpisodeDetail.title}`,
			container: '.artplayer-container',
			// autoPlayback: true,
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
					html: `<a href="/"><img width="10" src="${pre}"></a>`,
					index: 1,
					tooltip: 'Previous Episode',
					style: { marginRight: '5px' },
					click: function () {
						console.info('You clicked on the previous control');
					}
				}
			]
		});
		artplayer.on('start', () => {
			artplayer.currentTime = continueWatching[currentWatchingIndex].currentTime;
		});
	});

	setInterval(function () {
		if (artplayer.playing) {
			// console.log('Current Time: ' + Math.floor(artplayer.currentTime));
			continueWatching[currentWatchingIndex].duration = artplayer.duration;
			continueWatching[currentWatchingIndex].currentTime = Math.floor(artplayer.currentTime);
			localStorage.setItem('continueWatching', JSON.stringify(continueWatching));
		}
	}, 1000);
</script>

<main>
	<div class="video">
		<div class="artplayer-container" />
	</div>

	<div class="details">
		<div class="container-left">
			<div class="details">
				<h1 class="title">E{currentEpisodeDetail.number} - {currentEpisodeDetail.title}</h1>
				<div class="sub-dubBtn">
					<a
						href={'/watch/' +
							details.id +
							'?episode=' +
							(currentEpisodeDetail.number + 1) +
							'&dub=true'}
						class="subDub-btn">SUB</a
					>
					<a
						href={'/watch/' +
							details.id +
							'?episode=' +
							(currentEpisodeDetail.number + 1) +
							'&dub=false'}
						class="subDub-btn">DUB</a
					>
				</div>
			</div>

			<p class="description">{currentEpisodeDetail.description}</p>
			<EpisodeCard
				episodes={details.episodes}
				animeId={details.id}
				scrollable={true}
				filter={true}
				header={'Episodes'}
			/>
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
	/* .description {
	} */
	.title {
		display: flex;
		justify-content: center;
	}

	.video {
		flex-direction: row;
		width: 100%;
	}
	.artplayer-container {
		aspect-ratio: 16/9;
		/* height: 500px; */
	}
	.details {
		display: flex;
		flex-direction: columns;
		justify-content: center;
		gap: 20px;
		padding: 20px;
	}

	.subDub-btn {
		background: #1f80e0;
		padding: 10px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		margin: 0 10px;
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
