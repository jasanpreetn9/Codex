<script>
	export let form;
    import {Alert} from '$lib/components'

</script>

<body>
	<form action="?/resendVerification" method="POST">
		<div class="container">
			<div class="left-box">
				<h1>Resend Verification</h1>
				<p class="head">We'll send you an email with a link to verify your account.</p>
                <div class="inputs">
                    <label for="email">Email</label>
                    <input name="email" type="text" placeholder="Example@gmail.com" />

                    <button type="submit" class="signUp">Submit</button>
                </div>
                {#if form?.success}
                    <Alert message="Check you email for the verification link." type="success"/>
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
	label {
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
		opacity: 0.5;
    }
	.inputs {
		display: flex;
		flex-direction: column;
		color: rgb(100, 100, 100);
		width: 100%;
	}
	.inputs label {
		display: flex;
		align-items: flex-end;
		width: 54%;
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
		input {
			width: 200px;
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
