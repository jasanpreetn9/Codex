<script>
	export let data;
	$: ({ animeList, details, continueWatching, streamed, user } = data);
	import { EpisodeCard, PosterCardList, GradientBackground } from '$lib/components';
</script>

<GradientBackground bannerImage={details.bannerImage}> 
	<h1>Watch Page</h1>
	{#if details.format?.toLowerCase() !== 'movie'}
				{#await streamed.episodesList}
					Loading...
				{:then value}
					<EpisodeCard
						episodes={value.data}
						pagination={value.pagination}
						animeId={details.idMal}
						scrollAble={true}
						header={'Episodes'}
						filter={true}
						{page}
						posterImg={details.coverImage?.extraLarge}
					/>
				{:catch error}
					{error.message}
				{/await}
			{/if}
</GradientBackground>
