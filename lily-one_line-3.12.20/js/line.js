class Line {
  constructor(state) {
    //this.col = col;
    //this.row = row;
    this.points = [];
    this.squareTurns = [];
    this.state = state; //"empty", "dot"
  }

  //check if turn

  getSquareTurns() {
    console.log(this.squareTurns);
  }

  checkTurn(endCoord) {
    if (this.points.length <= 1) return;
    const cell = CELLS[endCoord];
    const { row, col } = cell;

    const middleCoord = this.points[this.points.length - 1];

    const startCoord = this.points[this.points.length - 2];
    const startCell = CELLS[startCoord];
    const startRow = startCell.row;
    const startCol = startCell.col;

    

    if (col !== startCol && row !== startRow) {
      this.squareTurns.push(middleCoord);
      console.log('has turned');
    }
  }

  tryAddPoint(posX, posY) {
    let coords = getCoordsWithPosition(posX, posY);

    //check if point is on grid
    if (!coords) return;

    let col = coords.col;
    let row = coords.row;

    coords = col + "," + row;

    if (CELLS[coords].state === "empty") return;

    if (this.points.indexOf(coords) >= 0) return;

    // prevent diagonal movement
    if (this.points.length > 0) {
      const lastCoord = this.points[this.points.length - 1];

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
    this.points.push(coords);
    // this.getSquareTurns();
  }

  empty() {
    this.points.length = 0;
    this.squareTurns.length = 0;
  }

  display() {
    push();
    noFill();
    strokeWeight(5);
    stroke(80);
    beginShape();

    for (let coords of this.points) {
      let pos = CELLS[coords].getPosition();
      vertex(pos.x, pos.y);
    }

    endShape();
    pop();
  }
}
