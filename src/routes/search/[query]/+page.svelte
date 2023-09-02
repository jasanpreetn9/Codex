<script>
	export let data;
	const { results,page,params } = data;
	console.log(results)
	import { PosterCardList } from '$lib/components';

</script>

<h1 class="title">Search Results For: <i>{params}</i></h1>
<PosterCardList animes={results} />

<style>
	.title {
		margin-top: 10px;
		color: #fff;
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
		margin-bottom: 10px;
	}
	</style>
