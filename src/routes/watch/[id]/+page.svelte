<script>
	import { onMount } from 'svelte';
    import Artplayer from 'artplayer';
	export let data;
	console.log(data);
	let artplayer;
	onMount(() => {
		artplayer = new Artplayer({
			container: '.artplayer-container',
			url: data.sources[4].url
		});
	});
</script>

<h1>Welcome to watch</h1>

<div class="artplayer-container">

</div>


<style>
    .artplayer-container {
    aspect-ratio: 16/9;
}
</style>