var originalBoard;
const Player = "0";
const aiPlayer = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
  //clears the board
  document.querySelector(".endgame").style.display = "none";
  //fill number into array, and add eventlistener when clicking
  originalBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

// pass square with the td id and the human player
function turnClick(square) {
  if (typeof originalBoard[square.target.id] == "number") {
    turn(square.target.id, Player);
    if (!checkTie()) turn(bestSpot(), aiPlayer);
  }
}

// set the clicked square to the human and give it the 0 as turnClick
function turn(squareId, player) {
  originalBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(originalBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  // check every cell it is selected by the human player
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  // check if any of the selected cells are within winCombos
  let gameWon = null; //tie
  for (let [index, win] of winCombos.entries()) {
    // does he plays in any of the winning conditions?
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon; //tie or win
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == Player ? "blue" : "red";
  }

  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(gameWon.player == Player ? "You win!" : "You lose!");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
  return originalBoard.filter((s) => typeof s == "number");
}
function bestSpot() {
  return emptySquares()[0];
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "green";
      cells[i].removeEventListener("clicl", turnClick, false);
    }
    declareWinner("Tie Game!");
    return true;
  }
  return false;
}
