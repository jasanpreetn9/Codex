<!-- <script>
	export let data;
	$: ({ user } = data);
	import { Icon } from 'svelte-hero-icons';
	import { userNavigation } from '$lib/utils';
</script>

<div class="header">
	<h1>Hi, {user.username}</h1>
	<nav>
		<ul>
			{#each userNavigation as navItem}
				<li>
					<a href={navItem.href}>
						<span>
							<Icon src={navItem.icon} size="22px" />
						</span>
						{navItem.title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<slot />
</main>

<style>
	nav ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		list-style: none;
	}
	nav ul li {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	nav ul li a {
		text-decoration: none;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	nav ul li a span {
		margin-right: 0.5rem;
	}
</style> -->

<script>
	import { page } from '$app/stores';
	import { userNavigation } from '$lib/utils';
	export let data;
	$: ({ user } = data);
</script>

<!-- <main>
	{#each userNavigation as navItem}
		<a href={navItem.href} class={$page.url.pathname === navItem.href ? 'active' : ''}
			>{navItem.title}</a
		>
	{/each}

	<section id="content">
		<slot />
	</section>
</main> -->

<div class="header">
	<h1>Hi, {user.username}</h1>
	<nav>
		<ul>
			{#each userNavigation as navItem}
				<li>
					<a href={navItem.href} class={$page.url.pathname === navItem.href ? 'active' : ''}
						>{navItem.title}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	section {
		padding: 20px 0 0;
	}

	a {
		display: inline-block;
		margin: 0 0 -1px;
		padding: 15px 25px;
		font-weight: 600;
		text-align: center;
		color: #bbb;
		border: 1px solid transparent;
		text-decoration: none;
	}
	.header nav ul {
		list-style: none;
		display: flex;
	}
	a:hover {
		color: #888;
		cursor: pointer;
	}

	a {
		color: #555;
		border: 1px solid #ddd;
		border: none;
	}
	.active {
		color: white;
		border-bottom: 2px solid var(--primary);
		--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		--tw-shadow-color: #303030;
		--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color);
		--tw-shadow: var(--tw-shadow-colored), 0 2px 4px -2px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}

	@media screen and (max-width: 650px) {
		a {
			font-size: 0;
		}

		a:before {
			margin: 0;
			font-size: 18px;
		}
	}
	@media screen and (max-width: 400px) {
		a {
			padding: 15px;
		}
	}
</style>
