const textArea = document.getElementById('text-input');

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

const onInputHandler = (e) => {
  const str = e.target.value;
  setGrid(str);
};

textArea.addEventListener('input', onInputHandler);

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value =
    '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

  setGrid(textArea.value);
});

// Functions exports for testing in Node.
if (typeof exports !== 'undefined') {
  module.exports = {
    setGrid,
    validTextAreaInput,
    generateBoard,
  };
}
