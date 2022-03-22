window.addEventListener("load", init);

//Globals

//Available Levels
const levels = {
  easy: 30,
  medium: 15,
  hard: 10,
};

// to change level
const currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

//DOM Elements
const wordInput = document.querySelector("#word-input");
const def = document.querySelector("#word-definition");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const button = document.querySelector("#audio-button");

const words = [
  "agender",
  "bigender",
  "Mx.",
  "asexual",
  "she/her",
  "they/them",
  "he/his",
  "neopronouns",
  "androsexual",
  "biromantic",
  "demiromantic",
  "homosexual",
  "monosexual",
  "omnisexual",
  "panromantic",
  "passing",
  "skoliosexual",
  "lithosexual",
  "closeted",
  "spectrasexual",
  "cupiosexual",
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
  "AFAB",
  "AMAB",
  "MTF",
  "FTM",
];
const definition = [
  "describes a person who identifies as having no gender.",
  "having two genders, exhibiting cultural characteristics of masculine and feminine roles.",
  "gender neutral title of courtesy",
  "a sexual orientation characterized by not feeling sexual attraction or desire for partnered sexuality. There are many diverse ways of being asexual.",
  "typically femme pronouns",
  "typically gender nuetral pronouns",
  "typically masc pronouns",
  "a category of new pronouns that're used in place of she/her he/his or they/them. Examples: xe/xem/xyr, ze/hir/hirs, and ey/em/eir",
  "person who is sexually attracted to men and/or masculinity",
  "person who is romantically, but not sexually attracted to people of more than one gender",
  "person who doesn't feel romantic attraction to someone unlesss they already have formed a strong emotional bond",
  "sexual orientation where a person is attracted to people of the same gender",
  "person who has an attraction to one gender only",
  "person who has an attraction to people of all genders and sexes",
  "person who is romantically but  not sexually attracted to others regardless of their gender identity or biological sex",
  "when a transgender person is percieved as cisgender instead of their sex assigned at birth",
  "person who is sexually attracted to people with non-binary gender identities",
  "person who may experience sexual attraction but do not want these feelings reciprocated",
  "LGBTQ+ person who has not disclosed their sexual orientation or gender identity",
  "person who is attracted to multiple or varied sexes, genders, and gender identities — but not necessarily all or any",
  "person who doesn't experience sexual attraction but still desire to be in a sexual relationship or engage in sexual behavior",
  "person who experiences sexual attraction toward women and/or femininity, regardless of whether they were AFAB",
  "person who identifies with the gender that was assigned to them at birth",
  "person who experiences attraction to people of their own gender as well as another gender",
  "person whose gender varies at any time they can identify as whichever identity they feel fits",
  "a man who is attracted to men, but often used by women to describe their same-sex relationships as well",
  "person whose gender identity is neither man nor woman, is between or beyond genders, or is some combination of genders",
  "people who have biological sex characteristics that can’t be easily categorized into the binary sex framework of male or female",
  "a woman who is attracted to other women; women and non-binary people may use this term to describe themselves",
  "a gender identity that is neither female nor male, outside of or beyond the two traditional concepts of male or female",
  "person who experiences attraction for members of all gender identities/expressions",
  "umbrella term to refer to all LGBTQ+ people; also a non-binary term used by individuals who see their sexual orientation and/or gender identity as fluid",
  "person who is in the process of questioning or analyzing their sexual orientation, gender identity, or gender expression",
  "person whose gender identity is different from their assigned sex at birth",
  "Native American's who identify with a 3rd gender, a masculine & a feminine spirit in one body",
  "person who experiences little to no romantic attraction to others of any gender",
  "person who typically doesn't feel sexual attraction to someone unless they already formed a strong emotional bond with the person",
  "the classification of gender into two distinct forms of masculine and feminine",
  "a person whose sex was assigned female at birth",
  "a person whose sex was assigned male at birth",
  "person transitioning from male to female",
  "person transitioning from female to male",
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
  const randIndex_Def = Math.floor(Math.random() * definition.length);
  //output random word
  currentWord.innerHTML = words[randIndex];
  def.innerHTML = definition[randIndex];
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

//text to speech audio
function textoAudio() {
  let speech = new SpeechSynthesisUtterance(currentWord);
  speech.text = currentWord;
  speech.volume = 1;
  window.SpeechSynthesis.speak(speech);
}

button.addEventListener("click", function texttoAudio);
