<script>
	import { goto } from '$app/navigation';
	import logo from '$lib/images/logo.png';
	import userIcon from '$lib/images/user.svg';
	import '$lib/global.css';
	export let data;
	let inputValue = '';
</script>

<svelte:head>
	<title>Codex</title>
	<link rel="icon" href={logo} />
</svelte:head>

<nav class="navbar">
	<li class="nav-title"><a data-sveltekit-prefetch="true" href="/">コーデックス</a></li>
	<div class="search-tools">
		<form on:submit|preventDefault={() => goto('/search/' + inputValue)} class="right-container">
			<input
				type="text"
				id="search-box"
				class="search-box"
				bind:value={inputValue}
				placeholder="search"
			/>
		</form>
		<div>
			<!-- <a href="/profile" class="login-button">
				<img src={userIcon} alt="user" width="15px" height="15px" />

			</a> -->
			{#if !data.user}
			<a href="/login">
				<p class="loginp">Login</p>
			</a>
			{:else}
				 <a href="/" class="login-button">
					 <img src={userIcon} alt="user" width="15px" height="15px" />
				 </a>
				 <form action="/logout" method="POST">
					<button type="submit">Logout</button>
				</form>

			{/if}
		</div>
	</div>
</nav>
<main>
	<slot />
</main>

<style>
	a {
		text-decoration: none;
	}
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
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0 20px;
		z-index: 100;
	}
	.loginp{
		color: white;
		font-weight: 500;
		padding: 10px 14px;
		/* width: 80px; */
		display: flex;
		justify-content: center;
		border-radius: 5px;
		font-size: 15px;
		background: #1f80e0;
	}

	/* .nav-links {
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
	} */
	.nav-title {
		margin-top: 2px;
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

	.search-tools {
		display: flex;
		align-items: center;
		gap: 10px;
		flex: 1;
	}
	.search-box {
		border: none;
		background: #161b24;
		outline: none;
		height: 30px;
		color: #fff;
		width: 400px;
		text-transform: capitalize;
		font-size: 16px;
		font-weight: 500;
		transition: 0.5s;
		padding: 18px 12px;
		border-radius: 12px;
		width: 300px;
		font-size: 13px;
		font-weight: 600;
	}

	.login-button {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		background: #161b24;
		outline: none;
		padding: 10px;
		border-radius: 999px;
	}

	main {
		margin-top: 80px;
		padding: 0 4%;
	}

	@media (max-width: 850px) {
		.search-box {
			min-width: 100px;
			width: 100%;
		}

		.right-container {
			/* flex: 1; */
		}	.search-box {
			width: 168px;
			transition: width 1s;
		}
		.search-box:focus{
			width: 168px;
		}

	}
</style>
