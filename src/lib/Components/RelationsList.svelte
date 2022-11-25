<script>
	export let relations;
	console.log(relations);
	import { invalidateAll } from '$app/navigation';
	relations.sort((a, b) => (a.relationType > b.relationType ? 1 : -1));
	function rerunLoadFunction() {
		invalidate('app:AnimeDetail');
		invalidate('/AnimeDetail');
		invalidateAll();
	}
</script>

<h1 class="title">Related</h1>
<div class="relations">
	{#each relations as relation}
		<a href={'/AnimeDetail/' + relation.id} on:click={rerunLoadFunction()}>
			<div class="card">
				<img src={relation.image} alt="" />
				<div class="details_container">
					<p class="montserrat">{relation.relationType.toLowerCase()}</p>
					<h2 class="name">{relation.title.english}</h2>
					<p class="description">{relation.description}</p>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.title {
		color: #fff;
		opacity: 0.9;
		padding-left: 5%;
		padding-bottom: 5px;
		text-transform: capitalize;
		font-size: 22px;
		font-weight: 500;
	}
	.relations {
		position: relative;
		width: 92%;
		padding-left: 10px;
		height: 220px;
		display: flex;
		margin: 0 auto;
		align-items: center;
		overflow-x: auto;
		overflow-y: visible;
		scroll-behavior: smooth;
		width: 92%;
		padding-left: 10px;
		margin: 0 auto;
		padding-bottom: 20px;
	}
	a {
		text-decoration: none;
	}
	.card {
		border-radius: 10px;
		display: flex;
		width: 400px;
		background-color: #030b17;
		color: white;
		height: 200px;
		margin-right: 11px;
	}

	img {
		width: 150px;
		height: 200px;
		object-fit: cover;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	.details_container {
		color: white;
		width: 50%;
		padding-left: 1rem;
		padding-top: 1rem;
	}
	.montserrat {
		letter-spacing: 1px;
		font-size: 13px;
		margin-bottom: 0.75rem;
		text-transform: capitalize;
	}
	h2 {
		color: white;
		font-weight: 500;
		margin-bottom: 0.75rem;
	}

	.details_container .description {
		color: white;
		font-size: 14px;
		line-height: 22px;
		margin-bottom: 1.75rem;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
