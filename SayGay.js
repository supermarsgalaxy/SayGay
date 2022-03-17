window.addEventListener("load", init);
//Globals

//Available Levels
const levels = {
  easy: 10,
  medium: 5,
  hard: 3,
};

// to change lebel
const currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

//DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

const words = [
  "agender",
  "bigender",
  "gender variant",
  "Mx.",
  "asexual",
  "she/her",
  "they/them",
  "he/his",
  "neopronouns",
  "androsexual",
  "biromantic",
  "demiromantic",
  "graysexual",
  "homosexual",
  "monosexual",
  "omnisexual",
  "panromantic",
  "passing",
  "sex-averse",
  "sex-favorable",
  "sex-indifferent",
  "skoliosexual",
  "lithosexual",
  "closeted",
  "spectrasexual",
  "cupiosexual",
  "panromantic",
  "gynesexual",
  "cisgender",
  "bisexual",
  "genderfluid",
  "gay",
  "genderqueer",
  "intersex",
  "lesbian",
  "non-binary",
  "pansexual",
  "queer",
  "questioning",
  "transgender",
  "two-spirit",
  "aromantic",
  "demisexual",
  "binary",
];

//initialize game
function init() {
  //show number of seconds in UI
  seconds.innerHTML = currentLevel;
  //load word from array
  showWords(words);
  //start matching on word input
  wordInput.addEventListener("input", startMatch);
  //call countdown every second
  setInterval(countdown, 1000);
  //check game status
  setInterval(checkStatus, 50);
}

//start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWords(words);
    wordInput.value = "";
    score++;
  }
  //if score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}
// match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

//pick & show random word
function showWords(words) {
  //generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  //output random word
  currentWord.innerHTML = words[randIndex];
}

//countdown timer
function countdown() {
  //make sure time is not run out
  if (time > 0) {
    //decrement
    time--;
  } else if (time === 0) {
    //game over
    isPlaying = false;
  }
  //show time
  timeDisplay.innerHTML = time;
}

//check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over!!!";
    score = -1;
  }
}
