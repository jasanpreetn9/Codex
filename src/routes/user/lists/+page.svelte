<script>
	import {PosterCardList} from '$lib/components';
    export let data;
    const {animeList} = data;
    console.log(animeList)
</script>

<PosterCardList animes={animeList} heading={'List'} />
