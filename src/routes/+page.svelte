<script>
	export let data;
	const { anilist } = data;
	const { trendingAnimes, popularAnimes } = anilist;
	import { PosterCardList, Trending } from '$lib/components';
</script>

<Trending {trendingAnimes} />
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />
