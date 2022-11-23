<script>
	export let animes, heading, viewMore, reLoad;
	import PosterCard from './PosterCard.svelte';
</script>

<!-- {#if animes.length > 0} -->
<div class="header">
	<h1 class="title">{heading}</h1>
	{#if viewMore}
		<a href={'/ViewMore/' + heading} class="viewmore">View More</a>
	{/if}
</div>

<div class="cards-list">
	<div class="card-container">
		{#each animes as anime}
			<PosterCard {anime} {reLoad} />
		{/each}
	</div>
</div>

<!-- {/if} -->
<style>
	.header {
		display: flex;
		justify-content: space-between;
	}
	.title {
		color: #fff;
		opacity: 0.9;
		padding-left: 5%;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
	}
	.viewmore {
		color: white;
		text-decoration: none;
		padding-right: 4%;
		font-weight: 500;
		padding-bottom: -40%;
	}
	.cards-list {
		width: 100%;
		height: max-content;
		position: relative;
		height: max-content;
	}

	.card-container {
		position: relative;
		width: 92%;
		padding-left: 10px;
		height: max-content;
		display: flex;
		margin: 0 auto;
		align-items: center;
		overflow-x: auto;
		overflow-y: visible;
		scroll-behavior: smooth;
	}

	.card-container::-webkit-scrollbar {
		display: none;
	}
</style>
