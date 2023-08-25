<script>
	export let data;
	const { trendingAnimes, popularAnimes, recentAiringAnimes } = data;
	import { PosterCardList, Trending } from '$lib/components';

</script>

<Trending {trendingAnimes} />
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />
<PosterCardList animes={recentAiringAnimes} heading={'Recent Airing'} />
