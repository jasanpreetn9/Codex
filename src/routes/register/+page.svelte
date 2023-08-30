<head>
	<link href="./../node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet" />
</head>

<body>
	<form action="?/register" method="POST">
		<div class="container">
			<div class="left-box">
				<h1>Welcome Back</h1>
				<p class="head">Sign in to access your account.</p>

				<div class="socials">
					<button><i class="fa-brands fa-discord" id="facebok" /> Sign In with Discord</button>
					<button
						><img
							src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
							id="google"
							alt="s"
						/>Sign In with Google</button
					>
				</div>
			</div>
			<div class="inputs">
				<label for="email">Email</label>
				<input name="email" type="text" placeholder="Example@gmail.com" />

				<label for="username">Username</label>
				<input name="username" type="text" placeholder="Username" />

				<label for="password">Password</label>
				<input name="password" type="password" placeholder="Password" />

				<label for="email">Confirm Password</label>
				<input name="passwordConfirm" type="password" placeholder="Password" />

				<div class="rememberMe">
					<input type="checkbox" />Remember Me
				</div>

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
	.socials {
		gap: 5px;
		display: flex;
		margin: 0px;
		padding: 0px;
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
	.head {
		width: 330px;
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
		font-weight: 500;
		border-radius: 10px;
		border: none;
		color: white;
		border: 0.1px solid rgb(54, 54, 54);
		--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
			0 4px 6px -4px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}
	::placeholder {
		color: #e5e5e5;
		font-size: 13px;
		font-weight: 100;
		color: white;
		opacity: .5;
	}
	.inputs {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: rgb(100, 100, 100);
		width: 100%;
	}
	.inputs label {
		display: flex;
		align-items: flex-end;
		width: 54%;
	}
	.rememberMe {
		display: flex;
		justify-content: left;
		width: 120px;
		flex-direction: row;
		font-size: 12px;
		padding: 0;
		margin-top: 10px;
		margin-right: 250px;
	}
	.rememberMe input[type='checkbox'] {
		margin: 0;
		padding: 0;
		border-radius: 50%;
		width: 20px;
		height: 20px;
	}
	.signUp {
		background: #3f43fc;
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
	@media (max-width: 768px) and (min-width: 200px) { /* Small screens */
        .container {
            flex-direction: column;
            height: auto;
			display: flex;
			justify-content: center	;
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
		.left-box p{
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.socials{
			flex-direction: column;
		}
        .inputs {
            margin: 20px;
			display: flex;
			align-items: center;

        }
		input{
			width: 200px;
		}
        .signUp {
            width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
        }
    }

    @media (min-width: 769px) and (max-width: 1024px) { /* Medium screens */
        .container {
            padding: 0 20px;
        }

    }
</style>
