<script>
	import {  goto } from '$app/navigation';
	import '$lib/global.css';
	let inputValue = '';
</script>

<nav class="navbar">
	<li class="nav-title"><a data-sveltekit-prefetch="true" href="/">コーデックス</a></li>
	<!-- <ul class="nav-links">
		<li class="nav-items"><a href="/">Movies</a></li>
		<li class="nav-items"><a href="/">TV series</a></li>
		<li class="nav-items"><a href="/">Most popular</a></li>
		<li class="nav-items"><a href="/">Lists</a></li>
	</ul> -->

	<form on:submit|preventDefault={() => goto('/search/?query=' + inputValue)} class="right-container">
		<input
			type="text"
			id="search-box"
			class="search-box"
			bind:value={inputValue}
			placeholder="search"
		/>
	</form>
</nav>
<main>
	<slot />
</main>

<style>
	.navbar {
		width: 100%;
		height: 80px;
		position: fixed;
		top: 0;
		left: 0;
		padding: 0 4%;
		background: linear-gradient(#0d111a, 90%, transparent);
		z-index: 9;
		display: flex;
		align-items: center;
	}

	.nav-links {
		margin-top: 10px;
		display: flex;
		list-style: none;
	}

	.nav-items a {
		text-decoration: none;
		margin-left: 20px;
		text-transform: capitalize;
		color: #fff;
		opacity: 0.9;
	}
	.nav-title {
		margin-top: 10px;
		display: flex;
		list-style: none;
	}

	.nav-title a {
		text-decoration: none;
		text-transform: capitalize;
		color: #fff;
		opacity: 0.9;
	}

	.right-container {
		display: block;
		margin-left: auto;
	}

	.search-box {
		border: none;
		border-bottom: 1px solid #aaa;
		background: transparent;
		outline: none;
		height: 30px;
		color: #fff;
		width: 250px;
		text-transform: capitalize;
		font-size: 16px;
		font-weight: 500;
		transition: 0.5s;
	}

	.search-box:focus {
		width: 400px;
		border-color: #1f80e0;
	}

	.logout-login-btn {
		background: #1f80e0;
		height: 30px;
		padding: 0 20px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		margin: 0 10px;
		cursor: pointer;
	}

	main {
		margin-top: 80px;
		padding: 0 4%;
	}
</style>
