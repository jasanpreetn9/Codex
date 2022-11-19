<script>
	export let animes, heading;
	import PosterCard from './PosterCard.svelte';
</script>

{#if animes.length > 0}
		<h1 class="title">{heading}</h1>
	<div class="cards-list">
		<div class="card-container">
			{#each animes as anime}
				<PosterCard {anime} />
			{/each}
		</div>
	</div>
{/if}

<style>
	.title {
		color: #fff;
		opacity: 0.9;
		padding-left: 4%;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
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
