<script>
	export let data;
	import '$lib/global.css';
	import { goto } from '$app/navigation';
	import { downArrow,logo } from '$lib';
	let inputValue = '';
	let dropdownVisible = false; // Add this line
	let downarrow = false; // Add this line
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
			{#if !data?.user}
				<a href="/login">
					<p class="loginp">Login</p>
				</a>
			{:else if data?.user}
				<button class="container" on:click={() => (dropdownVisible = !dropdownVisible)}>
					<img
						class="avatar"
						src={'https://img.flawlessfiles.com/_r/100x100/100/avatar/dragon_ball/av-db-01.jpeg'}
						alt=""
					/>
					<h1 class="username">{data.user?.username}</h1>
					<div class="plan">
						<p class="planText">PRO</p>
					</div>
					<div class="arrow">
						<button on:click={() => (downarrow = !downarrow)}>
							<img src={downArrow} alt="icon" />
						</button>
					</div>
					<div class="dropdown-content" style="display: {dropdownVisible ? 'block' : 'none'}">
						<img
							class="avatarDropdown"
							src={`https://ui-avatars.com/api/?name=${data.user?.name}`}
							alt="avatar"
						/>
						<h1 class="username">{data.user?.username}</h1>
						<div class="plan">
							<p class="planText">PRO</p>
						</div>
						<h2 class="email">{data.user?.email}</h2>
						<span class="lineSeparate" />
						<ul class="settingOptions">
							<li><a href="/profile"><i class="fa-solid fa-sliders" />Profile Settings</a></li>
							<li><a href="/subscriptions"><i class="fa-solid fa-turn-up" />Upgrade Plan</a></li>
							<li><i class="fa-regular fa-sun" />Light Mode</li>
							<li><a href="/help?"><i class="fa-solid fa-question" />Help Center</a></li>
						</ul>
						<span class="lineSeparate" />
						<form action="/logout" method="POST">
							<button class="signOut" type="submit"
								><i class="fa-solid fa-left-long" />Logout</button
							>
						</form>
					</div>
				</button>
			{:else}
				<a href="/login">
					<p class="loginp">Login</p>
				</a>
			{/if}
		</div>
	</div>
</nav>

<main>
	<slot />
</main>
<footer class="footer">
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
	<div class="footer-contact">
		<p>Contact Us:</p>
		<p>Email: info@animestreamhub.com</p>
		<p>Phone: [Your Phone Number]</p>
		<p>Address: [Your Address]</p>
	</div>
</footer>

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
		gap: 30px;
		align-items: flex-start;
	}
	.settingOptions i {
		color: gray;
		width: 20px;
		margin-right: 10px;
		font-size: 15px;
		margin-left: 20px;
	}
	.settingOptions li {
		display: flex;
		align-items: center;
	}
	.settingOptions a {
		padding-left: 10px;
	}
	.dropdown-content h1 {
		position: relative;
	}
	.loginp {
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
		display: none;
		flex-direction: column;
		width: 250px;
		height: 300px;
	}
	.dropdown-content .username {
		position: absolute;
		top: 8px;
		left: 60px;
	}
	.dropdown-content .plan {
		position: absolute;
		top: 8px;
		left: 110px;
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
	.signOut i {
		margin-right: 12px;
		padding: 2px;
		color: gray;
		margin-left: 1px;
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

	/* .login-button {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		background: #161b24;
		outline: none;
		padding: 10px;
		border-radius: 999px;
	} */

	main {
		margin-top: 80px;
		padding: 0 4%;
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
	.footer-links:hover {
		cursor: pointer;
	}

	.footer-contact p {
		margin: 0;
	}

	.footer-contact p:first-child {
		font-weight: bold;
		margin-bottom: 10px;
	}

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
		width: 250px;
		height: 40px;
		border-radius: 14px;
		background: #161b24;
		color: white;
	}
	.avatar {
		width: 20px;
		border-radius: 50%;
		display: flex;
		position: relative;
		margin-top: 8px;
		margin-left: 12px;
		margin-right: 10px;
		margin-bottom: 10px;
	}

	.username {
		padding: 0;
		margin-top: 9px;
		font-size: 15px;
		font-weight: 600;
	}
	.plan {
		display: flex;
		margin-left: 15px;
		justify-content: center;
		align-items: center;
		margin: 10.9px 10px;
		text-shadow: 0px 0px 4px gold;
	}
	.planText {
		color: gold;
		font-weight: 700;
		font-size: 10px;
		font-family: sans-serif;

		padding: 3px 5px;
		border-radius: 7px;
	}
	.arrow img {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 60px;
		margin-top: 10px;
		width: 17px;
	}
</style>
