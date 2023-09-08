<script>
	import {Input} from '$lib/components';
    export let data;
</script>
<h1>Account</h1>
<Input name="Username" value={data.user.username}/>
<Input name="Email" value={data.user.email}/>