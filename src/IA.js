import {isTie, isWinner} from './helpers/check.js';
import {random} from './helpers/general.js'

export function IAPlay(currentBoard, firstPlayer, secondPlayer) {
    // AI to make its turn
    let moveBasedOnOponent;
    let moveBasedOnMe;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if(currentBoard[i][j] === firstPlayer.character){
          const bestPlay = getBestPlay(currentBoard, i, j, 1, secondPlayer.character, firstPlayer.character, undefined)

          if(!moveBasedOnOponent || bestPlay.counter > moveBasedOnOponent.counter) {
            moveBasedOnOponent = bestPlay;
          }
        }
      }
    }
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if(currentBoard[i][j] === firstPlayer.character){
          const bestPlay = getBestPlay(currentBoard, i, j, 1, firstPlayer.character, secondPlayer.character, undefined)

          if(!moveBasedOnMe || bestPlay.counter > moveBasedOnMe.counter) {
            moveBasedOnMe = bestPlay;
          }
        }
      }
    }

    console.log('moveBasedOnOponent', moveBasedOnOponent)
    console.log('moveBasedOnMe', moveBasedOnMe)

    if(!moveBasedOnOponent || !moveBasedOnMe) {
      return {i: random(0, 6), j: random(0, 6)}
    }

    if(moveBasedOnOponent.counter === 1 && moveBasedOnMe.counter === 1){
      return {i: random(0, 6), j: random(0, 6)}
    }

    if(moveBasedOnOponent.counter >= 3){
      return moveBasedOnOponent.pos;
    }

    if(moveBasedOnMe.counter >= 3){
      return moveBasedOnMe.pos;
    }

    if(moveBasedOnOponent.counter < 2){
      return moveBasedOnMe.pos
    }

    if(moveBasedOnOponent.counter === 2 && moveBasedOnMe.counter === 2){
      return moveBasedOnMe.pos;
    }

    if(moveBasedOnOponent.counter > moveBasedOnMe.counter){
      return moveBasedOnOponent.pos;
    }

    console.log('aleatório')
    return {i: random(0, 6), j: random(0, 6)}
    //return moveBasedOnOponent.pos
};

function getBestPlay(currentBoard, i, j, counter, me, opponent, direction) {
  if(!direction){
    const res1 = getBestPlay(currentBoard, i, j, counter, me, opponent, [-1, 0])
    const res2 = getBestPlay(currentBoard, i, j, counter, me, opponent, [1, 0])
    const res3 = getBestPlay(currentBoard, i, j, counter, me, opponent, [0, -1])
    const res4 = getBestPlay(currentBoard, i, j, counter, me, opponent, [0, 1])
    const res5 = getBestPlay(currentBoard, i, j, counter, me, opponent, [-1, -1])
    const res6 = getBestPlay(currentBoard, i, j, counter, me, opponent, [1, 1])
    const res7 = getBestPlay(currentBoard, i, j, counter, me, opponent, [-1, 1])
    const res8 = getBestPlay(currentBoard, i, j, counter, me, opponent, [1, -1])
    
    const resArray = [
      res1,
      res2,
      res3,
      res4,
      res5,
      res6,
      res7,
      res8,
    ]

    const max = Math.max(Math.max(...resArray.map(item => item.counter)));
    let index = -1

    for (let i = 0; i < resArray.length; i++) {
      if(resArray[i].counter === max) {
        index = i;
        break;
      }  
    }
    return resArray[index];
  }else{
    if(!checkBounds(currentBoard, i + direction[0], j + direction[1])) return {counter: -1, pos: {i, j}};

    if(currentBoard[i + direction[0]][j + direction[1]] === opponent){
      return getBestPlay(currentBoard, i + direction[0], j + direction[1], counter + 1, me, opponent, direction)
    }else if(currentBoard[i + direction[0]][j + direction[1]] === me){
      return {counter: -1, pos: {i: i + direction[0], j: j + direction[1]}}
    }else{
      return {counter, pos: {i: i + direction[0], j: j + direction[1]}};
    }
  }
}

function checkBounds(currentBoard, i, j){
  if(i < 0 || i > currentBoard.length - 1) return false;
  if(j < 0 || j > currentBoard[0].length - 1) return false;

  return true;
}

// checar se vai ganhar na próxima
// escolher melhor caminho que tenha espaço para jogar