<script>
    import {Icon, XCircle,CheckCircle, ExclamationCircle} from 'svelte-hero-icons'
	export let type, message;
    const typeObject = {
        error: XCircle,
        success: CheckCircle,
        warning: ExclamationCircle
    }
</script>

<div class="{type}">
    <Icon src={typeObject[type]} size="35" />
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
    .success {
        background-color: #37D39A;
    }
    .warning {
        background-color: #FABD22;
    }
    p {
        margin-left: 5px;
    }
</style>