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
const sounds = document.querySelector("#word-audio");
const button = document.querySelector("#audio-button");

const words = [
  "agender",
  "bigender",
  "Mx.",
  "asexual",
  "she/her",
  "they/them",
  "he/him",
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
  "umbrella term to refer to LGBTQ+ people; also a way to describe a person's sexual orientation and/or gender identity that's fluid",
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
const pronunciation = [
  "https://en-audio.howtopronounce.com/18e71b289c84d9b948bfb4817925d64c.mp3",
  "https://en-audio.howtopronounce.com/937d44dbc806b7b57360466cd4d6c225.mp3",
  "https://en-audio.howtopronounce.com/15784011955e147dabe1da0.mp3",
  "https://www.macmillandictionary.com/media/american/us_pron/a/ase/asexu/asexual_American_English_pronunciation.mp3",
  [
    "https://en-audio.howtopronounce.com/15785174285e1643b4641a9.mp3",
    "https://en-audio.howtopronounce.com/90c4d9814270dec91cb677c6182f3ff9.mp3",
  ],
  [
    "https://en-audio.howtopronounce.com/15785384335e1695c17ca3c.mp3",
    "https://en-audio.howtopronounce.com/15785346535e1686fdf2f4f.mp3",
  ],
  [
    "https://dictionary.cambridge.org/us/media/english/us_pron/h/he_/he___/he.mp3",
    "https://en-audio.howtopronounce.com/15782105855e119519e5ebd.mp3",
  ],
  "neopronouns",
  "https://en-audio.howtopronounce.com/15798733665e2af45626ec8.mp3",
  "https://static.sfdict.com/audio/lunawav/NEW2016/biromantic_010.ogg",
  "https://assets.seeking.com/images/glossary/audio/demiromantic.mp3",
  "https://dictionary.cambridge.org/us/media/english/us_pron/e/eus/eus72/eus72247.mp3",
  "monosexual",
  "https://static.sfdict.com/audio/NEW2016/omnisexual_000.mp3",
  "https://static.sfdict.com/audio/NEW2016/panromantic_000.mp3",
  "https://static.sfdict.com/audio/P01/P0151400.mp3",
  "https://en-audio.howtopronounce.com/15799020725e2b6478c0380.mp3",
  "https://en-audio.howtopronounce.com/16160430616052dc35995c3.mp3",
  "https://en-audio.howtopronounce.com/11a49e95daf9b9ad9f722603e26f20ec.mp3",
  "spectrasexual",
  "https://en-audio.howtopronounce.com/164387461961fb893b313bf.mp3",
  "https://en-audio.howtopronounce.com/16070763265fca09e6612ee.mp3",
  "https://static.sfdict.com/audio/NEW2016/cisgender_000.mp3",
  "https://static.sfdict.com/audio/B03/B0371300.mp3",
  "https://static.sfdict.com/audio/NEW2016/genderfluid_000.mp3",
  "https://static.sfdict.com/audio/G00/G0078300.mp3",
  "https://static.sfdict.com/audio/NEW2016/genderqueer_000.mp3",
  "https://en-audio.howtopronounce.com/15782276765e11d7dca0309.mp3",
  "https://en-audio.howtopronounce.com/15783266485e135a78ee226.mp3",
  "https://en-audio.howtopronounce.com/16035580035f945a7305afc.mp3",
  "https://static.sfdict.com/audio/P00/P0068000.mp3",
  "https://en-audio.howtopronounce.com/15754261715de7187b5e571.mp3",
  "https://en-audio.howtopronounce.com/f94b3ab4d9151d3465987f134b6266bd.mp3",
  "https://en-audio.howtopronounce.com/15785921235e17677b8e628.mp3",
  "https://static.sfdict.com/audio/NEW2016/twospirit_000.mp3",
  "https://static.sfdict.com/audio/NEW2016/aromantic_010.mp3",
  "https://en-audio.howtopronounce.com/e4c1c2e435f3ea0ea081c126830200e8.mp3",
  "https://static.sfdict.com/audio/B03/B0336900.mp3",
  "https://en-audio.howtopronounce.com/653160149feb87dc789252e47b0ec127.mp3",
  "https://en-audio.howtopronounce.com/9f33dc972eef4f88c271cadafb9829d4.mp3",
  "MTF - no audio, online lingo",
  "FTM - no audio, online lingo",
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
  sounds.src = pronunciation[randIndex];
  sounds.autoplay = false;
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

function playAudio() {
  document.getElementById("word-audio").play();
}
button.addEventListener("click", playAudio);
