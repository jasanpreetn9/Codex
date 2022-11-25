<script>
	export let data;
	const { popularAnimes, trendingAnimes, recentAiring, actionAnime, adventureAnime } = data;
	import { CardsList, Trending } from '$lib/Components';
</script>

<!-- sort: [POPULARITY_DESC] -->
<Trending {trendingAnimes} />
<CardsList animes={popularAnimes} heading="Popular Animes" viewMore={true} reload={false} />
<CardsList animes={recentAiring} heading="Recent Episodes" viewMore={true} reload={false} />
<CardsList animes={actionAnime} heading="Trending Action Animes" viewMore={true} reload={false} />
<CardsList animes={adventureAnime} heading="Trending Adventure Animes" viewMore={true} reload={false} />
