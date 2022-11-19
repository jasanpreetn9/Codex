<script>
	export let data;
	const { streamingLinks } = data;
	let defaultIndex
	for (let index = 0; index < streamingLinks.length; index++) {
		if((streamingLinks[index].quality) == 'default'){
			defaultIndex = index
		}	
	}
	const defaultUrl = streamingLinks[defaultIndex].url
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video src={defaultUrl}></video>



