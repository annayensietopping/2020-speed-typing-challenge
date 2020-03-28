
$(function() {
fetchWord()

// defining elements
let wordChallenge = $('h3').text()
// end

// hit "enter" function
$(document).keypress(test)

function test(event) {
  if (event.keyCode === 13) { // if pressed enter
    let wordInput = $('input').val()
    console.log(wordInput)
    console.log(wordChallenge)
    evaluateInput(wordInput)
  }
}
// end

// evaluate input
function evaluateInput(wordInput) {
  if(wordInput === wordChallenge) {
    console.log('correct!')
  } else {
    console.log('you fucked')
  }
}
// end

// pull phrase from API
async function fetchWord() {
  try {
    const url = "https://api.adviceslip.com/advice"

    const response = await axios.get(url)
    console.log(response)
    console.log(response.data.slip.advice)
    updateUi(response.data.slip.advice)
    clearInput()
    // function goes here to update UI
  } catch (error) {
    console.log(error)
  }
}
// end

// update UI with new phrase
function updateUi(newWord){
  $('h3').text(newWord)
}
//end

// clear input box
function clearInput() {
  $('input').html(' ')
}
// end

})
