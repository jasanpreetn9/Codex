<script>
	export let data;
	console.log(data);
	const { searchAnimes } = data;
</script>

<!-- <h1 class="title">Search Results For: <i>{searchId}</i></h1> -->
<div class="cards-list">
	<div class="card-container">
		{#each searchAnimes as anime}
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
		min-height: 150px;
		overflow: hidden;
	}

	.card {
		aspect-ratio: 9/13;
		position: relative;
		width: 100%;
		height: 230px;
		border-radius: 5px;
		overflow: hidden;
		margin-right: 100px;
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
		background: linear-gradient(rgba(4, 8, 15, 0) 27.31%, #192133f8 97.9%);
		padding: 10px;
		transition: 0.5s;
		border-radius: 5px;
	}

	.name {
		color: #fff;
		font-size: 15px;
		font-weight: 500;
		margin-top: 120%;
		text-transform: capitalize;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
