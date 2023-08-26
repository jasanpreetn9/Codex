<script>
	export let data;
	const { trendingAnimes, popularAnimes, recentAiringAnimes } = data;
	import { PosterCardList, Trending,EpisodeCard } from '$lib/components';
	let continueWatching;
		if (!import.meta.env.SSR) {
			// get local storage
			let object = localStorage.getItem('continueWatching');
			if (object) {
				continueWatching = JSON.parse(object);
			}
		}
</script>
{#if continueWatching.length > 0}
	 <Trending {trendingAnimes} />
{/if}
<EpisodeCard episodes={continueWatching} scrollAble={false} header={"Continue Watching"}/>
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />
<PosterCardList animes={recentAiringAnimes} heading={'Recent Airing'} />
