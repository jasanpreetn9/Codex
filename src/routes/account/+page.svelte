<script>
	export let data;
</script>

<main>
	<form action="?/updateAccount" method="POST" class="auth-form">
		<h3>Account</h3>

		<label for="email">Email</label>
		<input name="username" value={data?.email ?? ''} id="username" type="text" disabled />

		<label for="username">Username</label>
		<input name="username" value={data?.username ?? ''} id="username" type="text" />

		<label for="username">Joined</label>
		<input name="username" value={data?.dateJoined ?? ''} id="username" type="data" disabled />

		<button type="submit">Save</button>
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
</style>

