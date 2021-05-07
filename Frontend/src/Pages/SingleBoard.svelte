<script>

	import Navbar from '../Components/Navbar.svelte'
	import Column from '../Components/Column.svelte'

	import { onMount } from 'svelte'
	import { access_token, singleBoardData } from '../Components/stores'

	import { getSingleBoard } from '../Lib/Board'
	
	export let params

	let datas = {};

	getSingleBoard(params.id)

	$: datas = $singleBoardData

	let data = [
		{
			'todo': 'Grocery',
		},
		{
			'todo': 'Grocery',
		},
		{
			'todo': 'Grocery',
		},
		{
			'todo': 'Grocery',
		},
		{
			'todo': 'Grocery',
		}
	]
</script>

<main class="bg-dark-400 h-screen">
	<Navbar></Navbar>
	<div class="container w-full h-full text-white-100">
		<div class="flex flex-col justify-center items-center w-full h-1/3" style="font-family: 'Inter'; background: {datas.board_color}">
			{#if datas}
				<h1 class="text-4xl font-extrabold">{datas.board_name}</h1>
				<p class="text-md">{datas.board_desc}</p>
			{/if}
		</div>

		<div class="relative bg-white-100 container flex justify-center items-center w-full h-2/3">
			<div class="absolute w-11/12 h-5/6 flex container overflow-auto">
				<Column data={data}></Column>
				<Column data={data}></Column>
				<Column data={data}></Column>
				<Column data={data}></Column>
			</div>
		</div>
	</div>
</main>
