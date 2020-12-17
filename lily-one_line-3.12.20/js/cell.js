class Cell {
  constructor(col, row, state) {
    this.col = col;
    this.row = row;
    this.coords = this.col + "," + this.row;
    this.state = state; //"empty", "dot"
  }

  display() {
    if (this.state === "dot") {
      let pos = this.getPosition();
      fill(150);
      ellipse(pos.x, pos.y, GRID.pointDiameter);
     
    } else if (this.state === "empty") {

    } else if (this.state === "start"){
      let pos = this.getPosition();
      fill(20);
      ellipse(pos.x, pos.y, GRID.pointDiameter);

    } else if (this.state === "finish"){
      let pos = this.getPosition();
      fill(20);
      ellipse(pos.x, pos.y, GRID.pointDiameter);
      

    } else if (this.state === "turn"){
      let pos = this.getPosition();
      fill(190, 92, 247);
      ellipse(pos.x, pos.y, GRID.pointDiameter);
      

    }
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
