class Line {
  constructor(state) {
    //this.col = col;
    //this.row = row;
    this.points = [];
    this.state = state; //"empty", "dot"
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

    console.log(col, row);

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
    if (this.points.length > 0) {
      const lastCoord = this.points[this.points.length - 1];
      const lastCell = CELLS[lastCoord];
      const lastRow = lastCell.row;
      const lastCol = lastCell.col;

      let turnRight = lastCol + 1 + "," + lastRow;
      let turnLeft = lastCol - 1 + "," + lastRow;
      

      const hasTurned = [turnRight, turnLeft];

      // if (hasTurned.indexOf(coords) < 0);
      console.log(hasTurned);
    }

    this.points.push(coords);
  }

  empty() {
    this.points.length = 0;
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
