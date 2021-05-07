
list = ["todo", "doing", "done", "trash"]
list1 = ["Todo", "Doing", "Done", "Trash"]

function post() {
	let todo = localStorage.getItem("todo")
	todo = todo.split(",")
	let doing = localStorage.getItem("doing")
	doing = doing.split(",")
	let done = localStorage.getItem("done")
	done = done.split(",")
	let trash = localStorage.getItem("trash")
	trash = trash.split(",")

	postData(todo, doing, done, trash)
}

setInterval(post, 10000)

function getHtmlForDrag(data) {
	return `<div class="item" draggable="true">${data}</div>`
}

function appendData(data) {
	console.log(data.category)
	document.getElementById(data.category.toLowerCase()).innerHTML += getHtmlForDrag(data.todo)
}

function requestData() {
	$.ajax({
		url: "/api/api/todo/",
		type: "GET",
		headers: {"Authorization": `Bearer ${localStorage.getItem('access_token')}`},

		success: function(response) {
			let data = response
			let len = data.length
			console.log(len)

			for(let i=0;i<len;i++)
				appendData(data[i])
		},

		error: function(response) {
			console.log(response)
		}
	})
}

function postData(todo, doing, done, trash) {
	
	let dataToPost = [
	{
		"todo": "doing[0]",
		"category": "doing"
	}
	]

	$.ajax({
		url: "/api/api/todo/",
		type: "POST",
		data: JSON.stringify(dataToPost),
		headers: {"Authorization": `Bearer ${localStorage.getItem('access_token')}`},
		dataType: "json",
		contentType: "application/json",

		success: function(response) {
			console.log(response)
		},

		error: function(response) {
			console.log("Error")
		}
	})
}

function checkLoggedIn() {
	$.ajax({
		url: "/api/loggedIn",
		type: "GET",
		headers: {"Authorization": `Bearer ${localStorage.getItem('access_token')}`},
		dataType: "text",

		success: function(response) {
			console.log("Successful Login")
			let login = document.getElementById('login')

			login.style.display = 'none'
		},

		error: function(response) {
			console.log("Error Login")
			let login = document.getElementById('login')

			login.style.display = 'block'
		}
	})
}

// Document Loads
requestData()