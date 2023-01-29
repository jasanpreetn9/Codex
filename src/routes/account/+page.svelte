<script>
	export let data;
</script>

<form class="form-widget" method="POST" action="?/updateAccount">
	<div>
		<label for="email">Email</label>
		<input id="email" type="text" value={data.session.user.email} disabled />
	</div>
	<div>
		<label for="username">Name</label>
		<input name="username" id="username" type="text" />
	</div>

	<div>
		<input type="submit" class="button block primary" />
	</div>
</form>

<style>
	form {
		color: white;
	}
</style>
