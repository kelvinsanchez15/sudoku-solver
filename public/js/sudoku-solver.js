const textArea = document.getElementById('text-input');
const cells = document.querySelectorAll('.sudoku-input');
const errorDiv = document.getElementById('error-msg');

// Only the digits 1-9 are accepted as valid input for the puzzle grid
const validTextAreaInput = (str) => {
  const num = parseInt(str, 10);
  return num >= 1 && num <= 9 && str;
};

const setGrid = (str) => {
  const strValues = str.split('');

  return cells.forEach((e, i) => {
    const cell = e;
    cell.value =
      validTextAreaInput(strValues[i]) && strValues[i] !== '.'
        ? strValues[i]
        : '';
  });
};

const onInputHandler = (e) => {
  const str = e.target.value;
  setGrid(str);
};

const setTextArea = () => {
  textArea.value = Array.from(cells).reduce((e, { value }) => {
    let str = e;
    str += validTextAreaInput(value) && value !== '' ? value : '.';
    return str;
  }, '');
};

const generateBoard = (str) => {
  // Puzzles that are not 81 characters long send error
  if (str.length !== 81) {
    errorDiv.innerText = 'Error: Expected puzzle to be 81 characters long.';
    return null;
  }

  // Parse a valid puzzle string into an array
  const arr = str.split('');
  const board = [];

  for (let i = 0; i < arr.length; i += 9) {
    board.push(arr.slice(i, i + 9));
  }

  errorDiv.innerText = '';
  return board;
};

const isValid = (board, row, col, k) => {
  for (let i = 0; i < 9; i += 1) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (board[row][i] === k || board[i][col] === k || board[m][n] === k) {
      return false;
    }
  }
  return true;
};

const solvePuzzle = (data) => {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (data[i][j] === '.') {
        for (let k = 1; k <= 9; k += 1) {
          if (isValid(data, i, j, k)) {
            data[i][j] = `${k}`;
            if (solvePuzzle(data)) {
              return true;
            } else {
              data[i][j] = '.';
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value =
    '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

  setGrid(textArea.value);

  textArea.addEventListener('input', onInputHandler);

  cells.forEach((cell) => cell.addEventListener('input', setTextArea));
});

// Functions exports for testing in Node.
if (typeof exports !== 'undefined') {
  module.exports = {
    setGrid,
    validTextAreaInput,
    generateBoard,
  };
}
