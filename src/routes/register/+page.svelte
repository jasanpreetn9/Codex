<head>
	<link href="./../node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet" />
</head>

<body>
	<form action="?/login" method="POST">
		<div class="container">
			<div class="left-box">


				<h1>Get Started Now</h1>
				<p class="head">Welcome in our service, create an account to start your anime experience.</p>

				<div class="socials">
					<button><i class="fa-brands fa-discord" id="facebok" /> Sign Up with Discord</button>
					<button
					><img
					src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
					id="google"
					alt="s"
					/>Sign Up with Google</button
					>
				</div>
			</div>
			<div class="inputs">
				<label for="email">Email</label>
				<input type="text" placeholder="Example@gmail.com" />

				<label for="email">Username</label>
				<input type="text" placeholder="Username" />

				<label for="email">Password</label>
				<input type="password" placeholder="Password" />

				<label for="email">Confirm Password</label>
				<input type="password" placeholder="Password" />

				<input type="checkbox" />Remember Me

				<button>Sign Up</button>
			</div>

			<p>Already have an account? <a href="/login">Sign In</a></p>
		</div>
	</form>
</body>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
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
	.left-box{
		display: flex;
		flex-direction: column;
		margin-top: 80px;
		margin-right: 10px;
		gap: 20px;
	}
	.socials {
		gap: 5px;
		display: flex;
		height: 40px;
		/* margin: 20px; */
		/* padding: 0; */
	}
	.socials button {
		background: #24272e;
		border: none;
		color: white;
		padding: 10px;
		width: 175px;
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0.1px solid rgb(54, 54, 54);
		--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
			0 4px 6px -4px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}
	#facebok {
		margin-right: 10px;
		padding: 0;
		font-size: 20px;
		color: #5865f2;
	}
	#google {
		margin-right: 10px;
		width: 18px;
		height: 18px;
	}
	h1 {
		top: 12%;
		left: 10%;
	}
	.head {
		width: 330px;
		/* : 20%;top
		left: 10%; */
		color: rgb(100, 100, 100);
		font-size: 13px;
	}
	label {
		display: block;
		margin-top: 15px;
		font-size: 14px;
		font-weight: 500;
	}
	input {
		display: block;
		height: 60px;
		width: 400px;
		background-color: rgba(15, 15, 18, 0.07);
		border-radius: 3px;
		padding: 0 10px;
		margin-top: 8px;
		font-size: 14px;
		font-weight: 300;
		border-radius: 10px;
		border: none;
		color: white;

	}
	::placeholder {
		color: #e5e5e5;
		font-size: 13px;
		font-weight: 100;
		color: white;
	}
	.inputs {
		display: flex;
		flex-direction: column;
		color: rgb(100, 100, 100);
	}
</style>
