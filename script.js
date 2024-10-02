// Game variables
let score = 0;
let cross = true;
const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

// Start background music
setTimeout(() => {
  audio.play();
}, 1000);

// Handle keyboard input
document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38: // Jump
      const dino = document.querySelector('.dino');
      dino.classList.add('animateDino');
      setTimeout(() => {
        dino.classList.remove('animateDino');
      }, 700);
      break;
    case 39: // Move right
      const dinoRight = document.querySelector('.dino');
      const dinoXRight = parseInt(
        window.getComputedStyle(dinoRight, null).getPropertyValue('left')
      );
      dinoRight.style.left = dinoXRight + 112 + 'px';
      break;
    case 37: // Move left
      const dinoLeft = document.querySelector('.dino');
      const dinoXLeft = parseInt(
        window.getComputedStyle(dinoLeft, null).getPropertyValue('left')
      );
      dinoLeft.style.left = dinoXLeft - 112 + 'px';
      break;
  }
};

// Game loop
setInterval(() => {
  const dino = document.querySelector('.dino');
  const gameOver = document.querySelector('.gameOver');
  const obstacle = document.querySelector('.obstacle');
  const dx = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue('left')
  );
  const dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue('top')
  );
  const ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue('left')
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue('top')
  );
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
      const aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue('animation-duration')
      );
      const newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + 's';
    }, 500);
  }
}, 10);

// Update score
function updateScore(score) {
  document.querySelector('#scoreCont').innerHTML = 'Your Score: ' + score;
}
