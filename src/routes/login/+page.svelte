<script>
	import { enhance } from '$app/forms';
	import { Input, Alert } from '$lib/components';
	import toast from 'svelte-french-toast';
	export let form;
	let loading = false;

	const submitLogin = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'fail':
					toast.error('Invalid credentials');
					await update();
					break;
				case 'error':
					toast.error(result.error.message, {
						style: 'background: #161b24; color: white;',
					});
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>
<body>
	<form action="?/login" method="POST" use:enhance={submitLogin}>
		<div class="container">
			<div class="left-box">
				<h1>Welcome Back</h1>
				<p class="head">Sign in to access your account.</p>
				<img class="img" src="https://pnganime.com/web/images/l/luffy-gear-5-colored.png" alt="" />
			</div>
			<div class="inputs">
				<Input
					label="email"
					name="email"
					type="text"
					placeholder="Example@gmail.com"
					value={form?.data?.email ?? ''}
					errors={form?.errors?.email}
					disabled={loading}
				/>
				<Input
					label="password"
					name="password"
					type="password"
					placeholder="Password"
					errors={form?.errors?.password}
					disabled={loading}
				/>
				<a href="/reset-password" class="forgotPass">Forgot Password?</a>
				<button type="submit" class="loginBtn" disabled={loading}>Sign In</button>
				<p class="account">Don't have an account? <a href="/register">Register</a></p>
				{#if form?.notVerified}
					<Alert message="You must verify your email before you can login." type="error" />
				{/if}
			</div>
		</div>
	</form>
</body>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.img {
		width: 400px;
	}
	.container {
		display: flex;
		justify-content: center;
		padding: 0px 30px;
		background: #161b24;
		border-radius: 10px;
		height: 85vh;
		border: 0.1px solid rgb(54, 54, 54);
		--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
			0 4px 6px -4px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}
	.left-box {
		display: flex;
		flex-direction: column;
		margin-top: 80px;
		margin-right: 100px;
		margin-left: 100px;
		gap: 20px;
	}

	.head {
		width: 330px;
		color: rgb(100, 100, 100);
		font-size: 13px;
	}

	.forgotPass {
		text-decoration: none;
		color: gray;
		margin-top: 10px;
		font-size: 12px;
	}
	.inputs {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: rgb(100, 100, 100);
		width: 100%;
	}

	.loginBtn {
		background: #1f80e0;
		border: none;
		border-radius: 10px;
		width: 400px;
		height: 50px;
		color: white;
		font-weight: 600;
		margin-top: 30px;
	}
	.loginBtn:hover {
		cursor: pointer;
	}
	.account {
		color: white;
		margin-top: 40px;
	}
	.account a {
		text-decoration: none;
		color: gray;
	}
	@media (max-width: 768px) and (min-width: 200px) {
		/* Small screens */
		.container {
			flex-direction: column;
			height: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 120px;
		}
		.left-box {
			margin: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.left-box p {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.loginBtn {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		/* Medium screens */
		.container {
			padding: 0 20px;
		}
	}
</style>
