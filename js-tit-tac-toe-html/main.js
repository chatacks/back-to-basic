const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageTextEl = document.querySelector('[ data-winning-message-text]');
const divWinningMessageEl = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restart-button]');

let isCircleTurn;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  for (const cell of cells) {
    cell.classList.remove('circle');
    cell.classList.remove('x');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  }
  isCircleTurn = false;
  board.className = 'board x';
  divWinningMessageEl.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextEl.innerText = 'Empate';
  } else {
    winningMessageTextEl.innerText = isCircleTurn ? 'O venceu' : 'X venceu';
  }

  divWinningMessageEl.classList.add('show-winning-message');
};

const checkForWin = (currentPlayer) => {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cells].every((cell) => cell.classList.contains('x') || cell.classList.contains('circle'));
};

const placeMark = (cell, classToAdd) => cell.classList.add(classToAdd);

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  isCircleTurn ? (board.className = 'board circle') : (board.className = 'board x');
};

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? 'circle' : 'x';
  placeMark(cell, classToAdd);
  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    swapTurns();
  }
};

startGame();
restartButton.addEventListener('click', () => {
  startGame();
});
