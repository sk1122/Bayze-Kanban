<script>
	import { onMount } from 'svelte'
	import { visibleTodoModal } from './stores'
	import { getTodo } from '../Lib/Board'
	import { useEffect } from '../Lib/hooks'

	export let data
	export let name
	export let board_id
	export let column_id
	
	let arrData
	$: arrData = data

	let options
	let todo_list

	function addTodoModal() {
		visibleTodoModal.update(visibleTodoModal => ['true', column_id, 'true'])
	}

	function showOption() {
		if(options.classList.contains('opacity-0')) {
			options.classList.remove('opacity-0')
			options.classList.remove('pointer-events-none')
		}
		else {
			options.classList.add('opacity-0')
			options.classList.add('pointer-events-none')
		}
	}

	function checkDrag(list_items, lists) {
		var draggedItem;
		for(let i=0;i<list_items.length;i++) {
			const item = list_items[i];
			item.addEventListener("dragstart", function() {
				draggedItem = item;
			})
			for(let j=0;j<lists.length;j++) {
				const list = lists[j];
				list.addEventListener('dragover', function(e) {
					e.preventDefault()
				})

				list.addEventListener('drop', function() {
					if(draggedItem == undefined)
						return
					list.append(draggedItem)
					return
				})
			}
		}
	}

	function showTodoDetails(todo) {
		visibleTodoModal.update(visibleTodoModal => ['true', todo, 'false'])
	}

	useEffect(() => {
		let lists = document.querySelectorAll('#list')
		let list_items = document.querySelectorAll('#list_item')

		checkDrag(list_items, lists)
	}, todo_list)
</script>

<div class="flex-shrink-0 w-48 mx-5 h-full bg-dark-400 rounded-2xl" style="font-family: 'Inter'">
	<div class="relative container flex justify-center items-center w-full h-1/4 bg-white-200 rounded-t-2xl">
		<h1 class="font-extrabold text-2xl text-dark-400">{name}</h1>
		<svg on:click={showOption} xmlns="http://www.w3.org/2000/svg" class="absolute top-11 right-5 h-5 w-5 text-dark-400 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
			<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
		</svg>
		<div bind:this={options} class="options opacity-0 pointer-events-none absolute flex flex-col items-center w-1/2 h-48 bg-dark-200 -bottom-40 right-0 rounded">
			<div on:click={addTodoModal} class="w-3/4 flex justify-center items-center h-10 hover:bg-dark-500 transition rounded hover:duration-500 cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
				</svg>
				<p class="text-white-100 text-sm">Todo</p>
			</div>
			<div class="w-3/4 flex justify-center items-center h-10 hover:bg-dark-500 transition rounded hover:duration-500 cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
					<path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
				</svg>
				<p class="text-white-100 text-sm">Edit</p>
			</div>
			<div class="w-3/4 flex justify-center items-center h-10 hover:bg-dark-500 transition rounded hover:duration-500 cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" class="text-white-100 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd" />
				</svg>
				<p class="text-white-100 text-sm">Color</p>
			</div>
			<div class="w-3/4 flex justify-center items-center h-10 hover:bg-dark-500 transition rounded hover:duration-500 cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
				</svg>
				<p class="text-white-100 text-sm">Invite</p>
			</div>
		</div>
	</div>
	<div bind:this={todo_list} id="list" class="h-full flex flex-col items-center">
		{#each arrData as d}
			{#if d.column.board.board_id == board_id}
				{#if d.column.id == column_id}
					<div on:click={showTodoDetails(d)}  id="list_item" class="w-1/3 h-10 my-2 px-10 p-5 flex justify-center items-center bg-white-100 rounded text-dark-400 border-l-8 border-white-200" draggable="true">
						{d.todo_name}
					</div>
				{/if}
			{/if}
		{/each}
	</div>
</div>

<style>
	.options {
		transition: opacity 200ms ease-in-out;
	}
</style>