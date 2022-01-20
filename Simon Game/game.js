var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;

// To listen to the users keyboard

$(document).keypress(function() {
  if (started != true) {

    nextSequence();

    $("#level-title").text("Level " + level);
    started = true;

  };
});

// To catch the clicked button by the user

$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// To check the user answer

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)

    };

  } else {
    console.log("wrong");

    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").toggleClass("game-over");

    setTimeout(function () {
      $("body").toggleClass("game-over");
    },200);

    startover();
  }
};


// Triggers next sequence

function nextSequence() {
  userClickedPattern = [];

  level++
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
};


// To play a sound

function playSound(name) {
  var selected_button = new Audio("sounds/" + name + ".mp3");
  selected_button.play();
};

// To animate the clicked buttons

function animatePress(currentColour) {
  $("#" + currentColour).toggleClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).toggleClass("pressed");
  }, 100)
};

// To Restart the gamePattern

function startover() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  started = false;
};
