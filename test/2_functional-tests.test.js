const { assert } = require('chai');

let Solver;

suite('Functional Tests', () => {
  setup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    // eslint-disable-next-line global-require
    Solver = require('../public/js/sudoku-solver');
  });

  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', () => {
      const textArea = document.getElementById('text-input');
      const cells = document.querySelectorAll('.sudoku-input');

      textArea.value = '759';

      Solver.setGrid(textArea.value);

      assert.strictEqual(cells[0].value, '7');
      assert.strictEqual(cells[1].value, '5');
      assert.strictEqual(cells[2].value, '9');
    });

    // Entering a valid number in the grid automatically updates the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', () => {
      // Pending implementation
    });
  });

  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku grid and the text area
    test('Function clearInput()', () => {
      // Pending implementation
    });

    // Pressing the "Solve" button solves the puzzle and fills in the grid with the solution
    test('Function showSolution(solve(input))', () => {
      // Pending implementation
    });
  });
});
