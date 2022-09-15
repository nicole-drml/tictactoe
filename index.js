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
const boardStatusContainer = document.querySelector("[data-board-status-div]");


const endgameMsg = document.querySelector("[data-endgame-message]");

const historyBtns = document.querySelector("[data-history-buttons]");
const nextGameBtn = document.querySelector("[data-next-game]");

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
  askPlayerDiv.style.display = "none";
  boardStatusContainer.style.visibility = "visible"
});

oStartBtn.addEventListener("click", () => {
  boardDisplay.classList.remove("x-turn");
  whoseTurnSpan.textContent = oClass;
  boardDisplay.classList.add("o-turn");
  oPlayerTurn = true;
  askPlayerDiv.style.display = "none";
  boardStatusContainer.style.visibility = "visible"
});

cells.forEach((cell) => {
  cell.addEventListener("click", makeMove, { once: true });
});

function makeMove(e) {
  const cell = e.target;
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
    endgameBackground.style.display = "flex";
    boardStatusContainer.style.visibility = "hidden"
  } else {
    endgameMsg.textContent = `${currentTurn} wins!`;
    endgameBackground.style.display = "flex";
    boardStatusContainer.style.visibility = "hidden"
  }
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
  boardStatusContainer.style.visibility = "visible";
  endgameBackground.style.display = "none";
  whoseTurnSpan.textContent = activeTurn;
}

endgameReplayBtn.addEventListener("click", replayMoves);

function replayMoves() {
endgameBackground.style.display = "none";
boardStatusContainer.style.visibility = "visible";
boardStatus.textContent = "Replaying moves"
  historyBtns.style.visibility = "visible";
  nextGameBtn.style.visibility = "visible";
  whoseTurnSpan.style.visibility = "hidden"
}


nextGameBtn.addEventListener("click", nextGame);

function nextGame() {
  cells.forEach((cell) => {
    cell.classList.remove(oClass);
    cell.classList.remove(xClass);
    cell.addEventListener("click", makeMove, { once: false });
  });
  boardStatus.textContent = " playing";
  historyBtns.style.visibility = "hidden";
  nextGameBtn.style.visibility = "hidden";
  whoseTurnSpan.style.visibility = "visible";
// const afterReplaySpan = document.querySelector("[data-player-turn-span]");
// afterReplaySpan.textContent = activeTurn;


// endgameBackground.style.display = "flex";
// boardStatus.style.visibility = "hidden"
// whoseTurnSpan.style.visibility = "hidden"
// endgameBackground.style.display = "none";
// boardStatus.style.visibility = "visible"
// boardStatus.textContent = "Replaying moves"
}


// function restartBoard() {
//   askPlayerDiv.style.display = "none";
//   historyBtns.style.visibility = "hidden";
//   nextGameBtn.style.visibility = "hidden";
//   boardStatus.textContent = " playing"
// }
console.log(cells);
console.log([...cells]);

let k = 0;
for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    board[i][j] = cells[k];
    k++;
  }
}
