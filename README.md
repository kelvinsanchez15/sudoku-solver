# Quality Assurance Project #4: Sudoku Solver.

## View project

[Sudoku Solver](https://sudoku-solver-kel.glitch.me/)

## User Stories

1. I can enter a sudoku puzzle by filling in the text area with either a number or period (.) to represent an empty cell.

2. When a valid number is entered in the text area, the same number is applied to the correct cell of the sudoku grid.

3. I can enter a sudoku puzzle by adding numbers directly to the sudoku grid.

4. When a valid number is entered in the sudoku grid, the same number appears in the correct position in the text area.

5. The text area should only update the corresponding sudoku grid cell when a whole number between 1 and 9 is entered.

6. The sudoku grid should only update the puzzle string in the text area when a whole number between 1 and 9 is entered into a cell.

7. I can solve an incomplete puzzle by clicking the "Solve" button. When a solution is found, the sudoku grid and text area are automatically populated with the correct numbers for each cell in the grid or position in the text area.

8. This sudoku solver is not expected to be able to solve every incomplete puzzle.

9. If the puzzle is not 81 numbers or periods long, append the message "Error: Expected puzzle to be 81 characters long." to the `error-msg` `div` so the text appears in red.

10. I can clear the text area and sudoku grid by clicking the "Clear" button.

11. All 6 unit tests are complete and passing.

12. All 4 functional tests are complete and passing.

## Additional Dependencies

- [CORS](https://www.npmjs.com/package/cors).
- [Express](https://www.npmjs.com/package/express).
- [Mocha](https://www.npmjs.com/package/mocha).
- [Chai](https://www.npmjs.com/package/chai).
- [JSDom](https://www.npmjs.com/package/jsdom).
