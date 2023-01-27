<script>
	export let data;
	console.log(data.session);
	import { Trending, PosterCardList } from '$lib/components';
	const { trendingAnimes, popularAnimes } = data;
</script>

<Trending {trendingAnimes} />
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />

