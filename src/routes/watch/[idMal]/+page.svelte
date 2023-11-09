<script>
	import { onMount } from 'svelte';
	import Artplayer from 'artplayer';
	export let data;
	import { EpisodeCard } from '$lib/components';
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	$: ({ details, streamed, user, episodeSources } = data);
	let artplayer;
	let currentEpisode = $page.url.searchParams.get('episode');

	function initPlayer() {
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
			theme: '#23ade5'
		});
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

<h1>{details.title.english} - {currentEpisode}</h1>
<div class="artplayer-container" use:handleUrlChange />

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
		aspect-ratio: 16/9;
	}
</style>
