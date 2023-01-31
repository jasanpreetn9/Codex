<script>
	export let data;
	import { onMount } from 'svelte';
	import { invalidateAll, goto } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	let showModalLogin = false;
	let showModalRegister = false;
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
	<a href="/"
		><img
			src="https://github.com/kunaal438/disney-plus-clone/blob/master/images/logo.png?raw=true"
			class="brand-logo"
			alt=""
		/></a
	>
	<ul class="nav-links">
		<li class="nav-items"><a href="/">TV</a></li>
		<li class="nav-items"><a href="/">movies</a></li>
		<li class="nav-items"><a href="/">sports</a></li>
		<li class="nav-items"><a href="/">premium</a></li>
	</ul>

	<form on:submit|preventDefault={goto('/search/' + inputValue)} class="right-container">
		<input type="text" id='search-box' class="search-box" bind:value={inputValue} placeholder="search" />
	</form>
	{#if data.session}
		<form action="/logout" method="POST" use:enhance={submitLogout}>
			<button type="submit" class="logout-login-btn">Logout</button>
		</form>
	{:else}
		<button class="logout-login-btn" on:click={() => (showModalLogin = true)}>Login</button>
	{/if}

	{#if showModalLogin}
		<Modal on:close={() => (showModalLogin = false)}>
			<h1>Login</h1>
			<form action="/login" method="POST" class="auth-form">
				<label for=""> Email </label>
				<input type="text" name="email" />
				<label for=""> Password </label>
				<input type="password" name="password" />
				<button type="submit" class="btn btn-primary">Login</button>
			</form>
			<button
			class="logout-login-btn"
			on:click={() => (showModalLogin = false)((showModalRegister = true))}>Register</button
		>
		</Modal>
	{:else if showModalRegister}
		<Modal on:close={() => (showModalRegister = false)}>
			<h1>Register</h1>
			<form action="/login" method="POST" class="auth-form">
				<label for=""> Email </label>
				<input type="text" name="email" />
				<label for=""> Password </label>
				<input type="password" name="password" />
				<button type="submit" class="btn btn-primary">Login</button>
			</form>
			<button
				class="logout-login-btn"
				on:click={() => (showModalLogin = true)((showModalRegister = false))}>Login</button
			>
		</Modal>
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

	.logout-login-btn {
		background: #1f80e0;
		height: 30px;
		padding: 0 20px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		margin: 0 10px;
		cursor: pointer;
	}


	main {
		margin-top: 80px;
		padding: 0 4%;
	}
</style>
