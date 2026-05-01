// cs30 major project
// Harry Huynh
//

let blankGrid = [[0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0]];


let lettersGrid = [[0, 0, 0, 0, 0],
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

let currentCols = 0;
let currentLetter = 0;


let listOfWords = ["shard", "prism", "eager", "plain", "bulky", "steel", "dense", "cruel", "solid", "tense", "fence", "chart", "paint", "rural", "baste", "gofer", "rower", "krill", "wafer", "savvy", "wound"]

let cellSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  choseRandomWord();
  console.log(chosenWord);
}

function draw() {
  background(255);
  showBlankGrid();
  showLettersGrid();
  console.log(LettersGrid);
}


//Display 5x6 grid
function showBlankGrid() {
  for (let y = 0; y <= COLS; y++) {
    for (let x = 0; x <= LETTERS_PER_ROW; x++) {
      if (blankGrid[y][x] === 0) {
        strokeWeight(2);
        stroke(r, g, b);
        fill("white");
        square(windowWidth/2 - LETTERS_PER_ROW * cellSize / 2 + x * (cellSize + GAP), 5 * GAP + y * (cellSize + GAP), cellSize);
      }
    }
  }
}

function showLettersGrid() {
  for (let y = 0; y <= COLS; y++) {
    for (let x = 0; x <= LETTERS_PER_ROW; x++) {
      if (currentCols < COLS) {
        strokeWeight(2);
        stroke(r, g, b);
        fill("white");
        text(typedLetters[currentLetter],windowWidth/2 - LETTERS_PER_ROW * cellSize / 2 + x * (cellSize + GAP), 5 * GAP + y * (cellSize + GAP), cellSize);
      }
    }
  }
}



function keyTyped() {
  
  //Push typed letters into array
  if (typedLetters.length < LETTERS_PER_ROW && keyCode >= 65 && keyCode <= 90) {
    typedLetters.push(key);
    currentLetter += 1;
    console.log(typedLetters);
  }
}

function keyPressed() {

  //Delete a typed letter in array by pressing BACKSPACE
  if (typedLetters.length > 0 && keyCode === BACKSPACE) {
    typedLetters.splice(typedLetters.length - 1, 1);
    console.log(typedLetters);
  }

  //Check the typed word by pressing ENTER
  if (typedLetters.length === 5 && keyCode === ENTER) {
    //Increase chances so that the next typed letters/word would be in the below row
    currentCols += 1;

    //Check for indentical word/letters
    for (let i = 0; i <= LETTERS_PER_ROW; i++) {
    //Divided into 2 cases

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