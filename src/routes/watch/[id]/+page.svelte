<script>
	import { onMount } from 'svelte';
	import Artplayer from 'artplayer';
	export let data;
	let artplayer;
	onMount(() => {
		artplayer = new Artplayer({
			container: '.artplayer-container',
			url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
			autoPlayback: true
		});
	});
</script>
<h1>{data.respData.title.english}</h1>
<main>
	<div class="episodesList">
		{#each data.respData.episodes as episode, index}
		<div class="episodeCard">
			<p>{`${episode.number}: ${episode.title}`}</p>
		</div>
		{/each}
	</div>
	<div class="artplayer-container" />
</main>


<style>
	* {
		color: white;
	}
	main {
		display: flex;
		flex-direction: row;
	}
	.episodesList {
		height: 500px;
		overflow-x: auto;
		overflow-y: visible;
	}
	.episodeCard{
		/* background-color: grey; */
		padding: 4px;
		border: 1px solid white;
	}
	.artplayer-container {
		aspect-ratio: 16/9;
		height: 500px;
	}
</style>
