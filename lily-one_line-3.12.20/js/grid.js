class Grid {
  constructor(){
    this.nColumns= 4;
    this.nRows= 3;
    this.diameter= 10;
    this.cellWidth= 200;
    this.pointDiameter= 100;
  };

  mapGRID(levelMap) {
  GRID.nColumns = levelMap[0].length;
  GRID.nRows = levelMap.length;

  let GRIDWidth = GRID.nColumns * GRID.cellWidth;
  let GRIDHeight = GRID.nRows * GRID.cellWidth;

  resizeCanvas(GRIDWidth, GRIDHeight);

  for (let col = 0; col < GRID.nColumns; col++) {
    for (let row = 0; row < GRID.nRows; row++) {
      let coords = col + "," + row; //"0,0"
      let state = levelMap[row][col] === 1 ? "dot" : "empty";
      CELLS[coords] = new Cell(col, row, state);
    }
  }
}

  buildGRID(nCol, nRow) {
  GRID.nColumns = nCol;
  GRID.nRows = nRow;

  let GRIDWidth = GRID.nColumns * GRID.cellWidth;
  let GRIDHeight = GRID.nRows * GRID.cellWidth;

  resizeCanvas(GRIDWidth, GRIDHeight);

  for (let col = 0; col < GRID.nColumns; col++) {
    for (let row = 0; row < GRID.nRows; row++) {
      let coords = col + "," + row; //"0,0"
      CELLS[coords] = new Cell(col, row, "dot");
    }
  }

  //   CELLS["0,0"].state = "empty";
}



// detect() {
//   const data = { 
//       nRows: grid.nRows,
//       nColumns: grid.nColumns, 
//       id: this.ID,
//     };

//   }
}         