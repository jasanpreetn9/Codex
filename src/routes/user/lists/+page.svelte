<script>
	import {PosterCardList} from '$lib/components';
    export let data;
    const {animeList} = data;
</script>

<PosterCardList animes={animeList} heading={'List'} />
