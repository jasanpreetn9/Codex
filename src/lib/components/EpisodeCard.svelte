<script>
	export let episodes, session, poster, animeId;
	import svgIcon from '$lib/images/filter.png';

	function reverseEpisodes() {
		episodes = episodes.slice().reverse();
	}
</script>

<div class="header">
	<h1 class="title">Episodes</h1>
	<button class="filter" on:click={reverseEpisodes}>
		<img src={svgIcon} alt="Filter" />
	</button>
</div>

<div style="overflow-y: auto; max-height: 400px;">
	<div class="video-card-container">
		{#each episodes as episode}
			<div class="video-card">
				<a href={`/watch/${animeId}?episode=${episode.number}`}>
					{#if episode.image !== poster}
						<img src={episode.image} class="video-card-image" alt="" />
					{/if}
					<div class="card-body">
						<h2 class="name">{episode.number}: {episode.title}</h2>
						{#if session}
							<div class="progress-background">
								<div class="progress" style="width: 100%;" />
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
	.header {
		display: flex;
		justify-content: space-between;
	}
	.title {
		margin-top: 10px;
		color: #fff;
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
	}

	.filter img {
		height: 17px;

		/* background-color: #0d111a; */
	}
	.filter {
		cursor: pointer;
		background-color: transparent;
		border: none;
	}
	.video-card-container {
		position: relative;
		/* margin: auto; */
		height: max-content;
		display: flex;
		margin-bottom: 20px;
		justify-content: space-between;
		display: grid;
		gap: 0.6em;
		/* grid-template-rows: repeat(auto-fill, minmax(170px, 1fr)); */
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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

	.video-card-image {
		width: 100%;
		height: 100%;
		border-radius: 5px;

		object-fit: cover;
	}

	.card-body {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		background: linear-gradient(rgba(4, 8, 15, 0) 27.31%, #192133f8 97.9%);
		padding: 10px;
		transition: 0.5s;
		border-radius: 5px;
		background-color: transparent;
	}

	.name {
		color: #fff;
		font-size: 18px;
		font-weight: 500;
		margin-top: 38%;
		text-transform: capitalize;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.progress-background {
		position: absolute;
		width: 93%;
		height: 8px;
		margin-top: 6px;
		padding-top: 1px;
		background: #424345;
		border-radius: 20px;
	}
	.progress {
		position: absolute;
		height: 8px;
		margin-top: -1px;
		background: #e6e9ff;
		border-radius: 20px;
	}
	/* .details {
		color: white;
		display: flex;
		flex-direction: row;
		margin-top: 3%;
		font-size: 14px;
		width: 100%;
		justify-content: space-between;
	}
	.ep-name {
		font-size: 14px;
	} */
	/* .watch-time {
		font-size: 14px;
	} */
</style>
