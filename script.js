const squares = document.querySelectorAll('.square');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6],
];

const handleSquareClick = (event) => {
    const index = event.target.dataset.index;

    if (gameState[index] || !currentPlayer) return;

    gameState[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkGameStatus()) {
        statusDisplay.innerText = `Yayyyy ${currentPlayer} wins!`;
        currentPlayer = null; 
    } else if (gameState.every(Boolean)) {
        statusDisplay.innerText = "It's a draw!";
        currentPlayer = null; 
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerText = `Next player: ${currentPlayer}`;
    }
};

const checkGameStatus = () => {
    return winningConditions.some(([a, b, c]) =>
        gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer
    );
};

resetButton.addEventListener('click', () => {
    gameState.fill('');
    squares.forEach(square => {
        square.innerText = '';
    });
    currentPlayer = 'X';
    statusDisplay.innerText = `Next player: ${currentPlayer}`;
});

squares.forEach(square => square.addEventListener('click', handleSquareClick));
statusDisplay.innerText = `Next player: ${currentPlayer}`;