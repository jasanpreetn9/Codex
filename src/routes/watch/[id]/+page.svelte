<script>
	import { onMount } from 'svelte';
	import Artplayer from 'artplayer';
	export let data;
	console.log(data.respData)
	let artplayer;
	// onMount(() => {
	// 	artplayer = new Artplayer({
	// 		container: '.artplayer-container',
	// 		url: respDataWatch.sources[4].url,
	// 		autoPlayback: true
	// 	});
	// });
</script>

<h1>Welcome to watch</h1>
<h1>{data.respData.title.english}</h1>
{#each data.respData.episodes as episode, index}
	 <p>{`${episode.number}: ${episode.title}`}</p>
{/each}

<div class="artplayer-container" />

<style>
	.artplayer-container {
		aspect-ratio: 16/9;
		width: 1000px;
	}
	*{
		color: white;
	}
</style>
