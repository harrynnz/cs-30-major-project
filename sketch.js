// cs30 major project
// Harry Huynh
//

let theGrid = [[0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0]];

const LETTERS_OF_WORD = 5;
const CHANCES = 6;
const GAP = 10;

let r = 211;
let g = 211;
let b = 211;


let cellSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  showGrid();
}

function showGrid() {
  for (let y = 0; y < CHANCES; y++) {
    for (let x = 0; x < LETTERS_OF_WORD; x++) {
      if (theGrid[y][x] === 0) {
        strokeWeight(2);
        stroke(r, g, b);
        fill("white");
        square(windowWidth/2 - LETTERS_OF_WORD * cellSize / 2 + x * (cellSize + GAP), 5 * GAP + y * (cellSize + GAP), cellSize);
      }
    }
  }
}
