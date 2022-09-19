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

backwardBtn.addEventListener("click", backward);

let b = 0;
let f = 0;

// x = b - f;
function backward() {
  board = boardHistory[boardHistory.length - b];
  let availablePrevious = boardHistory.length - b;
  console.log("avail" + availablePrevious);

  console.log("b: " + b);
  console.log("f: " + f);
  if (availablePrevious > 0) {
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
    b++;
    f--;
  } else {
    backwardBtn.classList.add("blocked");
    backwardBtn.style.opacity = ".5";
    backwardBtn.disabled = true;
  }
  forwardBtn.classList.remove("blocked");
  forwardBtn.style.opacity = "1";
  forwardBtn.disabled = false;
}

forwardBtn.addEventListener("click", forward);

function forward() {
  f = 1;
  f++;
  board = boardHistory[boardHistory.length - b + f];
  let availableForward = boardHistory.length - b + f;
  console.log("avail" + availableForward);

  console.log("b: " + b);
  console.log("f: " + f);
  if (b > f) {
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
    b--;
  } else {
    forwardBtn.classList.add("blocked");
    forwardBtn.style.opacity = ".5";
    forwardBtn.disabled = true;
  }
  backwardBtn.classList.remove("blocked");
  backwardBtn.style.opacity = "1";
  backwardBtn.disabled = false;
}

xStartBtn.addEventListener("click", () => {
  currentTurn = "x";
  playerOTurn = false;
  boardDisplay.classList.add("x-turn");
  whoseTurnSpan.textContent = playerX;
  askPlayerDiv.style.display = "none";
  setupBoard();
});

oStartBtn.addEventListener("click", () => {
  currentTurn = "o";
  playerOTurn = true;
  boardDisplay.classList.add("o-turn");
  whoseTurnSpan.textContent = playerO;
  askPlayerDiv.style.display = "none";
  setupBoard();
});

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
    placeMark(cell, currentTurn);
    if (checkWin(currentTurn)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    }
    swapTurns(currentTurn);
    boardHistory.push(JSON.parse(JSON.stringify(board)));
    console.log(board);
    console.log("board history", boardHistory);

    console.log("length history", boardHistory.length);
  }
}

function placeMark(cell, currentTurn) {
  cell.classList.add(currentTurn);
  cell.textContent = currentTurn;
  boardDisplay.classList.remove(`${currentTurn}-turn`);
  let k = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = cells[k].textContent;
      k++;
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

function swapTurns(currentTurn) {
  playerOTurn = !playerOTurn;
  currentTurn = playerOTurn ? playerO : playerX;
  boardDisplay.classList.add(`${currentTurn}-turn`);
  whoseTurnSpan.textContent = currentTurn;
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

function isDraw() {
  return [...cells].every((cell) => {
    return cell.textContent === playerX || cell.textContent === playerO;
  });
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
  resetPrevious();
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
  boardStatus.textContent = " ";
  askPlayerDiv.style.display = "flex";
  resetCounter();
  displayScore();
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
}

function setupBoard() {
  boardStatus.style.visibility = "visible";
  whoseTurnSpan.style.visibility = "visible";
  boardStatus.textContent = " playing";
  endgameBackground.style.display = "none";
  askPlayerDiv.style.display = "none";
  boardDisplay.classList.remove(`${currentTurn}-turn`);
}

function resetCounter() {
  xCounter = 0;
  oCounter = 0;
  drawCounter = 0;
  console.log("counter");
}
resetCounter();

function displayScore() {
  xTotal.innerHTML = xCounter;
  oTotal.innerHTML = oCounter;
  drawTotal.innerHTML = drawCounter;
  console.log("display");
}
displayScore();

function resetPrevious() {
  b = 1;
  backwardBtn.classList.remove("blocked");
  backwardBtn.style.opacity = "1";
  backwardBtn.disabled = false;
}
// console.log(cells);
// console.log([...cells]);

// if (board.includes(playerX) || board.includes(playerO)) {

// let k = 0;
// for (let i = 0; i < board.length; i++) {
//   for (let j = 0; j < board[i].length; j++) {
//     board[i][j] = cells[k].textContent;
//     k++;
//   }
// }

// let k = 0;
// let newBoard = [];
// for (let i = 0; i < board.length; i++) {
//   for (let j = 0; j < board[i].length; j++) {
//     newBoard[i][j] = board[k];
//     k++;
//   }
// }

// for (let i = 0; i < board.length; i++) {
//   for (let j = 0; j < board[i].length; j++) {
//     if (board[i][j] === "x") {
//       board[i][j].classList.add(playerX);
//     } else if (board[i][j] === "o") {
//       board[i][j].classList.add(playerO);
//     } else {
//       board[i][j].classList.remove(playerX)
//       board[i][j].classList.remove(playerO)
//     }
//   }
// }

//   board.forEach((cell) => {
//   if (cell === "x") {
//     cell.classList.add(playerX);
//   } else if (cell === "o") {
//     cell.classList.add(playerO)
//   }
// })
