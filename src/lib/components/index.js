import PosterCardList from './PosterCardList.svelte';
import EpisodeCard from './EpisodeCard.svelte';
import Trending from './Trending.svelte';
import nxt from '$lib/images/nxt-carousel.png';
import pre from '$lib/images/pre-carousel.png';

let apiUrl = 'https://consumet-swart.vercel.app/';
export { PosterCardList, EpisodeCard, Trending, apiUrl,nxt,pre };
