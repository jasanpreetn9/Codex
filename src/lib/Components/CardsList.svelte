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
		padding-top: 15px;
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
		margin-top: 20px;
	}
	.cards-list {
		width: 100%;
		height: 220px;
		position: relative;
		height: max-content;
	}

	.card-container {
		position: relative;
		width: 92%;
		padding-left: 10px;
		height: 220px;
		display: flex;
		margin: 0 auto;
		align-items: center;
		overflow-x: auto;
		overflow-y: visible;
		scroll-behavior: smooth;
	}

	.card-container::-webkit-scrollbar {
		display: none;
		/* width: 5px; */
	}
</style>
