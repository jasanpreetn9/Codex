<script>
	export let data;
	import { Trending } from '$lib/components';
	const { trendingAnimes} = data;

</script>

<h1>Welcome to Codex home page.</h1>
<Trending {trendingAnimes} />

<style>
	h1 {
		color: white;
		text-decoration: none;
	}
</style>
