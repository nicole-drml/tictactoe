const cells = document.querySelectorAll("[data-cell]");
const newGameBtn = document.querySelector("[data-new-game]");

const activePlayer = document.querySelector("[data-active-player]");

const xClass = 'x'
const oClass = 'o'
let xTurn

const board = [
    ['X', 'O', 'X'],
    ['0', 'X', '0'],
    ['0', 'X', '0']
]

// cells.addEventListener("click", makeX)
//  function makeX(){
//     cells.classList.add("x");
// } 
for (const cell of cells) {
    cell.addEventListener("click", makeMove, {once: true})
}

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
}


function  placeMark(cell, currentTurn) {
    cell.classList.add(currentTurn)
    cell.classList.remove('o-turn')
    cell.classList.remove('x-turn')
}

function swapTurns() {
    xTurn = !xTurn
}

// console.log(cells[3])
// newGameBtn.addEventListener("click", makeRed)
// function makeRed() {
//     newGameBtn.style.color= "red";
// }

// console.log(board[2][1])

// console.log(board[0][1])