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