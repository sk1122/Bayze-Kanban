<script>
	import router from 'page';

	import Home from './Pages/Home.svelte';
	import Register from './Pages/Register.svelte';
	import Login from './Pages/Login.svelte';
	import Dashboard from './Pages/Dashboard.svelte';
	import SingleBoard from './Pages/SingleBoard.svelte';
	
	import Notifier from './Components/Notifier.svelte';

	import { user } from './Components/stores';

	let page
	let params

	// Set up the pages to watch for
	router('/', () => {
		console.log($user)
		if($user == 'false') {
			router.redirect('/login')
		}
		(page = Home)
	})
	router('/register', () => (page = Register))
	router('/login', () => (page = Login))
	router('/dash', () => (page = Dashboard))
	router(
		'/boards/:id',

		(ctx, next) => {
			params = ctx.params
			next()
		},

		() => (page = SingleBoard)
	)

	// Set up the router to start and actively watch for changes
	router.start()
</script>

<main>
  <svelte:component this="{page}" params="{params}" />
  <Notifier></Notifier>
</main>