<script>
	export let data;
	const { currentPage, animes, params } = data;
	import PosterCard from '../../../Components/PosterCard.svelte';
	function rerunLoadFunction() {
		invalidate('app:ViewMore');
		invalidate('/ViewMore');
		invalidateAll();
	}
</script>

<h1 class="title">Page: {currentPage}</h1>
<div class="cards-list">
	<div class="card-container">
		{#each animes as anime}
			<PosterCard {anime} reload={false} />
		{/each}
	</div>
</div>
<div class="pages">
	{#if currentPage > 1}
		<a
			href={`/ViewMore/${params}-page=${currentPage - 1}`}
			on:click={rerunLoadFunction()}
			class="previous">&laquo;</a
		>
	{/if}
	<a
		href={`/ViewMore/${params}-page=${currentPage + 1}`}
		on:click={rerunLoadFunction()}
		class="next">&raquo;</a
	>
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
		height: 100%;
		margin: 10px 0 20px;
	}

	.card-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		grid-column-gap: 0.6rem;
		grid-row-gap: 2rem;
		width: 92%;
		padding-left: 10px;
		margin: 0 auto;
		margin-bottom: 10px;
		align-items: center;
		justify-content: center;
	}
	.pages {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	a {
		text-decoration: none;
		display: inline-block;
		padding: 8px 16px;
	}

	a:hover {
		background-color: #ddd;
		color: black;
	}

	.previous {
		background-color: #123456;
		color: black;
		border-radius: 100%;
	}

	.next {
		background-color: #04aa6d;
		color: white;
		border-radius: 100%;
	}
</style>
