<script>
	export let data;
	import { Trending, PosterCardList, EpisodeCard } from '$lib/components';
	const { trendingAnimes, popularAnimes, recentAiringAnimes } = data;
</script>

<Trending {trendingAnimes} />
{#if data.session}
	 <EpisodeCard />
{/if}
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />
<PosterCardList animes={recentAiringAnimes} heading={'Recent Airing'} />
