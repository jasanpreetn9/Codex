<script>
	export let data;
	$: ({ details, streamed, user, database } = data);
	$: ({ continueWatching } = database);
	import { EpisodeCard, CardContainer, GradientBackground, Relations } from '$lib/components';
	function getEpisodeUrl(episodesList) {
		if (episodesList.length > 0) {
			const { gogoanime, hasDub } = episodesList[0];
			const episodeId = user?.alwaysDub ? (hasDub ? gogoanime.dub : gogoanime.sub) : gogoanime.sub;
			return `/watch/${details.idMal}/${episodeId}`;
		} else {
			return '';
		}
	}
</script>

<GradientBackground bannerImage={details.bannerImage} coverImage={details.coverImage?.extraLarge}>
	<div class="container">
		<div class="info-section">
			<img class="poster" src={details.coverImage?.extraLarge} alt="" />
			<div class="attributes">
				{#if details?.nextAiringEpisode}
					<div class="attribute-item">
						<p>Next Airing Episode</p>
						<span>{details?.nextAiringEpisode.airingAt}</span>
					</div>
				{/if}
				<div class="attribute-item">
					<p>Format</p>
					<span>{details.format?.toLowerCase()}</span>
				</div>
				<div class="attribute-item">
					<p>Rating</p>
					<span>{details.meanScore / 10}</span>
				</div>
				{#if details.format?.toLowerCase() !== 'movie'}
					<div class="attribute-item">
						<p>Episodes</p>
						{#await streamed.episodesList then episodesList}
							<span>{episodesList?.length}</span>
						{/await}
					</div>
				{/if}
				<div class="attribute-item">
					<p>Status</p>
					<span>{details.status?.toLowerCase()}</span>
				</div>
				<div class="attribute-item">
					<p>Studios</p>
					<span>{details.studios}</span>
				</div>
				{#each details.relations as relation}
					<!-- <div class="relation">
						<img src={relation.coverImage?.extraLarge} alt="" />
						<div class="relation-info">
							<p>{relation.title.english?.toLowerCase() ?? relation.title.native?.toLowerCase()}</p>
							<p>{relation.relationType.toLowerCase()}</p>
							<p>{relation.type}</p>
							<p>{relation.format}</p>
						</div>
					</div> -->
					<div class="attribute-item">
						<p>{relation.relationType?.toLowerCase()}</p>
						<span>
							<a href={`/details/${relation.idMal}`}>
								{relation.title.english?.toLowerCase() ??
									relation.title.native?.toLowerCase() ??
									relation.title.romaji?.toLowerCase()}
							</a>
						</span>
					</div>
				{/each}
			</div>
			<div class="relations" />
		</div>

		<div class="content-section">
			<div class="summary">
				<h1 class="title">
					{details.title.english?.toLowerCase() ?? details.title.native?.toLowerCase()}
				</h1>
				<h1 class="native-title">{details.title.native}</h1>
				<p class="description">
					{details.description}
				</p>
				{#if continueWatching}
					<a href={`/watch/${details.idMal}/${continueWatching.episodeId}`} class="watch-btn">
						Continue Watching Ep: {continueWatching.number}
					</a>
				{:else}
					{#await streamed.episodesList}
						<a href={`/details/${details.idMal}`} class="watch-btn">Loading</a>
					{:then episodesList}
						<a href={getEpisodeUrl(details.idMal, episodesList)} class="watch-btn">Watch Now</a>
					{/await}
				{/if}
			</div>
			<!-- Relations component can be uncommented if needed -->
			<!-- <Relations relations={details.relations} /> -->
			{#if details.format.toLowerCase() != 'movie'}
				{#await streamed.episodesList then episodesList}
					<EpisodeCard
						episodes={episodesList}
						animeId={details.idMal}
						scrollable={true}
						header={'Episodes'}
						filter={true}
						{user}
						posterImg={details.coverImage?.extraLarge}
					/>
				{/await}
			{/if}
			<CardContainer animes={details.recommendations} heading={'Recommended'} />
		</div>
	</div>
</GradientBackground>

<style>
	a {
		text-decoration: none;
	}
	.container {
		display: flex;
		flex-direction: row;
		margin-left: 60px;
	}
	.content-section {
		margin-top: 10px;
		margin-left: 30px;
		width: 100%;
	}
	.info-section {
		width: 220px;
	}
	.summary {
		margin-bottom: 20px;
	}
	.poster {
		width: 220px;
		border-radius: 7px;
	}
	.attributes {
		background-color: #060b11;
		border-radius: 7px;
		padding: 20px;
		width: 220px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		margin-top: 20px;
	}
	.attribute-item {
		padding-bottom: 5px;
		text-transform: capitalize;
	}
	.attribute-item p {
		font-size: 12px;
		font-weight: 700;
	}
	.attribute-item span {
		font-size: 12px;
		line-height: 1.3;
		font-weight: 500;
		text-transform: capitalize;
		margin-left: 4px;
	}

	.attribute-item a {
		text-decoration: none;
		color: white;
		cursor: pointer;
	}

	.relations {
		background-color: #060b11;
		border-radius: 7px;
		/* padding: 20px; */
		width: 220px;
		margin-top: 20px;
	}
	.title {
		text-transform: capitalize;
		margin-top: 80px;
		font-weight: 550;
		font-size: 26px;
	}
	.native-title {
		font-size: 18px;
		font-weight: 400;
	}
	.description {
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
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0;
		}
		.info-section {
			width: 100%;
			/* display: none; */
		}
		.poster,
		.attributes {
			width: 100%;
		}
		.content-section {
			margin-left: 0px;
		}
	}
</style>
