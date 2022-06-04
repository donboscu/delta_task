let arr=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
let pattern = [];
let press = [];
let start = false;
let level = "0";
let checkAnswerCount = 0;


document.querySelector("#play").addEventListener("click", function() {
  if (start=="") {
    start = true;
    Generate();
  }
});
function playSound(){
  let aud = new Audio("move.mp3");
  aud.play();
}
function gameOverSound(){
  let aud = new Audio("gameover.wav");
  aud.play();
}
for (let i = 0; i < arr.length; i++) {
  let pressButton = document.querySelectorAll(".btn")[i];
  pressButton.addEventListener("click", function() {
    let chosen = this.getAttribute("id");
    press.push(chosen);
    fadeButton(chosen);
    checkAnswer(press.length);
    
  });
}

function Generate() {
  document.querySelector("#score").innerHTML = "SCORE: "
  press = [];
  document.querySelector("#titleStart").innerHTML = "Level " + level;
  level++;
  let randomNumber = Math.floor(Math.random() * 16);
  let randomChosenButton = arr[randomNumber];
  pattern.push(randomChosenButton);
  fadeButton(randomChosenButton);
 
}

function checkAnswer(currentRound) {
  checkAnswerCount = 0;
  let currentPattern = [];
  for(let i=0 ; i<pattern.length ; i++){
    currentPattern[i]=pattern[i];
    playSound();
  }

  // ye pattern shi h ya nhi dekne ke lie
  for (let i = 0; i < press.length; i++) { 
       if (currentPattern.includes(press[i])) {
      checkAnswerCount++;
      let index = currentPattern.indexOf(press[i]);
      if (checkAnswerCount === pattern.length) {
        setTimeout(function() {
          Generate();
        }, 1000);
      }
    } 
    else {
      gameOverSound();
      gameOver();
      document.querySelector("body").classList.add("game-over");
    }
  }
}
document.addEventListener('keypress',function(){
  if(start == true){
     start = false;
     nextTile();
}});

function fadeButton(tile) {
  let activeTile = document.getElementById(tile);
  activeTile.classList.add("pressed");
  setTimeout(function() {
    activeTile.classList.remove("pressed");
  }, 250);

}
function gameOver() {
  document.querySelector("#titleStart").innerHTML = "Click on PLAY button to Play Again";
  document.querySelector("#score").innerHTML = "your score is: " + level*10;
  document.querySelector(".right").classList.add("game-over");
alert("game over");
level = "0";
start = false;
pattern = [];
gameOverSound();
location.reload=true;
}