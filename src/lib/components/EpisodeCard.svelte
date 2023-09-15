<script>
	export let episodes, animeId, scrollAble, header, filter;
	import { filterIcon } from '$lib/utils';
	import { formatTime } from '$lib/utils';
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
					<div
						class="card-body"
						style="background: linear-gradient(rgba(4, 8, 15, 0) 27.31%, #192133f8 97.9%), no-repeat center/cover url({episode.image})"
					>
						{#if episode.duration}
							<div class="progress-background">
								<div
									class="progress"
									style="width: {(episode.currentTime / episode.duration) * 100}%;"
								/>
							</div>
							<div class="progress-duration-container">
								<span class="progress-duration"
									>{formatTime(episode.currentTime) || '--:--'} / {formatTime(episode.duration) ||
										'--:--'}</span
								>
							</div>
						{/if}
					</div>
				</a>
				<!-- Create a container for title and number under the card -->
				<div class="title-container">
					<h2 class="name">
						{episode.title}
					</h2>
					<p class="episode-number">
						E{episode.number}
					</p>
				</div>
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
		margin-top: 10px;
		height: 100%;
		width: 100%;
		border-radius: 5px;
		background: #030b17;
		aspect-ratio: 16/9;
		padding-bottom: 1px;
		margin-bottom: 10px;
	}

	.card-body {
		width: 100%;
		height: 80%;
		padding: 20px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
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
		height: 4px;
		margin-top: 10px;
		padding-top: 1px;
		background: #424345;
		border-radius: 20px;
	}
	.progress {
		height: 4px;
		margin-top: -1px;
		background: #ad3535;
		border-radius: 20px;
	}

	.progress-duration-container {
		display: flex;
		justify-content: flex-end;
		padding-top: 5px;
	}

	.progress-duration {
		font-size: 12px;
		color: #fff;
		opacity: 0.8;
	}
</style>
