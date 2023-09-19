<script>
	export let trendingAnimes;
	import { onMount } from 'svelte';
	import Siema from 'siema';
	import { pre, nxt } from '$lib/utils';
	console.log(trendingAnimes);
	let slider, prev, next, radioSlider;
	let select = 0;
	let timer;

	onMount(() => {
		slider = new Siema({
			selector: '.carousel',
			duration: 500,
			easing: 'ease-in-out',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			multipleDrag: true,
			threshold: 20,
			loop: true,
			rtl: false,
			onInit: () => {},
			onChange: () => {
				select = slider.currentSlide;
				restartTimer();
			}
		});

		prev = () => {
			slider.prev();
			restartTimer();
		};

		next = () => {
			slider.next();
			restartTimer();
		};

		startTimer();
		function startTimer() {
			timer = setInterval(function () {
				slider.next();
			}, 3000);
		}

		function restartTimer() {
			clearInterval(timer);
			startTimer();
		}
	});
</script>

<div class="carousel-container">
	<button on:click={prev} class="pre-btn"><img src={pre} alt="" /></button>
	<button on:click={next} class="nxt-btn"><img src={nxt} alt="" /></button>
	<div class="carousel">
		{#each trendingAnimes as anime}
			<div class="slider">
				<div class="slide-content">
					<h1 class="anime-title">
						{anime.title.english?.toLowerCase() ?? anime.title.romaji.toLowerCase()}
					</h1>
					<div class="badges-container">
						<p class="badges">Type: {anime.format}</p>
						<span class="dots" />
						<p class="badges">Rating: {anime.meanScore / 10}</p>
						<span class="dots" />
						<p class="badges">
							Eps: {anime.nextAiringEpisode && anime.nextAiringEpisode.episode !== null
								? anime.nextAiringEpisode.episode - 1
								: anime.episode}
						</p>
					</div>
					<p class="anime-des">
						{@html anime.description?.replace(/&lt;br&gt;/g, '').replace(/\<br\>/g, '')}
					</p>
					<a class="watch-btn" data-sveltekit-prefetch="true" href={'/details/' + anime.id}>Watch</a
					>
				</div>
				<img src={anime.bannerImage} alt="" loading="lazy" />
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
		padding: 10px 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.pre-btn,
	.nxt-btn {
		position: absolute;
		top: 0;
		width: 3%;
		height: 100%;
		z-index: 2;
		border: none;
		cursor: pointer;
		outline: none;
		background-color: transparent;
	}

	.pre-btn {
		left: 0;
	}

	.nxt-btn {
		right: 0;
	}

	.pre-btn img,
	.nxt-btn img {
		width: 15px;
		height: 20px;
		opacity: 1;
	}

	.carousel {
		position: relative;
		margin: auto;
		height: 300px;
		border-radius: 5px;
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
		height: 300px;
	}

	.slider img {
		margin: 0 auto;
		height: 100%;
		object-fit: cover;
		opacity: 0.7;
		border-radius: 5px;
	}

	.slide-content {
		position: absolute;
		width: 100%;
		height: 60%;
		padding-left: 50px;
		z-index: 2;
		color: #fff;
	}

	.anime-title {
		width: 100%;
		max-width: 300px;
		text-transform: capitalize;
		margin-top: 20px;
		font-size: 27px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.badges-container {
		display: flex;
		flex-wrap: wrap;
		max-width: 300px;
	}

	.badges {
		margin-top: 10px;
		padding: 6px;
		border-radius: 16px;
		text-align: center;
		font-size: 14px;
		margin-right: 3px;
		opacity: 85%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.dots {
		margin-top: 21.5px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: white;
		display: inline-block;
	}

	.anime-des {
		width: 40%;
		line-height: 24px;
		margin-top: 5px;
		opacity: 0.9;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
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
		cursor: pointer;
		text-decoration: none;
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

	@media (max-width: 768px) {
		.carousel-container {
			padding: 5px 0;
		}

		.carousel {
			height: 250px;
		}

		.slider {
			margin-right: 15px;
			height: 300px;
		}

		.slider img {
			border-radius: 3px;
		}
		.anime-des {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			width: 70%;
		}
	}

	@media (max-width: 756px) {
		.carousel {
			height: 280px;
		}

		.slider {
			margin-right: 10px;
			height: 250px;
		}
		.nxt-btn {
			margin-right: 10px;
		}
	}
</style>
