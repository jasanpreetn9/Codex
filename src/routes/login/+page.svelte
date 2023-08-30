<head>
	<link href="./../node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet" />
</head>
<div class="container">
	<div class="loginContainer">
		<form class="login-form">
			<h1>Welcome Back</h1>
			<h2>Login To Your Account</h2>


			<p>Login using social networks</p>
			<div class="brands">
				<i class="fa-brands fa-google" id="google" />
			</div>
			<input type="text" placeholder="Username" required />
			<input type="password" placeholder="Password" required />
			<button type="submit">Sign In</button>
		</form>
		<div class="registerContainer">New Here?</div>
	</div>
</div>

<style>
	input {
		width: 100px;
		height: 20px;
		border-radius: 0px;
	}
	.login-form p {
		position: absolute;
		top: 26%;
		left: 28%;
		padding: 10px;
	}

	.container {
		display: flex;
		justify-content: center;
		margin: 0;
		padding: 0;
		--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
			0 2px 4px -2px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}

	.loginContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100%;
	}
	.login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 300px 500px;
		background: #161b24;
		border-radius: 10px;
	}
	.registerContainer {
		position: absolute;
		background: #000;
		padding: 318.5px 200px;
		right: 100px;
		overflow: hidden;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	h1 {
		position: absolute;
		top: 15%;
		font-size: 40px;
		left: 21%;
	}
	h2 {
		position: absolute;
		top: 20%;
		font-size: 40px;
		left: 21%;
	}
	#google {
		background: #da4f3d;
		font-size: 20px;
		padding: 7px;
		border-radius: 50%;
	}
	.brands {
		position: absolute;
		display: flex;
		justify-content: space-between;
		width: 150px;
		top: 30%;
		left: 435px;
	}
	input {
		padding: 20px;
		width: 400px;
		border-radius: 0.5rem;
		background-color: rgb(55 65 81);
		color: white;
	}
	input:focus {
		border-color: rgb(59 130 246 / var(--tw-border-opacity));
		background-color: rgb(31 41 55 / var(--tw-bg-opacity));
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
	input::placeholder{

	}
</style>
