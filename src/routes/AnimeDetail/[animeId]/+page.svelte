<script>
	export let data;
	import { recommendationsFormat, relationsFormat } from '../../../lib/index';
	import { PosterCard, RelationsList } from '$lib/Components';
	let { animeDetail } = data;
	let {
		id,
		idMal,
		title,
		coverImage,
		seasonYear,
		description,
		format,
		status,
		episodes,
		averageScore,
		genres,
		recommendations,
		relations
	} = animeDetail;
	recommendations = recommendationsFormat(recommendations.edges);
	let formatedRelations = relationsFormat(relations.edges);
	console.log(title)
	let sortedRelations = [];
	formatedRelations.forEach((relation) => {
		if (
			relation.format == 'ANIME' &&
			(relation.relationType == 'SEQUEL' ||
				relation.relationType == 'PREQUEL' ||
				relation.relationType == 'SIDE_STORY')
		) {
			sortedRelations.push(relation);
		}
	});
</script>

<section class="anime-detail">
	<div class="container">
		<figure class="anime-detail-banner">
			<img src={coverImage.extraLarge} alt="Poster" />
		</figure>
		<div class="anime-detail-content">
			{#if title.english == null}
			<h1 class="h1 detail-title">{title.romaji}</h1>
			<!-- content here -->
			{:else}
			<h1 class="h1 detail-title">{title.english}</h1>
				 <!-- else content here -->
			{/if}
			<div class="meta-wrapper">
				<p class="storyline">{@html description}</p>
				<div class="badge-wrapper">
					<div class="badge badge-fill">Type: {format}</div>
					<div class="badge badge-outline">Rating: {averageScore / 10}</div>
					<div class="badge badge-fill">Release Date: {seasonYear}</div>
					<div class="badge badge-outline">Episodes: {episodes}</div>
					<div class="badge badge-fill">Status: {status.toLowerCase()}</div>
					<div class="badge badge-outline">Genres: {genres}</div>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="lists">
	{#if sortedRelations.length > 0}
		<RelationsList relations={sortedRelations} />
	{/if}
	<h1 class="title">Recomended</h1>
	<div class="cards-list">
		<div class="card-container">
			{#each recommendations as recommended}
				<PosterCard anime={recommended} reload={true} />
			{/each}
		</div>
	</div>
</div>

<style>
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	img {
		display: block;
	}
	.container {
		padding-inline: 15px;
	}
	.h1 {
		color: white;
		line-height: 1.2;
		font-size: 36px;
	}
	.badge {
		color: #ffffff;
		font-size: 11px;
		font-weight: 700;
		border: 2px solid transparent;
		padding: 2px 10px;
		text-transform: capitalize;
	}
	.badge-fill {
		background: #ffffff;
		color: hsl(228, 13%, 15%);
	}
	.badge-outline {
		border-color: hsl(0, 0%, 100%);
	}
	.meta-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		gap: 15px 25px;
		margin-bottom: 50px;
	}
	.badge-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 5px 10px;
	}
	.anime-detail {
		padding-top: 120px;
		padding-bottom: 60px;
	}
	.anime-detail-banner {
		position: relative;
		background: hsl(229, 15%, 21%);
		margin-inline: auto;
		border-radius: 6px;
		overflow: hidden;
		margin-bottom: 50px;
	}
	.anime-detail-banner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.detail-title {
		margin-bottom: 20px;
	}
	.anime-detail .meta-wrapper {
		margin-bottom: 30px;
	}
	.storyline {
		color: hsl(0, 0%, 74%);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.8;
		margin-bottom: 40px;
	}
	@media (min-width: 550px) {
		:root {
			--fs-1: 42px;
		}
		.container {
			margin-inline: auto;
		}
		.detail-title {
			--fs-1: 46px;
		}
	}
	@media (min-width: 768px) {
		:root {
			--fs-2: 36px;
		}

		.container {
			max-width: 720px;
		}
		.detail-title {
			--fs-1: 50px;
		}
	}

	@media (min-width: 992px) {
		.container {
			max-width: 960px;
		}
		.anime-detail {
			padding-bottom: 60px;
		}
		.anime-detail .container {
			position: relative;
			display: flex;
			align-items: center;
			gap: 50px;
		}
		.anime-detail-banner {
			margin: 0;
		}
	}

	@media (min-width: 1200px) {
		.container {
			max-width: 1320px;
		}
		.anime-detail {
			padding-bottom: 60px;
		}
		.anime-detail-content {
			max-width: 1000px;
		}
	}

	.title {
		color: #fff;
		opacity: 0.9;
		padding-left: 5%;
		padding-bottom: 5px;
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
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		grid-column-gap: 0.4rem;
		grid-row-gap: 1rem;
		position: relative;
		width: 92%;
		padding-left: 10px;
		height: fit-content;
		margin: 0 auto;
		margin-bottom: 10px;
		align-items: center;
		justify-content: center;
	}
</style>
