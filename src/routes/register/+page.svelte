<script>
	export let form;
	import { Input } from '$lib/components';
</script>

<body>
	<form action="?/register" method="POST">
		<div class="container">
			<div class="left-box">
				<h1>Welcome</h1>
				<p class="head">Sign up to create an account and track your anime progress!</p>
				<img class="img" src="https://pnganime.com/web/images/l/luffy-gear-5-colored.png" alt="" />
			</div>
			<div class="inputs">
				<Input
					name="email"
					label="email"
					type="text"
					placeholder="Example@gmail.com"
					value={form?.data?.email}
					errors={form?.errors?.email}
				/>
				<Input
					name="username"
					label="Username"
					type="text"
					placeholder="Username"
					value={form?.data?.username}
					errors={form?.errors?.username}
				/>
				<Input
					name="password"
					label="Password"
					type="password"
					placeholder="Password"
					value={form?.data?.password}
					errors={form?.errors?.password}
				/>
				<Input
					name="passwordConfirm"
					label="Confirm Password"
					type="password"
					placeholder="Password"
					value={form?.data?.passwordConfirm}
					errors={form?.errors?.passwordConfirm}
				/>

				<button type="submit" class="signUp">Register</button>
				<p class="account">Already have an account? <a href="/login">Sign In</a></p>
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
		background: var(--secondary);
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

	::placeholder {
		color: #e5e5e5;
		font-size: 13px;
		font-weight: 100;
		color: white;
		opacity: 0.5;
	}
	.inputs {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: rgb(100, 100, 100);
		width: 100%;
	}

	.signUp {
		background: var(--primary);
		border: none;
		border-radius: 10px;
		width: 400px;
		height: 50px;
		color: white;
		font-weight: 600;
		margin-top: 30px;
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
		.inputs {
			margin: 20px;
			display: flex;
			align-items: center;
		}
		.signUp {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	@media (min-width: 769px) and (max-width: 1024px) {
		.container {
			padding: 0 20px;
		}
	}
</style>