<script>
	import './global.css';
	import { goto } from '$app/navigation';
	import logo from '$lib/images/logo.svg';
	let inputValue = '';
</script>

<scelte:head>
	<title>Codex</title>
</scelte:head>
<nav class="navbar">
	<a href="/">
		<img
			src="https://github.com/jasanpreetn9/Codex/raw/main/static/favicon.png?raw=true"
			class="brand-logo"
			alt=""
		/>
	</a>
	<ul class="nav-links">
		<li class="nav-items"><a href="/">TV</a></li>
		<li class="nav-items"><a href="/">Movies</a></li>
	</ul>

	<div class="right-container">
		<!-- <form on:submit|preventDefault={goto('/Search/' + inputValue)}> -->
		<input type="text" class="search-box" placeholder="Search for an Anime..." />
		<!-- </form> -->
		<div class="user-icon">
			<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
		</div>
	</div>
</nav>

<slot />

<div class="footer-bottom">
	<div class="first-box">
		<a href="/">Terms & Conditions</a>
		<a href="/">Privacy Policy</a>
	</div>
	<div class="last-box">
		<a href="/">&copy; Copyright 2021 Codex</a>
	</div>
</div>

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

	.user-icon {
		width: 45px;
	}

	.user-icon img {
		width: 100%;
		color: white;
	}

	.footer-bottom {
		margin-top: 30px;
		width: 100%;
		padding: 20px;
		display: flex;
		justify-content: space-between;
	}
	.footer-bottom a {
		color: #fff;
		font-size: 14px;
		margin-left: 20px;
		text-decoration: none;
	}
	.first-box {
		margin-left: 20px;
	}
	.last-box {
		margin-right: 20px;
	}
</style>
