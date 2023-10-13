<script>
	export let data;
	console.log(data)
	const { trendingAnimes, popularAnimes, continueWatching } = data;
	import { PosterCardList, Trending, EpisodeCard } from '$lib/components';
</script>

<Trending {trendingAnimes} />
{#if continueWatching.authStore.isValid && continueWatching.list.length > 0}
	<EpisodeCard
		episodes={continueWatching.list}
		scrollAble={false}
		header={'Continue Watching'}
		filter={false}
	/>
{/if}
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />
<!-- {#if recentAiringAnimes.length > 0}
	<PosterCardList animes={recentAiringAnimes} heading={'Recent Airing'} dub={user?.alwaysDub} />
{/if} -->
