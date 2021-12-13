import {isTie, isWinner} from './helpers/check.js';
import {random} from './helpers/general.js'

function printTable(table){
  let s = ''
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      s =`${s} ${table[i][j] === '' ? '-': table[i][j]}`
    }
    s =`${s}\n`
  }

  console.log(s)
}

export function IAPlay(currentBoard, firstPlayer, secondPlayer, firstPlay) {

    if(firstPlay){
      return {i: random(0, 6), j: random(0, 6)}
    }

    const resCheckWin = checkWin(currentBoard, secondPlayer)
    if(resCheckWin){
      return resCheckWin;
    }

    const resCheckEnemyWin = checkWin(currentBoard, firstPlayer)
    if(resCheckEnemyWin){
      return resCheckEnemyWin;
    }

    const resCheckCheck = checkCheck(currentBoard, firstPlayer, secondPlayer)
    if(resCheckCheck){
      console.log('check', checkCheck)
      return resCheckCheck;
    }

    // AI to make its turn
    let moveBasedOnOponent;
    let moveBasedOnMe;

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if(currentBoard[i][j] === firstPlayer.character){
          const bestPlay = getBestPlay(currentBoard, i, j, 1, secondPlayer.character, firstPlayer.character, undefined, true)

          if(!moveBasedOnOponent || bestPlay.counter > moveBasedOnOponent.counter) {
            moveBasedOnOponent = bestPlay;
          }
        }
      }
    }

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if(currentBoard[i][j] === firstPlayer.character){
          const bestPlay = getBestPlay(currentBoard, i, j, 1, firstPlayer.character, secondPlayer.character, undefined, false)

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

    //return moveBasedOnMe.pos

    if(moveBasedOnMe.counter >= 3){
      return moveBasedOnMe.pos;
    }

    if(moveBasedOnOponent.counter === 1 && moveBasedOnMe.counter === 1){
      return moveBasedOnMe.pos;
    }

    if(moveBasedOnOponent.counter >= 3){
      return moveBasedOnOponent.pos;
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

function getBestPlay(currentBoard, i, j, counter, me, opponent, direction, avaluatingOponnent) {
  if(!direction){
    const res1 = getBestPlay(currentBoard, i, j, counter, me, opponent, [-1, 0], avaluatingOponnent)
    const res2 = getBestPlay(currentBoard, i, j, counter, me, opponent, [1, 0], avaluatingOponnent)
    const res3 = getBestPlay(currentBoard, i, j, counter, me, opponent, [0, -1], avaluatingOponnent)
    const res4 = getBestPlay(currentBoard, i, j, counter, me, opponent, [0, 1], avaluatingOponnent)
    const res5 = getBestPlay(currentBoard, i, j, counter, me, opponent, [-1, -1], avaluatingOponnent)
    const res6 = getBestPlay(currentBoard, i, j, counter, me, opponent, [1, 1], avaluatingOponnent)
    const res7 = getBestPlay(currentBoard, i, j, counter, me, opponent, [-1, 1], avaluatingOponnent)
    const res8 = getBestPlay(currentBoard, i, j, counter, me, opponent, [1, -1], avaluatingOponnent)
    
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


    const max = Math.max(...resArray.map(item => item.counter));
    //let index = -1

    const onlyTheBest = []
    for (let i = 0; i < resArray.length; i++) {
      if(resArray[i].counter === max) {
        if(avaluatingOponnent){
          return resArray[i]
        }
        onlyTheBest.push(i)
      }  
    }

    
    let theBestIndex = null

    for (let i = 0; i < onlyTheBest.length; i++) {
      const jogadaAtual = resArray[onlyTheBest[i]]
      const jogadasFaltantesParaGanhar = 4 - jogadaAtual.counter;

      let posAtual = jogadaAtual.pos;
      let canWin = true

      //printTable(currentBoard)
      //console.log('index', i)
      //console.log({i: posAtual.i, j: posAtual.j})
      for (let j = 0; j < jogadasFaltantesParaGanhar; j++) {
        if(!checkBounds(currentBoard, posAtual.i + jogadaAtual.direction[0], posAtual.j + jogadaAtual.direction[1])) {
          canWin = false;
          //console.log(canWin)
          continue;
        };

        //console.log({i: posAtual.i + jogadaAtual.direction[0], j: posAtual.j + jogadaAtual.direction[1]})

        if(currentBoard[posAtual.i + jogadaAtual.direction[0]][posAtual.j + jogadaAtual.direction[1]] !== ''){
          canWin = false
          //console.log(canWin)
          break;
        }

        posAtual = {
          i: posAtual.i + jogadaAtual.direction[0],
          j: posAtual.j + jogadaAtual.direction[1]
        }
      }

      if(canWin){
        theBestIndex = i
      }
    }

    // substituir theBestIndex por array e checar qual das jogadas me da um melhor counter

    if(theBestIndex === null){
      resArray[onlyTheBest[0]].counter = -1;
      theBestIndex = 0;
    }

    //console.log('theBestIndex', theBestIndex)
    //console.log('theBestIndex', resArray[onlyTheBest[theBestIndex]])
    return resArray[onlyTheBest[theBestIndex]];
  }else{
    if(!checkBounds(currentBoard, i + direction[0], j + direction[1])) return {counter: -1, pos: {i, j}, direction};

    if(currentBoard[i + direction[0]][j + direction[1]] === opponent){
      return getBestPlay(currentBoard, i + direction[0], j + direction[1], counter + 1, me, opponent, direction, avaluatingOponnent)
    }else if(currentBoard[i + direction[0]][j + direction[1]] === me){
      return {counter: -1, pos: {i: i + direction[0], j: j + direction[1]}, direction}
    }else{
      return {counter: avaluatingOponnent ? counter : counter - 1 , pos: {i: i + direction[0], j: j + direction[1]}, direction};
    }
  }
}

function checkWin(currentBoard, player){
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const auxBoard = JSON.parse(JSON.stringify(currentBoard))
      
      if(auxBoard[i][j] != '') continue;

      auxBoard[i][j] = player.character

      const wins = isWinner(auxBoard, player)
        
      if(wins) {
        return {i, j}
      }
    } 
  }    

  return;
}

function checkCheck(currentBoard, firstPlayer, secondPlayer){
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const auxBoard = JSON.parse(JSON.stringify(currentBoard))
      
      if(auxBoard[i][j] != '') continue;

      auxBoard[i][j] = secondPlayer.character

      let bestPlay
      for (let x = 0; x < 7; x++) {
        for (let y = 0; y < 7; y++) {
          const res = getBestPlay(auxBoard, x, y, 1, secondPlayer.character, firstPlayer.character, undefined, true)
          if(res.counter > bestPlay?.counter){
            bestPlay = res
          }
        }
      }
      
        
      if(bestPlay && bestPlay.counter >= 3) {
        return bestPlay.pos;
      }
    } 
  }    

  return;
}

function checkBounds(currentBoard, i, j){
  if(i < 0 || i > currentBoard.length - 1) return false;
  if(j < 0 || j > currentBoard[0].length - 1) return false;

  return true;
}

// checar se vai ganhar na próxima
// escolher melhor caminho que tenha espaço para jogar - V