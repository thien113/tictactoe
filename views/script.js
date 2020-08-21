var orginalBoard;
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
  document.querySelector(".endgame").style.display = "none";
  orginalBoard = Array.from(Array(9).keys()); //fill number into array
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

// pass square with the td id and the human player
function turnClick(square) {
  turn(square.target.id, Player);
}

// set the clicked square to the human and give it the 0 as turnClick
function turn(squareId, player) {
  orginalBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
}
