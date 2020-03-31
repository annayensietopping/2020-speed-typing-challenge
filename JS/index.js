
$(function() {


let newWord
let time
let score
let isPlaying

fetchWord()
setTime()
setScore()

// hit "enter" function
$(document).keypress(test)

function test(event) {
  if (event.keyCode === 13) { // if pressed enter
    let wordInput = $('input').val()
    console.log(wordInput)
    console.log(newWord)
    evaluateInput(wordInput)
    fetchWord()
    let stopwatch = setInterval(countdown, 1000)
  }
}
// end

// evaluate input
function evaluateInput(wordInput) {
  if(wordInput === newWord) {
    addPoint()
    console.log('correct!')
    time = 5
  } else {
    setScore()
    console.log('not a match')
    searchGif("no")
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

// set time
function setTime() {
  time = 5
  $('.time').html(time)
}
// end

// set time
function updateTime() {
  $('.time').html(time)
}
// end

// countdown timeer
function countdown() {
  if (time > 0) {
    time--
    console.log(time)
    updateTime(time)
  } else if (time === 0) {
    console.log('gameover')
    playAgain()
searchGif("time's up")
isPlaying = false
  }
}
// end

// check status
function checkStatus() {
  if (!isPlaying && time === 0)
  clearInterval(stopwatch)
}

//

// set score
function setScore() {
  score = 0
  $('#score').html(score)
}
// end

function addPoint() {
  score++
  $('#score').html(score)
}

// play again?
// adds button
function playAgain() {
  $('h3').html(`
<button type="button" id ="playAgainButton" style= border:solid; margin:10px;" onClick="window.location.reload()">Play Again?</button> <br>
    `)
}
// play again end

// Giphy

function searchGif(query) {
    const giphyUrl = "https://api.giphy.com/v1/gifs/search"
    const apiKey = "HRuknNTOGG0i1qVagcgOpKaxQz2OTAop"

      // making API request using AJAX
    $.ajax({
      url: giphyUrl,
      type: "GET",
      data: { api_key: apiKey, q: query }
    })
    .done((response) => {
      // execute this function if request is successful
      // console.log(response.data)

      // pass array of gifs as a parameter from API tp displayResults() function
      // function is defined below outside of this event
      displayResults(response.data)
    })
    .fail(() => {
      // execute this function if request fails
      alert('error occurred')
    })
  }
// end search function

// display results function
function displayResults(response) {
  let n = Math.floor(Math.random() * 26)
      $('#reaction').html(`<img src="${response[n].images.original.url}"/>`)
  }
//

})
