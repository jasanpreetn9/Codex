<script>
	export let form;
</script>

<form action="?/login" method="POST">
    <h1>Sign Up</h1>
	<input type="text" name="email" class="search-box" placeholder="Email" />
	<input type="text" name="password" class="search-box" placeholder="Password" />
    <p>forgot password</p>
    <button>Sign Up</button>
    {#if form?.notVerified}
			<div class="alert alert-error shadow-lg w-full max-w-md">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>You must verify your email before you can login.</span>
				</div>
			</div>
		{/if}
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
    h1 {
        color: white;
    }
	.search-box {
		border: none;
		border-bottom: 1px solid #aaa;
		background: transparent;
		outline: none;
		height: 30px;
		color: #fff;
		width: 300px;
		text-transform: capitalize;
		font-size: 16px;
		font-weight: 500;
		transition: 0.5s;
        margin: 10px;
	}

	.search-box:focus {
		border-color: #1f80e0;
	}
    button {
        width: 300px;
        height: 30px;
        border: 1px solid #aaa;
        background: transparent;
        color: white;
        font-size: 17px;
        margin-top: 10px;
    }
</style>
