<script>
	import Navbar from '../Components/Navbar.svelte';
	import Notifier from '../Components/Notifier.svelte';

	import { notifier, visibleModal, boardData } from '../Components/stores';
	import { HsvPicker } from 'svelte-color-picker';

	import { getBoard, postData } from '../Lib/Board';

	let boards; // Board's Parent Element
	let modal;
	let main;
	let colorPicker;
	let colorBtn;
	let board_desc = '';

	$: l = board_desc.length

	let boardsData;
	let board_name;

	// Function to add Boards to boards
	const addBoard = () => {
		let data = 'transition duration-500 ease-in-out bg-white-200 rounded h-40 flex justify-center items-center hover:bg-white-100 transform hover:-translate-y-1 hover:scale-110'.split(" "); // Classes for div
		
		const child = document.createElement('div');
		
		for(let i=0;i<data.length;i++) {
			child.classList.add(data[i]);
		}
		child.textContent = "Satyam Kulkarni"
		
		boards.appendChild(child);
		
		notifier.update(notifier => ['Created Board', 'bg-notifier-success'])
	}

	const add = () => {
		visibleModal.update(visibleModal => 'true')
	}

	$: if($visibleModal == 'true') {
		addBoardModal()
	}

	export const addBoardModal = () => {
		if(modal.classList.contains('opacity-0'))
			modal.classList.remove('opacity-0')

		if(modal.classList.contains('pointer-events-none'))
			modal.classList.remove('pointer-events-none')

		main.classList.add('wrapper')
	}

	const closeModal = () => {
		modal.classList.add('opacity-0')
		modal.classList.add('pointer-events-none')
		main.classList.remove('wrapper')
		visibleModal.update(visibleModal => 'false')
	}

	const colorCallback = (rgba) => {
		let color = `rgba(${rgba.detail.r}, ${rgba.detail.g}, ${rgba.detail.b}, ${rgba.detail.a})`
		colorBtn.style.backgroundColor = color;
	}

	const openColorPicker = () => {
		if(colorPicker.classList.contains('hidden'))
			colorPicker.classList.remove('hidden')
		else
			colorPicker.classList.add('hidden')
	}

	const submitBoard = () => {
		let color = colorBtn.style.backgroundColor
		console.log(board_name, board_desc, color)
		let data = JSON.stringify({
			board_name: board_name,
			board_desc: board_desc,
			board_color: color
		})
		postData(data)
		getBoard()
		closeModal()
	}

	getBoard()
</script>

<main bind:this={main}>
	<Navbar></Navbar>
	<div class="flex flex-col items-center w-full md:h-screen sm:h-full bg-dark-400">
		<div class="container flex flex-grow-0 flex-shrink-0 justify-center items-center w-full h-72">
			<h1 class="mt-6 text-center text-4xl text-white-100 font-extrabold" style="font-family: 'Inter">Create Boards</h1>
		</div>

		<div class="container w-3/4">
			<div bind:this={boards} class="w-full grid md:grid-cols-6 sm:grid-cols-2 gap-4 text-dark-400">
				<div on:click={add} class="transition duration-500 ease-in-out bg-white-200 rounded h-40 flex justify-center items-center hover:bg-white-100 transform hover:-translate-y-1 hover:scale-110">
					<svg xmlns="http://www.w3.org/2000/svg" class="fill-current h-20 w-20 text-4xl" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
					</svg>
				</div>

				{#each $boardData as d} 
					<a href="/boards/{d.id}" data-id={d.id} class="transition duration-500 ease-in-out bg-white-200 rounded h-40 flex flex-col justify-center items-center hover:bg-white-100 transform hover:-translate-y-1 hover:scale-110" style="font-family: 'Inter'">
						<h1 class="text-center text-2xl font-extrabold" >{d.board_name}</h1>
						<div class="text-center text-sm">{d.board_desc}</div>
					</a>
				{/each}
			</div>
		</div>
	    
	    
	</div>
</main>

<!-- Modal -->
<div id="modal" bind:this={modal} class="modal opacity-0 ease-in-out pointer-events-none absolute text-dark-100 top-1/4 left-48 w-2/3 h-2/3 bg-white-200 shadow-3xl rounded" style="font-family: 'Inter'">
	<div on:click={closeModal} class="absolute right-5 top-5 cursor-pointer">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-white-300" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
		</svg>
	</div>
	<div class="w-full h-full flex flex-col items-center">
		<div class="flex justify-center items-center container w-full h-1/4">
			<h1 class="text-3xl text-center text-dark-400 font-extrabold" >Add Board</h1>
		</div>

		<div class="flex flex-col items-center w-full h-3/4">
			<div class="col mt-8 sm:ml-2 sm:mt-0 sm:w-1/2">
				<div class="box border rounded flex flex-col shadow bg-white">
					<div class="box__title bg-grey-lighter px-3 py-2 border-b">
						<h3 class="text-sm text-grey-darker font-medium">Board Name</h3>
					</div>
					<input bind:value={board_name} type="text" class="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-dark-100 text-dark-500 focus:z-10 sm:text-2xl">
				</div>
			</div>

			<div class="col mt-8 sm:ml-2 sm:mt-8 sm:w-1/2">
				<div class="box border rounded flex flex-col shadow bg-white">
					<div class="box__title bg-grey-lighter px-3 py-2 border-b">
						<h3 class="text-sm text-grey-darker font-medium">Board Description</h3>
					</div>
					<textarea bind:value={board_desc} maxlength="120" class="text-grey-darkest flex-1 bg-transparent" name="tt"></textarea>
					<p class="w-full bg-white-100">{l}/120</p>
				</div>
			</div>

			<div class="w-full flex justify-evenly items-center">
				<div class="relative col mt-8 w-1/2">
					<button bind:this={colorBtn} on:click={openColorPicker} class="transition duration-500 ease-in-out rounded text-white-200 hover:bg-white-100 transform hover:-translate-y-1 hover:scale-110 py-2 px-2" >Choose BG</button>
					<div bind:this={colorPicker} class="hidden absolute transition duration-500 ease-in-out -top-36 -left-64">
						<HsvPicker on:colorChange={colorCallback} startColor="#000022"></HsvPicker>
					</div>
				</div>

				<div class="btn">
					<button on:click={submitBoard} class="transition duration-500 ease-in-out rounded bg-dark-400 text-white-200 hover:bg-white-100 hover:text-dark-400 transform hover:-translate-y-1 hover:scale-110 py-2 px-2" >Create Board</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.wrapper) {
	    -webkit-filter: blur(1px);
	    -ms-filter: blur(1px);
	    -moz-filter: blur(1px);
	    -o-filter: blur(1px);
	    filter: blur(1px);
	}

	.modal {
		transition: opacity 500ms ease;
	}
</style>