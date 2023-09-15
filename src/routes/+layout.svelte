<script>
	export let data;
	import '$lib/global.css';
	import { goto } from '$app/navigation';
	import { Icon, MagnifyingGlass, ArrowRightOnRectangle } from 'svelte-hero-icons';
	import { logo, userNavigation } from '$lib/utils';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });

	let inputValue = '';
	let menuOpen = false;
	function handleMenuOpen() {
		menuOpen = !menuOpen;
		document.body.addEventListener('click', handleMenuClose);
	}
	function handleMenuClose() {
		menuOpen = false;
		document.body.removeEventListener('click', handleMenuClose);
	}

	let icon = null;
</script>

<svelte:head>
	<title>Codex</title>
	<link rel="icon" href={logo} />
</svelte:head>

<nav class="navbar">
	<li class="nav-title"><a data-sveltekit-prefetch="true" href="/">コーデックス</a></li>
	<ul class="nav-links">
		<li class="nav-items"><a href="/">Movies</a></li>
		<li class="nav-items"><a href="/">TV series</a></li>
		<li class="nav-items"><a href="/">My List</a></li>
		<li class="nav-items"><a href="/">Most popular</a></li>
	</ul>

	<div class="search-tools">
		<form on:submit|preventDefault={() => goto('/search/' + inputValue)} class="right-container">
			<div class="search-div">
				<Icon src={MagnifyingGlass} size="22px" />
				<p class="iconSide">|</p>
				<input
					type="text"
					id="search-box"
					class="search-box"
					bind:value={inputValue}
					placeholder="search"
				/>
			</div>
		</form>
		<div>
			{#if !data?.user}
				<a class="login" href="/login"> Login </a>
			{:else if data?.user}
				<button class="container" on:click|stopPropagation={handleMenuOpen}>
					<img
						class="avatar-btn"
						src={`https://ui-avatars.com/api/?name=${data.user?.username}`}
						alt=""
					/>
				</button>
				{#if menuOpen}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="dropdown-content" on:click|stopPropagation={() => {}}>
						<img
							class="avatarDropdown"
							src={`https://ui-avatars.com/api/?name=${data.user?.username}`}
							alt="avatar"
						/>
						<h1 class="username">{data.user?.username}</h1>

						<h2 class="email">{data.user?.email}</h2>
						<span class="lineSeparate" />
						<ul class="settingOptions">
							{#each userNavigation as navItem}
								<li class="navItem">
									<a class="navItem" href={navItem.href}
										><Icon
											style={'margin-left: 10px; margin-right: 10px; margin-bottom: 30px'}
											src={navItem.icon}
											size="22px"
										/><p class="title">{navItem.title}</p></a
									>
								</li>
							{/each}
						</ul>
						<span class="lineSeparate" />
						<form action="/logout" method="POST">
							<button class="signOut" type="submit">
								<Icon src={ArrowRightOnRectangle} size="22px" />
								Logout
							</button>
						</form>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</nav>

<main>
	<slot />
</main>

<!-- <footer class="footer">
	<div class="footer-logo">コーデックス</div>
	<div class="footer-links">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/">Browse</a></li>
			<li><a href="/">Categories</a></li>
			<li><a href="/">My List</a></li>
			<li><a href="/">Account</a></li>
		</ul>
	</div>
</footer> -->

<style>
	a {
		text-decoration: none;
	}
	.search-div {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 10px;
		background: #161b24;
		color: gray;
		border-radius: 12px;
	}
	.navItem{
		display: flex;
		margin-bottom: 0px;
		padding-bottom: 0;
	}
	.title{
		margin-top: 3px;
	}
	.iconSide {
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
	.settingOptions {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 10px 0px;
		font-size: 15px;
		color: white;

		align-items: flex-start;
	}
	.settingOptions li {
		display: flex;
		align-items: center;
		padding: 0;
	}
	.settingOptions a {
		padding-left: 10px;
	}
	.dropdown-content h1 {
		position: relative;
	}
	.login {
		color: white;
		font-weight: 500;
		padding: 10px 14px;
		display: flex;
		justify-content: center;
		border-radius: 5px;
		font-size: 15px;
		background: #1f80e0;
	}
	.dropdown-content {
		position: absolute;
		top: 100%;
		right: 50px;
		background: #161b24;
		border-radius: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 10;
		/* display: none; */
		flex-direction: column;
		width: 250px;
		height: 350px;
	}
	.dropdown-content .username {
		position: absolute;
		top: 8px;
		left: 60px;
	}
	.dropdown-content .email {
		color: gray;
		font-weight: 300;
		font-size: 15px;
		position: absolute;
		left: 60px;
		top: 40px;
	}
	.signOut {
		display: flex;
		align-items: flex-start;
		padding: 20px;
		font-size: 15px;
		background: transparent;
		border: none;
		color: white;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	span {
		display: block;
		width: 90%;
		border: 1px solid gray;
		border-width: 1px;
		margin-left: 13px;
		border-radius: 20px;
		position: relative;
	}
	.avatarDropdown {
		width: 35px;
		border-radius: 50%;
		display: flex;
		position: relative;
		margin: 15px;
	}

	.dropdown-content a {
		color: white; /* Change the text color */
		text-decoration: none;
		padding: 0;
		font-size: 14px;
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
		margin-top: 2px;
		display: flex;
		list-style: none;
	}

	.nav-title a {
		text-decoration: none;
		text-transform: capitalize;
		color: #fff;
		opacity: 0.9;
		margin-top: 5px;
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
		width: 260px;
		font-size: 13px;
		font-weight: 600;
		border-right: 12px;
	}

	main {
		margin-top: 80px;
		padding: 0 4%;
	}

	/* .footer {
		width: 100%;
		height: 80px;
		padding: 0 4%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer-links ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.footer-links li {
		display: inline;
		margin-left: 20px;
	} */
	li:hover {
		cursor: pointer;
	}

	/* .footer-links a {
		color: #fff;
		text-decoration: none;
	}
	.footer-links:hover {
		cursor: pointer;
	} */

	@media (max-width: 850px) {
		.search-box {
			min-width: 100px;
			width: 100%;
		}

		.search-box {
			width: 168px;
			transition: width 1s;
		}
		.search-box:focus {
			width: 168px;
		}
	}
	.container {
		display: flex;
		border: none;
		border-radius: 100%;
		color: white;
		cursor: pointer;
	}
	.avatar-btn {
		width: 36px;
		border-radius: 50%;
	}

	.username {
		padding: 0;
		margin-top: 9px;
		font-size: 15px;
		font-weight: 600;
		text-transform: capitalize;
	}
</style>
