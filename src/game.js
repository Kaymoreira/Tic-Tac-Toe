import {drawBoard, drawOnBoard} from './helpers/board.js'
import {isTie, isWinner} from './helpers/check.js'

const COLUMNS = 7
const ROWS = 7
const SPACE_SIZE = 64.28571428571429

export function showGameOver(player) {
  let message = player == 'tie' ? 'Foi um empate' : 'O vencedor foi'
  let imgSrc = `img/${player}G.png`

  const gameOverElement = document.getElementById('gameover')

  gameOverElement.innerHTML = `
    <h1>${message}</h1>
    <img class='winner-img' src=${imgSrc} </img>
    <button class='play' onclick='location.href = "/"'>Jogar novamente</button>
  `

  gameOverElement.classList.remove('hide')
}

export function play(board ,i, j, ctx, player, ia, currentPlayer) {
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
    currentPlayer: currentPlayer === player ? ia : player,
    gameOver,
    board
  }
}

export function init(player, ia) {
  const canvas = document.getElementById('cvs')
  const ctx = canvas.getContext('2d')

  drawBoard(ctx, SPACE_SIZE, ROWS, COLUMNS)

  return {canvas, ctx, player, ia}
}