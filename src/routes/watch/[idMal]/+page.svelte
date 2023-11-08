<script>
	export let data;
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Artplayer from 'artplayer';
	import { EpisodeCard, PosterCardList, GradientBackground } from '$lib/components';
	// const { animeList, details, continueWatching, episodesList, user, episodesSources } = data;
	const currentEpisodeNum = $page.url.searchParams.get('episode') || 1;
	$: ({ animeList, details, continueWatching, streamed, user,episodesSources } = data);
	const episodeId = $page.url.searchParams.get('episodeId');
	const currentEpisodeObject = $streamed?.episodesList.data.find((element) => {
		return element.number === parseInt(currentEpisodeNum);
	});
	let url;
	$: episodesSources.forEach((element) => {
		if (element.default) {
			url = element.url;
		}
	});
	onMount(() => {
		const art = new Artplayer({
			container: '.artplayer-app',
			url: url,
			volume: 0.5,
			autoplay: true,
			pip: true,
			autoSize: true,
			setting: true,
			fullscreen: true,
			subtitleOffset: true,
			airplay: true,
			theme: '#23ade5',
			quality: episodesSources
		});
	});
</script>

<h1>{`${$currentEpisodeObject.number}: ${$currentEpisodeObject.title} : ${episodeId.includes("dub") ? "dub" : "sub"}`}</h1>
<div class="artplayer-app" />

<a href={`/watch/${details.idMal}?episode=${$currentEpisodeObject.number}&episodeId=${$currentEpisodeObject.episodeIdSub}`}>Sub Link</a>
{#if $currentEpisodeObject.hasDub}
	<a href={`/watch/${details.idMal}?episode=${$currentEpisodeObject.number}&episodeId=${$currentEpisodeObject.episodeIdDub}`}>Dub Link</a>
{/if}

<!-- <GradientBackground bannerImage={details.bannerImage}> 
	<h1>Watch Page</h1>
	{#if details.format?.toLowerCase() !== 'movie'}
				{#await streamed.episodesList}
					Loading...
				{:then value}
					<EpisodeCard
						episodes={value.data}
						pagination={value.pagination}
						animeId={details.idMal}
						scrollAble={true}
						header={'Episodes'}
						filter={true}
						{page}
						posterImg={details.coverImage?.extraLarge}
					/>
				{:catch error}
					{error.message}
				{/await}
			{/if}
</GradientBackground> -->

<style>
	.artplayer-app {
		width: 800px;
		height: 600px;
	}
</style>
