const cells = document.querySelectorAll("[data-cell]");
const newGameBtn = document.querySelector("[data-new-game]");

const activePlayer = document.querySelector("[data-active-player]");

const xClass = 'x'
const oClass = 'o'
let xTurn


cells.forEach((cell) => {
    cell.addEventListener("click", makeMove, {once: true})
}) 


//(board[0][1]).push('hello')
//board[0][1] = 'X'
// board[0][0]
// board[0][1]
// let third = board[0][2]


const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

console.log(cells)
console.log(board)
// for (const cell of cells) {
//     cell.addEventListener("mouseover", hoverMark)
// }

// function  hoverMark(cell, currentTurn) {
//     currentTurn = xTurn ? xClass : oClass
//     cell.classList.add(currentTurn)
// }


function makeMove (e) {
    const cell = e.target
    const currentTurn = xTurn ? xClass : oClass
    const activeTurn = xTurn ? oClass: xClass 
    activePlayer.textContent = activeTurn
    placeMark(cell, currentTurn)
    swapTurns()
    // // toArray()
    // console.log(cell)
}


function  placeMark(cell, currentTurn) {
    cell.classList.add(currentTurn)
    cell.classList.remove('o-turn')
    cell.classList.remove('x-turn')
}

function swapTurns() {
    xTurn = !xTurn
}

let k = 0;
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++){
        board[i][j]=cells[k];
        k++;
    }
}
