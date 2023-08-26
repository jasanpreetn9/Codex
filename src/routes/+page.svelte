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

<Trending {trendingAnimes} />
<EpisodeCard episodes={continueWatching} scrollAble={false} />
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />
<PosterCardList animes={recentAiringAnimes} heading={'Recent Airing'} />
