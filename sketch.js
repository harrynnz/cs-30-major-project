// cs30 major project
// Harry Huynh
//


let lettersGrid = [[0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0]];



const LETTERS_PER_ROW = 5;
const COLS = 6;
const GAP = 10;
let cellSize = 50;

let typedLetters = [];
let chosenWord = [];


let win = false;


let r = 211;
let g = 211;
let b = 211;

let currentCols = 0;
let currentLetter = 0;


let listOfWords = ["shard", "prism", "eager", "plain", "bulky", "steel", "dense", "cruel", "solid", "tense", "fence", "chart", "paint", "rural", "baste", "gofer", "rower", "krill", "wafer", "savvy", "wound"]



function setup() {
  createCanvas(windowWidth, windowHeight);
  choseRandomWord();
  console.log(chosenWord);
}

function draw() {
  background(255);
  textSize(32);
  fill("black");
  showLettersGrid();
  showCurrentWord();
}



function showLettersGrid() {
  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < LETTERS_PER_ROW; x++) {

      let posX = windowWidth/2 - LETTERS_PER_ROW * cellSize / 2 + x * (cellSize + GAP);
      let posY = 5 * GAP + y * (cellSize + GAP);

      strokeWeight(2);
      stroke(r, g, b);
      fill("white");
      square(posX, posY, cellSize);
      if (lettersGrid[y][x] !== 0) {
        if (lettersGrid[y][x] === chosenWord[x] && win === true) { //Case 0: All letters are correct
          //Change grid color
          strokeWeight(0);
          stroke(0);
          fill("green");
          square(posX, posY, cellSize);

          //Display letters
          textSize(40);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 28, cellSize );
        }
        else if (lettersGrid[y][x] === chosenWord[x] && win === false) { //Case 1: Some letters are correct
          //Change grid color
          strokeWeight(0);
          stroke(0);
          fill("green");
          square(posX, posY, cellSize);

          //Display letters
          textSize(40);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 28, cellSize );
        }
        else if (lettersGrid[y][x] === chosenWord[y]) { //Case 2: Correct letters but not in the right postition
          //Change grid color
          strokeWeight(0);
          stroke(0);
          fill("#eab308");
          square(posX, posY, cellSize);

          //Display letters
          textSize(40);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 28, cellSize );

        }
        else { //Case 3: Incorect letter
          //Change grid color
          strokeWeight(0);
          stroke(0);
          fill("grey");
          square(posX, posY, cellSize);

          //Display letters
          textSize(40);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 28, cellSize );
        }
      }
    }
  }
}

//Input letters
function keyTyped() {
  
  if (keyCode >= 65 && keyCode <= 90 && typedLetters.length < 5 && currentCols < COLS) {
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

    if (typedLetters.length === LETTERS_PER_ROW && keyCode === ENTER) {
      for (let char = 0; char < typedLetters.length; char++) {
        lettersGrid[currentCols][char] = typedLetters[char];
      }
      checkCorrect();

      currentCols += 1;
      currentLetter = 0;

      typedLetters.length = 0;

      console.log(lettersGrid);
      console.log(win);
    }
  }
}


function choseRandomWord() {
  chosenWord = split(random(listOfWords), '');
}

function checkCorrect() {
  let correctLetters = 0;

  for (let i = 0; i < LETTERS_PER_ROW; i++) {
    if (lettersGrid[currentCols][i] === chosenWord[i]) {
      correctLetters++;
    }
  }
  if (correctLetters === LETTERS_PER_ROW) {
    win = true;
  }
}


function showCurrentWord() {
  textSize(40);
  fill("black");
  textAlign(CENTER, CENTER);

  //Display letters into grid
  for (let i = 0; i < typedLetters.length; i++) {

    let posX = windowWidth/2 - LETTERS_PER_ROW * cellSize / 2 + i * (cellSize + GAP);
    let posY = 5 * GAP + currentCols * (cellSize + GAP) + cellSize / 2;

    text(typedLetters[i].toUpperCase(), posX + 25, posY + 3 );
  }
}

