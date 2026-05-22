// cs30 major project
// Harry Huynh
//

let blankGrid = [[0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0]];



const LETTERS_PER_ROW = 5;
const COLS = 6;
const GAP = 10;
let cellSize = 50;

let lettersGrid = [];
let typedLetters = [];
let chosenWord = [];

let win = false;
let lose = false;


let r = 211;
let g = 211;
let b = 211;

let currentCols = 0;
let currentLetter = 0;
let startP = 0;
let maxP = 0;


let listOfWords = ["shard", "prism", "eager", "plain", "bulky", "steel", "dense", "cruel", "solid", "tense", "fence", "chart", "paint", "rural", "baste", "gofer", "rower", "krill", "wafer", "savvy", "wound"]



function setup() {
  createCanvas(windowWidth, windowHeight);
  choseRandomWord();
  console.log(chosenWord);
}

function draw() {
  background(255);
  showBlankGrid();
  textSize(32);
  fill("black");
  showCurrentWord();
  showLettersGrid();
}


//Display 5x6 grid
function showBlankGrid() {
  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < LETTERS_PER_ROW; x++) {
      strokeWeight(2);
      stroke(r, g, b);
      fill("white");
      square(windowWidth/2 - LETTERS_PER_ROW * cellSize / 2 + x * (cellSize + GAP), 5 * GAP + y * (cellSize + GAP), cellSize);
    }
  }
}

function showLettersGrid() {
  for (let rows = 0; rows < 6; rows++) {
    for (let x = startP; x < maxP; x++) {
      text(lettersGrid[rows][x], windowWidth/2 - LETTERS_PER_ROW * cellSize / 2 + x * (cellSize + GAP), 5 * GAP + y * (cellSize + GAP), cellSize)
    }
  }
}


//Input letters
function keyTyped() {
  
  if (keyCode >= 65 && keyCode <= 90 && typedLetters.length < 5) {
    typedLetters.push(key);
  }
  console.log(typedLetters);
}


function keyPressed() {

  //Delete a typed letter in array by pressing BACKSPACE
  if (typedLetters.length > 0 && keyCode === BACKSPACE) {
    typedLetters.splice(typedLetters.length - 1, 1);
    console.log(typedLetters);
  }

  if (currentCols < COLS) {

    checkCorrect();
    if (typedLetters.length === LETTERS_PER_ROW && keyCode === ENTER) {
      lettersGrid.push(typedLetters);

      currentCols += 1;
      currentLetter = 0;
      maxP += 5;
      startP += 5;
      typedLetters.length = 0;

      console.log(lettersGrid);
    }
  }
}


function choseRandomWord() {
  chosenWord = split(random(listOfWords), '');
}

function checkCorrect() {
  let correctLetters = 0;

  for (let i = 0; i < LETTERS_PER_ROW; i++) {
    if (typedLetters[i] === chosenWord[i]) {
      correctLetters++;
    }
  }
  if (correctLetters === LETTERS_PER_ROW) {
    win = true;
  }
}


function showCurrentWord() {
  textSize(32);
  fill("black");
  textAlign(CENTER, CENTER);

  //Display letters into grid
  for (let i = 0; i < typedLetters.length; i++) {

    let posX = windowWidth / 2 - LETTERS_PER_ROW * cellSize / 2 + i * (cellSize + GAP) + cellSize / 2;
    let posY = 5 * GAP + currentCols * (cellSize + GAP) + cellSize / 2;

    text(typedLetters[i].toUpperCase(), posX, posY );
  }
}

