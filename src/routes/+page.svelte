<script>
	export let data;
	import { Trending, PosterCardList } from '$lib/components';
	const { trendingAnimes, popularAnimes, recentAiringAnimes } = data;
</script>

<Trending {trendingAnimes} />
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />
<PosterCardList animes={recentAiringAnimes} heading={'Recent Airing'} />
