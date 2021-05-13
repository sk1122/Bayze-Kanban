<script>
	import Modal from '../Components/Modal.svelte'

	import Navbar from '../Components/Navbar.svelte'
	import Column from '../Components/Column.svelte'

	import { onMount } from 'svelte'
	import { access_token, singleBoardData, notifier, columnData } from '../Components/stores'

	import { getSingleBoard, getColumn, addColumn, getTodo } from '../Lib/Board'
	
	export let params
	let column

	let datas = {};

	getSingleBoard(params.id)

	$: datas = $singleBoardData

	let column_data = []
	getColumn().then(res => column_data = res)

	getTodo().then(res => {$columnData = res})

	function submitColumn() {
		// console.log(column, params.id)
		addColumn(column, params.id)
		.then(response => {
			if(response.ok) {
				getColumn().then(res => column_data = res)
				notifier.update(notifier => ['Added Column Successfully', 'bg-notifier-success'])
			} else {
				notifier.update(notifier => ['Not Able to Add Column', 'bg-notifier-danger'])
			}
		})
	}
</script>

<main let:parent={a} class="relative bg-dark-400 h-screen">
	<Navbar></Navbar>
	<div class="container w-full h-full text-white-100">
		<div class="flex flex-col justify-center items-center w-full h-1/3" style="font-family: 'Inter'; background: {datas.board_color}">
			{#if datas}
				<h1 class="text-4xl mt-5 font-extrabold">{datas.board_name}</h1>
				<p class="text-md">{datas.board_desc}</p>
			{/if}
			<div>
				<label for="add-column" class="sr-only">Add Column</label>
				<input bind:value={column} id="add-column" name="column" type="text" autocomplete="text" required class="appearance-none rounded-none relative block w-full mt-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-dark-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Add Column">
			</div>
			<div>
				<button on:click={submitColumn} type="submit" class="group relative w-full flex justify-center mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-dark-400 bg-white-200 hover:bg-dark-400 hover:text-white-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-200">
					Add Column
				</button>
			</div>
		</div>

		<div class="relative bg-white-100 container flex justify-center items-center w-full h-2/3">
			<div class="absolute w-11/12 h-5/6 flex container overflow-auto">
				{#each column_data as cd}
					{#if cd.board.board_name == datas.board_name}
						<Column name={cd.column_name} column_id={cd.id} data={$columnData} board_id={cd.board.board_id}></Column>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</main>
<Modal></Modal>

