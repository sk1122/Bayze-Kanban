import { access_token, user, boardData, singleBoardData } from '../Components/stores';

export function getBoard() {
	var at;
	const unsubscribe = access_token.subscribe(value => {
		at = value
	})
	console.log(at)
	fetch('/api/api/board/', {
		headers: {
			'Authorization': `BEARER ${at}`
		}
	})
	.then(res => {
		const d = res.json()
		.then((data) => {
			boardData.update(boardData => data)
		})

		if(res.status === 401) {
			user.update(user => 'false')
			access_token.update(access_token => '')
		}
	})
}

export function postData(data) {
	var at;
	const unsubscribe = access_token.subscribe(value => {
		at = value
	})
	fetch('/api/api/board/', {
		method: 'POST',
		body: data,
		headers: {
			'Authorization': `BEARER ${at}`,
			'Content-Type': 'application/json'
		}
	})
	.then((res) => {
		const d = res.json()
		.then(data => {
			console.log(data)
		})

		console.log(res.status)
	})
}

export function getSingleBoard(id) {

	var at;
	const unsubscribe = access_token.subscribe(value => {
		at = value
	})

	let url = `/api/api/board/${id}`
	fetch(url, {
		headers: {
			'Authorization': `Bearer ${at}`
		}
	})
	.then(res => {
		const d = res.json()
		.then(data => {
			console.log(data)
			singleBoardData.update(singleBoardData => data.boards)
		})
		if(res.status === 401) {
			user.update(user => 'false')
			access_token.update(access_token => '')
		}
	})

}

export function getColumn() {
	var at;
	const unsubscribe = access_token.subscribe(value => {
		at = value
	})

	let url = `/api/api/column/`
	return fetch(url, {
		headers: {
			'Authorization': `Bearer ${at}`,
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
}

export function addColumn(column_name, board_id) {
	var at;
	const unsubscribe = access_token.subscribe(value => {
		at = value
	})

	var data = JSON.stringify({
		column_name: column_name,
		board: board_id
	})

	let url = '/api/api/column/'
	return fetch(url, {
		method: 'POST',
		body: data,
		headers: {
			'Authorization': `Bearer ${at}`,
			'Content-Type': 'application/json'
		}
	})
}

export function getTodo() {
	var at;
	const unsubscribe = access_token.subscribe(value => {
		at = value
	})

	let url = '/api/api/todo/'
	return fetch(url, {
		headers: {
			'Authorization': `Bearer ${at}`,
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
}

export function addTodo(todo_name, todo_desc, column_id) {
	var at;
	const unsubscribe = access_token.subscribe(value => {
		at = value
	})

	var data = JSON.stringify({
		column: column_id,
		todo_name: todo_name,
		todo_desc: todo_desc,
	})

	let url = '/api/api/todo/'
	return fetch(url, {
		method: 'POST',
		body: data,
		headers: {
			'Authorization': `Bearer ${at}`,
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.text())
}

export function updateTodo(todo) {
	var at;
	const unsubscribe = access_token.subscribe(value => {
		at = value
	})

	let url = '/api/api/todo/'
	fetch(url, {
		method: 'PUT',
		body: todo,
		headers: {
			'Authorization': `Bearer ${at}`,
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.json())
	.then(data => console.log(data))
}