<script>
	export let form;
	console.log(form);
</script>

<main>
	<form action="?/register" method="POST" class="auth-form">
		<h3>Register Here</h3>

		<label for="email">Email</label>
		<input type="email" value={form?.email ?? ''} name="email" placeholder="Email" />

		<label for="password">Password</label>
		<input type="password" name="password" placeholder="Password" />
		<label for="password">Confirm Password</label>
		<input type="password" name="confirmPassword" placeholder="Confirm Password" />

		<button>Register</button>
		<!-- <div class="social">
			<div class="go"><i class="fab fa-google" /> Google</div>
			<div class="fb"><i class="fab fa-facebook" /> Facebook</div>
		</div> -->
	</form>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	form {
		width: 400px;
		background-color: #060b11;
		border-radius: 10px;
		border: 2px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
		padding: 50px 35px;
	}
	form * {
		font-family: 'Poppins', sans-serif;
		color: #ffffff;
		letter-spacing: 0.5px;
		outline: none;
		border: none;
	}
	form h3 {
		font-size: 32px;
		font-weight: 500;
		line-height: 42px;
		text-align: center;
	}

	label {
		display: block;
		margin-top: 30px;
		font-size: 16px;
		font-weight: 500;
	}
	input {
		display: block;
		height: 50px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.07);
		border-radius: 3px;
		padding: 0 10px;
		margin-top: 8px;
		font-size: 14px;
		font-weight: 300;
	}
	::placeholder {
		color: #e5e5e5;
	}
	button {
		margin-top: 50px;
		width: 100%;
		background-color: #ffffff;
		color: #080710;
		padding: 15px 0;
		font-size: 18px;
		font-weight: 600;
		border-radius: 5px;
		cursor: pointer;
	}
	.social {
		margin-top: 30px;
		display: flex;
	}
	.social div {
		background: red;
		width: 150px;
		border-radius: 3px;
		padding: 5px 10px 10px 5px;
		background-color: rgba(255, 255, 255, 0.27);
		color: #eaf0fb;
		text-align: center;
	}
	.social div:hover {
		background-color: rgba(255, 255, 255, 0.47);
	}
	.social .fb {
		margin-left: 25px;
	}
	.social i {
		margin-right: 4px;
	}
</style>
