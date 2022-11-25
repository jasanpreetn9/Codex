<script>
	export let data;
	// const { streamingLinks } = data;
	// let defaultIndex;
	// for (let index = 0; index < streamingLinks.length; index++) {
	// 	if (streamingLinks[index].quality == 'default') {
	// 		defaultIndex = index;
	// 	}
	// }
	// const defaultUrl = streamingLinks[defaultIndex].url;
</script>

<!-- svelte-ignore a11y-media-has-caption -->

<section class="anime-detail">
	<div class="container">
		<div class="anime-detail-banner">
			<img src='https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg' alt="Poster" />
		</div>
		<div class="anime-detail-content">
			<h1 class="h1 detail-title">Attack on Titan</h1>
			<p class="storyline">
				Several hundred years ago, humans were nearly exterminated by titans. Titans are typically
				several stories tall, seem to have no intelligence, devour human beings and, worst of all,
				seem to do it for the pleasure rather than as a food source. A small percentage of
				humanity survived by walling themselves in a city protected by extremely high walls, even
				taller than the biggest of titans. Flash forward to the present and the city has not seen
				a titan in over 100 years. Teenage boy Eren and his foster sister Mikasa witness something
				horrific as the city walls are destroyed by a colossal titan that appears out of thin air.
				As the smaller titans flood the city, the two kids watch in horror as their mother is
				eaten alive. Eren vows that he will murder every single titan and take revenge for all of
				mankind. (Source: MangaHelpers)
			</p>
		</div>
	</div>
</section>

<style>
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	img {
		display: block;
	}
	.container {
		padding-inline: 15px;
	}
	.h1 {
		color: white;
		line-height: 1.2;
		font-size: 36px;
	}
	.anime-detail {
		padding-top: 120px;
		padding-bottom: 60px;
	}
	.anime-detail-banner {
		position: relative;
		background: hsl(229, 15%, 21%);
		margin-inline: auto;
		border-radius: 6px;
		overflow: hidden;
		margin-bottom: 50px;
	}
	.anime-detail-banner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.detail-title {
		margin-bottom: 20px;
	}

	.storyline {
		color: hsl(0, 0%, 74%);
		font-size: 14px;
		font-weight: 500;
		line-height: 1.8;
		margin-bottom: 40px;
	}
	@media (min-width: 550px) {
		:root {
			--fs-1: 42px;
		}
		.container {
			margin-inline: auto;
		}
		.detail-title {
			--fs-1: 46px;
		}
	}
	@media (min-width: 768px) {
		:root {
			--fs-2: 36px;
		}

		.container {
			max-width: 720px;
		}
		.detail-title {
			--fs-1: 50px;
		}
	}

	@media (min-width: 992px) {
		.container {
			max-width: 960px;
		}
		.anime-detail {
			padding-bottom: 60px;
		}
		.anime-detail .container {
			position: relative;
			display: flex;
			align-items: center;
			gap: 50px;
		}
		.anime-detail-banner {
			margin: 0;
		}
	}

	@media (min-width: 1200px) {
		.container {
			max-width: 1320px;
		}
		.anime-detail {
			padding-bottom: 60px;
		}
		.anime-detail-content {
			max-width: 1000px;
		}
	}
</style>
