<script>
	export let value = '';
	export let placeholder = '';
	export let name;
	export let label;
	export let type = 'text';
	export let disabled = false;
	export let required = false;

	export let errors;
</script>

<label class="input-label" for={name}>{label?.toLowerCase()}</label>
<input
	class={errors ? 'error-input' : ''}
	{type}
	{placeholder}
	{required}
	{disabled}
	{name}
	{value}
/>
{#if errors}
	{#each errors as error}
		<label class="error" for={name}>
			<span>
				{error}
			</span>
		</label>
	{/each}
{/if}

<style>
	.input-label {
		display: block;
		margin-top: 15px;
		font-size: 14px;
		font-weight: 500;
		text-transform: capitalize;
		display: flex;
		align-items: flex-end;
		width: 54%;
	}
	input {
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
	.error-input {
		border: 0.1px solid #f87372;
	}
	.error {
		color: #f87372;
		font-size: 12px;
		align-items: left;
		margin-top: 8px;
	}
	@media (max-width: 768px) and (min-width: 200px) {
		input {
			width: 200px;
		}
	}
</style>
