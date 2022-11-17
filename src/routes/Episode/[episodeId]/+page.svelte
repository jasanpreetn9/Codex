<script>
	export let data;
	const { streamingLinks } = data;
	console.log(streamingLinks.sources[4].url);
</script>

<video src={streamingLinks.sources[4].url}>
	<track kind="captions" />
</video>

