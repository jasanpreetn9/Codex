<script>
	export let data;
	$: ({
		anilist: { trendingAnimes, popularAnimes },
		database: { continueWatching },
		// jikan: { topAiring }
	} = data);
	import { CardContainer, Trending } from '$lib/components';
	import { Icon, XCircle } from 'svelte-hero-icons';
</script>

<Trending {trendingAnimes} />
{#if continueWatching.authStore.isValid && continueWatching.list?.length > 0}
	<div class="continue-watch__header">
		<h1 class="continue-watch__title">Continue Watching</h1>
	</div>
	<div class="continue-watch__card-container">
		{#each continueWatching.list as episode}
			<div class="episode-card">
				<a href={`/watch/${episode.idMal}/${episode.episodeId}`}>
					<img src={episode.image} loading="lazy" alt="" />
				</a>
				<div class="episode-card__title-container">
					<a href={`/watch/${episode.idMal}/${episode.episodeId}`}>
						<h2 class="episode-card__name">
							{episode.title}
						</h2>
					</a>
					<div class="episode-card__info">
						<a href={`/watch/${episode.idMal}/${episode.episodeId}`}>
							<p class="episode-card__number">
								Ep: {episode.number +
									' ‧ ' +
									'Sub' +
									(episode.hasDub ? '/Dub' : '') +
									' ‧ ' +
									(episode.filler ? 'Filler' : 'Canon')}
							</p>
						</a>
						<form action="?/deleteRecord" method="POST">
							<input type="hidden" value={episode.id} />
							<form action="?/deleteRecord" method="POST">
								<input type="hidden" name="recordId" value={episode.id} />
								<button>
									<Icon src={XCircle} size="20px" color={'white'} />
								</button>
							</form>
						</form>
					</div>
				</div>
				<div class="episode-card__body">
					<div class="episode-card__progress-background">
						<div
							class="episode-card__progress"
							style="width: {(episode.currentTime / episode.duration) * 100}%;"
						/>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<!-- <CardContainer animes={topAiring} heading={'Top Airing Animes'} /> -->
<CardContainer animes={popularAnimes} heading={'Popular Animes'} />

<style>
	a {
		text-decoration: none;
	}
	.continue-watch__header {
		display: flex;
		margin-bottom: 5px;
	}
	.continue-watch__title {
		margin-top: 10px;
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 19px;
		font-weight: 500;
		margin-bottom: 3px;
	}
	.episode-card {
		position: relative;
		width: 100%;
		border-radius: 5px;
		aspect-ratio: 16/9;
	}
	.episode-card img {
		width: 100%;
		border-radius: 5px;
		aspect-ratio: 16/9;
		margin-bottom: -3px;
		object-fit: cover;
	}
	.episode-card__title-container {
		padding-bottom: 15px;
		background: #0c111b;
	}
	.episode-card__name {
		color: #fff;
		font-size: 15px;
		font-weight: 500;
		text-transform: capitalize;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.episode-card__info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.episode-card__number {
		color: rgb(194, 194, 194);
		font-size: 12px;
		font-weight: 300;
		text-transform: capitalize;
	}
	.episode-card__body {
		position: absolute;
		width: 100%;
		top: 50%;
		left: 0;
		z-index: 2;
		padding: 10px;
		transition: 0.5s;
		background-color: transparent;
		border-radius: 5px;
	}
	.episode-card__progress-background {
		position: absolute;
		width: 93%;
		height: 6px;
		margin-top: 6px;
		background: rgba(89, 89, 89, 0.74);
		border-radius: 20px;
	}
	.episode-card__progress {
		height: 6px;
		background: var(--primary);
		border-radius: 20px;
	}
	.continue-watch__card-container {
		display: grid;
		gap: 0.6em;
		grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
	}
	form button {
		background: transparent;
		border: none;
		cursor: pointer;
	}
</style>
