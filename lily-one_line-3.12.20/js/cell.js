class Cell {
  constructor(col, row, state) {
    this.col = col;
    this.row = row;
    this.coords = this.col + "," + this.row;
    this.state = state; //"empty", "dot"
  }

  display() {
    let pos = this.getPosition();

    switch (this.state) {
      case "dot":
        fill(150);
        break;
      case "empty":
        break;
      case "start":
      case "finish":
        fill(20);
        break;
      case "turn":
        fill(190, 92, 247);
        break;
      case "wait":
        fill(random(190), random(92), random(247));
        break;
    }

    ellipse(pos.x, pos.y, GRID.pointDiameter);
  }

  addPoint() {
    // this.points
  }

  getPosition() {
    return {
      x: this.col * GRID.cellWidth + GRID.cellWidth / 2,
      y: this.row * GRID.cellWidth + GRID.cellWidth / 2,
    };
  }
}
