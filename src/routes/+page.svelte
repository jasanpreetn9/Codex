<script>
	export let data;
	const { anilist, jikan, continueWatching } = data;
	const { trendingAnimes, popularAnimes } = anilist;
	import { PosterCardList, Trending } from '$lib/components';
	import { Icon, XCircle } from 'svelte-hero-icons';
	// const { topAiring } = jikan;
</script>

<Trending {trendingAnimes} />
{#if continueWatching.authStore.isValid && continueWatching.list?.length > 0}
	<div class="header">
		<h1 class="title">Continue Watch</h1>
	</div>
	<div class="video-card-container">
		{#each continueWatching.list as episode}
			<div class="video-card">
				<a href={`/watch/${episode.idMal}/${episode.episodeId}`} data-sveltekit-prefetch="true">
					<img src={episode.image} loading="lazy" alt="" />
					<div class="title-container">
						<h2 class="name">
							{episode.title}
						</h2>
						<div class="episodeInfo">
							<p class="episode-number">
								Ep: {episode.number +
									' ‧ ' +
									'Sub' +
									(episode.hasDub ? '/Dub' : '') +
									' ‧ ' +
									(episode.filler ? 'Filler' : 'Canon')}
							</p>
							<form action="?/deleteRecord" method="POST">
								<input type="hidden" value={episode.id}>
								<button>
									<Icon src={XCircle} size="20px" color={'white'} />
								</button>
							</form>
						</div>
					</div>
					<div class="card-body">
						<form action="?/deleteRecord" method="POST">
							<input type="hidden" value={episode.id}>
							<button>
								<Icon src={XCircle} size="20px" color={'white'} />
							</button>
						</form>
						<div class="progress-background">
							<div
								class="progress"
								style="width: {(episode.currentTime / episode.duration) * 100}%;"
							/>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
{/if}
<!-- <PosterCardList animes={topAiring} heading={'Top Airing'} /> -->
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />

<style>
	a {
		text-decoration: none;
	}
	.header {
		display: flex;
		margin-bottom: 5px;
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
		aspect-ratio: 16/9;
		margin-bottom: -3px;
		background-size: contain;
		object-fit: cover;
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

	.episodeInfo {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	form button {
		background: transparent;
		border: none;
		cursor: pointer;
	}
	.episode-number {
		color: rgb(194, 194, 194);
		font-size: 12px;
		font-weight: 300;
		text-transform: capitalize;
		padding: 1px;
		background: #0c111b;
	}
	.card-body {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 0;
		z-index: 2;
		padding: 10px;
		transition: 0.5s;
		border-radius: 5px;
		background-color: transparent;
	}

	.progress-background {
		position: absolute;
		width: 93%;
		height: 6px;
		margin-top: 6px;
		padding-top: 1px;
		/* background: #424345; */
		background: rgba(89, 89, 89, 0.74);
		border-radius: 20px;
	}
	.progress {
		position: absolute;
		height: 6px;
		margin-top: -1px;
		background: var(--primary);
		border-radius: 20px;
	}
</style>
