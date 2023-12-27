<script>
	export let data;
	import '$lib/global.css';
	import { Toaster } from 'svelte-french-toast';
	import { Icon, MagnifyingGlass, Bars3 } from 'svelte-hero-icons';
	import { userNavigation } from '$lib/utils'; // Assuming this is correctly imported from your utilities
	import { logo } from '$lib/utils';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	inject({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();
	let isDropdownVisible = false;
	let dropdownDialog;

	const toggleDropdown = () => {
		isDropdownVisible = !isDropdownVisible;
	};

	$: if (dropdownDialog && isDropdownVisible) {
		dropdownDialog.showModal();
	}
</script>

<svelte:head>
	<title>Codex | Home</title>
	<link rel="icon" href={logo} />
</svelte:head>

<Toaster />

<nav class="navbar">
	<a class="navbar-brand" data-sveltekit-prefetch="true" href="/">コーデックス</a>
	<ul class="navbar-links">
		<li class="navbar-item"><a href="/">Trending</a></li>
		<li class="navbar-item"><a href="/">Movies</a></li>
		<li class="navbar-item"><a href="/">TV Series</a></li>
	</ul>

	<form action="/search" method="POST" class="navbar-search-container">
		<div class="search-field">
			<Icon src={MagnifyingGlass} size="22px" />
			<p class="search-divider">|</p>
			<input type="text" id="search-box" class="search-input" name="search" placeholder="search" />
		</div>
	</form>
	{#if !data.user}
		<a class="login-button" href="/login">Login</a>
	{:else}
		<button on:click={toggleDropdown} class="user-avatar-container">
			<img
				class="user-avatar"
				src={`https://ui-avatars.com/api/?name=${data.user?.username}`}
				alt="User avatar"
			/>
		</button>
		{#if isDropdownVisible}
			<div class="user-dropdown">
				<div class="dropdown-header">
					<h2>{data.user.username}</h2>
					<p>{data.user?.email}</p>
				</div>
				<ul class="dropdown-menu">
					<li><a href="/profile">Profile</a></li>
					<li><a href="/watch">Continue Watching</a></li>
					<li><a href="/list">Watch List</a></li>
					<li><a href="/notifications">Notification</a></li>
					<li><a href="/settings">Settings</a></li>
				</ul>
				<form action="/logout" method="POST">
					<button type="submit">Logout</button>
				</form>
			</div>
		{/if}
	{/if}
</nav>
<main>
	<slot />
</main>
<!-- <footer>
	<div class="footer-content">
		<div class="footer-row">
			Codex does not store any files on our server, we only linked to the media which is hosted on
			3rd party services.
		</div>
		<div class="footer-row">© Codex.Jnagra.com All rights reserved.</div>
	</div>
</footer> -->

<style>
	.search-field {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 10px;
		background: var(--secondary);
		color: gray;
		border-radius: 12px;
	}
	.search-divider {
		margin-left: 10px;
		font-size: smaller;
		font-weight: 100;
		justify-content: center;
		display: flex;
		align-items: center;
		margin-bottom: 2px;
	}
	.navbar {
		width: 100%;
		height: 80px;
		position: fixed;
		top: 0;
		left: 0;
		padding: 0 4%;
		z-index: 9;
		display: flex;
		background: linear-gradient(#0d111a, 90%, transparent);
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0 20px;
		z-index: 100;
	}

	.navbar-links {
		display: flex;
		list-style: none;
	}

	.navbar-item a {
		text-decoration: none;
		margin-left: 20px;
		text-transform: capitalize;
		color: #fff;
		opacity: 0.9;
	}
	.navbar-brand {
		display: flex;
		list-style: none;
		text-decoration: none;
		text-transform: capitalize;
		color: #fff;
		opacity: 0.9;
	}

	.navbar-search-container {
		display: block;
		margin-left: auto;
	}

	.search-input {
		border: none;
		background: var(--secondary);
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
		width: 260px;
		font-size: 13px;
		font-weight: 600;
		border-right: 12px;
	}
	.login-button {
		color: white;
		font-weight: 500;
		padding: 10px 14px;
		display: flex;
		justify-content: center;
		border-radius: 5px;
		font-size: 15px;
		background: var(--primary);
		border: none;
		cursor: pointer;
		text-decoration: none;
	}

	.dropdown-header {
		border-bottom: 1px solid #444;
		padding-bottom: 10px;
	}

	.dropdown-header h2 {
		margin: 0;
		padding: 0;
		color: #fff;
	}

	.dropdown-header p {
		font-size: 0.9em;
		color: #999;
	}

	.dropdown-menu {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.dropdown-menu li a {
		color: #ddd;
		text-decoration: none;
		padding: 10px;
		display: block;
		transition: background-color 0.3s;
	}

	.dropdown-menu li a:hover {
		background-color: #555;
	}

	.user-dropdown {
		position: absolute;
		top: 100%;
		right: 50px;
		background: var(--secondary);
		border-radius: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 10;
		flex-direction: column;
		width: 220px;
		padding: 20px;
		height: max-content;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}
	.user-dropdown a {
		color: white;
		text-decoration: none;
		padding: 0;
		font-size: 14px;
	}
	.user-avatar-container {
		display: flex;
		border: none;
		border-radius: 100%;
		color: white;
		cursor: pointer;
	}
	.user-avatar {
		width: 36px;
		border-radius: 50%;
	}
	main {
		margin-top: 80px;
		padding: 0 4%;
		margin-bottom: 20px;
	}
	li:hover {
		cursor: pointer;
	}

	/* footer {
		position: sticky;
        height: 100px;
        top: calc( 100vh - 100px );
	}

	.footer-content {
		font-family: 'Play', sans-serif;
		text-align: center;
	}

	.footer-row {
		width: 100%;
		margin: 1% 0%;
		padding: 0.6% 0%;
		color: gray;
		font-size: 0.8em;
	}

	.footer-row ul li {
		display: inline-block;
		margin: 0px 30px;
	}

	@media (max-width: 720px) {
		.footer-content {
			text-align: left;
			padding: 5%;
		}
		.footer-row ul li {
			display: block;
			margin: 10px 0px;
			text-align: left;
		}
	} */

	@media (max-width: 850px) {
		.search-input {
			min-width: 100px;
			width: 100%;
		}

		.search-input {
			width: 168px;
			transition: width 1s;
		}
		.search-input:focus {
			width: 168px;
		}
	}
</style>
