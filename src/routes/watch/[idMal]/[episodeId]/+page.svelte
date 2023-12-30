<script>
	export let data;
	import { EpisodeCard, GradientBackground, Artplayer } from '$lib/components';

	$: ({ details, streamed, allEpisodes, episodeId, database, user } = data);
	$: ({ episodes, currentEpisode } = allEpisodes);
	$: ({ continueWatching } = database);
</script>

<GradientBackground bannerImage={details.bannerImage}>
	<div class="container">
		<div class="container-top">
			<div class="artplayer-container">
				{#await streamed.episodeSources then sources}
					<Artplayer
						{sources}
						{continueWatching}
						currentEp={currentEpisode}
						{details}
						{episodeId}
						{episodes}
						{user}
					/>
				{/await}
			</div>
			<div class="summary">
				<h1 class="anime-title">
					{details?.title.english?.toLowerCase() ?? details?.title.native?.toLowerCase()}
				</h1>
				<h1 class="anime-title-native">Episode {currentEpisode?.number}: {currentEpisode.title}</h1>
				<p class="anime-des">
					{details.description}
				</p>
				<a
					data-sveltekit-preload-data="hover"
					href={`/watch/${details.idMal}/${currentEpisode.gogoanime.sub}`}
					class={currentEpisode.gogoanime.sub == episodeId ? 'active type-btn' : 'type-btn'}
				>
					Sub
				</a>
				{#if currentEpisode.hasDub}
					<a
						data-sveltekit-preload-data="hover"
						href={`/watch/${details.idMal}/${currentEpisode.gogoanime.dub}`}
						class={currentEpisode.gogoanime.dub == episodeId ? 'active type-btn' : 'type-btn'}
					>
						Dub
					</a>
				{/if}
			</div>
		</div>
		<div class="container-bottom">
			<EpisodeCard
				{episodes}
				animeId={details.idMal}
				scrollable={true}
				header={'Episodes'}
				filter={true}
				user
				posterImg={details.coverImage?.extraLarge}
				currentEpisode={currentEpisode.number}
			/>
		</div>
	</div>
</GradientBackground>

<style>
	.artplayer-container {
		width: 100%;
		/* height: 400px; */
		aspect-ratio: 16/9;
	}
	.container {
		margin-left: 40px;
		margin-right: 40px;
	}
	.container-top {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
		grid-gap: 20px;
	}
	.summary {
		margin: auto;
	}

	.anime-title {
		text-transform: capitalize;
		/* margin-top: 80px; */
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
	.type-btn {
		/* background: var(--primary); */
		background: var(--secondary);
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
	.active {
		background: var(--primary);
	}
	@media (max-width: 768px) {
		.container {
			margin-left: 20px;
			margin-right: 20px;
		}
		.container-top {
			grid-template-columns: 1fr; /* Stack elements vertically on smaller screens */
		}
		.summary {
			margin-left: 0; /* Adjust margin for smaller screens */
		}
		.anime-title,
		.anime-title-native {
			font-size: smaller; /* Adjust font size for smaller screens */
		}
		.anime-des {
			width: 100%; /* Use full width for the description */
		}
		.artplayer-container {
			margin-bottom: 20px; /* Add some space below the player */
		}
	}
</style>
