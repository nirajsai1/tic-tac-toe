const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const backButton = document.getElementById('backButton');
const messageElement = document.getElementById('message');
const modeSelectionElement = document.getElementById('modeSelection');
const gameAreaElement = document.getElementById('gameArea');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let isSinglePlayer = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame(mode) {
    modeSelectionElement.style.display = 'none';
    gameAreaElement.style.display = 'block';
    isSinglePlayer = (mode === 'single');
    resetGame();
}

function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] === null && !checkWinner()) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            displayMessage(`${currentPlayer} wins!`);
        } else if (board.every(cell => cell !== null)) {
            displayMessage('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (isSinglePlayer && currentPlayer === 'O') {
                setTimeout(makeComputerMove, 500); // Add a slight delay for the computer's move
            }
        }
    }
}

function makeComputerMove() {
    const emptyCells = board
        .map((cell, index) => (cell === null ? index : null))
        .filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    if (checkWinner()) {
        displayMessage(`O wins!`);
    } else if (board.every(cell => cell !== null)) {
        displayMessage('It\'s a draw!');
    } else {
        currentPlayer = 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    displayMessage(''); // Clear the message
}

function displayMessage(message) {
    messageElement.textContent = message;
}

function goBackToModeSelection() {
    gameAreaElement.style.display = 'none';
    modeSelectionElement.style.display = 'block';
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
backButton.addEventListener('click', goBackToModeSelection);
