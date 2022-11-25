<script>
	export let anime, reload;
	const { id, image, title } = anime;
	import { invalidateAll } from '$app/navigation';
	function rerunLoadFunction() {
		invalidate('app:AnimeDetail');
		invalidate('/AnimeDetail');
		invalidateAll();
	}
</script>

<div class="card">
	{#if reload}
		<a
			data-sveltekit-prefetch
			data-sveltekit-noscroll
			on:click={rerunLoadFunction()}
			href={'/AnimeDetail/' + id}
		>
			<img src={image} class="card-img" alt={title.english} />
			<div class="card-body">
				<p class="name">{title.english}</p>
			</div>
		</a>
	{:else}
		<a data-sveltekit-prefetch data-sveltekit-noscroll href={'/AnimeDetail/' + id}>
			<img src={image} class="card-img" alt={title.english} />
			<div class="card-body">
				{#if title.english == null}
					<p class="name">{title.romaji}</p>
				{:else}
					<p class="name">{title.english}</p>
				{/if}
			</div>
		</a>
	{/if}
</div>

<style>
	.card {
		position: relative;
		min-width: 150px;
		width: 150px;
		height: 200px;
		border-radius: 5px;
		overflow: hidden;
		margin-right: 11px;
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
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		background: linear-gradient(to bottom, rgba(4, 8, 15, 0), #192133 95%);
		padding: 10px;
		transition: 0.5s;
		opacity: 1;
		text-align: bottom;
		border-radius: 5px;

	}

	.name {
		color: #fff;
		font-size: 14px;
		font-weight: 500;
		text-transform: capitalize;
		margin-top: 120%;
	}
	p {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
