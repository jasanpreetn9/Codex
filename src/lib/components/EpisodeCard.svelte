<script>

	export let episodes, animeId, scrollAble, header, filter;
	import {filterIcon} from '$lib'
	function reverseEpisodes() {
		episodes = episodes.slice().reverse();
	}
	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}
	let filterState = false;
	function toggleFilter() {
		filterState = !filterState;
		reverseEpisodes()
	}
</script>

<div class="header">
	<h1 class="title">{header}</h1>
	{#if filter}
		<button class="filter" on:click={toggleFilter}>
			<img style={filterState ? "transform: scaleY(-1);" : ""} src={filterIcon} alt="Filter" />
		</button>
	{/if}
</div>

<div class={scrollAble ? 'scrollAble' : ''}>
	<div class="video-card-container">
		{#each episodes as episode}
			<div class="video-card">
				<!-- <a href={`/watch/${animeId}?episode=${episode.number}`}> -->
				<a
					href={'/watch/' + (animeId ? animeId : episode.animeId) + '?episode=' + episode.number}
					data-sveltekit-prefetch="true"
				>
					<div
						class="card-body"
						style="background: linear-gradient(rgba(4, 8, 15, 0) 27.31%, #192133f8 97.9%), no-repeat center/cover url(https://proxy.jasanpreetn9.workers.dev/?{episode.image})"
					>
						<h2 class="name">
							{episode.number}: {episode.title}
						</h2>
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
		justify-content: space-between;
	}
	.title {
		margin-top: 10px;
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 19px;
		font-weight: 500;
	}

	.filter img {
		height:20px;
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
		/* grid-template-rows: repeat(auto-fill, minmax(150px, 1fr)); */
	}

	.video-card {
		position: relative;
		/* width: 300px; */
		margin-top: 10px;
		height: 100%;
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		background: #030b17;
		aspect-ratio: 16/9;
	}

	.card-body {
		width: 100%;
		height: 100%;
		padding: 10px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
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
