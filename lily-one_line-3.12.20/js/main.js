let GRID = new Grid();
let FIREBASE_DIRECTORY = "ONELINE/";

const map1 = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

const CELLS = {};
let LINE;
let GUESS_POINTS = [];

let IS_PLAYER1 = false;
let IS_DRAWER = false;
let CURR_LEVEL = 0;
let READY_TO_PLAY = false;

function setup() {
  LINE = new Line();
  createCanvas(windowWidth, windowHeight);

  let player1Btn = createButton("Player 1");
  let player2Btn = createButton("Player 2");
  player1Btn.position(windowWidth * 0.33);
  player1Btn.style("border-style", "none");
  player1Btn.style("border-radius", "5");
  player2Btn.position(windowWidth * 0.66);

  player1Btn.elt.onclick = () => {
    IS_PLAYER1 = true;
    player2Btn.hide();
    SEND_MESSAGE("players/player1/ready", true);
  };

  player2Btn.elt.onclick = () => {
    player1Btn.hide();
    SEND_MESSAGE("players/player2/ready", true);
  };

  let hash = window.location.hash.replace("#", "");
  if (hash === "player1") {
    player1Btn.elt.click();
  } else if (hash === "player2") {
    player2Btn.elt.click();
  }

  //

  LISTEN("players", (data) => {

    console.log(JSON.stringify(data))

    if(!data.player1.ready && READY_TO_PLAY || !data.player2.ready && READY_TO_PLAY) {
      location.reload();
    }

    if (data.player1.ready) player1Btn.hide();

    if (data.player2.ready) {
      player2Btn.hide();
    }

    if (data.player1.ready && data.player2.ready) {
      window.location.hash = IS_PLAYER1 ? "player1" : "player2";

      if (IS_PLAYER1) {
        SEND_MESSAGE("level/drawer", "player1");
        SEND_MESSAGE("level/number", CURR_LEVEL);
      }
    }
  });

  LISTEN("level", (data) => {
    if (data.number !== false) {
      GRID.buildGRID(4, 3);
      READY_TO_PLAY = true;
      console.log("READY TO PLAY");
    }

    if (IS_PLAYER1 && data.drawer === "player1") {
      IS_DRAWER = true;
    }
  });

  LISTEN("line", (data) => {
    if (!READY_TO_PLAY) return;

    if (!IS_DRAWER) GUESS_POINTS = data.points;
  });
  // //   mapGRID(map1);
  // GRID.buildGRID(4, 3);
  // this.appHasStarted = false;
}

window.addEventListener("beforeunload", function (event) {
  // event.returnValue="";
  SEND_MESSAGE("players/player1/ready", false);
  SEND_MESSAGE("level/number", false);
  SEND_MESSAGE("players/player2/ready", false);
});

function draw() {
  if (!READY_TO_PLAY) return;

  background(222, 235, 235);

  // if (!IS_DRAWER){
  //   textSize(300);
  //   fill(0, 102, 153);
  //   text('wait for your opponent', windowWidth/2, windowHeight/2);
  //   GRID.
  // }

  if (IS_DRAWER){
    background("green");
  }
  noStroke();

  for (let [coords, cell] of Object.entries(CELLS)) {
    cell.display();
  }

  LINE.display();

  let cell = getCellWithPosition(mouseX, mouseY);

  fill("rgba(255, 255, 255, 0.1)");

  if (cell) cell.display();
}


// send() {
//   console.log("do send");
//   SEND_MESSAGE("ONELINE/", {
//     n_clicks: this.n_clicks++,
//     id: this.ID,
//   });
// }

function mousePressed() {
  if (!READY_TO_PLAY || !IS_DRAWER) return;

  LINE.tryAddPoint(mouseX, mouseY);
  SEND_MESSAGE("line/points", LINE.points);
}

function mouseDragged() {
  if (!READY_TO_PLAY || !IS_DRAWER) return;

  LINE.tryAddPoint(mouseX, mouseY);
  SEND_MESSAGE("line/points", LINE.points);
}

function mouseReleased() {
  if (!READY_TO_PLAY || !IS_DRAWER) return;

  LINE.getSquareTurns();
  SEND_MESSAGE("line/squareTurns", LINE.squareTurns);
  pointColor();

  if(!IS_DRAWER){
    IS_DRAWER
  } else {
    !IS_DRAWER
  }
  
  // fadeOut();
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
  }
  LINE.empty();
}

function pointColor(){
  for (let [coords, cell] of Object.entries(CELLS)) {

    if (LINE.points.indexOf(coords) == 0) {
      cell.state = "start";
    }
    if (LINE.points.indexOf(coords) == LINE.points.length - 1) {
      cell.state = "finish";
    }
    // draw state "turn"///////////////////////////////////////////
    // if (LINE.squareTurns.indexOf(coords) == LINE.squareTurns.length-2) {
    //   cell.state = "turn";
    // }
    LINE.squareTurns.forEach((item)=>{
      console.log(item,coords);
      if(item == coords){
        cell.state = "turn";
      }
    });
    console.log("***")
  }

  // LINE.empty();
}

function getTheGrid(data) {
  console.log("getTheGrid")
  if (this.ID != data.id) {
    this.GRID.nColumns = data.nColumns;
    this.GRID.nRows = data.nRows;
    SEND_MESSAGE("line/points", pointColor());
    //fadeOut();
    //console.log("ball Y" + this.ball.y + " ball speedX " + this.ball.speedX);

    if (this.ID == 1) {
      this.GRID.nColumns = window.innerWidth;
    } else if (this.ID == 2) {
      this.GRID.nRows = 0;
    }
  }
}

// function getTheLine(data) {
// if

// }

function onValueChanged(snapshot) {
  if (!this.appHasStarted) {
    this.appHasStarted = true;
    this.draw();
    let database = snapshot.val();
    console.log(database);
  } else {
    let database = snapshot.val();
    console.log("hallo funktioniert da???");
    this.getTheGrid(database);
    //console.log("snapshot", snapshot.val());
  }
}

function SEND_MESSAGE(_type, _data = "yes") {
  // _data = {'data': _data, 't_created': Date.now()};
  DATABASE.ref(FIREBASE_DIRECTORY + _type).set(_data);
}

function LISTEN(_type, callback) {
  DATABASE.ref(FIREBASE_DIRECTORY + _type).on("value", (snapshot) =>
    callback(snapshot.val())
  );
}
