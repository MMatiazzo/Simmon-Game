
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

//The Start of the Game
$(document).on("keypress", function(){
  if (!started) {

    $("#level-title").text("Level " + level);

    nextSequence();

    started = true;

  }
});

/*if you click in a button, the id of this button will to a variable and we use this variable to make the sounds
corresponding to the color*/
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  
  animatePress(this);

  checkAnswer(userClickedPattern.length - 1);

});

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

//checking the user anwers with the true anwers
function checkAnswer (currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function(){

        nextSequence();

      }, 1000);
    }
  } else {

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}

//pick the sequence 
function nextSequence() {

  currentGamePattern = gamePattern;

  userClickedPattern = [];
  
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

//Play The color sounds
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();

}

//button Animation
function animatePress (button) {

  $(button).addClass("pressed");

  setTimeout( function(){
    $(button).removeClass("pressed");
  },100);
} 
