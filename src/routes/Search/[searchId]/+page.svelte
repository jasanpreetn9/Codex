<script>
	export let data;
	import PosterCard from '../../../lib/Components/PosterCard.svelte';
	const { searchAnime, searchId } = data;
</script>

<h1 class="title">Search Results For: <i>{searchId}</i></h1>
<div class="cards-list">
	<div class="card-container">
		{#each searchAnime as anime}
			<PosterCard {anime} reload={false} />
		{/each}
	</div>
</div>

<style>
	.title {
		color: #fff;
		opacity: 0.9;
		padding-left: 4%;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
		padding-top: 90px;
	}

	.cards-list {
		width: 100%;
		height: max-content;
		position: relative;
		margin: 10px 0 20px;
	}

	.card-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		grid-column-gap: 0.6rem;
		grid-row-gap: 2rem;
		position: relative;
		width: 92%;
		padding-left: 10px;
		height: max-content;
		margin: 0 auto;
		margin-bottom: 10px;
		align-items: center;
		justify-content: center;
	}
</style>
