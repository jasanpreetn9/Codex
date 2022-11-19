<script>
	export let episodes;
</script>

{#if episodes.length > 0}
	<h1 class="title">Epsidoes</h1>
	<div class="card-list">
		<div class="card-container">
			{#each episodes as episode}
				<div class="card">
					<a href={'/Watch/' + episode.id}>
						<img src={episode.image} class="card-img" alt="" />
						<div class="card-body">
							<h2 class="name">{episode.number}: {episode.title}</h2>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.title {
		color: #fff;
		opacity: 0.9;
		padding-left: 4%;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
	}

	.card-list {
		width: 100%;
		position: relative;
		margin: 10px 0 20px;
	}

	.card-container {
		position: relative;
		width: 92%;
		padding-left: 10px;
		height: 165px;
		display: flex;
		margin: 0 auto;
		align-items: center;
		overflow-x: auto;
		overflow-y: visible;
		scroll-behavior: smooth;
	}

	.card-container::-webkit-scrollbar {
		display: none;
	}

	.card {
		position: relative;
		min-width: 240px;
		width: 240px;
		height: 152px;
		border-radius: 5px;
		overflow: hidden;
		margin-right: 15px;
		transition: 0.5s;
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card:hover {
		transform: scale(1.1);
	}

	.card-body {
		opacity: 1;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		background: linear-gradient(to bottom, rgba(4, 8, 15, 0), #192133 90%);
		padding: 10px;
		transition: 0.5s;
	}

	.name {
		color: #fff;
		font-size: 15px;
		font-weight: 500;
		text-transform: capitalize;
		margin-top: 45%;
	}
</style>
