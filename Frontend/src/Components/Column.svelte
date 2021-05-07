<script>
	export let data
</script>

<div class="flex-shrink-0 w-48 mx-5 h-full bg-dark-400 rounded-2xl" style="font-family: 'Inter'">
	<div class="container flex justify-center items-center w-full h-1/4 bg-white-200 rounded-t-2xl">
		<h1 class="font-extrabold text-2xl text-dark-400">Todo</h1>
	</div>
	<div class="h-full flex flex-col items-center">
		{#each data as d}
			<div class="w-1/3 h-10 my-2 px-10 p-5 flex justify-center items-center bg-white-100 rounded text-dark-400 border-l-8 border-white-200">
				{d.todo}
			</div>
		{/each}
	</div>
</div>