<script>
	export let trendingAnimes;
	import Siema from 'siema';
	import { onMount } from 'svelte';
	import pre from '$lib/images/pre.png';
	import nxt from '$lib/images/nxt.png';
	let formatedTredning = [];
	let slider, prev, next, radioSlider;
	trendingAnimes.forEach((anime) => {
		if (formatedTredning.length <= 9) {
			if (anime.cover !== anime.image) {
				formatedTredning.push(anime);
			}
		}
	});
	let select = 0;
	onMount(() => {
		slider = new Siema({
			selector: '.carousel',
			duration: 200,
			easing: 'ease-in-out',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			multipleDrag: true,
			threshold: 20,
			loop: true,
			rtl: false,
			onInit: () => {},
			onChange: () => {}
		}); //end Siema constructor

		prev = () => {
			slider.prev();
			if (select > 0) {
				select--;
			}
		};

		next = () => {
			slider.next();
			if (select >= 0) {
				select++;
			}
		};
	}); //end onMount
</script>

<div class="carousel-container">
	<button on:click={prev} class="pre-btn"><img src={pre} alt="" /></button>
	<button on:click={next} class="nxt-btn"><img src={nxt} alt="" /></button>
	<div class="carousel">
		{#each formatedTredning as anime}
			<div class="slider">
				<div class="slide-content">
					<h1 class="movie-title">{anime.title.english.toLowerCase()}</h1>
					<div class="badges-container">
						<p class="badges">Type: {anime.type}</p>
						<p class="badges">Rating: {anime.rating / 10}</p>
						<p class="badges">Eps: {anime.totalEpisodes}</p>
					</div>
					<p class="movie-des">{@html anime.description}</p>
					<a data-sveltekit-prefetch href={'/AnimeDetail/' + anime.id}>
					<button>Watch</button>
					</a>
				</div>
				<img src={anime.cover} alt="" />
			</div>
		{/each}
	</div>
</div>

<div class="bullet">
	{#each formatedTredning as d, i}
		<input
			bind:this={radioSlider}
			type="radio"
			id={i}
			name="slider-radio"
			value={i}
			checked={select == i}
			on:click={() => {
				slider.goTo(i);
			}}
		/>
	{/each}
</div>

<style>
	.carousel-container {
		margin-top: 70px;
		position: relative;
		width: 100%;
		min-height: 450px;
		height: 400px;
		padding: 20px 0;
		overflow-x: hidden;
	}
	.carousel {
		width: 92%;
		height: 100%;
		position: relative;
		margin: auto;
		height: 400px;
	}
	.slider {
		flex: 0 0 auto;
		margin-right: 30px;
		position: relative;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		width: 100%;
		left: 0;
		transition: 1s;
		overflow: hidden;
		height: 400px;
	}
	.slider img {
		height: 100%;
		object-fit: cover;
		display: block;
		margin-left: auto;
		opacity: 50%;
	}

	.slide-content {
		position: absolute;
		width: 100%;
		height: 100%;
		padding-left: 50px;
		z-index: 2;
		color: #fff;
	}
	.movie-title {
		/* padding-left: 50px; */
		text-transform: capitalize;
		margin-top: 50px;
		font-size: 45px;
	}

	.badges-container {
		display: flex;
		flex-direction: row;
	}

	.badges {
		margin-top: 10px;
		background-color: rgba(13, 17, 26, 0.95);
		padding: 7px;
		border-radius: 16px;
		width: 90px;
		text-align: center;
		font-size: 15px;
		margin-right: 3px;
		opacity: 85%;
	}
	.movie-des {
		width: 40%;
		line-height: 30px;
		margin-top: 20px;
		opacity: 0.9;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	button {
		background: #1f80e0;
		padding: 10px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		text-decoration: none;
		margin-top: 10px;
	}

	.pre-btn,
	.nxt-btn {
		position: absolute;
		top: 0;
		width: 5%;
		height: 100%;
		z-index: 2;
		border: none;
		cursor: pointer;
		outline: none;
	}

	.pre-btn {
		left: 0;
		background: linear-gradient(to right, #0c111b 0%, #0c111b00);
	}

	.nxt-btn {
		right: 0;
		background: linear-gradient(to left, #0c111b 0%, #0c111b00);
	}

	.pre-btn img,
	.nxt-btn img {
		width: 15px;
		height: 20px;
		opacity: 1;
	}
	.bullet {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	input {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		border-radius: 50%;
		width: 10px;
		height: 10px;

		background-color: lightgrey;
		transition: 0.2s all linear;
		margin-right: 5px;
		position: relative;
		cursor: pointer;
	}
	input:checked {
		background-color: rgb(108, 106, 106);
	}
</style>
