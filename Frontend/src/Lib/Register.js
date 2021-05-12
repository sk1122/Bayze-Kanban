import { access_token, user, notifier } from '../Components/stores';
import router from 'page';

export function Register(userData) {
	fetch('api/accounts/register/', {
		method: 'POST',
		body: userData,
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((res) => {
		const data = res.json()
		.then((d) => {
			if(res.status === 200 || res.status === '200') {
				notifier.update(notifier => ['Registration Successful', 'bg-notifier-success'])
				router.redirect('/login')
			} else {
				notifier.update(notifier => ['Registration Unsuccessful', 'bg-notifier-danger'])
			}
		})
	})
}

export function Login(userData) {
	fetch('api/accounts/login/', {
		method: 'POST',
		body: userData,
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((res) => {
		// console.log(res.text())
		const data = res.json()
		.then((d) => {
			if(res.status === 200 || res.status === '200') {
				user.update(user => 'true')
				access_token.update(access_token => d.token)
				notifier.update(notifier => ['Log In Successful', 'bg-notifier-success'])
				router.redirect('/')
			} else {
				user.update(user => 'false')
				access_token.update(access_token => '')
				notifier.update(notifier => ['Log In Unsuccessful', 'bg-notifier-danger'])
			}
		})
	})
	.catch((res) => {
		console.log(res)
	})
}