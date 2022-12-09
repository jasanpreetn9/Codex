<script>
	export let anime, reload;
	const { id, image, title, rating } = anime;
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
			<div class="card-body" />
			{#if title.english == null}
				<p class="name">{title.romaji.toLowerCase()}</p>
			{:else}
				<p class="name">{title.english.toLowerCase()}</p>
			{/if}
			<span>{rating / 10}</span>
		</a>
	{/if}
</div>

<style>
	.card {
		position: relative;
		min-width: 155px;
		width: 155px;
		height: 220px;
		border-radius: 5px;
		margin-right: 12px;
		transition: 0.5s;
		margin-bottom: 15px;
	}
	a {
		text-decoration: none;
	}
	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 7px;
	}

	.card-body {
		width: 100%;
		height: 220px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		background: linear-gradient(to bottom, rgba(4, 8, 15, 0), #192133 95%);
		padding: 10px;
		transition: 0.5s;
		opacity: 1;
		text-align: bottom;
		border-radius: 7px;
	}

	.name {
		color: #fff;
		font-size: 16px;
		font-weight: 400;
		text-transform: capitalize;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-transform: capitalize;
	}
	span {
		color: #fff;
		font-size: 12px;
		font-weight: 300;
	}
</style>
