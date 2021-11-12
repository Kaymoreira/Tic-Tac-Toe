function init(player, OPPONENT) {
  // SELECT THE CANVAS
  const canvas = document.getElementById('cvs')
  const ctx = canvas.getContext('2d')

  // BOARD VARIABLES
  let board = []
  const COLUMN = 7
  const ROW = 7
  const SPACE_SIZE = 64.28571428571429

  //STORE PLAYERS MOVE
  let gameData = new Array(49)

  // By default the first player to play is the human
  // Eh aq que define que o primeiro player eh o homem
  let currentPlayer = player.man

  // Load X & O images
  const xImage = new Image()
  xImage.src = 'img/X.png'

  const oImage = new Image()
  oImage.src = 'img/O.png'

  // Win combinatios
  const COMBOS = [
    // LINHAS
    // linha 0
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],

    // linha 1
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],

    // linha 2
    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],

    // linha 3
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],

    // linha 4
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],

    // linha 5
    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],

    // linha 6
    [42, 43, 44, 45],
    [43, 44, 45, 46],
    [44, 45, 46, 47],
    [45, 46, 47, 48],

    // COLUNAS
    // coluna 0
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    [21, 28, 35, 42],

    // coluna 1
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [15, 22, 29, 36],
    [22, 29, 36, 43],

    // coluna 2
    [2, 9, 16, 23],
    [9, 16, 23, 30],
    [16, 23, 30, 37],
    [23, 30, 37, 44],

    // coluna 3
    [3, 10, 17, 24],
    [10, 17, 24, 31],
    [17, 24, 31, 38],
    [24, 31, 38, 45],

    // coluna 4
    [4, 11, 18, 25],
    [11, 18, 25, 32],
    [18, 25, 32, 39],
    [25, 32, 39, 46],

    // coluna 5
    [5, 12, 19, 26],
    [12, 19, 26, 33],
    [19, 26, 33, 40],
    [26, 33, 40, 47],

    // coluna 6
    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [20, 27, 34, 41],
    [27, 34, 41, 48],

    // DIAGONAIS
    // diagonal 0
    [3, 11, 19, 27],

    // diagonal 1
    [2, 10, 18, 26],
    [10, 18, 26, 34],

    // diagonal 2
    [1, 9, 17, 25],
    [9, 17, 25, 33],
    [17, 25, 33, 41],

    // diagonal 3 (a maior)
    [0, 8, 16, 24],
    [8, 16, 24, 32],
    [16, 24, 32, 40],
    [24, 32, 40, 48],

    // diagonal 4
    [7, 15, 23, 31],
    [15, 23, 31, 39],
    [23, 31, 39, 47],

    // diagonal 5
    [14, 22, 30, 38],
    [22, 30, 38, 46],

    // diagonal 6
    [21, 29, 37, 45],

    //######//
    // OUTRO LADO DE DIAGONAIS
    //#####//
    // diagonal 0
    [3, 9, 15, 21],

    // diagonal 1
    [4, 10, 16, 22],
    [10, 16, 22, 28],

    // diagonal 2
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [17, 23, 29, 35],

    // diagonal 3 (a maior)
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    [18, 24, 30, 36],
    [24, 30, 36, 42],

    // diagonal 4
    [13, 19, 25, 31],
    [19, 25, 31, 37],
    [25, 31, 37, 43],

    // diagonal 5
    [20, 26, 32, 38],
    [26, 32, 38, 44],

    // diagonal 6
    [27, 33, 39, 45]
  ]

  // FOR GAME OVER CHECK
  let GAME_OVER = false

  // DRAW THE BOARD
  function drawBoard() {
    // WE give every space a unique id
    // So we know exactly where to put the player's move on the gameData Array
    let id = 0
    for (let i = 0; i < ROW; i++) {
      board[i] = []
      for (let j = 0; j < COLUMN; j++) {
        board[i][j] = id
        id++

        // draw the spaces
        ctx.strokeStyle = '#000'
        ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE)
      }
    }
  }
  drawBoard()
  // ON PLAYER'S CLICK
  canvas.addEventListener('click', function (event) {
    // IF IT's A GAME OVER? EXIT
    if (GAME_OVER) return

    // X & Y position of mouse click relative to the canvas
    let X = event.clientX - canvas.getBoundingClientRect().x
    let Y = event.clientY - canvas.getBoundingClientRect().y

    // WE CALCULATE i & j of the clicked SPACE
    let i = Math.floor(Y / SPACE_SIZE)
    let j = Math.floor(X / SPACE_SIZE)

    // Get the id of the space the player clicked on
    let id = board[i][j]

    // Prevent the player to play the same space twice
    if (gameData[id]) return
    // store the players's move to gameData
    gameData[id] = currentPlayer
    console.log(gameData)

    // draw the move on board
    drawOnBoard(currentPlayer, i, j)

    // Check if the play wins
    if (isWinner(gameData, currentPlayer)) {
      showGameOver(currentPlayer)
      GAME_OVER = true
      return
    }

    // Check if it's a tie game
    if (isTie(gameData)) {
      showGameOver('tie')
      GAME_OVER = true
      return
    }

    // GIVE TURN TO THE OTHER PLAYER
    else
      currentPlayer = currentPlayer == player.man ? player.friend : player.man
  })

  // check for winner
  function isWinner(gameData, player) {
    for (let i = 0; i < COMBOS.length; i++) {
      let won = true

      for (let j = 0; j < COMBOS[i].length; j++) {
        let id = COMBOS[i][j]
        won = gameData[id] == player && won
      }
      if (won) {
        return true
      }
    }
    return false
  }

  // check for a tie game
  function isTie(gameData) {
    let isBoarFill = true
    for (let i = 0; i < gameData.length; i++) {
      isBoarFill = gameData[i] && isBoarFill
    }
    if (isBoarFill) {
      return true
    }
    return false
  }

  // SHOW GAME OVER
  function showGameOver(player) {
    let message = player == 'tie' ? 'Foi um empate' : 'O vencedor foi'
    let imgSrc = `img/${player}G.png`

    gameOverElement.innerHTML = `
      <h1>${message}</h1>
      <img class='winner-img' src=${imgSrc} </img>
      <div class='play' onclick='location.reload()'>Jogar novamente</div>
    `

    gameOverElement.classList.remove('hide')
    header.classList.add('hide')
  }

  // draw on board
  function drawOnBoard(player, i, j) {
    let img = player == 'x' ? xImage : oImage

    // the x,y position of the image are the x,y of the clicked space
    ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE)
  }
}
