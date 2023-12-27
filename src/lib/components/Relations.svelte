<script>
	export let relations;
</script>

<div class="video-card-container">
	{#each relations as anime}
		<div class="video-card">
			<a href={`/details/${anime.idMal}`} data-sveltekit-prefetch="true">
				<img src={anime.bannerImage} loading="lazy" alt="" />
				<div class="title-container">
					<h2 class="name">
						{anime.title.english.toLowerCase() ?? anime.title.romanji.toLowerCase()}
					</h2>
					<p class="relation-info">
						{anime.relationType?.toLowerCase() + ' ‧ ' + anime.format?.toLowerCase()}
					</p>
				</div>
			</a>
		</div>
	{/each}
</div>

<style>
	a {
		text-decoration: none;
	}

	.video-card-container {
		display: grid;
		gap: 0.6em;
		grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
	}
	.video-card {
		position: relative;
		width: 100%;
        height: 100px;
		border-radius: 5px;
	}
	.video-card img {
		height: 100%;
		border-radius: 5px;
		margin-bottom: -3px;
		background-size: cover;
		object-fit: cover;
        overflow: hidden;
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
	.relation-info {
		color: rgb(194, 194, 194);
		font-size: 12px;
		font-weight: 300;
		text-transform: capitalize;
		padding: 1px;
		background: #0c111b;
	}
</style>
