<script>
	export let data;
	console.log(data.session);
	import { Trending, PosterCardList } from '$lib/components';
	const { trendingAnimes, popularAnimes } = data;
</script>

<Trending {trendingAnimes} />
<PosterCardList animes={popularAnimes} heading={'Popular Animes'} />

<!-- {#if data.session}
	<p>Welcome, {data.session.user.email}</p>

{:else}
	<p>Let's learn how to register and login users!</p>
	<div class="auth-buttons">
		<a href="/login" class="btn btn-primary">Login</a>
		<a href="/register" class="btn btn-secondary">Register</a>
	</div>
{/if} -->
