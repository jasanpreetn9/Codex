<script>
	export let data;
	import { CardsList, Trending } from '$lib/Components';
	const { trendingAnimes, popularAnimes, recentAiring, actionAdventure } = data;
</script>

<!-- sort: [POPULARITY_DESC] -->
<Trending {trendingAnimes} />
<CardsList animes={popularAnimes} heading="Popular Animes" viewMore={true} reload={false} />
<CardsList animes={recentAiring} heading="Recent Episodes" viewMore={true} reload={false} />
<CardsList animes={actionAdventure} heading="Action & Adventure" viewMore={true} reload={false} />
