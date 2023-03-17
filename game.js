userClickedPattern = [];
gamePattern = [];
var level = 0;
buttonColours = ["red", "blue", "green", "yellow"];

$(document).on("keypress", function () {
  if (level === 0) {
    nextSequence();
  }
});
function nextSequence() {
  level++;
  $("#level-title").html("<h1 id = 'level-title'>level " + level + "</h1>");
  var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(event) {
    var audio = new Audio("sounds/" + event + ".mp4");
    audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  var userChosenColour = "";
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(""+userChosenColour+"");
  animatePress(userChosenColour);
  playSound(userChosenColour);
  handler(userClickedPattern.length-1);
});


function handler(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }
    else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}
function startOver(){
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}