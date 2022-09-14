const cells = document.querySelectorAll("[data-cell]");
const boardDisplay = document.querySelector("[data-board]");

const xStartBtn = document.querySelector("[data-x-button]");
const oStartBtn = document.querySelector("[data-o-button]");

const newGameBtn = document.querySelector("[data-new-game]");
const activePlayer = document.querySelector("[data-active-player]");

const endgameMsg = document.querySelector("[data-endgame-message]");

const xClass = "x";
const oClass = "o";
let oTurn = "";
let currentTurn = "";
let activeTurn = "";

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

xStartBtn.addEventListener("click", () => {
  boardDisplay.classList.remove("o-turn");
  activePlayer.textContent = xClass;
  boardDisplay.classList.add("x-turn");
  oTurn = false;
});

oStartBtn.addEventListener("click", () => {
  boardDisplay.classList.remove("x-turn");
  activePlayer.textContent = oClass;
  boardDisplay.classList.add("o-turn");
  oTurn = true;
});

cells.forEach((cell) => {
  cell.addEventListener("click", makeMove, { once: true });
});

function makeMove(e) {
  const cell = e.target;
  activeTurn = oTurn ? xClass : oClass;
  currentTurn = oTurn ? oClass : xClass;
  activePlayer.textContent = activeTurn;
  placeMark(cell, currentTurn);
  if (checkWin(currentTurn)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }
  swapTurns(activeTurn);
  disableStartBtns();
  console.log(board);
}

function placeMark(cell, currentTurn) {
  cell.classList.add(currentTurn);
  boardDisplay.classList.remove(`${currentTurn}-turn`);
}

function checkWin(currentTurn) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentTurn);
    });
  });
}

function swapTurns(activeTurn) {
  oTurn = !oTurn;
  boardDisplay.classList.add(`${activeTurn}-turn`);
}

function disableStartBtns() {
  oStartBtn.setAttribute("disabled", "disabled");
  xStartBtn.setAttribute("disabled", "disabled");
}

function endGame(draw) {
  if (draw) {
    endgameMsg.textContent = `It's a draw!`;
  } else {
    endgameMsg.textContent = `${currentTurn} wins!`;
  }
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}

console.log(cells);
console.log([...cells]); //NodeList to Array
// console.log(board);
// console.log(board[2][0])

// if (boardDisplay.classList.contains('o-turn')) {
//     currentTurn = oClass;
//     activeTurn = xClass;
//    } else {
//     currentTurn = xClass;
//     activeTurn = oClass;
//    }

let k = 0;
for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    board[i][j] = cells[k];
    k++;
  }
}
