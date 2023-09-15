<script>
	export let data;
	$: ({ details, streamed,dubBool,user } = data);
	import { EpisodeCard, PosterCardList } from '$lib/components';
</script>

<div class="carousel-container">
	<div class="carousel">
		{#if details?.bannerImage !== details.image}
			<div class="slider">
				<div class="banner-gradient" />
				<img src={details.bannerImage} alt="" />
			</div>
		{/if}
		<div class="content">
			<div class="content-top">
				<div class="content-left">
					<img class="poster" src={details.coverImage?.extraLarge} alt="" />
					<div class="details">
						{#if details.nextAiringEpisode}
							<div class="detail-item">
								<p>Next Airing Episode</p>
								<span>{details.nextAiringEpisode.airingAt}</span>
							</div>
						{/if}
						<div class="detail-item">
							<p>Sub or Dub</p>
							<span>{dubBool === true ? 'Dub' : 'Sub'}</span>
						</div>
						<div class="detail-item">
							<p>Format</p>
							<span>{details.format?.toLowerCase()}</span>
						</div>
						<div class="detail-item">
							<p>Rating</p>
							<span>{details.meanScore / 10}</span>
						</div>
						{#await streamed.episodes then value}
							{#if details.format?.toLowerCase() !== 'movie'}
								<div class="detail-item">
									<p>Episodes</p>
									<span>{value?.length}</span>
								</div>
							{/if}
						{/await}
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
							{@html details.description.replace(/&lt;br&gt;/g, '').replace(/\<br\>/g, '')}
						</p>
						<a href={'/watch/' + details.id + '?episode=1'} class="watch-btn">Watch Now</a>
					</div>
					{#if details.format?.toLowerCase() !== 'movie'}
						{#await streamed.episodes}
							Loading...
						{:then value}
							<EpisodeCard
								episodes={value}
								animeId={details.id}
								scrollAble={true}
								header={'Episodes'}
								filter={true}
							/>
						{/await}
					{/if}
					<PosterCardList animes={details.recommendations} heading={'Recommended'} dub={user?.alwaysDub}/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	a {
		text-decoration: none;
	}
	.carousel-container {
		position: relative;
		width: 100%;
		padding: 20px 0;
		margin-top: 80px;
	}

	.carousel {
		display: flex;
		height: 100%;
		position: relative;
		margin: auto;
	}

	.slider {
		flex: 0 0 auto;
		position: relative;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		width: 100%;
		height: 100%;
		left: 0;
		transition: 1s;
		overflow: hidden;
	}

	.slider img {
		width: 100%;
		min-height: 100%;
		object-fit: cover;
		display: block;
		margin-left: auto;
		height: 300px;
	}

	.banner-gradient {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, #0c111b, #0c111b00);
	}
	.content {
		margin-top: 135px;
		position: absolute;
		width: 100%;
		height: 100%;
		color: white;
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
		background: #1f80e0;
		padding: 10px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		margin-top: 20px;
		cursor: pointer;
	}
	.summary {
		min-height: 200px;
		margin-bottom: 10px;
	}
	@media (max-width: 850px) {
		.slider {
			display: none;
		}
		.content-left,
		.content {
			margin: 0;
		}
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
