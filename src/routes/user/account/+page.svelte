<script>
	import { Input } from '$lib/components';
	export let data;
</script>

<h1>Account</h1>

<form action="">
    <input type="file">
	<img class="avatar" src={`https://ui-avatars.com/api/?name=${data.user?.username}`} alt="" />
</form>

<Input name="Username" value={data.user.username} />
<Input name="Email" value={data.user.email} />

<style>
	.avatar {
		width: 80px;
		border-radius: 50%;
	}
</style>
