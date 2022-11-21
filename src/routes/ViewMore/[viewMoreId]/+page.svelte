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
			class="page">❮</a
		>
	{/if}
	<a
		on:click={rerunLoadFunction()}
		href={`/ViewMore/${params}-page=${currentPage + 1}`}
		class="page">❯</a
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

	.page {
		color: white;
		float: left;
		padding: 8px 16px;
		text-decoration: none;
		transition: background-color 0.3s;
		border: 1px solid #ddd;
	}
	.page:hover {
		background-color: #4caf50;
		color: white;
		border: 1px solid #4caf50;
	}
</style>
