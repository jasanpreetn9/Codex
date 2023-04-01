<script>
	export let data;
	import { goto } from '$app/navigation';
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
							<span>{data.type}</span>
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
									<a href={'/details/' + relation.id}>{relation.title.english}</a>
								</span>
							</div>
						{/each}
						<div class="detail-item">
							<p>Genres</p>
							{#each data.genres as genre}
								<span>{genre}</span>
							{/each}
						</div>
					</div>
				</div>
				<div class="content-right">
					<h1 class="anime-title">
						{data.title.english?.toLowerCase() ?? data.title.romaji.toLowerCase()}
					</h1>
					{#if data.title.english.toLowerCase() !== data.title.native.toLowerCase()}
						<h1 class="anime-title-native">{data.title.native}</h1>
					{/if}
					<p class="anime-des">{@html data.description.split('(Source')[0].split('*')[0]}</p>
					<!-- .replace(/\<br\>/g," ") -->
					<!-- <EpisodeCard episodes={data.episodes} session={data.session} animeId={data.id} /> -->
					<button on:click={goto('/watch/' + data.id)} class="watch-btn">Watch Now</button>
					<h1 class="title">Episodes</h1>
					<div class="video-card-container">
						{#each data.episodes as episode}
							<div class="video-card">
								<a
									data-sveltekit-preload-data="off"
									href={`/watch/${data.id}?episode=${episode.number}`}
								>
									<img src={episode.image} class="video-card-image" alt="" />
									<div class="card-body">
										<h2 class="ep-title">{episode.number}: {episode.title}</h2>
										{#if data.session}
											content here
											<div class="progress-background">
												<div class="progress" style="width: 100%;" />
											</div>
										{/if}
									</div>
								</a>
							</div>
						{/each}
					</div>
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
	.details {
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
		padding-left: 4px;
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
		margin-top: 10px;
		cursor: pointer;
	}
	.title {
		margin-top: 10px;
		color: #fff;
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
	}
	.video-card-container {
		position: relative;
		margin: auto;
		height: max-content;
		display: flex;
		margin-bottom: 20px;
		justify-content: space-between;
		display: grid;
		gap: 0.6em;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}

	.video-card {
		position: relative;
		width: 300px;
		margin-top: 10px;
		height: 100%;
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		background: #030b17;
	}

	.video-card-image {
		width: 100%;
		height: 100%;
		border-radius: 5px;

		object-fit: cover;
	}

	.card-body {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		background: linear-gradient(rgba(4, 8, 15, 0) 27.31%, #192133f8 97.9%);
		padding: 10px;
		transition: 0.5s;
		border-radius: 5px;
		background-color: transparent;
	}

	.ep-title {
		color: #fff;
		font-size: 18px;
		font-weight: 500;
		margin-top: 40%;
		text-transform: capitalize;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.progress-background {
		position: absolute;
		width: 93%;
		height: 8px;
		margin-top: 6px;
		padding-top: 1px;
		background: #424345;
		border-radius: 20px;
	}
	.progress {
		position: absolute;
		height: 8px;
		margin-top: -1px;
		background: #e6e9ff;
		border-radius: 20px;
	}
	@media (max-width: 850px) {
		.slider {
			display: none;
		}
		.content-left {
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
		.poster {
			width: 100%;
		}
	}
</style>
