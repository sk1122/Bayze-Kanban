<script>
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { notifier } from '../Components/stores';
	let ms = 3000
	let visible;
	let timeout

	const onMessageChange = (message, ms) => {
		clearTimeout(timeout)
		if (!message) {
			visible = false
		} else {
			visible = true
			if (ms > 0) timeout = setTimeout(() => visible = false, ms)
		}
	}

	$: onMessageChange($notifier[0], ms)

	onDestroy(()=> clearTimeout(timeout))
</script>

{#if visible}
	<div transition:fade class="absolute top-0 left-1/3 w-44 p-5 rounded text-center container {$notifier[1]}" on:click={() => visible = false}>
		{$notifier[0]}
	</div>
{/if}