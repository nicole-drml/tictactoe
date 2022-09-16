const cells = document.querySelectorAll("[data-cell]");
const boardDisplay = document.querySelector("[data-board]");

const askPlayerDiv = document.querySelector("[data-ask-player-container]");

const endgameBackground = document.querySelector(
  "[data-endgame-container-background]"
);

const xStartBtn = document.querySelector("[data-x-button]");
const oStartBtn = document.querySelector("[data-o-button]");

const endgameReplayBtn = document.querySelector("[data-replay-moves]");
const endgameNextGame = document.querySelector("[data-endgame-next-game]");

const whoseTurnSpan = document.querySelector("[data-player-turn-span]");
const boardStatus = document.querySelector("[data-board-status]");

const endgameMsg = document.querySelector("[data-endgame-message]");

const historyBtns = document.querySelector("[data-history-buttons]");
const nextGameBtn = document.querySelector("[data-next-game]");
const restartBtn = document.querySelector("[data-restart-button]");

const xClass = "x";
const oClass = "o";
let oPlayerTurn = "";
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
  whoseTurnSpan.textContent = xClass;
  boardDisplay.classList.add("x-turn");
  oPlayerTurn = false;
  setupBoard()
});

oStartBtn.addEventListener("click", () => {
  boardDisplay.classList.remove("x-turn");
  whoseTurnSpan.textContent = oClass;
  boardDisplay.classList.add("o-turn");
  oPlayerTurn = true;
  setupBoard()
});

function setupBoard() {
  askPlayerDiv.style.display = "none";
  boardStatus.style.visibility = "visible";
  whoseTurnSpan.style.visibility = "visible";
  boardStatus.textContent = " playing";
  endgameBackground.style.display = "none";
}

cells.forEach((cell) => {
  cell.addEventListener("click", makeMove, { once: true });
});

function makeMove(e) {
  const cell = e.target;
  if (cell.classList.contains("block-cells")) {
  } else {
    activeTurn = oPlayerTurn ? xClass : oClass;
    currentTurn = oPlayerTurn ? oClass : xClass;
    whoseTurnSpan.textContent = activeTurn;
    placeMark(cell, currentTurn);
    if (checkWin(currentTurn)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    }
    swapTurns(activeTurn);
    console.log(board);
  }
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
  oPlayerTurn = !oPlayerTurn;
  boardDisplay.classList.add(`${activeTurn}-turn`);
}

function endGame(draw) {
  if (draw) {
    endgameMsg.textContent = `It's a draw!`;
  } else {
    endgameMsg.textContent = `${currentTurn} wins!`;
  }
  endgameBackground.style.display = "flex";
  boardStatus.style.visibility = "hidden";
  whoseTurnSpan.style.visibility = "hidden";
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}

endgameNextGame.addEventListener("click", anotherGame);

function anotherGame() {
  cells.forEach((cell) => {
    cell.classList.remove(oClass);
    cell.classList.remove(xClass);
    cell.addEventListener("click", makeMove, { once: false });
  });
  setupBoard()
}



endgameReplayBtn.addEventListener("click", replayMoves);

function replayMoves() {
  boardStatus.style.visibility = "visible";
  endgameBackground.style.display = "none";
  boardStatus.textContent = "Replaying moves";
  historyBtns.style.visibility = "visible";
  nextGameBtn.style.visibility = "visible";
  whoseTurnSpan.style.visibility = "hidden";
  cells.forEach((cell) => {
    cell.classList.add("block-cells");
  });
  boardDisplay.classList.remove("o-turn");
  boardDisplay.classList.remove("x-turn");
}

nextGameBtn.addEventListener("click", nextGame);

function nextGame() {
  newGamePrep();
  setupBoard();
}

restartBtn.addEventListener("click", restartGame);

function restartGame() {
  newGamePrep();
  boardStatus.textContent = " ";
  askPlayerDiv.style.display = "flex";
}

function newGamePrep() {
  cells.forEach((cell) => {
    cell.classList.remove(oClass);
    cell.classList.remove(xClass);
    cell.addEventListener("click", makeMove, { once: false });
    cell.classList.remove("block-cells");
  });
  historyBtns.style.visibility = "hidden";
  nextGameBtn.style.visibility = "hidden";
}

console.log(cells);
console.log([...cells]);

let k = 0;
for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    board[i][j] = cells[k];
    k++;
  }
}
