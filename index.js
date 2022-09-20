const boardDisplay = document.querySelector("[data-board]");
const cells = document.querySelectorAll("[data-cell]");

const whoseTurnSpan = document.querySelector("[data-player-turn-span]");
const boardStatus = document.querySelector("[data-board-status]");

const askPlayerDiv = document.querySelector("[data-ask-player-container]");
const xStartBtn = document.querySelector("[data-x-button]");
const oStartBtn = document.querySelector("[data-o-button]");

const endgameBackground = document.querySelector(
  "[data-endgame-container-background]"
);
const endgameMsg = document.querySelector("[data-endgame-message]");
const endgameReplayBtn = document.querySelector("[data-replay-moves]");
const endgameNextGameBtn = document.querySelector("[data-endgame-next-game]");

const historyBtns = document.querySelector("[data-history-buttons]");
const backwardBtn = document.querySelector("[data-previous-button]");
const forwardBtn = document.querySelector("[data-next-button]");

const nextGameBtn = document.querySelector("[data-next-game]");
const restartBtn = document.querySelector("[data-restart-button]");

let xTotal = document.querySelector("[data-player-x-tally]");
let oTotal = document.querySelector("[data-player-o-tally]");
let drawTotal = document.querySelector("[data-draw-tally]");

let xCounter = 0;
let oCounter = 0;
let drawCounter = 0;

let b = 0;
let f = 0;

const playerX = "x";
const playerO = "o";
let playerOTurn = "";
let currentTurn = "";

let emptyBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let boardHistory = [
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
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
  playerOTurn = false;
  beginGame(playerX);
  setupBoard();
});

oStartBtn.addEventListener("click", () => {
  playerOTurn = true;
  beginGame(playerO);
  setupBoard();
});

function beginGame(player) {
  currentTurn = player;
  boardDisplay.classList.add(`${player}-turn`);
  whoseTurnSpan.textContent = player;
}

cells.forEach((cell) => {
  cell.addEventListener("click", makeMove, { once: true });
});

function makeMove(e) {
  const cell = e.target;
  if (cell.classList.contains("blocked")) {
    cells.forEach((cell) => {
      cell.addEventListener("click", makeMove, { none: true });
    });
  } else {
    currentTurn = playerOTurn ? playerO : playerX;
    updateBoard(cell, currentTurn);
    if (checkWin(currentTurn)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    }
    swapTurns(currentTurn);
    boardHistory.push(JSON.parse(JSON.stringify(board)));
  }
}

function updateBoard(cell, currentTurn) {
  cell.textContent = currentTurn;
  let r = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = cells[r].textContent;
      if (cells[r].textContent.includes(playerX)) {
        cells[r].classList.add(playerX);
      } else if (cells[r].textContent.includes(playerO)) {
        cells[r].classList.add(playerO);
      }
      r++;
    }
  }
}

function checkWin(currentTurn) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === currentTurn;
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.textContent === playerX || cell.textContent === playerO;
  });
}

function swapTurns(currentTurn) {
  boardDisplay.classList.remove(`${currentTurn}-turn`);
  playerOTurn = !playerOTurn;
  currentTurn = playerOTurn ? playerO : playerX;
  whoseTurnSpan.textContent = currentTurn;
  boardDisplay.classList.add(`${currentTurn}-turn`);
}

function endGame(draw) {
  if (draw) {
    endgameMsg.textContent = `It's a draw!`;
    drawCounter++;
  } else {
    endgameMsg.textContent = `${currentTurn} wins!`;
    if (currentTurn === playerX) {
      xCounter++;
    } else {
      oCounter++;
    }
  }
  popupEndgame();
  displayScore();
}

function popupEndgame() {
  endgameBackground.style.display = "flex";
  boardStatus.style.visibility = "hidden";
  whoseTurnSpan.style.visibility = "hidden";
}

endgameNextGameBtn.addEventListener("click", anotherGame);

function anotherGame() {
  cells.forEach((cell) => {
    cell.classList.remove(playerO);
    cell.classList.remove(playerX);
    cell.addEventListener("click", makeMove, { once: true });
  });
  newGamePrep();
  setupBoard();
}

endgameReplayBtn.addEventListener("click", replayMoves);
function replayMoves() {
  cells.forEach((cell) => {
    cell.classList.add("blocked");
  });
  replayDisplay();
}

function replayDisplay() {
  boardStatus.style.visibility = "visible";
  endgameBackground.style.display = "none";
  historyBtns.style.visibility = "visible";
  nextGameBtn.style.visibility = "visible";
  whoseTurnSpan.style.visibility = "hidden";
  boardDisplay.classList.remove("o-turn");
  boardDisplay.classList.remove("x-turn");
  boardStatus.textContent = "Replaying moves";
  resetPreviousBtn();
}

function resetPreviousBtn() {
  b = 1;
  backwardBtn.classList.remove("blocked");
  backwardBtn.style.opacity = "1";
  backwardBtn.disabled = false;
}

nextGameBtn.addEventListener("click", nextGame);
function nextGame() {
  newGamePrep();
  setupBoard();
}

restartBtn.addEventListener("click", restartGame);

function restartGame() {
  newGamePrep();
  setupBoard();
  resetCounter();
  displayScore();
  boardStatus.textContent = " ";
  askPlayerDiv.style.display = "flex";
  whoseTurnSpan.style.visibility = "hidden";
}

function newGamePrep() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove(playerO);
    cell.classList.remove(playerX);
    cell.addEventListener("click", makeMove, { once: true });
    cell.classList.remove("blocked");
  });
  historyBtns.style.visibility = "hidden";
  nextGameBtn.style.visibility = "hidden";
  board = emptyBoard;
  boardHistory = boardHistory.splice(0, 1);
  boardStatus.textContent = " ";
  boardDisplay.classList.remove(`${currentTurn}-turn`);
}

function setupBoard() {
  boardStatus.style.visibility = "visible";
  whoseTurnSpan.style.visibility = "visible";
  boardStatus.textContent = " playing";
  endgameBackground.style.display = "none";
  askPlayerDiv.style.display = "none";
  askPlayerDiv.style.display = "none";
}

function resetCounter() {
  xCounter = 0;
  oCounter = 0;
  drawCounter = 0;
}
resetCounter();

function displayScore() {
  xTotal.textContent = xCounter;
  oTotal.textContent = oCounter;
  drawTotal.textContent = drawCounter;
}
displayScore();

backwardBtn.addEventListener("click", backward);

function backward() {
  board = boardHistory[boardHistory.length - b];
  let availablePrevious = boardHistory.length - b;

  if (availablePrevious > 0) {
    displayHistoryBoard();
    b++;
    f--;
  } else {
    disableBtn(backwardBtn);
  }
  enableBtn(forwardBtn);
}

forwardBtn.addEventListener("click", forward);

function forward() {
  f = 1;
  f++;
  board = boardHistory[boardHistory.length - b + f];
  if (b > f) {
    displayHistoryBoard();
    b--;
  } else {
    disableBtn(forwardBtn);
  }
  enableBtn(backwardBtn);
}

function disableBtn(button) {
  button.classList.add("blocked");
  button.style.opacity = ".5";
  button.disabled = true;
}

function enableBtn(button) {
  button.classList.remove("blocked");
  button.style.opacity = "1";
  button.disabled = false;
}

function displayHistoryBoard() {
  cells.forEach((cell) => {
    cell.classList.remove(playerO);
    cell.classList.remove(playerX);
  });
  let r = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      cells[r].textContent = board[i][j];
      if (cells[r].textContent.includes(playerX)) {
        cells[r].classList.add(playerX);
      } else if (cells[r].textContent.includes(playerO)) {
        cells[r].classList.add(playerO);
      }
      r++;
    }
  }
}
