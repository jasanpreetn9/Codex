<script>
	export let animes, heading;
</script>

{#if animes.length > 0}
	{#if heading}
		<h1 class="title">{heading}</h1>
	{/if}
	<div class="cards-list">
		<div class="card-container">
			{#each animes as anime}
			{#if anime}
				<a href={`/details/${anime?.idMal}`}>
					<div class="card">
						<img src={anime?.coverImage?.extraLarge} class="card-img" alt="" loading="lazy" />
						<div class="card-body">
							<h2 class="name">
								{anime?.title?.english?.toLowerCase() ?? anime?.title?.romaji?.toLowerCase() ?? anime?.title?.native?.toLowerCase()}
							</h2>
							<span class="details">
								{anime?.format.toLowerCase() || ''}
								{anime?.genres?.length ? '‧ ' + anime?.genres.slice(0, 2).join(', ') : ''}
							</span>
						</div>
					</div>
				</a>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style>
	.card-container a:link,
	a:visited,
	a:hover,
	a:active {
		text-decoration: none;
	}

	.title {
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
</style>
