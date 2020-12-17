let GRID = new Grid();

const map1 = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

const CELLS = {};
let LINE = new Line();

const urlParameter = new URLSearchParams(window.location.search);
this.ID = urlParameter.get("player");

function setup() {
  createCanvas(windowWidth, windowHeight);
  //   mapGRID(map1);
  GRID.buildGRID(4, 3);
  this.appHasStarted = false;

  DATABASE.ref("PONG_LILODIE/ONELINE").on(
    "value",
    this.onValueChanged.bind(this)
  );
}




function draw() {
  background(222, 235, 235);
  noStroke();
  

  for (let [coords, cell] of Object.entries(CELLS)) {
    cell.display();
  }

  LINE.display();

  let cell = getCellWithPosition(mouseX, mouseY);

  fill("rgba(255, 255, 255, 0.1)");

  if (cell) cell.display();


}

function mousePressed() {
  LINE.tryAddPoint(mouseX, mouseY);
}

function mouseDragged() {
  LINE.tryAddPoint(mouseX, mouseY);
}

function mouseReleased() {
  //   if (LINE.points.length === getNDotCells()) {
  //     console.log("YOU WON");
  //     LINE.fadeOut();
  //   } else {
  //     LINE.empty();
  //   }

  fadeOut();
}

function fadeOut() {
  if (LINE.points.length <= 1) {
    LINE.empty();
    return;
  }

  for (let [coords, cell] of Object.entries(CELLS)) {
    if (LINE.points.indexOf(coords) < 0) {
      cell.state = "empty";

    }
    console.log(coords, cell);
    console.log(LINE.points.indexOf(coords));

    if (LINE.points.indexOf(coords) == 0 ){
      cell.state = "start";
    }
    if (LINE.points.indexOf(coords) == LINE.points.length -1){
      cell.state = "finish";
    }
    // draw state "turn"
     if (LINE.points.indexOf(coords) == LINE.points.hasTurned) {
      cell.state = "turn";
      console.log(LINE.points.hasTurned);
    }
  }

 

  

  

  LINE.empty();
}

function getTheGrid(data) {
  if (this.ID != data.id) {
    this.GRID.nColumns = data.nColumns;
    this.GRID.nRows = data.nRows;
    
  fadeOut();
    //console.log("ball Y" + this.ball.y + " ball speedX " + this.ball.speedX);

    if (this.ID == 1) {
      this.GRID.nColumns = window.innerWidth;
    } else if (this.ID == 2) {
      this.GRID.nRows = 0;
    }
  }  
}

function onValueChanged(snapshot) {
    
  if (!this.appHasStarted) {
    this.appHasStarted = true;
    this.draw();
  }else{
    this.getTheGrid(snapshot.val());
    //console.log("snapshot", snapshot.val());
    
  }
}
