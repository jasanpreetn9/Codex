<script>
	export let data;
	$: ({ details, episodesList } = data);
	import { EpisodeCard, PosterCardList, GradientBackground } from '$lib/components';
</script>

<GradientBackground bannerImage={details.bannerImage}>
	<div class="content-top">
		<div class="content-left">
			<img class="poster" src={details.coverImage?.extraLarge} alt="" />
			<div class="details">
				{#if details?.nextAiringEpisode}
					<div class="detail-item">
						<p>Next Airing Episode</p>
						<span>{details?.nextAiringEpisode.airingAt}</span>
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
						<span>{episodesList?.length}</span>
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

				<a href={`/watch/${details.idMal}`} class="watch-btn"> Watch Now </a>
			</div>
			<EpisodeCard
				episodes={episodesList}
				animeId={details.idMal}
				scrollAble={true}
				header={'Episodes'}
				filter={true}
				posterImg={details.coverImage?.extraLarge}
			/>
			<PosterCardList animes={details.recommendations} heading={'Recommended'} />
		</div>
	</div>
</GradientBackground>

<style>
	a {
		text-decoration: none;
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
	.summary {
		margin-bottom: 20px;
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
	@media (max-width: 850px) {
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
