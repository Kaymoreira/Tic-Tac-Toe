export function drawBoard(ctx, spaceSize, rows, columns) {
    // WE give every space a unique id
    // So we know exactly where to put the player's move on the gameData Array
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
        // draw the spaces
        ctx.strokeStyle = '#000'
        ctx.strokeRect(j * spaceSize, i * spaceSize, spaceSize, spaceSize)
        }
    }
}
  
export function drawOnBoard(ctx, image, i, j, spaceSize) { 
    // the x,y position of the image are the x,y of the clicked space
    ctx.drawImage(image, j * spaceSize, i * spaceSize)
}