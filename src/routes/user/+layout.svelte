<script>
    	import { page } from '$app/stores';
    const navigation = [
		{
			title: 'Profile',
			href: '/user/profile'
		},
		{
			title: 'Account',
			href: '/user/account'
		},
	];
</script>

<main>
    {#each navigation as navItem}
    <a href={navItem.href} class={$page.url.pathname === navItem.href ? 'active' : ''}>{navItem.title}</a>
    {/each}


	<section id="content">
		<slot />
	</section>
</main>

<style>
	section {
		padding: 20px 0 0;
		/* border-top: 1px solid #ddd; */
	}

	input {
		display: none;
	}

	a {
		display: inline-block;
		margin: 0 0 -1px;
		padding: 15px 25px;
		font-weight: 600;
		text-align: center;
		color: #bbb;
		border: 1px solid transparent;
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
    border-top: 2px solid #1f80e0;
}
	/* #tab1:checked ~ #content1,
	#tab2:checked ~ #content2,
	#tab3:checked ~ #content3,
	#tab4:checked ~ #content4 {
		display: block;
	} */

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
