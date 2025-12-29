const game = document.getElementById("game");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");
const startBtn = document.getElementById("startGame");
const bgColorPicker = document.getElementById("bgColorPicker");
const fontSizeSelect = document.getElementById("fontSizeSelect");
const hoverSpan = document.getElementById("hoverSpan");
const goHomeBtn = document.getElementById("goHome");

let currentPlayer = "X";
let board = Array(9).fill(null);
let gameActive = false;
let player1 = "Giocatore 1";
let player2 = "Giocatore 2";

// Genera la griglia
function generateGrid() {
  game.innerHTML = "";
  board = Array(9).fill(null);
  gameActive = true;
  currentPlayer = "X";
  message.textContent = `Turno di ${player1} (X)`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    cell.addEventListener("click", handleClick);
    cell.addEventListener("mouseover", () => cell.style.background = "lightblue");
    cell.addEventListener("mouseout", () => cell.style.background = "white");

    game.appendChild(cell);
  }
}

function checkWin() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return combos.some(([a,b,c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}

function handleClick(e) {
  if (!gameActive) return;

  const index = e.target.dataset.index;
  if (board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWin()) {
    const winner = currentPlayer === "X" ? player1 : player2;
    message.textContent = `${winner} ha vinto! 🎉`;
    gameActive = false;
  } else if (!board.includes(null)) {
    message.textContent = "Pareggio! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const nextPlayer = currentPlayer === "X" ? player1 : player2;
    message.textContent = `Turno di ${nextPlayer} (${currentPlayer})`;
  }
}

function restartGame() {
  generateGrid();
}

// EVENTI
restartBtn.addEventListener("click", restartGame);

startBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim() || "Giocatore 1";
  player2 = document.getElementById("player2").value.trim() || "Giocatore 2";
  generateGrid();
});

bgColorPicker.addEventListener("input", e => {
  document.body.style.backgroundColor = e.target.value;
});

fontSizeSelect.addEventListener("change", e => {
  document.body.style.fontSize = e.target.value + "px";
});

hoverSpan.addEventListener("mouseover", () => {
  hoverSpan.style.color = "green";
});
hoverSpan.addEventListener("mouseout", () => {
  hoverSpan.style.color = "black";
});

goHomeBtn.addEventListener("click", () => {
  window.location.href = "http://portmerelli.altervista.org/";
});

// Messaggio iniziale
message.textContent = "Inserisci i nomi e clicca 'Inizia Partita'.";
