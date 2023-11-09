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
        console.log(details)
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
<div class="container">
    <div class="artplayer-container" use:handleUrlChange />
    <div class="summary">
        <h1 class="anime-title">
            {details.title.english?.toLowerCase() ?? details.title.native?.toLowerCase()}
        </h1>

        <h1 class="anime-title-native">{details.title.native}</h1>
        <p class="anime-des">
            {details.description}
        </p>
    </div>
</div>

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
    .container {
        display: flex;
        flex-direction: row;
    }
</style>
