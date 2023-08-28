<script>
	import { goto } from '$app/navigation';
	import logo from '$lib/images/logo.png';
  import userIcon from '$lib/images/user.svg';
	import '$lib/global.css';
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
      <a href="#" class="login-button">
        <img src="{userIcon}" alt="user" width="15px" height="15px" />
      </a>
    </div>
	</div>
	<!-- <a href="/login" class="login-btn">Login</a> -->
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

  .search-tools {
    display: flex;
    align-items: center;
    gap: 10px;
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
</style>
