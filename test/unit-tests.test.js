const { assert } = require('chai');
const { JSDOM } = require('jsdom');

let Solver;

suite('UnitTests', () => {
  setup(async () => {
    // Mock the DOM for testing and load Solver
    const dom = await JSDOM.fromFile('./views/index.html');
    global.window = dom.window;
    global.document = dom.window.document;
    // eslint-disable-next-line global-require
    Solver = require('../public/js/sudoku-solver');
  });

  suite('Function validTextAreaInput()', () => {
    // Only the digits 1-9 are accepted as valid input for the puzzle grid
    test('Valid "1-9" characters', () => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      input.map((e, i) =>
        assert.strictEqual(Solver.validTextAreaInput(e), input[i])
      );
    });

    // Invalid characters or numbers are not accepted as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', () => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      input.map((e) => assert.isFalse(Solver.validTextAreaInput(e)));
    });
  });

  suite('Function generateBoard()', () => {
    test('Parse a valid puzzle string into an array', () => {
      const input =
        '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const output = [
        ['.', '.', '9', '.', '.', '5', '.', '1', '.'],
        ['8', '5', '.', '4', '.', '.', '.', '.', '2'],
        ['4', '3', '2', '.', '.', '.', '.', '.', '.'],
        ['1', '.', '.', '.', '6', '9', '.', '8', '3'],
        ['.', '9', '.', '.', '.', '.', '.', '6', '.'],
        ['6', '2', '.', '7', '1', '.', '.', '.', '9'],
        ['.', '.', '.', '.', '.', '.', '1', '9', '4'],
        ['5', '.', '.', '.', '.', '4', '.', '3', '7'],
        ['.', '4', '.', '3', '.', '.', '6', '.', '.'],
      ];
      assert.deepStrictEqual(Solver.generateBoard(input), output);
    });

    // Puzzles that are not 81 characters long shows error message
    test('Shows an error for puzzles that are not 81 characters long', () => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr =
        '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 characters long.';
      const errorDiv = document.getElementById('error-msg');

      Solver.generateBoard(shortStr);
      assert.strictEqual(errorDiv.innerText, errorMsg);

      Solver.generateBoard(longStr);
      assert.strictEqual(errorDiv.innerText, errorMsg);
    });
  });
});
