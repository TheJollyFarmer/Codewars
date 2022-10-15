// Sudoku Solution Validator
// https://www.codewars.com/kata/529bf0e9bdf7657179000008
const validSolution = board => testRows(board) && testColumns(board) && testSquares(board);

const validArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const squareSections = [0, 1, 2];

const isValidArray = arr => [...arr].sort().every((val, idx) => validArr[idx] === val);
const testRows = board => board.every(row => isValidArray(row));
const getColumn = (board, col) => board.reduce((acc, row) => [...acc, row[col]], []);
const testColumns = board => [...Array(9).keys()].every(val => isValidArray(getColumn(board, val)));
const getSquareIndexes = val => Array.from({ length: 3 }, (_, i) => i + (val * 3));
const getSquare = (x, y, board) => {
  let values = [];

  getSquareIndexes(x).forEach(row =>
    getSquareIndexes(y).forEach(col => values.push(board[row][col]))
  );

  return values;
};

const testSquares = board =>
  squareSections.every(squareX =>
    squareSections.every(squareY => isValidArray(getSquare(squareX, squareY, board)))
  );