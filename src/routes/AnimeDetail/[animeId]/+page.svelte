<script>
	export let data;
	import { PosterCard, RelationsList } from '$lib/Components';
	let sortedRelations = [];
	console.log(data);
	if (data.relations.length !== 0) {
		data.relations.forEach((relation) => {
			if (
				(relation.type == 'TV' || relation.type == 'MOVIE') &&
				(relation.relationType == 'SEQUEL' ||
					relation.relationType == 'PREQUEL' ||
					relation.relationType == 'SIDE_STORY')
			) {
				sortedRelations.push(relation);
			}
		});
	}
</script>

<div class="slider">
	<div class="slide-content">
		<section class="anime-detail">
			<div class="container">
				<figure class="anime-detail-banner">
					<img src={data.image} alt={data.title.romaji} />
				</figure>
				<div class="anime-detail-content">
					{#if data.title.english == null || data.title.english == undefined}
						<h1 class="h1 detail-title">{data.title.romaji}</h1>
					{:else}
						<h1 class="h1 detail-title">{data.title.english}</h1>
					{/if}
					<div class="meta-wrapper">
						<h2>{data.title.romaji}</h2>
						<p class="storyline">{@html data.description.replace(/\<br\>/g," ")}</p>
					</div>
				</div>
			</div>
		</section>
	</div>
	<img src={data.cover} alt="" />
</div>

<!-- 
<div class="lists">
	{#if sortedRelations.length !== 0}
		<RelationsList relations={sortedRelations} />
	{/if}
	<h1 class="title">Recomended</h1>
	<div class="cards-list">
		<div class="card-container">
			{#each data.recommendations as recommended}
				<PosterCard anime={recommended} reload={true} />
			{/each}
		</div>
	</div>
</div> -->
<style>
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.slider {
		flex: 0 0 auto;
		margin-right: 30px;
		position: relative;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		width: 100%;
		height: 100%;
		min-width: 100%;
		left: 0;
		transition: 1s;
	}
	.slider img {
		height: 450px;
		object-fit: cover;
		display: block;
		margin-left: auto;
		z-index: 1;
		opacity: 50%;
	}

	.slide-content {
		position: absolute;
		width: 100%;
		height: 100%;
		/* padding-left: 50px; */
		z-index: 2;
		color: #fff;
		margin-top: 150px;
	}
	.container {
		padding-inline: 15px;
	}

	.anime-detail-banner {
		position: relative;
		background: hsl(229, 15%, 21%);
		margin-inline: auto;
		border-radius: 6px;
		overflow: hidden;
		margin-bottom: 50px;
		/* width: 375px; */
	}
	.anime-detail-banner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		align-items: center;
	}
	.meta-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		gap: 15px 25px;
		margin-bottom: 50px;
	}
	.detail-title {
		margin-bottom: 20px;
		color: white;
		line-height: 1.2;
		font-size: 36px;
	}
	.storyline {
		color: hsl(0, 0%, 74%);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.8;
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
			padding-bottom: 30px;
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
			padding-bottom: 30px;
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
