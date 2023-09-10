<script>
	import { page } from '$app/stores';
	export let data;
	const { animeDetails, currentEpObject } = data;
	import { EpisodeCard } from '$lib/components';
</script>

<main>
	<h1>Watch Page</h1>
	<div class="blank" />

	<div class="details">
		<div class="container-left">
			<div class="details">
				<h1 class="title">Episode {currentEpObject.number} - {currentEpObject.title}</h1>
				<p class="description">{currentEpObject.description}</p>
				<div class="episodeCards">
					<EpisodeCard
						episodes={animeDetails.episodes}
						animeId={animeDetails.id}
						scrollAble={true}
						filter={true}
						header={'Episodes'}
					/>
				</div>
				<div class="reviews" />
				<div class="sub-dubBtn">
					<a
						href={'/watch/' + animeDetails.id + '?episode=' + currentEpObject.number + '&dub=false'}
						class={$page.url.searchParams.get('dub') !== 'true'
							? 'subDub-btn-active subDub-btn'
							: 'subDub-btn'}>SUB</a
					>
					{#if currentEpObject.sourcesDub}
						<a
							href={'/watch/' +
								animeDetails.id +
								'?episode=' +
								currentEpObject.number +
								'&dub=true'}
							class={$page.url.searchParams.get('dub') === 'true'
								? 'subDub-btn-active subDub-btn'
								: 'subDub-btn'}>DUB</a
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	* {
		color: white;
	}

	.blank {
		padding: 40px;
	}
	:root {
		--ep-card-width: 150px;
	}
	/* .description {
	} */
	.title {
		margin-bottom: 10px;
		padding: 17px;
		font-size: 40px;
		display: flex;
		justify-content: center;
	}

	.video {
		flex-direction: row;
		width: 100%;
	}
	.episodeCards {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		position: absolute;
		top: 60%;
		left: 60%;
	}
	.details {
		gap: 20px;
		padding: 0px 5px;
		padding-bottom: 20px;
		background: #121821;
		border-radius: 10px;
		height: 700px;
	}
	.description {
		color: rgb(147, 147, 147);
		margin: 5px 25px;
	}

	.subDub-btn {
		background: #16222d;
		padding: 10px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		margin: 20px;
		font-size: 12px;
		margin-right: -5px;
		cursor: pointer;
	}
	.subDub-btn-active {
		background: #1f80e0;
	}
</style>
