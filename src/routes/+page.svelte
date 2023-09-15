<script>
	export let data;
	const { trendingAnimes, popularAnimes, recentAiringAnimes,user } = data;
	import { PosterCardList, Trending, EpisodeCard } from '$lib/components';
	</script>

<Trending {trendingAnimes} />

<!-- {#if continueWatching.length > 0}
	<EpisodeCard
		episodes={continueWatching}
		scrollAble={false}
		header={'Continue Watching'}
		filter={false}
	/>
{/if} -->
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} dub={user?.alwaysDub} />
{#if recentAiringAnimes.length > 0}
	<PosterCardList animes={recentAiringAnimes} heading={'Recent Airing'} dub={user?.alwaysDub} />
{/if}

