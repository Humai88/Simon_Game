const header = $("h1");
const startBtn = $("button");
let btn = $(".item");
let arrColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

startBtn.click(function () {
  if (!started) {
    header.text("Level " + level);
    nextSequence();
    started = true;
  }
});

function btnPush(j, newGamePattern) {
  setTimeout(function () {
    let currentBtn = $("#" + newGamePattern);
    // console.log(newGamePattern);
    currentBtn.fadeOut(250).fadeIn(250);
    playSound(newGamePattern);
  }, 550 * (j + 1));
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  header.text("Level " + level);
  let randomNum = Math.random() * 4;
  randomNum = Math.floor(randomNum);
  let randomChosenColour = arrColors[randomNum];
  gamePattern.push(randomChosenColour);
  for (i = 0; i < gamePattern.length; i++) {
    btnPush(i, gamePattern[i]);
  }
}

btn.click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  // console.log("userChosenColour=", userChosenColour);
});

function playSound(name) {
  let audio = new Audio();
  audio.src = "../sound/" + name + ".mp3";
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let audio = new Audio();
    audio.src = "../sound/game over.mp3";
    audio.play();
    header.text("Game Over");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    // console.log("wrong");
  }
}

function startOver() {
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
