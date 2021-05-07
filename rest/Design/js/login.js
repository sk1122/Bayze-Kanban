
var questions = [
  {question:"What's your username?"},
  {question:"What's your email?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
  {question:"Create your password", type: "password"}
]

const wrongDetails = () => {
    alert('Wrong Details')
    window.location.reload(false);
}

function login(email, password) {

    var d = {
    "email": email,
    "password": password
    }

    console.log(d)
    return $.ajax({
        url: "api/accounts/login/",
        type: "POST",
        data: JSON.stringify(d),
        dataType: "json",
        contentType: "application/json",
    }).then((response) => {
        var data = response;
        return data.token;
    }).fail((response) => {
        wrongDetails();
        return false;
    })
}

;(function(){

  var tTime = 100  // transition transform time from #register in ms
  var wTime = 200  // transition width time from #register in ms
  var eTime = 1000 // transition width time from inputLabel in ms

  // init
  // --------------
  var position = 0

  putQuestion()

  progressButton.addEventListener('click', validate)
  inputField.addEventListener('keyup', function(e){
    transform(0, 0) // ie hack to redraw
    if(e.keyCode == 13) validate()
  })

  // functions
  // --------------

  // load the next question
  function putQuestion() {
    inputLabel.innerHTML = questions[position].question
    inputField.value = ''
    inputField.type = questions[position].type || 'text'
    inputField.focus()
    showCurrent()
  }

  // when all the questions have been answered
  async function done() {

    // remove the box if there is no next question
    register.className = 'close'

    // add the h1 at the end with the welcome text
    var h1 = document.createElement('h1')
    h1.appendChild(document.createTextNode('Welcome ' + questions[0].value + '!'))
    setTimeout(function() {
      register.parentElement.appendChild(h1)
      setTimeout(function() {h1.style.opacity = 1}, 50)
    }, eTime)

    let access_token = await login(questions[1].value, questions[2].value)
    console.log(access_token)
    if(access_token == false) {
        console.log("Error");
        return
    } else {
        localStorage.removeItem("access_token")
        localStorage.setItem("access_token", access_token)
    }
  }

  // when submitting the current question
  function validate() {

    // set the value of the field into the array
    questions[position].value = inputField.value

    // check if the pattern matches
    if (!inputField.value.match(questions[position].pattern || /.+/)) wrong()
    else ok(function() {

      // set the progress of the background
      progress.style.width = ++position * 100 / questions.length + 'vw'

      // if there is a new question, hide current and load next
      if (questions[position]) hideCurrent(putQuestion)
      else hideCurrent(done)

    })

  }

  // helper
  // --------------

  function hideCurrent(callback) {
    inputContainer.style.opacity = 0
    inputProgress.style.transition = 'none'
    inputProgress.style.width = 0
    setTimeout(callback, wTime)
  }

  function showCurrent(callback) {
    inputContainer.style.opacity = 1
    inputProgress.style.transition = ''
    inputProgress.style.width = '100%'
    setTimeout(callback, wTime)
  }

  function transform(x, y) {
    register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
  }

  function ok(callback) {
    register.className = ''
    setTimeout(transform, tTime * 0, 0, 10)
    setTimeout(transform, tTime * 1, 0, 0)
    setTimeout(callback,  tTime * 2)
  }

  function wrong(callback) {
    register.className = 'wrong'
    for(var i = 0; i < 6; i++) // shaking motion
      setTimeout(transform, tTime * i, (i%2*2-1)*20, 0)
    setTimeout(transform, tTime * 6, 0, 0)
    setTimeout(callback,  tTime * 7)
  }

}())