window.addEventListener("load", init);
//Globals

//Available Levels
const levels = {
  easy: 30,
  medium: 15,
  hard: 10,
};

// to change lebel
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

//console.log(def.getAttribute("src"));

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
  "gender binary",
  "AFAB",
  "AMAB",
  "MTF",
  "FTM",
];
const definition = [
  "describes a person who identifies as having no gender.",
  "having two genders, exhibiting cultural characteristics of masculine and feminine roles.",
  "a person who varies from the expected characteristics of the assigned gender.",
  "gender neutral title of courtesy (instead of Mr. or Ms.).",
  "a sexual orientation generally characterized by not feeling sexual attraction or desire for partnered sexuality. There are many diverse ways of being asexual.",
  "typically femme pronouns",
  "typically gender nuetral pronouns",
  "typically masc pronouns",
  "a category of new pronouns that're used in place of she/her he/his or they/them. Some examples include: xe/xem/xyr, ze/hir/hirs, and ey/em/eir",
  "person who is sexually attracted to men and/or masculinity",
  "person who is romantically, but not sexually attracted to people of more than one gender",
  "person who doesn't feel romantic attraction to someone unlesss they already have formed a strong emotional bond",
  "sexual orientation where a person is attracted to people of the same gender",
  "person who has romantic, sexual, or affectional desire for one gender only",
  "person who has romantic, sexual, or affectional desire for people of all genders and sexes",
  "person who is romantically but  not sexually attracted to others regardless of their gender identity or biological sex",
  "when a transgender person is percieved as cisgender instead of their sex assigned at birth",
  "person who is sexually attracted to people with non-binary gender identities",
  "person who may experience sexual attraction but do not want these feelings reciprocated",
  "LGBTQ+ person who has not disclosed their sexual orientation or gender identity",
  "person who is sexually or romantically attracted to multiple or varied sexes, genders, and gender identities — but not necessarily all or any",
  "person who doesn't experience sexual attraction but still desire to be in a sexual relationship or engage in sexual behavior",
  "person who experiences sexual attraction toward women and/or femininity, regardless of whether they were AFAB",
  "person who identifies with the gender that was assigned to them at birth",
  "person who experiences sexual, romantic, physical, and/or spirtual attraction to people of their own gender as well as another gender",
  "person whose gender varies at any time they can identify as whichever identity they feel fits",
  "a term used to describe a man who is attracted to men, but often used and embraced by women to describe their same-sex relationships as well",
  "person whose gender identity is neither man nor woman, is between or beyond genders, or is some combination of genders",
  "an umbrella term that describes people who have sex characteristics — such as chromosomes, internal organs, hormones, or anatomy — that can’t be easily categorized into the binary sex framework of male or female",
  "a woman who is emotionally, romantically or sexually attracted to other women. Women and non-binary people may use this term to describe themselves",
  "a gender identity that is neither female nor male, gender identities that are outside of or beyond two traditional concepts of male or female",
  "person who experiences sexual, romantic, physical, and/or spiritual attraction for members of all gender identities/expressions",
  "umbrella term to refer to all LGBTQ+ people. also a non-binary term used by individuals who see their sexual orientation and/or gender identity as fluid",
  "person who is in the process of questioning or analyzing their sexual orientation, gender identity, or gender expression",
  "person whose gender identity is different from their assigned sex at birth",
  "contemporary term chosen to describe Native American and Canadian First Nation people who identify with a third gender, implying a masculine and a feminine spirit in one body. Dress is usually mixture of male and female articles and they are seen as a separate or third gender who have distinct gender, social, spiritual roles in their tribes",
  "person who experiences little to no romantic attraction to others of any gender",
  "person who typically doesn't feel sexual attraction to someone unless they already formed a strong emotional bond with the person",
  "the classification of gender into two distinct, opposite forms of masculine and feminine, whether by social system or cultural belief",
  "a person whose sex was assigned female at birth",
  "a person whose sex was assigned male at birth",
  "person transitioning from male to female",
  "person transitioningn from female to male",
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
  const randIndexDef = Math.floor(Math.random() * definition.length);
  currentWord.innerHTML = words[randIndex];
  def.src = definition[randIndex];
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
