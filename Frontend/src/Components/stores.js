import { writable } from 'svelte/store';

const userLoggedIn = localStorage.getItem('user')
export const user = writable((userLoggedIn === null) ? '' : userLoggedIn);
user.subscribe(value => {
	localStorage.setItem('user', value);
})

export const userData = writable({
	email: 'satyam@gmail.com',
	password: 'satyam@789'
})

const stored_access_token = localStorage.getItem('access_token')
export const access_token = writable(stored_access_token === null ? '':stored_access_token);
access_token.subscribe(value => {
	localStorage.setItem('access_token', value);
})

export const notifier = writable([])

export const visibleModal = writable('false')

export const boardData = writable([])

export const singleBoardData = writable({
	boards: {}
})

export const visibleTodoModal = writable(['false', '0', 'true'])

export const columnData = writable([])