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
						</dl>
					</div>
				</div>
				<div class="content-right">
					{#if data.relations !== 0}
						<div class="relations">
							{#each data.relations as relation}
								<a href={'/details/' + relation.id}>
									<div class="relation-card">
										<img src={relation.image} alt="" />
										<div class="details_container">
											<p class="montserrat">
												{relation.relationType.toLowerCase().replace('_', ' ')}
											</p>
											{#if relation.title.english == null}
												<h2 class="name">{relation.title.romaji.toLowerCase()}</h2>
											{:else}
												<h2 class="name">{relation.title.english.toLowerCase()}</h2>
											{/if}
											<p class="description">
												<i>
													Type: {relation.type.toLowerCase()}<br />
													Status: {relation.status}</i
												>
											</p>
										</div>
									</div>
								</a>
							{/each}
						</div>
					{/if}
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
	.content-bottom {
		margin-left: 60px;
		display: flex;
		flex-direction: row;
	}
	.content-right {
		margin-top: 10px;
		margin-left: 30px;
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
	.relations {
		position: relative;
		height: 220px;
		display: flex;
		flex-wrap: wrap;
		margin: 0 auto;
		align-items: center;
		/* overflow-x: auto;
		overflow-y: visible; */
		scroll-behavior: smooth;
	}
	.relation-card {
		border-radius: 7px;
		display: flex;
		/* width: 400px; */
		background-color: #030b17;
		color: white;
		height: 200px;
		margin-right: 11px;
		width: 420px;
	}

	.relation-card img {
		width: 150px;
		height: 200px;
		object-fit: cover;
		border-top-left-radius: 7px;
		border-bottom-left-radius: 7px;
	}

	.details_container {
		color: white;
		padding-left: 1rem;
		padding-top: 1rem;
	}
	.montserrat {
		letter-spacing: 1px;
		font-size: 13px;
		margin-bottom: 0.75rem;
		text-transform: capitalize;
	}
	.relation-card h2 {
		color: white;
		font-weight: 500;
		margin-bottom: 0.75rem;
		display: -webkit-box;
		text-transform: capitalize;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.details_container .description {
		color: white;
		font-size: 14px;
		line-height: 22px;
		padding-right: 10px;
		margin-bottom: 1.75rem;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	i {
		text-transform: capitalize;
	}
	.relations::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 850px) {
		.slider {
			display: none;
		}
		.content-left {
			margin: 0;
		}
		.content-top{
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
		.relation-card {
			margin-top: 20px;
		}
		.poster {
			width: 100%;
		}
	}
</style>
