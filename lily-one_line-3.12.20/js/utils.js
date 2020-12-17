
function getNDotCells() {
    let n = 0;
  
    for (let cell of Object.values(CELLS)) {
      if (cell.state === "dot") n++;
    }
  
    return n;
  }
  
  function getCellWithPosition(x, y) {
    let coords = getCoordsWithPosition(x, y);
    if (!coords) return null;
  
    return getCellWithCoords(coords.col, coords.row);
  }
  
  function getCoordsWithPosition(x, y) {
    let col = floor((x / width) * GRID.nColumns);
  
    if (col < 0 || col > GRID.nColumns - 1) return null;
  
    let row = floor((y / height) * GRID.nRows);
  
    if (row < 0 || row > GRID.nRows - 1) return null;
  
    return { col, row };
  }
  
  function getCellWithCoords(col, row) {
    let coords = col + "," + row; //"0,0"
    return CELLS[coords];
  }
  