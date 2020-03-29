
$(function() {
fetchWord()

let newWord
// hit "enter" function
$(document).keypress(test)

function test(event) {
  if (event.keyCode === 13) { // if pressed enter
    let wordInput = $('input').val()
    console.log(wordInput)
    console.log(newWord)
    evaluateInput(wordInput)
    fetchWord()
  }
}
// end

// evaluate input
function evaluateInput(wordInput) {
  if(wordInput === newWord) {
    console.log('correct!')
  } else {
    console.log('you fucked')
  }
}
// end

// pull phrase from API
// async function fetchWord() {
//   try {
//     const url = "https://api.adviceslip.com/advice"
//
//     const response = await axios.get(url)
//     console.log(response)
//     console.log(response.data.slip.advice)
//     updateUi(response.data.slip.advice)
//     clearInput()
//     // function goes here to update UI
//   } catch (error) {
//     console.log(error)
//   }
// }
// end


// MTG API
// https://api.magicthegathering.io/v1/cards
async function fetchWord() {
  try {
    const url = "https://api.magicthegathering.io/v1/cards"

    const response = await axios.get(url)
    let list = response.data.cards
    let index = [Math.floor(Math.random() * response.data.cards.length)];
    newWord = list[index].name
    updateUi(newWord)
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
  $('input').val('')
}
// end

})
