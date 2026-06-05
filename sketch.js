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
const CELLSIZE = 50;

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
  // displayVisualKeyboard();


  for (key of keyPad) {
    key.draw();
  }
  if (win === true) {

    noLoop();
  }
}



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

    let posX = windowWidth/2 - LETTERS_PER_ROW * CELLSIZE / 2 + i * (CELLSIZE + GAP);
    let posY = 5 * GAP + currentCols * (CELLSIZE + GAP) + CELLSIZE / 2;

    textSize(30);
    textFont(lettersFont);
    stroke(255);
    text(typedLetters[i].toUpperCase(), posX + 25, posY - 4);
  }
}

// function displayVisualKeyboard() {

//   //First Row Keyboard
//   for (let x = 0; x < 10; x++) {

//     let posXRow1 = windowWidth/2 - 10 * CELLSIZE / 2 + x * (CELLSIZE + GAP);
//     let posYRow1 = windowHeight - 300 + GAP;

//     if (chosenWord.includes(visualKeyboardLetters[0][x]) && typedLetters.includes(visualKeyboardLetters[0][x])) {
//       strokeWeight(0);
//       stroke(r, g, b);
//       fill("#ccccca");
//       textFont(lettersFont);
//       rect(posXRow1, posYRow1, CELLSIZE, 60, 5);
//     }
//     else {
//       strokeWeight(0);
//       stroke(r, g, b);
//       fill("#ccccca");
//       textFont(lettersFont);
//       rect(posXRow1, posYRow1, CELLSIZE, 60, 5);
//     }

//     textSize(30);
//     fill("black");
//     textAlign(CENTER. CENTER);
//     textFont(lettersFont);
//     text(visualKeyboardLetters[0][x].toUpperCase(), posXRow1 + 25, posYRow1 + 25);
//   }

//   //Second Row Keyboard
//   for (let x = 0; x < 9; x++) {

//     let posXRow2 = windowWidth/2 - 9 * CELLSIZE / 2 + x * (CELLSIZE + GAP);
//     let posYRow2 = windowHeight - 240 + GAP;

//     strokeWeight(0);
//     stroke(r, g, b);
//     fill("#ccccca");
//     textFont(lettersFont);
//     rect(posXRow2, posYRow2 + GAP, CELLSIZE, 60, 5);


//     textSize(30);
//     fill("black");
//     textAlign(CENTER. CENTER);
//     textFont(lettersFont);
//     text(visualKeyboardLetters[1][x].toUpperCase(), posXRow2 + 25, posYRow2 + 34);
//   }

//   //Third Row Keyboard
//   for (let x = 0; x < 7; x++) {

//     let posXRow3 = windowWidth/2 - 7 * CELLSIZE / 2 + x * (CELLSIZE + GAP);
//     let posYRow3 = windowHeight - 180 + GAP;

//     strokeWeight(0);
//     stroke(r, g, b);
//     fill("#ccccca");
//     textFont(lettersFont);
//     rect(posXRow3, posYRow3 + 2* GAP, CELLSIZE, 60, 5);


//     textSize(30);
//     fill("black");
//     textAlign(CENTER. CENTER);
//     textFont(lettersFont);
//     text(visualKeyboardLetters[2][x].toUpperCase(), posXRow3 + 25, posYRow3 + 44);
//   }
// }

function displayVisualKeyboard() {

  //First Row
  for (let x = 0; x < visualKeyboardLetters[0].length; x++) {
    let posXRow1 = windowWidth/2 - 10 * CELLSIZE / 2 + x * (CELLSIZE + GAP);
    let posYRow1 = windowHeight - 300 + GAP;
    
    keyPad.push(new key(visualKeyboardLetters[0][x], posXRow1, posYRow1, CELLSIZE, 60));
  }

  for (let x = 0; x < visualKeyboardLetters[1].length; x++) {
    let posXRow2 = windowWidth/2 - 9 * CELLSIZE / 2 + x * (CELLSIZE + GAP);
    let posYRow2 = windowHeight - 240 + GAP;

    keyPad.push(new key(visualKeyboardLetters[1][x], posXRow2, posYRow2, CELLSIZE, 60));
  }

  for (let x = 0; x < visualKeyboardLetters[1].length; x++) {
    let posXRow3 = windowWidth/2 - 7 * CELLSIZE / 2 + x * (CELLSIZE + GAP);
    let posYRow3 = windowHeight - 180 + GAP;

    keyPad.push(new key(visualKeyboardLetters[2][x], posXRow3, posYRow3, CELLSIZE, 60));
  }
}

class key {

  constructor(char, x, y, w, h,) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "#ccccca";
  }

  draw() {
    fill(this.color);
    stroke(255);
    rect(this.x, this.y, this.w, this.h, 5);
    

    fill("black");
    text(this.char, this.x, this.y);
  }
}