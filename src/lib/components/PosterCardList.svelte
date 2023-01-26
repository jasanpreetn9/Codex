<script>
	export let animes, heading;
	import { onMount } from 'svelte';
	import Siema from 'siema';
	// onMount(() => {
	// 	slider = new Siema({
	// 		selector: '.card-container',
	// 		duration: 200,
	// 		easing: 'ease-in-out',
	// 		perPage: 7,
	// 		startIndex: 0,
	// 		draggable: true,
	// 		multipleDrag: true,
	// 		threshold: 20,
	// 		// loop: true,
	// 		rtl: false,
	// 		onInit: () => {},
	// 		onChange: () => {}
	// 	}); //end Siema constructor
	// 	prev = () => {
	// 		slider.prev();
	// 		if (select > 0) {
	// 			select--;
	// 		}
	// 	};

	// 	next = () => {
	// 		slider.next();
	// 		if (select >= 0) {
	// 			select++;
	// 		}
	// 	};
	// }); //end onMount
</script>

<h1 class="title">{heading}</h1>
<div class="movies-list">
	<div class="card-container">
		{#each animes as anime}
			<div class="card">
				<img src={anime.image} class="card-img" alt="" />
				<div class="card-body">
					<h2 class="name">{anime.title.english}</h2>
				</div>
			</div>
		{/each}
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
	.movies-list {
		width: 100%;
		height: max-content;
		position: relative;
		margin: 10px 0 20px;
	}

	.card-container {
		/* position: relative; */
		/* display: flex;
		margin: 0 auto;
		align-items: center;
		overflow-x: auto;
		overflow-y: visible;
		scroll-behavior: smooth; */
		
		/* 1 too skinny, too much code */
		/* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; */
		
		/* 2 cleaner code */
		/* grid-template-columns: repeat(12, 1fr); */
		
		/* 3  better sizing, but overflows */
		/* grid-template-columns: repeat(12, minmax(240px, 1fr)); */
		
		/* 4 final */
		height: max-content;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		overflow: hidden;
	}

	.card-container::-webkit-scrollbar {
		display: none;
	}

	.card {
		position: relative;
		width: 100%;
		/* height: 230px; */
		border-radius: 5px;
		overflow: hidden;
		margin-right: 100px;
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 5px;
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
		font-size: 15px;
		font-weight: 500;
		margin-top: 130%;
	}
</style>
