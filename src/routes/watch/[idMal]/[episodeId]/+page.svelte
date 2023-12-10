<script>
    export let data;
    import { onMount, onDestroy } from 'svelte';
    import Hls from 'hls.js';
    import Artplayer from 'artplayer';
    import { EpisodeCard, GradientBackground } from '$lib/components';

    // Destructuring the necessary properties from data
    $: ({ details, allEpisodes, episodeSources, episodeId } = data);
    $: ({ episodes, currentEpisode } = allEpisodes);
    let artplayer;

    // Function to handle HLS streaming
    function playM3u8(video, url, art) {
        if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;
            art.on('destroy', () => hls.destroy());
        } else if (video.canPlayType('application/vnd.apple.m3u8')) {
            video.src = url;
        } else {
            art.notice.show = 'Unsupported playback format: m3u8';
        }
    }

    // Function to initialize the Artplayer
    function initPlayer() {
        artplayer = new Artplayer({
            container: '.artplayer-container',
            url: episodeSources?.filter((ep) => ep.default == true)[0]?.url,
            quality: episodeSources,
            autoplay: true,
            pip: true,
            autoSize: true,
            fullscreen: true,
            playsInline: true,
            autoPlayback: true,
            airplay: true,
            theme: '#23ade5',
            type: 'm3u8',
            customType: {
                m3u8: playM3u8
            }
        });
    }

    // Reactive statement to update the video URL when episodeSources changes
    $: if (episodeSources && artplayer) {
        artplayer.switchUrl(episodeSources.filter(ep => ep.default == true)[0]?.url);
    }

    // Lifecycle hook for component mount
    onMount(() => {
        initPlayer();
    });

    // Lifecycle hook for component destruction
    onDestroy(() => {
        if (artplayer) {
            artplayer.destroy();
        }
    });
</script>


<GradientBackground bannerImage={details.bannerImage}>
	<div class="container">
		<div class="container-top">
			<div class="artplayer-container" />
			<div class="summary">
				<h1 class="anime-title">
					{details?.title.english?.toLowerCase() ?? details?.title.native?.toLowerCase()}
				</h1>
				<h1 class="anime-title-native">Episode {currentEpisode?.number}: {currentEpisode.title}</h1>
				<p class="anime-des">
					{details.description}
				</p>
				<a
					data-sveltekit-preload-data="hover"
					href={`/watch/${details.idMal}/${currentEpisode.gogoanime.sub}`}
					class={currentEpisode.gogoanime.sub == episodeId ? 'active type-btn' : 'type-btn'}
				>
					Sub
				</a>
				{#if currentEpisode.hasDub}
					<a
						data-sveltekit-preload-data="hover"
						href={`/watch/${details.idMal}/${currentEpisode.gogoanime.dub}`}
						class={currentEpisode.gogoanime.dub == episodeId ? 'active type-btn' : 'type-btn'}
					>
						Dub
					</a>
				{/if}
			</div>
		</div>
		<div class="container-bottom">
			<EpisodeCard
				{episodes}
				animeId={details.idMal}
				scrollAble={true}
				header={'Episodes'}
				filter={true}
				posterImg={details.coverImage?.extraLarge}
			/>
		</div>
	</div>
</GradientBackground>

<style>
	.artplayer-container {
		width: 100%;
		/* height: 400px; */
		aspect-ratio: 16/9;
	}
	.container {
		margin-left: 40px;
		margin-right: 40px;
	}
	.container-top {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
		grid-gap: 20px;
	}
	.summary {
		margin: auto;
	}
		
	.anime-title {
		text-transform: capitalize;
		/* margin-top: 80px; */
		font-weight: 550;
		font-size: 26px;
	}
	.anime-title-native {
		font-size: 18px;
		font-weight: 400;
	}
	.anime-des {
		width: 94%;
		line-height: 22px;
		margin-top: 15px;
		opacity: 0.8;
		font-size: 14px;
		margin-bottom: 15px;
	}
	.type-btn {
		/* background: var(--primary); */
		background: var(--secondary);
		padding: 10px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: capitalize;
		font-weight: 700;
		font-size: 12px;
		cursor: pointer;
		margin-right: 5px;
		height: max-content;
	}
	.active {
		background: var(--primary);
	}
	@media (max-width: 768px) {
        .container {
            margin-left: 20px;
            margin-right: 20px;
        }
        .container-top {
            grid-template-columns: 1fr; /* Stack elements vertically on smaller screens */
        }
        .summary {
            margin-left: 0; /* Adjust margin for smaller screens */
        }
        .anime-title, .anime-title-native {
            font-size: smaller; /* Adjust font size for smaller screens */
        }
        .anime-des {
            width: 100%; /* Use full width for the description */
        }
        .artplayer-container {
            margin-bottom: 20px; /* Add some space below the player */
        }
    }
</style>
