<script>
	export let animes, heading;
</script>
<!-- 
<h1 class="title">{heading}</h1>
<div class="cards-list">
	<div class="card-container">
		{#each animes as anime}
			<a data-sveltekit-prefetch="true" href={'/details/' + anime.id}>
				<div class="card">
					<div
						class="image"
						style="background: linear-gradient(to bottom, transparent 0%, transparent 50%, #0c111b 100%),
            no-repeat center/100% url({anime.image});"
					/>
					<div class="card-body">
						<h2 class="name">
							{anime.title.english?.toLowerCase() ?? anime.title.romaji?.toLowerCase()}
						</h2>
            <span class="details">{anime?.type || ""} {anime?.genres?.length ? "‧ " + anime.genres.slice(0,2).join(', ') : ""}</span>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.card-container a:link, a:visited, a:hover, a:active {
		text-decoration: none;
	}

	.title {
		margin-top: 10px;
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
		margin: 10px 0 20px;
	}

	.card-container {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
		/* min-height: 150px; */
		overflow: hidden;
	}

	.card {
		position: relative;
		width: 100%;
    height: 100%;
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.card .image {
		width: 100%;
		height: 250px;
	}

	.card .card-body {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex: 1;
		width: 100%;
		height: 100%;
		padding-top: 20px;
		transition: 0.5s;
		border-radius: 5px;
    color: #fff;
	}

	.card-body .name {
		font-size: 1.1em;
		font-weight: 500;
		text-transform: capitalize;
		text-decoration: none;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

  .card-body .details {
    margin-top: 2px;
    font-size: 0.8em;
    font-weight: 700;
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
</style> -->


<h1 class="title">{heading}</h1>
<div class="cards-list">
	<div class="card-container">
		{#each animes as anime}
			<a data-sveltekit-prefetch="true" href={'/details/' + anime.id}>
				<div class="card">
					<img src={anime.image} class="card-img" alt="" />
					<div class="card-body">
						<h2 class="name">
							{anime.title.english?.toLowerCase() ?? anime.title.romaji?.toLowerCase()}
						</h2>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.title {
		margin-top: 10px;
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
		margin: 10px 0 20px;
	}

	.card-container {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		/* min-height: 150px; */
		overflow: hidden;
	}

	.card {
		aspect-ratio: 9/13;
		position: relative;
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		font-size: 14px;
		
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 5px;
	}

	.card-body {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		background: linear-gradient(#04080f00 27.31%, #192133f8 97.9%);
		padding: 10px;
		transition: 0.5s;
		border-radius: 5px;
	}

	.name {
		color: #fff;
		font-size: 1.1em;
		font-weight: 500;
		margin-top: 120%;
		text-transform: capitalize;
		display: -webkit-box;
		-webkit-line-clamp: 2;
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
