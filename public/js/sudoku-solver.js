const textArea = document.getElementById('text-input');

// Only the digits 1-9 are accepted as valid input for the puzzle grid
const validTextAreaInput = (str) => {
  const num = parseInt(str, 10);
  return num >= 1 && num <= 9;
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

textArea.addEventListener('input', onInputHandler);

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value =
    '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

  setGrid(textArea.value);
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    setGrid,
    validTextAreaInput,
  };
} catch (e) {
  console.log('This is NOT an Error');
}
