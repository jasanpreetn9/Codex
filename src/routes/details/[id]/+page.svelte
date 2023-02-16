<script>
	export let data;
	import { EpisodeCard } from '$lib/components';
</script>

<div class="carousel-container">
	<div class="carousel">
		<div class="slider">
			<div class="banner-gradient" />
			<img src={data.cover} alt="" />
		</div>
		<div class="content">
			<div class="content-left">
				<img class="poster" src={data.image} alt="" />
				<div class="details">
					<dl>
						<dd>Type: {data.type}</dd>
						<dd>Rating: {data.rating / 10}</dd>
						<dd>Episodes: {data.totalEpisodes}</dd>
						<dd>Status: {data.status}</dd>
						<dd>Release Date: {data.releaseDate}</dd>
						<dd>Studios: {data.studios}</dd>
					</dl>
				</div>
			</div>
			<div class="content-right">
				<h1 class="anime-title">{data.title.english}</h1>
				{#if data.title.english.toLowerCase() !== data.title.native.toLowerCase()}
					<h1 class="anime-title-native">{data.title.native}</h1>
				{/if}

				<p class="anime-des">{@html data.description}</p>
				<!-- .replace(/\<br\>/g," ") -->
				<EpisodeCard episodes={data.episodes} session={data.session} animeId={data.id} />
			</div>
		</div>
	</div>
</div>

<style>
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
		display: flex;
		flex-direction: row;
	}
	.content-left {
		margin-left: 60px;
	}
	.poster {
		width: 280px;
		border-radius: 7px;
	}
	.details {
		color: white;
		margin-top: 20px;
		background-color: #060b11;
	}
	.content-right {
		margin-top: 10px;
		margin-left: 30px;
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

	@media (max-width: 850px) {
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.poster {
			width: 100%;
		}
	}
</style>
