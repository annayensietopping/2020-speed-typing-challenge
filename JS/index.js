
$(function() {

let newWord
let time = 5
let score
let isPlaying = true
let stopwatch


  var firebaseConfig = {
    apiKey: "AIzaSyCLYH5lOZLwPrtMmAFqDwLhl25guyLHBwU",
    authDomain: "typing-high-scores.firebaseapp.com",
    databaseURL: "https://typing-high-scores.firebaseio.com",
    projectId: "typing-high-scores",
    storageBucket: "typing-high-scores.appspot.com",
    messagingSenderId: "934399843843",
    appId: "1:934399843843:web:ffbb7f64914e6993347836",
    measurementId: "G-GK292FGZN4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const highScoreList = firebase.firestore().collection('highScores')
  console.log(highScoreList)

///

fetchWord()
setScore()

// hit "enter" function
$(document).keypress(test)

function startTimer() {
  let time = 5
  if (stopwatch != null) {
    clearInterval(stopwatch);
  }

  $(document).click(() => {
    console.log('test')
  })

  stopwatch = setInterval(function countdown() {
    renderTime(time)
    if (time > 0) {
      time--
      console.log(time)
    } else if (time === 0){
      isPlaying = false
      $('#resultText').html(`
        <h3 style="font-weight: bold, margin: 10px">Oops too slow</h3>`
        )
      playAgain()
      searchGif("gameover")
      stopTime()

      // newHighScore()
    }
  }, 1000);
}

function test(event) {
  if (event.keyCode === 13) { // if pressed enter
    let wordInput = $('#main').val()
    console.log(wordInput)
    console.log(newWord)
    evaluateInput(wordInput)
    fetchWord()
if(isPlaying === true) {
    startTimer();
}
  }
}
// end

// evaluate input
function evaluateInput(wordInput) {
  if(wordInput === newWord) {
    addPoint()
    console.log('correct!')
  } else {
    stopTime()
    console.log('not a match')
    $('#resultText').html(`
      <p style="font-weight: bold, margin: 10px"> <b> Not a Match</b></p>`)
    $('h3').css("visibility: hidden")
    searchGif("no")
    playAgain()

  // newHighScore()
  }
}
// end

// check status
function checkStatus() {
  if (isPlaying === false) {
  stopTime()
}}
//

function stopTime() {
  clearInterval(stopwatch)
}

// clear input box
function clearInput() {
  $('#main').val('')
}
// end

// set time
function renderTime(time) {
  $('.time').html(time)
}
// end



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
  $('#action').html(`
<button type="button" id ="playAgainButton" style= border:solid; margin:10px;" onClick="window.location.reload()">Play Again?</button> <br>
    `)
}
// play again end

// high scores


function newHighScore() {
  if (score > 2){
  console.log('new high score')
  $('#high-score-box').html(
    `  <div id="high-score-prompt" style="border-style: ridge;
    border-color: red; padding: 2em; margin-top: 15px;
    border-width: 10px; text-align: center;">
        <p><span style="font-size:24px;">high score! </span><br>
        leave a message below: <br>
        <input
          type="text"
          placeholder="your name"
          style="border-style: solid; margin: 5px;"
        /> <br>
        <input
          type="text"
          placeholder="your message"
          style="border-style: solid; margin: 5px;"
        />
      </p>
      </div>`
  )}
}

// high scores end



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
      $('#reaction').html(`<img src="${response[n].images.original.url}" width:50%;/>`)
  }
//

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


})
