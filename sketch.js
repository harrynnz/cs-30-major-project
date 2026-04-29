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
let chosenWord = [];

let r = 211;
let g = 211;
let b = 211;


let listOfWords = ["wrong", "prism", "quest", "table", "chair", "heart", "teeth", "black", "cloud", "fruit", "fence", "happy", "paint", "shirt", "sleep", "pizza", "honey", "block", "light", "water", "green"]

let cellSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  choseRandomWord();
  console.log(chosenWord);
}

function draw() {
  background(255);
  showGrid();
}


//Display 5x6 grid
function showGrid() {
  let chances = 6;
  let currentRow = 0;
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
  
  //Push typed letters into array
  if (typedLetters.length < LETTERS_PER_ROW && keyCode >= 65 && keyCode <= 90) {
    typedLetters.push(key);
    console.log(typedLetters);
  }
}

function keyPressed() {
  if (typedLetters.length > 0 && keyCode === BACKSPACE) {
    typedLetters.splice(typedLetters.length - 1, 1);
    console.log(typedLetters);
  }
  if (typedLetters.length === 5 && keyCode === ENTER) {
    for (let i = 0; i <= LETTERS_PER_ROW; i++) {

      //Check if the player got the word correct
      if (typedLetters[i] === chosenWord[i]) {
        //Congrat and sound

      }

      //Check for each letter that is correct
      for (let j = 0; j <= LETTERS_PER_ROW; j++) {
        if (typedLetters[i] === chosenWord[j]) {
          //Notify player which letter is correct or wrong

        }
      }
    }
  }
}

function choseRandomWord() {
  chosenWord = split(random(listOfWords), '');
}