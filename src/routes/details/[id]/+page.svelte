<script>
	export let data;
	import { goto } from '$app/navigation';
</script>

<div class="carousel-container">
	<div class="carousel">
		<div class="slider">
			<div class="banner-gradient" />
			<img src={data.cover} alt="" />
		</div>
		<div class="content">
			<div class="content-top">
				<div class="content-left">
					<img class="poster" src={data.image} alt="" />
				</div>
				<div class="content-right">
					<h1 class="anime-title">{data.title.english}</h1>
					{#if data.title.english.toLowerCase() !== data.title.native.toLowerCase()}
						<h1 class="anime-title-native">{data.title.native}</h1>
					{/if}
					<p class="anime-des">{@html data.description.split('(Source')[0].split('*')[0]}</p>
					<!-- .replace(/\<br\>/g," ") -->
					<!-- <EpisodeCard episodes={data.episodes} session={data.session} animeId={data.id} /> -->
					<button on:click={goto('/watch/' + data.id)} class="watch-btn">Watch Now</button>
				</div>
			</div>
			<div class="content-bottom">
				<div class="content-left">
					<div class="details">
						<dl>
							<dd>Type: {data.type}</dd>
							<dd>Rating: {data.rating / 10}</dd>
							<dd>Episodes: {data.totalEpisodes}</dd>
							<dd>Status: {data.status}</dd>
							<dd>Release Date: {data.releaseDate}</dd>
							<dd>Studios: {data.studios}</dd>
							{#each data.relations as relation}
								<dd>
									{relation.relationType.toLowerCase().replace('_', ' ')}:
									<a href={'/details/' + relation.id}>{relation.title.english.toLowerCase()}</a>
								</dd>
							{/each}
						</dl>
					</div>
				</div>
				<div class="content-right">
					<div class="episodesList">
						{#each data.episodes as episode, index}
							<div class="episodeCard">
								<p>{`${episode.number}: ${episode.title}`}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<!-- <div class="episodesList">
				{#each data.episodes as episode, index}
				<div class="episodeCard">
					<p>{`${episode.number}: ${episode.title}`}</p>
				</div>
				{/each}
			</div> -->
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
	.content-bottom {
		margin-left: 60px;
		display: flex;
		flex-direction: row;
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
		width: 280px;
		height: max-content;
		background-color: #060b11;
		height: 200px;
		border-radius: 7px;
	}
	.details dd {
		text-transform: capitalize;
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
	.episodesList {
		/* margin-left: 60px; */
		/* height: max-content; */
		/* overflow-x: auto;
		overflow-y: visible; */
		/* display: grid;  */
		/* grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); */
		/* background-color: #04080f; */
		/* padding: 10px; */
		/* border-radius: 7px; */
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		/* background-color: #2196f3; */
		gap: 1rem;
		width: 94%;
		/* padding: 10px; */
		margin-top: 10px;
	}
	.episodeCard {
		border: 1px solid white;
		/* width: 375px; */
		height: 42px;
		border-radius: 3px;
		background: rgba(22, 22, 22, 0.05);
		text-align: left;
		padding: 12px;
		/* margin: 5px; */
		background-color: #040f20;
	}
	.episodeCard p {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
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
		.content-bottom {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0;
			align-items: center;
		}
		.content-left {
			width: 100%;
		}
		.poster {
			width: 100%;
		}
	}
</style>
