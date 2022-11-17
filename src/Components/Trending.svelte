<script>
	export let trendingAnimes;
	import pre from '$lib/images/pre.png';
	import nxt from '$lib/images/nxt.png';
	import Siema from 'siema';
	import { onMount } from 'svelte';
	let slider, prev, next, radioSlider;
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
		{#each trendingAnimes as anime}
			<div class="slider">
				<div class="slide-content">
					<h1 class="movie-title">{anime.title.english}</h1>
					<p class="movie-des">{@html anime.description}</p>
					<a data-sveltekit-prefetch data-sveltekit-noscroll href={'/AnimeDetail/' + anime.id}>
						<button class="Details-btn">Details</button>
					</a>
				</div>
				<img src={anime.cover} alt="" />
			</div>
		{/each}
	</div>
</div>

<div class="bullet">
	{#each trendingAnimes as d, i}
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
		position: relative;
		width: 100%;
		height: 450px;
		padding: 20px 0;
		overflow-x: hidden;
		margin-top: 80px;
	}
	.carousel {
		width: 92%;
		height: 100%;
		position: relative;
		margin: auto;
	}
	.slider {
		flex: 0 0 auto;
		margin-right: 30px;
		position: relative;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		width: 100%;
		height: 100%;
		min-width: 100%;
		left: 0;
		transition: 1s;
		overflow: hidden;
	}
	.slider img {
		height: 100%;
		object-fit: cover;
		display: block;
		margin-left: auto;
	}

	.slide-content {
		position: absolute;
		width: 50%;
		height: 100%;
		z-index: 2;
		background: linear-gradient(to right, #030b17 80%, #0c111b00);
		color: #fff;
	}
	.movie-title {
		padding-left: 50px;
		text-transform: capitalize;
		margin-top: 80px;
		font-size: 20px;
	}

	.movie-des {
		width: 80%;
		line-height: 30px;
		padding-left: 50px;
		margin-top: 30px;
		opacity: 0.8;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.Details-btn {
		background: #1f80e0;
		height: 30px;
		padding: 0 20px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		margin-left: 50px;
		cursor: pointer;
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
		width: 8px;
		height: 8px;

		background-color: lightgrey;
		transition: 0.2s all linear;
		margin-right: 5px;

		position: relative;
		top: 4px;
	}
	input:checked {
		background-color: grey;
	}
</style>
