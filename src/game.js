import {drawBoard, drawOnBoard} from './helpers/board.js'
import {isTie, isWinner} from './helpers/check.js'

let board = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
]

const COLUMNS = 7
const ROWS = 7
const SPACE_SIZE = 64.28571428571429

export function showGameOver(player) {
  let message = player == 'tie' ? 'Foi um empate' : 'O vencedor foi'
  let imgSrc = `img/${player}G.png`

  const gameOverElement = document.getElementById('gameover')
  const headerElement = document.getElementById('header')

  gameOverElement.innerHTML = `
    <h1>${message}</h1>
    <img class='winner-img' src=${imgSrc} </img>
    <div class='play' onclick='location.reload()'>Jogar novamente</div>
  `

  gameOverElement.classList.remove('hide')
  headerElement.classList.add('hide')
}

export function play(i, j, ctx, firstPlayer, secondPlayer, currentPlayer) {
  let gameOver = false
  if(board[i][j] !== '') return {currentPlayer, gameOver: false, board}

  board[i][j] = currentPlayer.character

  drawOnBoard(ctx, currentPlayer.image, i, j, SPACE_SIZE)

  // Check if the play wins
  if (isWinner(board, currentPlayer)) {
    showGameOver(currentPlayer.character)
    gameOver = true
  }

  // Check if it's a tie game
  if (isTie(board)) {
    showGameOver('tie')
    gameOver = true
  }

  return {
    currentPlayer: currentPlayer === firstPlayer ? secondPlayer : firstPlayer,
    gameOver,
    board
  }
}

export function init(firstPlayer, secondPlayer) {
  const canvas = document.getElementById('cvs')
  const ctx = canvas.getContext('2d')

  drawBoard(ctx, SPACE_SIZE, ROWS, COLUMNS)

  return {canvas, ctx, firstPlayer, secondPlayer}
}