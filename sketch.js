// cs30 major project
// Harry Huynh
//

let theGrid = [[0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0]];

const LETTERS_PER_ROW = 5;
const COLS = 6;
const GAP = 10;

let typedLetters = [];

let r = 211;
let g = 211;
let b = 211;


let listOfWords = ["wrong", "prism", "quest", "table", "chair", "heart", "teeth", "black", "cloud", "fruit", "fence", "happy", "paint", "shirt", "sleep", "pizza", "honey", "block", "light", "water", "green"]

let cellSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  showGrid();
}

function showGrid() {
  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < LETTERS_PER_ROW; x++) {
      if (theGrid[y][x] === 0) {
        strokeWeight(2);
        stroke(r, g, b);
        fill("white");
        square(windowWidth/2 - LETTERS_PER_ROW * cellSize / 2 + x * (cellSize + GAP), 5 * GAP + y * (cellSize + GAP), cellSize);
      }
    }
  }
}


function keyTyped() {
  let chances = 0;
  let currentRow = 0;
  if (typedLetters.length < LETTERS_PER_ROW && keyCode >= 65 && keyCode <= 90) {
    typedLetters.push(key);
    console.log(typedLetters);
  }
}

function keyPressed() {
  if (typedLetters.length > 0 && keyCode === 8) {
    erase();
  }
}