<script>
	import { invalidateAll } from '$app/navigation';
	export let relations;
	relations.sort((a, b) => (a.relationType > b.relationType ? 1 : -1));
</script>

<h1 class="title">Related</h1>
<div class="relations">
	{#each relations as relation}
		<a href={'/AnimeDetail/' + relation.id} on:click={invalidateAll()}>
			<div class="card">
				<img src={relation.image} alt="" />
				<div class="details_container">
					<p class="montserrat">{relation.relationType.toLowerCase().replace('_', ' ')}</p>
					{#if relation.title.englsih == null}
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
</style>
