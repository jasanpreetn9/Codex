<script>
    import {Icon, XCircle} from 'svelte-hero-icons'
	export let type, message;
</script>

<div class="error">
    <Icon src={XCircle} size="35" />
	<p>{message}</p>
</div>

<style>
    div {
        color: white;
        margin-top: 10px;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }
    .error {
        background-color: #f87372;
    }
    p {
        margin-left: 5px;
    }
</style>