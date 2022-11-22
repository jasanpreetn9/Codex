<script>
	export let data;
	const { popularAnimes, trendingAnimes, recentAiring } = data;
	import { CardsList, Trending} from '$lib/Components';
</script>

<Trending {trendingAnimes} />

<!-- sort: [POPULARITY_DESC] -->
<CardsList animes={popularAnimes} heading="Popular Animes" viewMore={true} reload={false} />
<CardsList animes={recentAiring} heading="Recent Episodes" viewMore={true} reload={false} />
