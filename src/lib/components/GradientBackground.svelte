<script>
	export let bannerImage,coverImage;
</script>

<div class="container">
		<div class="banner">
			<div class="banner-gradient" />
			<img src={bannerImage ?? coverImage} alt="" />
		</div>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.container {
		display: flex;
		height: 100%;
		position: relative;
		margin: auto;
		padding: 20px 0;
	}

	.banner {
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

	.banner img {
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
		margin-top: 100px;
		position: absolute;
		width: 100%;
		height: 100%;
		color: white;
	}

	@media (max-width: 850px) {
		.banner {
			display: none;
		}
	}
</style>
