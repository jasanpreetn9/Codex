<script>
	import '$lib/global.css';
	import { goto } from '$app/navigation';
	import logo from '$lib/images/logo.svg';
	let inputValue = '';
</script>

<!-- 
<svelte:head>
	<title>Codex</title>
</svelte:head>
<nav class="navbar">
	<a href="/">
		<img src={logo} class="brand-logo" alt="Logo" />
	</a>
	<ul class="nav-links">
		<li class="nav-items"><a href="/">TV</a></li>
		<li class="nav-items"><a href="/">Movies</a></li>
	</ul>

	<div class="right-container">
		<form on:submit|preventDefault={goto('/search/' + inputValue)}>
			<input
				type="text"
				bind:value={inputValue}
				class="search-box"
				placeholder="Search for an Anime..."
			/>
		</form>
	</div>
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

	.brand-logo {
		height: 35px;
	}

	.nav-links {
		margin-top: 10px;
		display: flex;
		list-style: none;
	}

	.nav-items a {
		text-decoration: none;
		margin-left: 30px;
		text-transform: capitalize;
		color: #fff;
		opacity: 0.9;
	}

	.right-container {
		display: block;
		margin-left: auto;
		display: flex;
	}

	.search-box {
		border: none;
		background-color: #040b16;
		border-radius: 10px;
		height: 30px;
		color: #fff;
		width: 400px;
		text-transform: capitalize;
		font-size: 14px;
		font-weight: 400;
		transition: 0.5s;
		padding: 20px;
	}
	main{
		margin-top: 80px;
		padding: 0 4%;
	}
</style> -->
<nav class="navbar">
	<!-- <img src="images/logo.png" class="brand-logo" alt=""> -->
	<ul class="nav-links">
		<li class="nav-items"><a href="/">TV</a></li>
		<li class="nav-items"><a href="/">movies</a></li>
		<li class="nav-items"><a href="/">sports</a></li>
		<li class="nav-items"><a href="/">premium</a></li>
	</ul>

	<!-- <div class="right-container"> -->
	<form on:submit|preventDefault={goto('/search/' + inputValue)} class="right-container">
		<input type="text" class="search-box" bind:value={inputValue} placeholder="search" />
		<a href="/" class="login-link">Login</a>
	</form>
	<!-- </div÷> -->
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
		background: #0c111b;
		z-index: 9;
		display: flex;
		align-items: center;
	}

	.brand-logo {
		height: 70px;
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

	.login-link {
		color: #fff;
		opacity: 0.9;
		font-size: 15px;
		font-weight: 700;
		text-decoration: none;
	}
	main {
		margin-top: 80px;
		padding: 0 4%;
	}
</style>
