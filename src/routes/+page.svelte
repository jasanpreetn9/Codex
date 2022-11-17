<script>
	export let data;
	const { popularAnimes, trendingAnimes, recentAiring} = data;
	import CardsList from '../Components/CardsList.svelte';
	import Trending from '../Components/Trending.svelte';
</script>
<Trending {trendingAnimes} />
<CardsList animes={popularAnimes} heading='Popular Animes'/>
<CardsList animes={recentAiring} heading='Recent Airing Animes'/>
