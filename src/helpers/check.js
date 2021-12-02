import {COMBOS} from '../static.js'

export function isWinner(board, player) {
    for (let i = 0; i < COMBOS.length; i++) {
      let won = true

      for (let j = 0; j < COMBOS[i].length; j++) {
        let id = COMBOS[i][j]
        const boardI = Math.trunc(id / board.length)
        const boardJ = id - boardI * board.length
        won = board[boardI][boardJ] == player.character && won
      }
      if (won) {
        return true
      }
    }
    return false
}

export function isTie(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if(board[i][j] === '') return false
    }
  }

  return true
}