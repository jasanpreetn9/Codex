<script>
	export let animes, heading, viewMore;
	import PosterCard from './PosterCard.svelte';
	console.log(animes.length);
</script>

{#if animes.length > 0}
	<div class="header">
		<h1 class="title">{heading}</h1>
		{#if viewMore}
			<a href={'/ViewMore/' + heading} class="view-more">View More</a>
		{/if}
	</div>
	<div class="cards-list">
		<div class="card-container">
			{#each animes as anime}
				<PosterCard {anime} />
			{/each}
		</div>
	</div>
{/if}

<style>
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.title {
		color: #fff;
		opacity: 0.9;
		padding-left: 4%;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
	}
	.view-more {
		padding-right: 4%;
		text-decoration: none;
		color: white;
	}
	.cards-list {
		width: 100%;
		height: 220px;
		position: relative;
		margin: 10px 0 20px;
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
	}
</style>
