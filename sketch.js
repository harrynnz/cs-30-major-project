// cs30 major project
// Harry Huynh
//


let lettersGrid = [[0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0]];

let visualKeyboardLetters = [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                             ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
                             ["z", "x", "c", "v", "b", "n", "m"]];

const LETTERS_PER_ROW = 5;
const COLS = 6;
const GAP = 10;
let cellSize = 50;

let typedLetters = [];
let chosenWord = [];

let win;


let r = 211;
let g = 211;
let b = 211;

let currentCols = 0;
let currentLetter = 0;


let listOfWords = ["shard", "prism", "eager", "plain", "bulky", "steel", "dense", "cruel", "solid", "tense", "fence", "chart", "paint", "rural", "baste", "gofer", "rower", "krill", "wafer", "savvy", "wound"]

let wrongSoundEffect;
let correctSoundEffect;
let pressingSoundEffect;
let lettersFont;
let titleFont;


function preload() {
  wrongSoundEffect = loadSound('wrong-answer.mp3');
  correctSoundEffect = loadSound('correct-answer.mp3');
  pressingSoundEffect = loadSound('pressing-key.mp3');
  lettersFont = loadFont('franklin-normal-700.ttf');
  titleFont = loadFont('NYTKarnakCondensed.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  choseRandomWord();
  console.log(chosenWord);
  
}

function draw() {
  background(255);
  textSize(70);
  fill("black");
  textFont(titleFont);
  text("WORDLE", windowWidth / 2 + 25, 460);
  showLettersGrid();
  showCurrentWord();
  displayVisualKeyboard();
  if (win === true) {

    noLoop();
  }
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
      textFont(lettersFont);
      if (lettersGrid[y][x] !== 0) {
        if (lettersGrid[y][x] === chosenWord[x] && win === true) { //Case 0: All letters are correct
          //Change grid color
          strokeWeight(0);
          stroke(255);
          fill("#6aaa64");
          square(posX, posY, cellSize);

          //Display letters
          textSize(30);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 21, cellSize);
        }
        else if (lettersGrid[y][x] === chosenWord[x] && win === false) { //Case 1: Some letters are correct
          //Change grid color
          strokeWeight(0);
          stroke(255);
          fill("#6aaa64");
          square(posX, posY, cellSize);
          

          //Display letters
          textSize(30);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 21, cellSize);

        }
        else if (chosenWord.includes(lettersGrid[y][x])) { //Case 2: Correct letters but not in the right postition
          //Change grid color
          strokeWeight(0);
          stroke(255);
          fill("#e9c456");
          square(posX, posY, cellSize);
          

          //Display letters
          textSize(30);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 21, cellSize);

        }
        else { //Case 3: Incorect letter
          //Change grid color
          strokeWeight(0);
          stroke(255);
          fill("grey");
          square(posX, posY, cellSize);

          //Display letters
          textSize(30);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 21, cellSize);

        }
      }
    }
  }
}

//Input letters
function keyTyped() {
  
  if (keyCode >= 65 && keyCode <= 90 && typedLetters.length < 5 && currentCols < COLS) {
    typedLetters.push(key);
    pressingSoundEffect.play();
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
      if (win !== true) {
        wrongSoundEffect.play();
      }
      else {
        correctSoundEffect.play();
      }

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

    textSize(30);
    textFont(lettersFont);
    text(typedLetters[i].toUpperCase(), posX + 25, posY - 4);
  }
}


function displayFRKeyboard() {
  for (let x = 0; x < 10; x++) {
    strokeWeight(2);
    stroke(255);
    fill("#ccccca");
    textFont(lettersFont);
    rect((windowWidth - 10 * cellSize) / 2 + x * (cellSize + GAP), windowHeight - 300, cellSize, 60, 5);
  }
}

function displaySRKeyboard() {
  for (let x = 0; x < 9; x++) {
    strokeWeight(0);
    stroke(r, g, b);
    fill("#ccccca");
    textFont(lettersFont);
    rect(windowWidth/2 - 9 * cellSize / 2 + x * (cellSize + GAP), windowHeight - 240 + GAP, cellSize, 60, 5);
  }
}

function displayTRKeyboard() {
  for (let x = 0; x < 7; x++) {
    strokeWeight(0);
    stroke(r, g, b);
    fill("#ccccca");
    rect(windowWidth/2 - 7 * cellSize / 2 + x * (cellSize + GAP), windowHeight - 180 + 2 * GAP, cellSize, 60, 5);


    textSize(30);
    fill("black");
    textAlign(CENTER, CENTER);
    textFont(lettersFont);
  //   text(thirdRowKey[x].toUpperCase(), windowWidth/2 - 7 * cellSize / 2 + x * (cellSize + GAP) + 25.5, windowHeight - 180 + 2 * GAP);
  }
}

function displayVisualKeyboard() {

  //First Row Keyboard
  for (let x = 0; x < 9; x++) {

    let posXRow1 = windowWidth/2 - 9 * cellSize / 2 + x * (cellSize + GAP);
    let posYRow1 =windowHeight - 240 + GAP;

    strokeWeight(0);
    stroke(r, g, b);
    fill("#ccccca");
    textFont(lettersFont);
    rect(windowWidth/2 - 9 * cellSize / 2 + x * (cellSize + GAP), windowHeight - 240 + GAP, cellSize, 60, 5);

    textSize(30);
    fill("black");
    textAlign(CENTER. CENTER);
    textFont(lettersFont);
    text(visualKeyboardLetters[0][x].toUpperCase(), posXRow1, posYRow1);
  }

  //Second Row Keyboard
  for (let x = 0; x < 9; x++) {

    let posXRow2 = windowWidth/2 - 9 * cellSize / 2 + x * (cellSize + GAP);
    let posYRow = windowHeight - 240 + GAP, cellSize;

    strokeWeight(0);
    stroke(r, g, b);
    fill("#ccccca");
    textFont(lettersFont);
    rect(windowWidth/2 - 9 * cellSize / 2 + x * (cellSize + GAP), windowHeight - 240 + GAP, cellSize, 60, 5);


    textSize(30);
    fill("black");
    textAlign(CENTER. CENTER);
    textFont(lettersFont);
    text(visualKeyboardLetters[1][x].toUpperCase(), posXRow2, posYRow2);
  }

}