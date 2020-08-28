/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
const textArea = document.getElementById('text-input');
const clearButton = document.getElementById('clear-button');
const solveButton = document.getElementById('solve-button');

// Only the digits 1-9 are accepted as valid input for the puzzle grid
const validTextAreaInput = (str) => {
  const num = parseInt(str, 10);
  return num >= 1 && num <= 9 && str;
};

const setGrid = (str) => {
  const cells = document.querySelectorAll('.sudoku-input');

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
  const cells = document.querySelectorAll('.sudoku-input');

  textArea.value = Array.from(cells).reduce((e, { value }) => {
    let str = e;
    str += validTextAreaInput(value) && value !== '' ? value : '.';
    return str;
  }, '');
};

const generateBoard = (str) => {
  const errorDiv = document.getElementById('error-msg');
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

// Sudoku puzzle validator (from stackoverflow)
const validatePuzzle = (arraySolution) => {
  for (let y = 0; y < 9; ++y) {
    for (let x = 0; x < 9; ++x) {
      const value = arraySolution[y][x];

      if (value) {
        // Check the line
        for (let x2 = 0; x2 < 9; ++x2) {
          if (x2 != x && arraySolution[y][x2] == value) {
            return false;
          }
        }

        // Check the column
        for (let y2 = 0; y2 < 9; ++y2) {
          if (y2 != y && arraySolution[y2][x] == value) {
            return false;
          }
        }

        // Check the square
        const startY = Math.floor(y / 3) * 3;
        for (let y2 = startY; y2 < startY + 3; ++y2) {
          const startX = Math.floor(x / 3) * 3;
          for (let x2 = startX; x2 < startX + 3; ++x2) {
            if ((x2 != x || y2 != y) && arraySolution[y2][x2] == value) {
              return false;
            }
          }
        }
      }
    }
  }

  return true;
};

// Sudoku Solver (from stackoverflow)
const isValid = (board, row, col, k) => {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
      return false;
    }
  }
  return true;
};

const solvePuzzle = (data) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] == '.') {
        for (let k = 1; k <= 9; k++) {
          if (isValid(data, i, j, k)) {
            const value = data;
            value[i][j] = `${k}`;
            if (solvePuzzle(data)) {
              return true;
            }
            value[i][j] = '.';
          }
        }
        return false;
      }
    }
  }
  return true;
};

const clearInput = () => {
  textArea.value = '';
  setGrid('');
};

const solve = () => {
  const input = textArea.value;
  const board = generateBoard(input);

  if (!board) return;

  solvePuzzle(board);

  textArea.value = board.flat().join('');
  setGrid(textArea.value);
};

document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.sudoku-input');
  // Load a simple puzzle into the text area
  textArea.value =
    '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

  setGrid(textArea.value);

  textArea.addEventListener('input', onInputHandler);

  cells.forEach((cell) => cell.addEventListener('input', setTextArea));

  clearButton.addEventListener('click', clearInput);
  solveButton.addEventListener('click', solve);
});

// Functions exports for testing in Node.
if (typeof exports !== 'undefined') {
  module.exports = {
    setGrid,
    validTextAreaInput,
    setTextArea,
    generateBoard,
    isValid,
    solvePuzzle,
    validatePuzzle,
    clearInput,
  };
}
