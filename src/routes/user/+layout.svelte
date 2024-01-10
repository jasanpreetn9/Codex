<script>
	import { page } from '$app/stores';
	import { userNavigation } from '$lib/utils';
	export let data;
	$: ({ user } = data);
</script>

<div class="container">
	<div class="banner">
		<div class="banner-gradient" />
		<img src={user.avatar} alt="" />
	</div>
	<div class="content">
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
	</div>
</div>

<style>
	.header {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
	}
	.container {
		display: flex;
		height: 20%;
		position: relative;
		margin: auto;
		padding: 20px 0;
	}

	.banner {
		flex: 0 0 auto;
		position: relative;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		width: 100%;
		left: 0;
		transition: 1s;
		overflow: hidden;
	}

	.banner img {
		width: 100%;
		object-fit: cover;
		display: block;
		margin-left: auto;
		height: 300px;
		filter: blur(20px);
	}

	.banner-gradient {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,.1)!important;
	}

	.content {
		margin-top: 100px;
		position: absolute;
		width: 100%;
		height: 100%;
		color: white;
	}

	@media (max-width: 850px) {
		.banner {
			display: none;
		}
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
