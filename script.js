// Game variables
let score = 0;
let cross = true;
const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

let dino = document.querySelector('.dino');
let gameOver = document.querySelector('.gameOver');
let obstacle = document.querySelector('.obstacle');

setTimeout(() => {
  audio.play();
}, 1000);

// Handle keyboard input
document.onkeydown = function (e) {
  console.log("Key code is: ", e.keyCode);
  if (e.keyCode == 38 && !dino.classList.contains('animateDino')) { // Jump
    dino.classList.add('animateDino');
    setTimeout(() => {
      dino.classList.remove('animateDino');
    }, 700);
  }
  if (e.keyCode == 39) { // Move right
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    if (dinoX < window.innerWidth - 100) { // Prevent moving off screen
      dino.style.left = dinoX + 112 + "px";
    }
  }
  if (e.keyCode == 37) { // Move left
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    if (dinoX > 0) { // Prevent moving off screen
      dino.style.left = (dinoX - 112) + "px";
    }
  }
};

// Game loop
setInterval(() => {
  const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  const dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
  const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
  const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

  const offsetX = Math.abs(dx - ox);
  const offsetY = Math.abs(dy - oy);

  // Check collision
  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerHTML = 'Game Over - Reload to Play Again';
    obstacle.classList.remove('obstacleAni');
    audiogo.play();
    setTimeout(() => {
      audiogo.pause();
      audio.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score++;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      const aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
      const newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + 's';
    }, 500);
  }
}, 10);

// Update score
function updateScore(score) {
  document.querySelector('#scoreCont').innerHTML = 'Your Score: ' + score;
}
