<script>
	export let data;
	const { popularAnimes, trendingAnimes, recentAiring, actionAdventureAnime } = data;
	import { CardsList, Trending } from '$lib/Components';
</script>

<!-- sort: [POPULARITY_DESC] -->
<Trending {trendingAnimes} />
<CardsList animes={popularAnimes} heading="Popular Animes" viewMore={true} reload={false} />
<CardsList animes={recentAiring} heading="Recent Episodes" viewMore={true} reload={false} />
<CardsList animes={actionAdventureAnime} heading="Trending Action and Adventure Animes" viewMore={true} reload={false} />
