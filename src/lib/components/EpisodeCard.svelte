<h1 class="title">Continue Watching</h1>
<div class="video-card-container">
	<div class="video-card">
		<img
			src="https://artworks.thetvdb.com/banners/series/81797/episodes/5fcc388fc75dd.jpg"
			class="video-card-image"
			alt=""
		/>
		<div class="card-body">
			<h2 class="name">Demon Slayer: ... S01E10</h2>
			<div class="progress-background">
				<div class="progress" style="width: 100%;" />
			</div>
			<div class="details">
				<p class="ep-name">Cruelty: S01 E01</p>
				<p class="watch-time">10:21 / 24:58</p>
			</div>
		</div>
	</div>
	<div class="video-card">
		<img
			src="https://artworks.thetvdb.com/banners/series/81797/episodes/5fcc388fc75dd.jpg"
			class="video-card-image"
			alt=""
		/>
		<div class="card-body">
			<h2 class="name">One Piece</h2>
			<!-- <div class="progress-background">
				<div class="progress" style="width: 100%;" />
			</div> -->
		</div>
	</div>
	<div class="video-card">
		<img
			src="https://artworks.thetvdb.com/banners/series/81797/episodes/5fcc388fc75dd.jpg"
			class="video-card-image"
			alt=""
		/>
		<div class="card-body">
			<h2 class="name">Naruto</h2>
			<div class="progress-background">
				<div class="progress" style="width: 100%;" />
			</div>
		</div>
	</div>
	<div class="video-card">
		<img
			src="https://artworks.thetvdb.com/banners/series/81797/episodes/5fcc388fc75dd.jpg"
			class="video-card-image"
			alt=""
		/>
		<div class="card-body">
			<h2 class="name">Hunter x Hunter</h2>
			<div class="progress-background">
				<div class="progress" style="width: 100%;" />
			</div>
		</div>
	</div>
	<div class="video-card">
		<img
			src="https://artworks.thetvdb.com/banners/series/81797/episodes/5fcc388fc75dd.jpg"
			class="video-card-image"
			alt=""
		/>
		<div class="card-body">
			<h2 class="name">Anime Title</h2>
			<div class="progress-background">
				<div class="progress" style="width: 50%;" />
			</div>
		</div>
	</div>
</div>

<style>
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
		/* grid-template-rows: repeat(auto-fill, minmax(170px, 1fr)); */
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		overflow: hidden;
	}

	.video-card {
		position: relative;
		width: 300px;
		margin-top: 10px;
		height: 170px;
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
	}

	.name {
		color: #fff;
		font-size: 18px;
		font-weight: 500;
		margin-top: 35%;
		text-transform: capitalize;
		display: -webkit-box;
		-webkit-line-clamp: 1;
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
	.details {
		color: white;
		display: flex;
		flex-direction: row;
		margin-top: 6%;
		font-size: 14px;
		width: 100%;
		justify-content: space-between;
	}
	.ep-name {
		font-size: 14px;
	}
	.watch-time {
		font-size: 14px;
	}
</style>
