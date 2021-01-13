class Line {
  constructor(state) {
    this.cells = [];
    this.squareTurns = [];
    this.state = state; //"empty", "dot"
  }

  getSquareTurns() {
    console.log(this.squareTurns, "is a turning point");
  }

  checkTurn(endCoord) {
    if (this.cells.length <= 1) return;
    const cell = CELLS[endCoord];
    const { row, col } = cell;

    const middleCoord = this.cells[this.cells.length - 1].coords;
    const startCell = this.cells[this.cells.length - 2];

    const startCoord = startCell.coords;
    const startRow = startCell.row;
    const startCol = startCell.col;

    if (col !== startCol && row !== startRow) {
      this.squareTurns.push(middleCoord);
      CELLS[middleCoord].state = "turn";
      console.log("has turned");
    } else {
      CELLS[middleCoord].state = "dot";
    }
  }

  tryAddPoint(posX, posY) {
    let coords = getCoordsWithPosition(posX, posY);

    //check if point is on grid
    if (!coords) return;

    let col = coords.col;
    let row = coords.row;

    coords = col + "," + row;

    let cell = CELLS[coords];

    if (cell.state === "empty") return;

    if (this.cells.indexOf(cell) >= 0) return;

    // prevent diagonal movement
    if (this.cells.length > 0) {
      const lastCoord = this.cells[this.cells.length - 1].coords;

      const lastCell = CELLS[lastCoord];
      const lastRow = lastCell.row;
      const lastCol = lastCell.col;

      let upCoords = lastCol + "," + (lastRow - 1);
      let downCoords = lastCol + "," + (lastRow + 1);
      let leftCoords = lastCol - 1 + "," + lastRow;
      let rightCoords = lastCol + 1 + "," + lastRow;

      const possibleMoves = [upCoords, downCoords, leftCoords, rightCoords];

      if (possibleMoves.indexOf(coords) < 0) return;
    }
    //check if turn

    this.checkTurn(coords);
    let selectedCell = cell;
    selectedCell.state = "end"; // start of finish point

    this.cells.push(selectedCell);
    // this.getSquareTurns();
  }

  empty() {
    this.cells.length = 0;
    this.squareTurns.length = 0;
  }

  display() {
    push();
    noFill();
    strokeWeight(5);
    stroke(80);
    beginShape();

    for (let cell of this.cells) {
      let pos = cell.getPosition();
      vertex(pos.x, pos.y);
    }

    endShape();
    pop();
  }
}
