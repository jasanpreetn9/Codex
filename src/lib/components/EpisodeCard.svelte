<script>
	export let episodes, animeId, scrollable, header, filter, posterImg, user;
	export let currentEpisode = 1;
	import { BarsArrowDown, Icon } from 'svelte-hero-icons';
	let itemsPerPage = 100;
	let pages = Math.ceil(episodes.length / itemsPerPage);
	let currentPage = Math.ceil(currentEpisode / itemsPerPage);
	let filterState = false;
	
	function goToPage(page) {
		currentPage = page;
	}
	function nextPage() {
		if (currentPage < pages) currentPage++;
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}

	function reverseEpisodes() {
		episodes = episodes.slice().reverse();
	}

	function toggleFilter() {
		filterState = !filterState;
		reverseEpisodes();
	}

	$: paginatedEpisodes = episodes.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
	
	function getEpisodeUrl(idMal, gogoanime, hasDub) {
		if (user && user.alwaysDub && hasDub) {
			return `/watch/${idMal}/${gogoanime.dub}`;
		} else {
			return `/watch/${idMal}/${gogoanime.sub}`;
		}
	}
</script>

<div class="header">
	<h1 class="title">{header}</h1>
	{#if filter}
		<div class="right-container">
			<div class="switch-block" />
			{#if pages > 1}
				<div class="pagination">
					<button on:click={prevPage}>&laquo;</button>
					{#each Array(pages).fill() as _, i}
						<button class:selected={i + 1 === currentPage} on:click={() => goToPage(i + 1)}>
							{i + 1}
						</button>
					{/each}
					<button on:click={nextPage}>&raquo;</button>
				</div>
			{/if}
			<button class="filter" on:click={toggleFilter}>
				<Icon
					src={BarsArrowDown}
					size="20px"
					style={filterState ? 'transform: scaleY(-1);' : ''}
					color={'white'}
				/>
			</button>
		</div>
	{/if}
</div>

<div class={scrollable ? 'scrollable' : ''}>
	<div class="video-card-container">
		{#each paginatedEpisodes as episode}
			<div class="video-card">
				<a
					href={getEpisodeUrl(animeId ?? episode.idMal, episode.gogoanime, episode.hasDub)}
				>
					<img src={episode.image || posterImg} loading="lazy" alt="" />
					<div class="title-container">
						<h2 class="name">
							{episode.title}
						</h2>
						<p class="episode-number">
							Ep: {`${episode.number} ‧ Sub${episode.hasDub ? '/Dub' : ''} ‧ ${episode.filler ? 'Filler' : 'Canon'}`}
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
	.scrollable {
		overflow-y: auto;
		max-height: 400px;
		margin-bottom: 20px;

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
	.right-container {
		display: flex;
		margin-left: auto;
	}
	.switch-block {
		width: 300px;
	}
	.pagination {
		padding-top: 13px;
		display: inline-block;
	}

	.pagination button {
		background-color: transparent;
		border: none;
		padding: 5px 10px;
		margin: 0 2px;
		cursor: pointer;
		color: white;
		border-radius: 4px;
	}
	.pagination button.selected {
		background-color: var(--primary);
		color: white;
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
	.episode-number {
		color: rgb(194, 194, 194);
		font-size: 12px;
		font-weight: 300;
		text-transform: capitalize;
		padding: 1px;
		background: #0c111b;
	}
</style>
