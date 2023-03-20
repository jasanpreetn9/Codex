<script>
	// import { onMount } from 'svelte';
	// import Artplayer from 'artplayer';
	export let data;
	console.log(data);
	// let artplayer;
	// onMount(() => {
	// 	artplayer = new Artplayer({
	// 		container: '.artplayer-container',
	// 		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
	// 		autoPlayback: true
	// 	});
	// });
</script>

<!-- <h1>{data.respData.title.english}</h1> -->
<main>
	<!-- <div class="artplayer-container" /> -->
	<!-- <h1 class="title">Episodes</h1>
	<div class="video-card-container">
		{#each data.data.respData.episodes as episode}
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
	</div> -->
</main>

<style>
	* {
		color: white;
	}
	main {
		display: flex;
		flex-direction: row;
	}
	.episodesList {
		height: 500px;
		overflow-x: auto;
		overflow-y: visible;
	}
	.episodeCard {
		/* background-color: grey; */
		padding: 4px;
		border: 1px solid white;
	}
	.artplayer-container {
		aspect-ratio: 16/9;
		height: 500px;
	}
</style>
