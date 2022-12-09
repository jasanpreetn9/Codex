<script>
	export let animes, heading, viewMore, reload;
	import PosterCard from './PosterCard.svelte';
</script>

<div class="header">
	<h1 class="title">{heading}</h1>
	{#if viewMore}
		<a href={'/ViewMore/' + heading} class="viewmore">View More</a>
	{/if}
</div>
<div class="cards-list">
	<div class="card-container">
		{#each animes as anime}
			<PosterCard {anime} {reload} />
		{/each}
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.title {
		margin-top: 10px;
		color: #fff;
		opacity: 0.9;
		padding-left: 4%;
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
		width: max-content;
	}
	.cards-list {
		width: 100%;
		position: relative;
	}

	.card-container {
		position: relative;
		width: 92%;
		height: 270px;
		display: flex;
		margin: 0 auto;
		overflow: hidden;
		overflow-x: auto;
		overflow-y: visible;
		scroll-behavior: smooth;
	}

	.card-container::-webkit-scrollbar {
		/* display: none; */
		height: 5px;
	}
</style>
