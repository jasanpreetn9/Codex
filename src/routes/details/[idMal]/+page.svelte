<script>
	export let data;
	$: ({ animeList, details, continueWatching, streamed, user } = data);
	import { page } from '$app/stores';
	import { Icon, ChevronDown } from 'svelte-hero-icons';
	import { EpisodeCard, PosterCardList } from '$lib/components';
	let menuOpen = false;
	function handleMenuOpen() {
		menuOpen = !menuOpen;
		document.body.addEventListener('click', handleMenuClose);
	}
	function handleMenuClose() {
		menuOpen = false;
		document.body.removeEventListener('click', handleMenuClose);
	}
</script>

<div class="carousel-container">
	<div class="carousel">
		{#if details?.bannerImage !== details.image}
			<div class="slider">
				<div class="banner-gradient" />
				<img src={details.bannerImage} alt="" />
			</div>
		{/if}
		<div class="content">
			<div class="content-top">
				<div class="content-left">
					<img class="poster" src={details.coverImage?.extraLarge} alt="" />
					<div class="details">
						{#if details.nextAiringEpisode}
							<div class="detail-item">
								<p>Next Airing Episode</p>
								<span>{details.nextAiringEpisode.airingAt}</span>
							</div>
						{/if}
						<div class="detail-item">
							<p>Format</p>
							<span>{details.format?.toLowerCase()}</span>
						</div>
						<div class="detail-item">
							<p>Rating</p>
							<span>{details.meanScore / 10}</span>
						</div>

						{#if details.format?.toLowerCase() !== 'movie'}
							<div class="detail-item">
								<p>Episodes</p>
								<!-- <span>{episodesList?.length}</span> -->
							</div>
						{/if}
						<div class="detail-item">
							<p>Status</p>
							<span>{details.status.toLowerCase()}</span>
						</div>
						<div class="detail-item">
							<p>Studios</p>
							<span>{details.studios}</span>
						</div>
						{#each details.relations as relation}
							<div class="detail-item">
								<p>{relation.relationType.replace('_', ' ')}</p>
								<span>
									<a data-sveltekit-prefetch="true" href={'/details/' + relation.id}>
										{relation.title.english ?? relation.title.romaji}
									</a>
								</span>
							</div>
						{/each}
						<div class="detail-item">
							<p>Genres</p>
							<span>{details.genres}</span>
						</div>
					</div>
				</div>
				<div class="content-right">
					<div class="summary">
						<h1 class="anime-title">
							{details.title.english?.toLowerCase() ?? details.title.native?.toLowerCase()}
						</h1>

						<h1 class="anime-title-native">{details.title.native}</h1>
						<p class="anime-des">
							{details.description}
						</p>
						<div class="btn-container">
							<a
								href={`/watch/${details.id}?episode=` + continueWatching?.number
									? continueWatching?.number
									: '1'}
								class="watch-btn"
							>
								{continueWatching
									? 'Continue Watching Ep: ' + continueWatching.number
									: 'Watch Now'}
							</a>
							{#if user}
								<div class="dropdown-list">
									<button class="list-btn-dropdown" on:click|stopPropagation={handleMenuOpen}>
										{animeList?.listType ?? 'Add to list'}
										<Icon
											src={ChevronDown}
											size="16"
											style="margin-left: 5px;{menuOpen ? 'transform: scaleY(-1);' : ''}"
										/>
									</button>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									{#if menuOpen}
										<div class="list-btn-dropdown-list" on:click|stopPropagation={() => {}}>
											<form action="?/addToList" method="post">
												<input type="hidden" name="listType" value="watching" />
												<input type="hidden" name="animeId" value={details.id} />
												<input type="hidden" name="databaseId" value={animeList.id ?? ''} />
												<button type="submit" name="watching">Watching</button>
											</form>
											<form action="?/addToList" method="post">
												<input type="hidden" name="listType" value="on-hold" />
												<input type="hidden" name="animeId" value={details.id} />
												<input type="hidden" name="databaseId" value={animeList.id ?? ''} />
												<button type="submit" name="on-hold">On-Hold</button>
											</form>
											<form action="?/addToList" method="post">
												<input type="hidden" name="listType" value="plan-to-watch" />
												<input type="hidden" name="animeId" value={details.id} />
												<input type="hidden" name="databaseId" value={animeList.id ?? ''} />
												<button type="submit" name="plan-to-watch">Plan To Watch</button>
											</form>
											<form action="?/addToList" method="post">
												<input type="hidden" name="listType" value="dropped" />
												<input type="hidden" name="animeId" value={details.id} />
												<input type="hidden" name="databaseId" value={animeList.id ?? ''} />
												<button type="submit" name="dropped">Dropped</button>
											</form>
											<form action="?/addToList" method="post">
												<input type="hidden" name="listType" value="completed" />
												<input type="hidden" name="animeId" value={details.id} />
												<input type="hidden" name="databaseId" value={animeList.id ?? ''} />
												<button type="submit" name="completed">Completed</button>
											</form>
										</div>
									{/if}
								</div>
							{/if}
						</div>
					</div>
					{#if details.format?.toLowerCase() !== 'movie'}
						{#await streamed.episodesList}
							Loading...
						{:then value}
							<EpisodeCard
								episodes={value.data}
								pagination={value.pagination}
								animeId={details.id}
								scrollAble={true}
								header={'Episodes'}
								filter={true}
								{page}
								posterImg={details.coverImage?.extraLarge}
							/>
						{:catch error}
							Error
						{/await}
					{/if}
					<PosterCardList animes={details.recommendations} heading={'Recommended'} />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	a {
		text-decoration: none;
	}
	.carousel-container {
		position: relative;
		width: 100%;
		padding: 20px 0;
		margin-top: 80px;
	}

	.carousel {
		display: flex;
		height: 100%;
		position: relative;
		margin: auto;
	}

	.slider {
		flex: 0 0 auto;
		position: relative;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		width: 100%;
		height: 100%;
		left: 0;
		transition: 1s;
		overflow: hidden;
	}

	.slider img {
		width: 100%;
		min-height: 100%;
		object-fit: cover;
		display: block;
		margin-left: auto;
		height: 300px;
	}

	.banner-gradient {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, #0c111b, #0c111b00);
	}
	.content {
		margin-top: 135px;
		position: absolute;
		width: 100%;
		height: 100%;
		color: white;
	}
	.content-top {
		display: flex;
		flex-direction: row;
		margin-left: 60px;
	}
	.content-right {
		margin-top: 10px;
		margin-left: 30px;
		width: 100%;
	}
	.poster {
		width: 220px;
		border-radius: 7px;
	}
	.details {
		background-color: #060b11;
		border-radius: 7px;
		padding: 20px;
		width: 220px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		margin-top: 20px;
	}

	.detail-item {
		padding-bottom: 5px;
		text-transform: capitalize;
	}

	.detail-item p {
		font-size: 12px;
		font-weight: 700;
	}

	.detail-item span {
		font-size: 12px;
		line-height: 1.3;
		font-weight: 500;
		text-transform: capitalize;
	}

	.detail-item span a {
		color: white;
	}
	.anime-title {
		text-transform: capitalize;
		margin-top: 80px;
		font-weight: 550;
		font-size: 26px;
	}
	.anime-title-native {
		font-size: 18px;
		font-weight: 400;
	}
	.anime-des {
		width: 94%;
		line-height: 22px;
		margin-top: 15px;
		opacity: 0.8;
		font-size: 14px;
		margin-bottom: 15px;
	}
	.btn-container {
		display: flex;
		flex-direction: row;
		margin-top: 20px;
	}
	.watch-btn {
		background: var(--primary);
		padding: 10px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: capitalize;
		font-weight: 700;
		font-size: 12px;
		cursor: pointer;
		margin-right: 5px;
		height: max-content;
	}
	.dropdown-list {
		/* margin-left: 180px; */
		/* position: absolute; */
		/* z-index: 9999; */
	}
	.list-btn-dropdown {
		background: var(--secondary);
		padding: 10px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		font-weight: 700;
		font-size: 12px;
		cursor: pointer;
		text-transform: capitalize;
		display: flex;
	}
	.list-btn-dropdown-list {
		display: flex;
		flex-direction: column;
		z-index: 1;
		gap: 10px;
		margin-top: 7px;
	}
	.list-btn-dropdown-list form button {
		background-color: transparent;
		background-color: var(--secondary);
		color: white;
		border: none;
		padding: 5px;
		border-radius: 5px;
		cursor: pointer;
		width: 100%;
		height: 30px;
	}
	.summary {
		min-height: 200px;
		/* margin-bottom: 10px; */
	}
	@media (max-width: 850px) {
		.slider {
			display: none;
		}
		.content-left,
		.content {
			margin: 0;
		}
		.content-top {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0;
		}
		.content-left {
			width: 100%;
		}
		.poster,
		.details {
			width: 100%;
		}
		.content-right {
			margin-left: 0px;
		}
	}
</style>
