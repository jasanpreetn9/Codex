<script>
	export let data;
	import { goto } from '$app/navigation';
	import {EpisodeCard,PosterCardList} from '$lib/components'
</script>

<div class="carousel-container">
	<div class="carousel">
		{#if data.cover !== data.image}
			<div class="slider">
				<div class="banner-gradient" />
				<img src={data.cover} alt="" />
			</div>
		{/if}
		<div class="content">
			<div class="content-top">
				<div class="content-left">
					<img class="poster" src={data.image} alt="" />
					<div class="details">
						{#if data.nextAiringEpisode}
							<div class="detail-item">
								<p>Next Airing Episode</p>
								<span>{data.nextAiringEpisode.airingTime}</span>
							</div>
						{/if}
						<div class="detail-item">
							<p>Format</p>
							<span>{data.type.toLowerCase()}</span>
						</div>
						<div class="detail-item">
							<p>Sub / Dub</p>
							<span>{data.subOrDub}</span>
						</div>
						<div class="detail-item">
							<p>Rating</p>
							<span>{data.rating / 10}</span>
						</div>
						<div class="detail-item">
							<p>Episodes</p>
							<span>{data.totalEpisodes}</span>
						</div>
						<div class="detail-item">
							<p>Status</p>
							<span>{data.status}</span>
						</div>
						<div class="detail-item">
							<p>Studios</p>
							<span>{data.studios}</span>
						</div>
						{#each data.relations as relation}
							<div class="detail-item">
								<p>{relation.relationType.replace('_', ' ')}</p>
								<span>
									<a data-sveltekit-prefetch="true" href={'/details/' + relation.id}
										>{relation.title.english ?? relation.title.romaji}</a
									>
								</span>
							</div>
						{/each}
						<div class="detail-item">
							<p>Genres</p>
							<span>{data.genres}</span>
						</div>
					</div>
				</div>
				<div class="content-right">
					<div class="summary">

						<h1 class="anime-title">
							{data.title.english?.toLowerCase() ?? data.title.romaji.toLowerCase()}
						</h1>
						{#if data.title.english.toLowerCase() !== data.title.native.toLowerCase()}
						<h1 class="anime-title-native">{data.title.native}</h1>
						{/if}
						<p class="anime-des">{@html data.description.replace(/&lt;br&gt;/g, '').replace(/\<br\>/g,'')}</p>
						<button on:click={goto('/watch/' + data.id + '?episode=1')} class="watch-btn">Watch Now</button>
					</div>
					{#if data.type.toLowerCase() !== "movie"}
						 <EpisodeCard episodes={data.episodes} animeId={data.id} scrollAble={true}  header={"Episodes"}/>
					{/if}
					<PosterCardList animes={data.recommendations} heading={'Recommended'} />

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
		/* height: 400px; */
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
		/* margin-right: 30px; */
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
		width: 280px;
		border-radius: 7px;
	}
	/* .details {
		color: white;
		margin-top: 20px;
		width: 100%;
		height: max-content;
		background-color: #060b11;
		border-radius: 7px;
		padding: 20px;
	}
	.detail-item {
		padding-bottom: 5px;
		text-transform: capitalize;
		display: flex;
		flex-direction: column;
	}
	.detail-item p {
		font-size: 15px;
		font-weight: 700;
	}
	.detail-item span {
		font-size: 15px;
		line-height: 1.3;
		font-weight: 500;
		padding-left: 10px;
		width: 240px;
		text-transform: capitalize;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.detail-item span a {
		color: white;
	} */
	.details {
		background-color: #060b11;
		border-radius: 7px;
		padding: 20px;
		/* width: 100%; */
		width: 280px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Creates grid columns with minimum width of 240px and maximum 1fr (equal width) */
    /* gap: 10px; Adds a gap between the detail items */
    margin-top: 20px;
	
  }

  .detail-item {
    padding-bottom: 5px;
    text-transform: capitalize;
	
  }

  .detail-item p {
    font-size: 15px;
    font-weight: 700;
  }

  .detail-item span {
    font-size: 15px;
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
	}
	.anime-title-native {
		font-size: 20px;
		font-weight: 400;
	}
	.anime-des {
		width: 94%;
		line-height: 22px;
		margin-top: 15px;
		opacity: 0.8;
	}
	.watch-btn {
		background: #1f80e0;
		height: 40px;
		padding: 0 20px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 15px;
		margin-top: 20px;
		/* margin-bottom: 40px; */
		cursor: pointer;
	}
	.summary {
		min-height: 300px;
	}
	@media (max-width: 850px) {
		.slider {
			display: none;
		}
		.content-left, .content  {
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
		.poster, .details {
			width: 100%;
		}
		.content-right {
		margin-left: 0px;
	}
	}
</style>
