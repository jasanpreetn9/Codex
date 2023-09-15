<script>
	export let episodes, animeId, scrollAble, header, filter;
	import { filterIcon } from '$lib/utils';
	function reverseEpisodes() {
		episodes = episodes.slice().reverse();
	}
	let filterState = false;
	function toggleFilter() {
		filterState = !filterState;
		reverseEpisodes();
	}
</script>

<div class="header">
	<h1 class="title">{header}</h1>
	<div class="right-container">
		<div class="switch-block" />
		{#if filter}
			<button class="filter" on:click={toggleFilter}>
				<img style={filterState ? 'transform: scaleY(-1);' : ''} src={filterIcon} alt="Filter" />
			</button>
		{/if}
	</div>
</div>

<div class={scrollAble ? 'scrollAble' : ''}>
	<div class="video-card-container">
		{#each episodes as episode}
			<div class="video-card">
				<a
					href={`/watch/${animeId ?? episode.animeId}?episode=${episode.number}`}
					data-sveltekit-prefetch="true"
				>
					<img src={episode.image} alt="" />
					{#if episode.duration}
						<div class="progress-background">
							<div class="progress" style="width: {(12 / 24) * 100}%;" />
						</div>
					{/if}

					<div class="title-container">
						<h2 class="name">
							{episode.title}
						</h2>
						<p class="episode-number">
							Ep: {episode.number}
						</p>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style>
	a {
		text-decoration: none;
	}
	.scrollAble {
		overflow-y: auto;
		max-height: 400px;
	}
	.header {
		display: flex;
	}
	.title {
		margin-top: 10px;
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 19px;
		font-weight: 500;
		margin-bottom: 3px;
	}
	.title-container {
		padding-bottom: 15px; /* Add padding to the bottom */
	}
	.right-container {
		display: flex;
		margin-left: auto;
	}
	.switch-block {
		width: 300px;
	}

	.filter img {
		height: 20px;
	}
	.filter {
		cursor: pointer;
		background-color: transparent;
		border: none;
		display: flex;
		padding-top: 13px;
	}

	.video-card-container {
		display: grid;
		gap: 0.6em;
		grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
	}
	.video-card {
		position: relative;
		width: 100%;
		border-radius: 5px;
		aspect-ratio: 16/9;
	}
	.video-card img {
		width: 100%;
		border-radius: 5px;
	}

	.name {
		color: #fff;
		font-size: 15px;
		font-weight: 500;
		text-transform: capitalize;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		padding-bottom: 1px;
		background: #0c111b;
	}
	.episode-number {
		color: rgb(194, 194, 194);
		font-size: 12px;
		font-weight: 300;
		text-transform: capitalize;
		padding: 1px;
		background: #0c111b;
	}
	.progress-background {
		z-index: 2;
		height: 4px;
		background: #424345;
		border-radius: 20px;
	}
	.progress {
		height: 4px;
		margin-top: -1px;
		/* background: #ad3535; */
		background: white;
		border-radius: 20px;
	}
</style>
