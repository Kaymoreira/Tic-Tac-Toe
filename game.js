import {init, play} from './src/game.js'
import {sleep} from './src/helpers/general.js'
import {IAPlay} from './src/IA.js'

let params = (new URL(document.location)).searchParams;

let data

const SPACE_SIZE = 64.28571428571429

let iaStarts = params.get('iaStarts') === 'true'
let gameOver = false
let currentPlayer
let currentBoard = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
]
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

    currentPlayer = iaStarts ? data.ia : data.player;

    data.canvas.addEventListener('click', (event) => {

      if(!gameOver && currentPlayer.character === data.player.character){
        // X & Y position of mouse click relative to the canvas
        const X = event.clientX - data.canvas.getBoundingClientRect().x
        const Y = event.clientY - data.canvas.getBoundingClientRect().y
    
        // WE CALCULATE i & j of the clicked SPACE
        const i = Math.floor(Y / SPACE_SIZE)
        const j = Math.floor(X / SPACE_SIZE)
    
        const res = play(currentBoard, i, j, data.ctx, data.player, data.ia, currentPlayer)
        currentPlayer = res.currentPlayer;
        gameOver = res.gameOver
        currentBoard = res.board
      }
    })
  };
};

while(true){
  if(gameOver) break;

  if(currentBoard && data && currentPlayer.character === data.ia.character){
    const {i, j} = IAPlay(currentBoard, data.player, data.ia, firstPlay)
    const res = play(currentBoard, i, j, data.ctx, data.player, data.ia, currentPlayer)
    currentPlayer = res.currentPlayer;
    gameOver = res.gameOver
    currentBoard = res.board
    firstPlay = false
  }
  await sleep(200)
}