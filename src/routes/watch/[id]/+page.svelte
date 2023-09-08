<script>
	export let data;
	const { details, episodeSources, currentEpisodeDetail } = data;
	import { EpisodeCard } from '$lib/components';


</script>

<main>
	<div class="video">
	</div>
	<div class="blank" />

	<div class="details">
		<div class="container-left">
			<div class="details">
				<h1 class="title">Episode {currentEpisodeDetail.number} - {currentEpisodeDetail.title}</h1>
				<p class="description">{currentEpisodeDetail.description}</p>
				<div class="episodeCards">
					<EpisodeCard
						episodes={details.episodes}
						animeId={details.id}
						scrollable={true}
						filter={true}
						header={'Episodes'}
					/>

				</div>
				<div class="reviews" />
				<div class="sub-dubBtn">
					<a
						href={'/watch/' +
							details.id +
							'?episode=' +
							(currentEpisodeDetail.number + 1) +
							'&dub=true'}
						class="subDub-btn">SUB</a
					>
					<a
						href={'/watch/' +
							details.id +
							'?episode=' +
							(currentEpisodeDetail.number + 1) +
							'&dub=false'}
						class="subDub-btn">DUB</a
					>
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
		background: #1f80e0;
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
</style>
