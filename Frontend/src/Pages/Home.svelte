<script>
	import Navbar from '../Components/Navbar.svelte';
	import Hero from '../Components/Hero.svelte';

	import { io } from 'socket.io-client'

	const socket = io('ws://localhost/')
</script>

<main class="w-full h-screen">
	<Navbar></Navbar>
	<Hero></Hero>
</main>