<script>
	export let data;
</script>

<form action="?/register" method="POST">
    <h1>Sign Up</h1>
	<input type="text" name="email" class="search-box" placeholder="Email" />
	<input type="text" name="username" class="search-box" placeholder="Username" />
	<input type="text" name="password" class="search-box" placeholder="Password" />
	<input type="text" name="confirmPassword" class="search-box" placeholder="Confirm Password" />
    <button>Sign Up</button>
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
