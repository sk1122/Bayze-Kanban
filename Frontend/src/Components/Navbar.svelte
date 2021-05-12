<script>
	import Tailwind from './Tailwind.svelte';
	import { user, visibleModal } from './stores';

	const addBoardModal = () => {
		visibleModal.update(visibleModal => 'true')
	}
</script>

<Tailwind />

<div class="flex flex-wrap z-5">
	<div class="w-full fixed">
		<nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-transparent">
			<div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
				<div class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
					<a class="text-sm font-extrabold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-2xl text-white-100 inter" href="/" style="font-family: 'Gilroy';">
						Bayze
					</a>
					<button class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
						<span class="block relative w-6 h-px rounded-sm bg-white"></span>
						<span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
						<span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
					</button>
				</div>
				<div class="flex lg:flex-grow items-center" id="example-navbar-info">
					<ul class="flex flex-col lg:flex-row list-none ml-auto">
						<li class="nav-item">
							<a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white-100 hover:bg-dark-200 rounded hover:opacity-75" href="/dash">
								Dashboard
							</a>
						</li>
						<li class="nav-item">
							<a class="px-3 py-2 mx-2 flex items-center text-xs uppercase font-bold leading-snug text-white-100 hover:bg-dark-200 rounded hover:opacity-75" href="#pablo">
								Settings
							</a>
						</li>
						<li class="nav-item">
							{#if $user == 'true'}
								<button on:click={addBoardModal} class="bg-white-200 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-dark-400 hover:text-white-100 rounded hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-white-200 focus:ring-opacity-50">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
									</svg>
									New Board
								</button>
							{:else}
								<a class="bg-white-200 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-dark-400 hover:text-white-100 rounded hover:bg-dark-200 focus:outline-none focus:ring-4 focus:ring-white-200 focus:ring-opacity-50" href="/login">
									Log In
								</a>
							{/if}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</div>

<style>
	.inter {
		font-family: 'Inter';
	}
</style>