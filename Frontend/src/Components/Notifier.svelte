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

	<div transition:fade class="absolute top-10 left-96 flex items-center border-l-4 border-green-700 py-2 px-3 shadow-md mb-2 {$notifier[1]}">
       <!-- icons -->
		<div class="text-green-500 rounded-full bg-white mr-3">
			<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
			</svg>
		</div>
		<!-- message -->
		<div class="text-white max-w-xs ">
			{$notifier[0]}
		</div>
    </div>
{/if}