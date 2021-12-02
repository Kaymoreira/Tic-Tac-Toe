import {isTie, isWinner} from './helpers/check.js';

export function IAPlay(currentBoard, firstPlayer, secondPlayer) {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        // Is the spot available?
        if (currentBoard[i][j] == '') {
            currentBoard[i][j] = secondPlayer;
          let score = minimax(currentBoard, 0, secondPlayer, firstPlayer, secondPlayer);
          currentBoard[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    return move;
};
  
function minimax(board, depth, player, firstPlayer, secondPlayer) {
    const firstWins = isWinner(board, player, firstPlayer);
    const secondWins = isWinner(board, player, secondPlayer);
    const tie = isTie(board);

    if(depth >= 2) return 0;

    if(firstWins){
        return 10;
    }else if(secondWins){
        return -10;
    }else if(tie){
        return 0;
    }
  
    if (player === secondPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = secondPlayer;
            let score = minimax(board, depth + 1, player === firstPlayer ? secondPlayer : firstPlayer, firstPlayer, secondPlayer);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = firstPlayer;
            let score = minimax(board, depth + 1, player === firstPlayer ? secondPlayer : firstPlayer, firstPlayer, secondPlayer);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
};