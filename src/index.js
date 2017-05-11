if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
let playerScore = 0
let computerScore = 0
// let playerWins = 0
// let computerWins = 0

const handleButtonClick = (event) => {
  const player = event.target.className
  const computer = getComputerMove()
  $('figure.player img').src = `/images/${player}.svg`
  $('figure.computer img').src = `/images/${computer}.svg`
  if (player === 'rock') {
    if (computer === 'scissors') { playerScore++ }
    if (computer === 'paper') { computerScore++ }
    // if (computer === 'rock') { gameOver(resetGame) }
  }
  if (player === 'paper') {
    if (computer === 'scissors') { computerScore++ }
    // if (computer === 'paper') { gameOver(resetGame) }
    if (computer === 'rock') { playerScore++ }
  }
  if (player === 'scissors') {
    // if (computer === 'scissors') { gameOver(resetGame) }
    if (computer === 'paper') { playerScore++ }
    if (computer === 'rock') { computerScore++ }
  }

  $('.scores .player').textContent = playerScore
  $('.scores .computer').textContent = computerScore

  if (playerScore >= 2) { gameOver(true) }
  if (computerScore >= 2) { gameOver(false) }
  // HINT: Check for win, lose or draw, then call `gameOver()` eventually.
}

const getComputerMove = () => {
  const moves = ['rock', 'paper', 'scissors']
  return moves[Math.floor(Math.random() * moves.length)]
}

// HINT: Try calling `gameOver(true)` in the console.
const gameOver = (playerDidWin) => {
  if (playerDidWin) {
    $('.dialog h3').textContent = 'You won!'
  } else {
    $('.dialog h3').textContent = 'You lost!'
  }
  $('body').className = 'modal'
}

const resetGame = () => {
  // TODO: Probably need to do more to reset the game here...
  $('figure.player img').src = '/images/unknown.svg'
  $('figure.computer img').src = '/images/unknown.svg'
  $('body').className = ''
  playerScore = 0
  computerScore = 0
  // $('.scores .player').textContent = playerScore
  // $('.scores .computer').textContent = computerScore
  // playerWins = 0
  // computerWins = 0
}

const main = () => {
  const buttons = $$('.player-input button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick)
  }
  $('.dialog button').addEventListener('click', resetGame)
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
