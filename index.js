import {init, play, showGameOver} from './src/game.js'
import {sleep} from './src/helpers/general.js'
import {IAPlay} from './src/IA.js'

/*const currentBoard = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', 'x', 'x', '', '', '', ''],
  ['', '', 'x', '', '', '', ''],
  ['', '', '', 'x', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '']
]

const {i, j} = IAPlay(currentBoard, 'x', 'o')
console.log({i, j})*/


let data

const SPACE_SIZE = 64.28571428571429
let gameOver = false
let currentPlayer
let currentBoard
let firstPlay = true

const xImage = new Image()
xImage.src = 'img/X.png'

xImage.onload = function() {
  const oImage = new Image()
  oImage.src = 'img/O.png'
  
  oImage.onload = function() {
    data = init({
      character: 'x',
      image: xImage
    }, {
      character: 'o',
      image: oImage
    })

    currentPlayer = data.firstPlayer;

    data.canvas.addEventListener('click', (event) => {

      if(currentPlayer === data.firstPlayer){
        // X & Y position of mouse click relative to the canvas
        const X = event.clientX - data.canvas.getBoundingClientRect().x
        const Y = event.clientY - data.canvas.getBoundingClientRect().y
    
        // WE CALCULATE i & j of the clicked SPACE
        const i = Math.floor(Y / SPACE_SIZE)
        const j = Math.floor(X / SPACE_SIZE)
    
        const res = play(i, j, data.ctx, data.firstPlayer, data.secondPlayer, currentPlayer)
        currentPlayer = res.currentPlayer;
        gameOver = res.gameOver
        currentBoard = res.board
      }
    })
  };
};

while(true){
  if(gameOver) break;

  if(currentBoard && data && currentPlayer === data.secondPlayer){
    const {i, j} = IAPlay(currentBoard, data.firstPlayer, data.secondPlayer, firstPlay)
    console.log({i, j})
    const res = play(i, j, data.ctx, data.firstPlayer, data.secondPlayer, currentPlayer)
    currentPlayer = res.currentPlayer;
    gameOver = res.gameOver
    currentBoard = res.board
    firstPlay = false
  }
  await sleep(200)
}