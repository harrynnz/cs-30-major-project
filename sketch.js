// cs30 major project
// Harry Huynh
//

let blankGrid = [[0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0]];


let lettersGrid = [];


const LETTERS_PER_ROW = 5;
const COLS = 6;
const GAP = 10;

let typedLetters = [];

let chosenWord = [];

let ifCorrect = false;
let win = false;
let lose = false;
let temp;


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
  textSize(32);
  fill("black");
  drawCurrentWord();
}


//Display 5x6 grid
function showBlankGrid() {
  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < LETTERS_PER_ROW; x++) {
      if (blankGrid[y][x] === 0) {
        strokeWeight(2);
        stroke(r, g, b);
        fill("white");
        square(windowWidth/2 - LETTERS_PER_ROW * cellSize / 2 + x * (cellSize + GAP), 5 * GAP + y * (cellSize + GAP), cellSize);
      }
    }
  }
}

//Input letters
function keyTyped() {
  
  //Push typed letters into an array
  if (typedLetters.length < LETTERS_PER_ROW && keyCode >= 65 && keyCode <= 90) {

    typedLetters.push(key);

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
  //If current column is less than 6 
  if (currentCols < COLS) {

    //Check if word is correct
    checkCorrect();

    //If typed word has 5 letters and you press ENTER
    if (typedLetters.length === LETTERS_PER_ROW && keyCode === ENTER) {

      //Push the word that just got joined together into grid ("lettersGrid")
      lettersGrid.push([typedLetters]);

      //Move to the next/below row
      currentCols += 1;
      currentLetter = 0;

      //Reset typedLetters
      typedLetters.length = 0;
      console.log(lettersGrid);
    }

  //If the typed word is not correct then grid will change color under few conditions
    //Check for indentical word/letters
    for (let i = 0; i <= LETTERS_PER_ROW; i++) {
      if (typedLetters[i] === chosenWord[i]) {
        //Notify player which letter is correct or wrong

      }
    }
  }
}


function choseRandomWord() {

  //Chose random word from word list (and splice it into 5 single letters for checking)
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
    ifCorrect = true;
  }
}


function drawCurrentWord() {
  textSize(32);
  fill("black");
  textAlign(CENTER, CENTER);

  //Display letters into grid
  for (let i = 0; i < typedLetters.length; i++) {

    let posX = windowWidth / 2 - LETTERS_PER_ROW * cellSize / 2 + i * (cellSize + GAP) + cellSize / 2;
    let posY = 5 * GAP + currentCols * (cellSize + GAP) + cellSize / 2;

    square(windowWidth/2 - LETTERS_PER_ROW * cellSize / 2 + x * (cellSize + GAP));
    text(typedLetters[i].toUpperCase(), posX, posY);
  }
}
