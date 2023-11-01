<script>
	export let bannerImage;
</script>

<div class="carousel-container">
	<div class="carousel">
		<div class="slider">
			<div class="banner-gradient" />
			<img src={bannerImage} alt="" />
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</div>

<style>
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

	@media (max-width: 850px) {
		.slider {
			display: none;
		}
	}
</style>
