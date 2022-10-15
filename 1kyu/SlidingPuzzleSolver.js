// Sliding Puzzle Solver
// https://www.codewars.com/kata/5a20eeccee1aae3cbc000090
function slidePuzzle(arr) {
  let board = new Board(arr);

  return board.solve();
}

class Board {
  constructor(board) {
    this.board = board;
    this.edgeSize = board.length;
    this.locked = board.map((row) => row.map(() => false));
    this.solution = this.getSolution(board);
    this.moves = [];
    this.emptySpot = [];
    this.lockedRows = [];
    this.lockedCols = [];
  }

  solve() {
    this.solution[this.edgeSize - 1][this.edgeSize - 1] = 0;
    this.emptySpot = this.findTile(0);

    for (let i = 0; i <= this.edgeSize - 3; i++) {
      this.solveRow(i);
      this.solveCol(i);
    }

    if (!this.isSolved()) this.solveSquare();

    if (this.isSolved()) return this.moves ;
    else return null;
  }

  solveSquare() {
    let protection = 0;

    this.moveZero(this.edgeSize - 1, this.edgeSize - 1);

    while (!this.isSolved() && protection < 10) {
      this.swap(this.emptySpot[0] - 1, this.emptySpot[1]);
      this.swap(this.emptySpot[0], this.emptySpot[1] - 1);
      this.swap(this.emptySpot[0] + 1, this.emptySpot[1]);
      this.swap(this.emptySpot[0], this.emptySpot[1] + 1);

      protection++;
    }
  }

  solveRow(edge) {
    // Solve all N - 1 tiles
    for (let i = edge; i <= this.edgeSize - 3; i++) {
      let val = this.solution[edge][i];

      this.moveTile(val, edge, i, true);
    }

    // Obtain last tile
    const lastValInRow = this.solution[edge][this.edgeSize - 1];
    const location = this.findTile(lastValInRow);

    if (this.getDistance(edge, this.edgeSize - 1, location[0], location[1]) < 3) {
      this.moveTile(lastValInRow, this.edgeSize - 1, this.edgeSize - 1, false);
    }

    // Setup penultimate tile
    const val = this.solution[edge][this.edgeSize - 2];

    this.moveTile(val, edge, this.edgeSize - 1, true);

    // Setup last tile
    this.moveTile(lastValInRow, edge + 1, this.edgeSize - 1, true);

    // Place last two tiles
    this.moveZero(edge, this.edgeSize - 2);
    this.setLock(edge, this.edgeSize - 1, false);
    this.setLock(edge + 1, this.edgeSize - 1, false);
    this.swap(edge, this.edgeSize - 1);
    this.swap(edge + 1, this.edgeSize - 1);
    this.lockedRows.push(edge);
  }

  solveCol(edge) {
    for (let i = edge; i <= this.edgeSize - 3; i++) {
      let val = this.solution[i][edge];

      this.moveTile(val, i, edge, true);
    }

    const lastValInCol = this.solution[this.edgeSize - 1][edge];
    const val = this.solution[this.edgeSize - 2][edge];

    this.moveTile(lastValInCol, this.edgeSize - 1, this.edgeSize - 1, false);
    this.moveTile(val, this.edgeSize - 1, edge, true);
    this.moveTile(lastValInCol, this.edgeSize - 1, edge + 1, true);
    this.moveZero(this.edgeSize - 2, edge);
    this.setLock(this.edgeSize - 1, edge, false);
    this.setLock(this.edgeSize - 1, edge + 1, false);
    this.swap(this.edgeSize - 1, edge);
    this.swap(this.edgeSize - 1, edge + 1);
    this.lockedCols.push(edge);
  }

  moveTile(t, y, x, lock) {
    const [y1, x1] = this.findTile(t);
    const path = this.findPath(y1, x1, y, x);

    for (let [y2, x2] of path) {
      let [y1, x1] = this.findTile(t);

      this.setLock(y1, x1, true);
      this.moveZero(y2, x2);
      this.setLock(y1, x1, false);
      this.swap(y1, x1);
    }

    this.setLock(y, x, lock);
  }

  moveZero(y, x) {
    if (y === this.emptySpot[0] && x === this.emptySpot[1]) return;

    const path = this.findPath(this.emptySpot[0], this.emptySpot[1], y, x);

    if (path) this.applyPath(path);
  }

  setLock(y, x, lock) {
    this.locked[y][x] = lock;
  }

  swap(y, x) {
    if (this.isValidLocation(y, x)) {
      const tile = this.board[y][x];

      this.board[y][x] = 0;
      this.board[this.emptySpot[0]][this.emptySpot[1]] = tile;
      this.emptySpot = [y, x];
      this.moves.push(tile);
    }
  }

  findPath(y0, x0, y1, x1, currentPath = []) {
    if (JSON.stringify([y0, x0]) === JSON.stringify([y1, x1])) return currentPath;

    const neighbours = this.findNeighbours(y0, x0).filter(spot => !this.hasSpot(currentPath, spot));
    const nextSteps = this.sortByDistance(neighbours, y1, x1);

    for (let [y, x] of nextSteps) {
      currentPath.push([y, x]);

      const tempPath = [...currentPath];
      const path = this.findPath(y, x, y1, x1, tempPath);

      if (path) return path;
      else currentPath.pop();
    }
  }

  applyPath(path) {
    if (path.length) path.forEach(([y, x]) => this.swap(y, x));
  }

  findNeighbours(y, x) {
    return [
      [y, x + 1],
      [y, x - 1],
      [y + 1, x],
      [y - 1, x],
    ].filter(([y, x]) => this.isValidLocation(y, x));
  }

  isSolved() {
    return JSON.stringify(this.board) === JSON.stringify(this.solution);
  }

  isValidLocation(y, x) {
    if (this.lockedRows.includes(y) || this.lockedCols.includes(x)) return false;
    if (x > this.edgeSize - 1 || x < 0) return false;
    if (y > this.edgeSize - 1 || y < 0) return false;

    return !this.locked[y][x];
  }

  findTile(val) {
    for (let y = 0; y <= this.edgeSize; y++) {
      for (let x = 0; x <= this.edgeSize; x++) {
        if (this.board[y][x] === val) return [y, x];
      }
    }
  }

  hasSpot(path, spot) {
    return path.some(move => JSON.stringify(move) === JSON.stringify(spot));
  }

  sortByDistance(arr, y, x) {
    return arr.sort(
      ([y1, x1], [y2, x2]) =>
        this.getDistance(y, x, y1, x1) - this.getDistance(y, x, y2, x2)
    );
  }

  getDistance(y0, x0, y1, x1) {
    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
  }

  getSolution(board) {
    return board.map((row, y) => row.map((_, x) => y * this.edgeSize + x + 1));
  }
}