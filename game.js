// Tic-Tac-Toe Game Logic
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = '';
let difficulty = 'medium';
let gameActive = false;
let scores = { X: 0, O: 0 };

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function openGame() {
    document.getElementById('game-modal').classList.add('active');
}

function closeGame() {
    document.getElementById('game-modal').classList.remove('active');
    resetGame();
    backToModeSelection();
    scores = { X: 0, O: 0 };
    updateScoreboard();
}

function selectMode(mode) {
    gameMode = mode;
    
    if (mode === 'ai') {
        document.getElementById('modeSelection').style.display = 'none';
        document.getElementById('difficultySelection').style.display = 'flex';
    } else {
        startGame(mode);
    }
}

function selectDifficulty(level) {
    difficulty = level;
    startGame(gameMode);
}

function startGame(mode) {
    gameActive = true;
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('difficultySelection').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    
    // Update player names
    if (mode === 'ai') {
        const difficultyText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        document.getElementById('playerXName').textContent = 'You';
        document.getElementById('playerOName').textContent = 'Ernest';
    } else {
        document.getElementById('playerXName').textContent = 'Player X';
        document.getElementById('playerOName').textContent = 'Player O';
    }
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    updateScoreboard();
    updateStatus();
}

function backToModeSelection() {
    document.getElementById('modeSelection').style.display = 'flex';
    document.getElementById('difficultySelection').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'none';
    resetGame();
}

function backToDifficultySelection() {
    document.getElementById('difficultySelection').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
    resetGame();
}

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));
    
    if (board[index] !== '' || !gameActive) return;
    
    makeMove(index, currentPlayer);
    
    if (checkWin()) {
        scores[currentPlayer]++;
        updateScoreboard();
        endGame(`Player ${currentPlayer} Wins! 🎉`);
        return;
    }
    
    if (checkDraw()) {
        endGame("It's a Draw! 🤝");
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
    
    // AI move for 1-player mode
    if (gameMode === 'ai' && currentPlayer === 'O' && gameActive) {
        setTimeout(() => {
            aiMove();
        }, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    const cell = document.querySelector(`.cell[data-index="${index}"]`);
    cell.textContent = player;
    cell.classList.add('taken', player.toLowerCase());
}

function aiMove() {
    if (!gameActive) return;
    
    let move = -1;
    
    if (difficulty === 'easy') {
        // Easy: 70% random, 30% smart
        if (Math.random() < 0.7) {
            move = getRandomMove();
        } else {
            move = getSmartMove();
        }
    } else if (difficulty === 'medium') {
        // Medium: 40% random, 60% smart
        if (Math.random() < 0.4) {
            move = getRandomMove();
        } else {
            move = getSmartMove();
        }
    } else {
        // Hard: Always optimal
        move = getOptimalMove();
    }
    
    makeMove(move, 'O');
    
    if (checkWin()) {
        scores['O']++;
        updateScoreboard();
        endGame('Ernest Wins!');
        return;
    }
    
    if (checkDraw()) {
        endGame("It's a Draw! 🤝");
        return;
    }
    
    currentPlayer = 'X';
    updateStatus();
}

function getRandomMove() {
    const available = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    return available[Math.floor(Math.random() * available.length)];
}

function getSmartMove() {
    // Try to win
    let move = findBestMove('O');
    if (move !== -1) return move;
    
    // Try to block
    move = findBestMove('X');
    if (move !== -1) return move;
    
    // Take center if available
    if (board[4] === '') return 4;
    
    // Take random available spot
    return getRandomMove();
}

function getOptimalMove() {
    // Minimax algorithm for unbeatable AI
    let bestScore = -Infinity;
    let bestMove = -1;
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    // Check terminal states
    if (checkWinForPlayer('O')) return 10 - depth;
    if (checkWinForPlayer('X')) return depth - 10;
    if (board.every(cell => cell !== '')) return 0;
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinForPlayer(player) {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function findBestMove(player) {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        const values = [board[a], board[b], board[c]];
        const playerCount = values.filter(v => v === player).length;
        const emptyCount = values.filter(v => v === '').length;
        
        if (playerCount === 2 && emptyCount === 1) {
            if (board[a] === '') return a;
            if (board[b] === '') return b;
            if (board[c] === '') return c;
        }
    }
    return -1;
}

function checkWin() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightWinningCells(combo);
            return true;
        }
    }
    return false;
}

function highlightWinningCells(combo) {
    combo.forEach(index => {
        document.querySelector(`.cell[data-index="${index}"]`).classList.add('winning');
    });
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function updateStatus() {
    const status = document.getElementById('gameStatus');
    if (gameMode === 'ai' && currentPlayer === 'O') {
        status.textContent = "Ernest is thinking...";
    } else if (gameMode === 'ai' && currentPlayer === 'X') {
        status.textContent = "Your Turn";
    } else {
        status.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function updateScoreboard() {
    document.getElementById('scoreX').textContent = scores.X;
    document.getElementById('scoreO').textContent = scores.O;
}

function endGame(message) {
    gameActive = false;
    setTimeout(() => {
        // Personalize win message for AI mode
        let displayMessage = message;
        if (gameMode === 'ai') {
            if (message.includes('Player X Wins')) {
                displayMessage = 'You Win! 🎉';
            }
        }
        document.getElementById('winMessage').textContent = displayMessage;
        document.getElementById('win-modal').classList.add('active');
    }, 500);
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'x', 'o', 'winning');
    });
    
    updateStatus();
}

function playAgain() {
    closeWinModal();
    resetGame();
}

function closeWinModal() {
    document.getElementById('win-modal').classList.remove('active');
}

// Close modals when clicking outside
window.onclick = function(event) {
    const gameModal = document.getElementById('game-modal');
    const winModal = document.getElementById('win-modal');
    
    if (event.target === gameModal) {
        closeGame();
    }
    if (event.target === winModal) {
        closeWinModal();
    }
}
