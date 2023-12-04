<script>
	import '$lib/global.css';
	import { Toaster } from 'svelte-french-toast';
	import { Icon, MagnifyingGlass } from 'svelte-hero-icons';
	import { logo } from '$lib/utils';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });
	let inputValue = '';
</script>

<svelte:head>
	<title>Codex</title>
	<link rel="icon" href={logo} />
</svelte:head>
<Toaster />
<nav class="navbar">
	<li class="nav-title"><a data-sveltekit-prefetch="true" href="/">コーデックス</a></li>
	<!-- <ul class="nav-links">
		<li class="nav-items"><a href="/">Movies</a></li>
		<li class="nav-items"><a href="/">TV series</a></li>
		<li class="nav-items"><a href="/">My List</a></li>
		<li class="nav-items"><a href="/">Most popular</a></li>
	</ul> -->

	<div class="search-tools">
		<form action="/search" method="POST" class="right-container">
			<div class="search-div">
				<Icon src={MagnifyingGlass} size="22px" />
				<p class="iconSide">|</p>
				<input
					type="text"
					id="search-box"
					class="search-box"
					name="search"
					bind:value={inputValue}
					placeholder="search"
				/>
			</div>
		</form>
	</div>
</nav>

<main>
	<slot />
</main>


<style>
	a {
		text-decoration: none;
	}
	.search-div {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 10px;
		background: var(--secondary);
		color: gray;
		border-radius: 12px;
	}
	/* .navItem{
		display: flex;
		margin-bottom: 0px;
		padding-bottom: 0;
	}
	.title{
		margin-top: 3px;
	} */
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
/* 	
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

	main {
		margin-top: 80px;
		padding: 0 4%;
	}

	li:hover {
		cursor: pointer;
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
</style>
