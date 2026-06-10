// cs30 major project
// Harry Huynh
//


let lettersGrid = [[0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0]];

let keyboardLetters = [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                             ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
                             ["z", "x", "c", "v", "b", "n", "m"]];

const LETTERS_PER_ROW = 5;
const COLS = 6;
const GAP = 10;
const CELLSIZE = 50;

let typedLetters = [];
let chosenWord = [];
let moving = true;
let win = false;
let r = 211;
let g = 211;
let b = 211;
let currentCols = 0;
let currentLetter = 0;
let targetWord = [];
let rectX;

let listOfWords = ["shard", "prism", "eager", "plain", "bulky", "steel", "dense", "cruel", "solid", "tense", "fence", "chart", "paint", "rural", "baste", "gofer", "rower", "krill", "wafer", "savvy", "wound"];

let wrongSoundEffect;
let correctSoundEffect;
let pressingSoundEffect;
let lettersFont;
let titleFont;
let keyPad = [];

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
  rectX = windowWidth;
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
  displayKeyboard();
  if (win === true) {
    stroke(255);
    textSize(90);
    fill("black");
    textFont(titleFont);
    text("YOU WIN", windowWidth / 2 + 25, 200);
    noLoop();
  }
  if (win === false && currentCols === 6) {
    stroke(255);
    textSize(90);
    fill("black");
    textFont(titleFont);
    text("YOU LOSE", windowWidth / 2 + 25, 200);
    textSize(60);
    text("THE WORD WAS " + targetWord, windowWidth / 2 + 25, 270);
    noLoop();
  }
}


//Display letters on grid
function showLettersGrid() {
  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < LETTERS_PER_ROW; x++) {

      let posX = windowWidth/2 - LETTERS_PER_ROW * CELLSIZE / 2 + x * (CELLSIZE + GAP);
      let posY = 5 * GAP + y * (CELLSIZE + GAP);

      strokeWeight(2);
      stroke(r, g, b);
      fill("white");
      square(posX, posY, CELLSIZE);
      textFont(lettersFont);
      if (lettersGrid[y][x] !== 0) {
        if (lettersGrid[y][x] === chosenWord[x] && win === true) { //Case 0: All letters are correct
          //Change grid color
          strokeWeight(0);
          stroke(255);
          fill("#6aaa64");
          square(posX, posY, CELLSIZE);

          //Display letters
          textSize(30);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 21, CELLSIZE);
        }
        else if (lettersGrid[y][x] === chosenWord[x] && win === false) { //Case 1: Some letters are correct
          //Change grid color
          strokeWeight(0);
          stroke(255);
          fill("#6aaa64");
          square(posX, posY, CELLSIZE);
          

          //Display letters
          textSize(30);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 21, CELLSIZE);

        }
        else if (chosenWord.includes(lettersGrid[y][x])) { //Case 2: Correct letters but not in the right postition
          //Change grid color
          strokeWeight(0);
          stroke(255);
          fill("#e9c456");
          square(posX, posY, CELLSIZE);
          

          //Display letters
          textSize(30);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 21, CELLSIZE);

        }
        else { //Case 3: Incorect letter
          //Change grid color
          strokeWeight(0);
          stroke(255);
          fill("grey");
          square(posX, posY, CELLSIZE);

          //Display letters
          textSize(30);
          fill("white");
          textAlign(CENTER, CENTER);
          text(lettersGrid[y][x].toUpperCase(), posX, posY + 21, CELLSIZE);

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
  //Check word by pressing ENTER
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
      console.log(moving);
      console.log(currentCols);
    }
  }
}

//Chose a random target word from the list
function choseRandomWord() {
  chosenWord = split(random(listOfWords), '');
  targetWord = join(chosenWord, "").toUpperCase();
}
//Return true or false base on the word input
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

//Show current typed word on a row
function showCurrentWord() {
  textSize(40);
  fill("black");
  textAlign(CENTER, CENTER);
  for (let i = 0; i < typedLetters.length; i++) {

    let posX = windowWidth/2 - LETTERS_PER_ROW * CELLSIZE / 2 + i * (CELLSIZE + GAP);
    let posY = 5 * GAP + currentCols * (CELLSIZE + GAP) + CELLSIZE / 2;

    textSize(30);
    textFont(lettersFont);
    stroke(255);
    text(typedLetters[i].toUpperCase(), posX + 25, posY - 4);
  }
}

function displayKeyboard() {

  //First Row Keyboard
  for (let x = 0; x < 10; x++) {

    let posXRow1 = windowWidth/2 - 10 * CELLSIZE / 2 + x * (CELLSIZE + GAP);
    let posYRow1 = windowHeight - 300 + GAP;

    // if (chosenWord.includes(keyboardLetters[0][x]) && typedLetters.includes(keyboardLetters[0][x])) {
    //   strokeWeight(0);
    //   stroke(r, g, b);
    //   fill("#e9c456");
    //   textFont(lettersFont);
    //   rect(posXRow1, posYRow1, CELLSIZE, 60, 5);
    // }
    // else {
    strokeWeight(0);
    stroke(r, g, b);
    fill("#ccccca");
    textFont(lettersFont);
    rect(posXRow1, posYRow1, CELLSIZE, 60, 5);

    textSize(30);
    fill("black");
    textAlign(CENTER. CENTER);
    textFont(lettersFont);
    text(keyboardLetters[0][x].toUpperCase(), posXRow1 + 25, posYRow1 + 25);
  }

  //Second Row Keyboard
  for (let x = 0; x < 9; x++) {

    let posXRow2 = windowWidth/2 - 9 * CELLSIZE / 2 + x * (CELLSIZE + GAP);
    let posYRow2 = windowHeight - 240 + GAP;

    strokeWeight(0);
    stroke(r, g, b);
    fill("#ccccca");
    textFont(lettersFont);
    rect(posXRow2, posYRow2 + GAP, CELLSIZE, 60, 5);


    textSize(30);
    fill("black");
    textAlign(CENTER, CENTER);
    textFont(lettersFont);
    text(keyboardLetters[1][x].toUpperCase(), posXRow2 + 25, posYRow2 + 34);
  }

  //Third Row Keyboard
  for (let x = 0; x < 7; x++) {

    let posXRow3 = windowWidth/2 - 7 * CELLSIZE / 2 + x * (CELLSIZE + GAP);
    let posYRow3 = windowHeight - 180 + GAP;

    strokeWeight(0);
    stroke(r, g, b);
    fill("#ccccca");
    textFont(lettersFont);
    rect(posXRow3, posYRow3 + 2* GAP, CELLSIZE, 60, 5);


    textSize(30);
    fill("black");
    textAlign(CENTER. CENTER);
    textFont(lettersFont);
    text(keyboardLetters[2][x].toUpperCase(), posXRow3 + 25, posYRow3 + 44);
  }
}