<script>
	export let label = 'Click Me';
	export let onClick = () => {};
</script>

<button on:click={onClick} style="padding: 0.5rem 1rem; border: none; background: #0070f3; color: white; border-radius: 4px;">
	{label}
</button>
