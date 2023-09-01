<script>
	export let data;
	const { trendingAnimes, popularAnimes, recentAiringAnimes } = data;
	import { PosterCardList, Trending, EpisodeCard } from '$lib/components';
	import { Icon, ArrowUp, Filter } from "svelte-hero-icons";
	let continueWatching;
	if (!import.meta.env.SSR) {
		// get local storage
		let object = localStorage.getItem('continueWatching');
		if (object) {
			continueWatching = JSON.parse(object);
		}
	}
</script>

<Trending {trendingAnimes} />

{#if continueWatching.length > 0}
	<EpisodeCard
		episodes={continueWatching}
		scrollAble={false}
		header={'Continue Watching'}
		filter={false}
	/>
{/if}
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />
<PosterCardList animes={recentAiringAnimes} heading={'Recent Airing'} />
<footer class="footer">
	<div class="footer-logo">
		コーデックス
	</div>
	<div class="footer-links">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="#">Browse</a></li>
			<li><a href="#">Categories</a></li>
			<li><a href="#">My List</a></li>
			<li><a href="#">Account</a></li>
		</ul>
	</div>
	<div class="footer-contact">
		<p>Contact Us:</p>
		<p>Email: info@animestreamhub.com</p>
		<p>Phone: [Your Phone Number]</p>
		<p>Address: [Your Address]</p>
	</div>
</footer>

<style>
	body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

.footer {
    background-color: #161b24;
	margin: 20px;
    color: #fff;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
	border-radius: 20px;
}

.footer-logo img {
    max-width: 100px;
    height: auto;
}

.footer-links ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.footer-links li {
    display: inline;
    margin-right: 20px;
}
li:hover {
    cursor: pointer;
}

.footer-links a {
    color: #fff;
    text-decoration: none;
}
.footer-links:hover{
	cursor: pointer;
}

.footer-social a img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.footer-contact p {
    margin: 0;
}

.footer-contact p:first-child {
    font-weight: bold;
    margin-bottom: 10px;
}

</style>
