<script>
	import './global.css';
	import { goto } from '$app/navigation';
	import logo from '$lib/images/logo.svg';
	let inputValue = '';
	const submitSearch = () => {
		goto('/Search/' + inputValue);
	};
</script>

<scelte:head>
	<title>Codex</title>
</scelte:head>
<nav class="navbar">
	<a href="/">
		<img src={logo} class="brand-logo" alt="" />
	</a>
	<ul class="nav-links">
		<li class="nav-items"><a href="/">TV</a></li>
		<li class="nav-items"><a href="/">movies</a></li>
	</ul>

	<div class="right-container">
		<form on:submit|preventDefault={submitSearch}>
			<input bind:value={inputValue} type="text" class="search-box" placeholder="search" />
			<button type="submit" class="search-button">Search</button>
		</form>
	</div>
</nav>

<slot />

<style>
	.navbar {
		width: 100%;
		height: 70px;
		position: fixed;
		top: 0;
		left: 0;
		padding: 0 4%;
		background: #0c111b;
		z-index: 9;
		display: flex;
		align-items: center;
	}

	.brand-logo {
		height: 35px;
		margin-top: 5px;
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

	.search-button {
		color: #fff;
		background-color: transparent;
		opacity: 0.9;
		font-size: 15px;
		font-weight: 700;
		text-decoration: none;
		border: none;
		cursor: pointer;
	}
	@media (max-width: 600px) and (min-width: 263px) {
		.search-box {
		width: 150px;
	}
	}
</style>
