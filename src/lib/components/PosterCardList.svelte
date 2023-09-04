<script>
	export let animes, heading;
</script>

{#if heading}
	<h1 class="title">{heading}</h1>
{/if}
<div class="cards-list">
	<div class="card-container">
		{#each animes as anime}
			<a data-sveltekit-prefetch="true" href={'/details/' + anime.id}>
				<div class="card">
					<img src={anime.coverImage?.extraLarge} class="card-img" alt="" />
					<div class="card-body">
						<h2 class="name">
							{anime.title.english?.toLowerCase() ?? anime.title.romaji?.toLowerCase()}
						</h2>
						<span class="details">
							{anime?.format || ''}
							{anime?.genres?.length ? '‧ ' + anime.genres.slice(0, 2).join(', ') : ''}
						</span>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.card-container a:link,
	a:visited,
	a:hover,
	a:active {
		text-decoration: none;
	}

	.title {
		margin-top: 20px;
		margin-bottom: 10px;
		color: #fff;
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
	}

	.cards-list {
		width: 100%;
		height: max-content;
		position: relative;
	}

	.card-container {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		/* min-height: 150px; */
		overflow: hidden;
	}

	.card {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.card-img {
		border-radius: 5px;
		aspect-ratio: 2/3;
	}
	.card .card-body {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex: 1;
		width: 100%;
		height: 100%;
		padding-top: 10px;
		transition: 0.5s;
		border-radius: 5px;
		color: #fff;
	}

	.card-body .name {
		font-size: 1em;
		font-weight: 500;
		text-transform: capitalize;
		text-decoration: none;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-body .details {
		margin-top: 2px;
		font-size: 0.7em;
		font-weight: 400;
		text-transform: capitalize;
		text-decoration: none;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	/* @media (max-width: 768px) {
		.card-container {
			grid-template-columns: repeat(2, 1fr);
		}
		.name {
			font-size: 1.3em;
		}
	}

	@media (min-width: 769px) {
		.card-container {
			grid-template-columns: repeat(4, 1fr);
		}
		.name {
			font-size: 1em;
		}
	}

	@media (min-width: 1024px) {
		.card-container {
			grid-template-columns: repeat(6, 1fr);
		}
		.name {
			font-size: 1em;
		}
	}

	@media (min-width: 1440px) {
		.card-container {
			grid-template-columns: repeat(8, 1fr);
		}
		.name {
			font-size: 1em;
		}
	} */
</style>