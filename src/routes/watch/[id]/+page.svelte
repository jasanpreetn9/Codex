<script>
	import { onMount } from 'svelte';
	import Artplayer from 'artplayer';
	export let data;
	let episodeSources = [];
	let sourcesQuality = [];
	let defaultUrl;
	let artplayer;
	data.episode.sources.forEach((element) => {
		if (element.quality !== 'default' && element.quality !== 'backup') {
			episodeSources.push({
				url: element.url,
				html: element.quality,
				default: false
			});
			sourcesQuality.push(parseInt(element.quality.replace('p', '')));
		}
	});
	episodeSources.forEach((element) => {
		if (element.html == Math.max(...sourcesQuality) + 'p') {
			element.default = true;
			element.url = defaultUrl;
		}
	});
	onMount(() => {
		artplayer = new Artplayer({
			container: '.artplayer-container',
			// url: defaultUrl,
			pip: true,
			autoPlayback: true,
			fullscreen: true,
			airplay: true,
			theme: '#23ade5',
			quality: episodeSources,
		});
	});
</script>

<h1 class="title">{data.details.title.english}</h1>
<main>
	<div class="artplayer-container" />
	<h1 class="title">Episodes</h1>
	<div class="video-card-container">
		{#each data.details.episodes as episode}
			<div class="video-card">
				<a href={`/watch/${data.id}?episode=${episode.id}`}>
					<img src={episode.image} class="video-card-image" alt="" />
					<div class="card-body">
						<h2 class="ep-title">{episode.number}: {episode.title}</h2>
						{#if data.session}
							content here
							<div class="progress-background">
								<div class="progress" style="width: 100%;" />
							</div>
						{/if}
					</div>
				</a>
			</div>
		{/each}
	</div>
</main>

<style>
	* {
		color: white;
	}
	.artplayer-container {
		aspect-ratio: 16/9;
		height: 500px;
	}
	.title {
		margin-top: 10px;
		color: #fff;
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
	}
	.video-card-container {
		position: relative;
		margin: auto;
		height: max-content;
		display: flex;
		margin-bottom: 20px;
		justify-content: space-between;
		display: grid;
		gap: 0.6em;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}

	.video-card {
		position: relative;
		width: 300px;
		margin-top: 10px;
		height: 100%;
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		background: #030b17;
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

	.ep-title {
		color: #fff;
		font-size: 18px;
		font-weight: 500;
		margin-top: 40%;
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
</style>
