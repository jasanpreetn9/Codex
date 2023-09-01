<script>
	export let data;
	const { trendingAnimes, popularAnimes, recentAiringAnimes } = data;
	import { PosterCardList, Trending, EpisodeCard } from '$lib/components';
	let continueWatching;
	if (!import.meta.env.SSR) {
		// get local storage
		let object = localStorage.getItem('continueWatching');
		if (object) {
			continueWatching = JSON.parse(object);
		}
	}
</script>

<Trending {trendingAnimes} />

{#if continueWatching.length > 0}
	<EpisodeCard
		episodes={continueWatching}
		scrollAble={false}
		header={'Continue Watching'}
		filter={false}
	/>
{/if}
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />
<PosterCardList animes={recentAiringAnimes} heading={'Recent Airing'} />

