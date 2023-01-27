<script>
	export let data;
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { enhance } from '$app/forms';
	import logo from '$lib/images/logo.svg';
	import '$lib/global.css';
	let inputValue = '';
	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});
	const submitLogout = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<nav class="navbar">
	<img
		src="https://github.com/kunaal438/disney-plus-clone/blob/master/images/logo.png?raw=true"
		class="brand-logo"
		alt=""
	/>
	<ul class="nav-links">
		<li class="nav-items"><a href="/">TV</a></li>
		<li class="nav-items"><a href="/">movies</a></li>
		<li class="nav-items"><a href="/">sports</a></li>
		<li class="nav-items"><a href="/">premium</a></li>
	</ul>

	<form on:submit|preventDefault={goto('/search/' + inputValue)} class="right-container">
		<input type="text" class="search-box" bind:value={inputValue} placeholder="search" />
		{#if data.session}
			<p class="login-link">{data.session.user.email}</p>
		{/if}
	</form>
	{#if data.session}
		<form action="/logout" method="POST" use:enhance={submitLogout}>
			<button type="submit" class="btn btn-primary">Logout</button>
		</form>
	{:else}
		<a href="/login" class="login-link">Login</a>
	{/if}
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
