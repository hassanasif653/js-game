
var min = 1;
var max = 100;
var secret = Math.floor(Math.random() * (max - min + 1)) + min;
var tries = 10;
var currentGuesses = 0;

function getBestScore() {
  var score = localStorage.getItem('bestScore');
  if (score === null) return "-";
  return score;
}

document.getElementById('tries').textContent = tries;
document.getElementById('bestScore').textContent = getBestScore();

function checkGuess() {
  var guess = Number(document.getElementById('guess').value);
  var msg = "";
  if (guess < min || guess > max || isNaN(guess)) {
    msg = "Enter a valid number!";
  } else if (tries > 0) {
    currentGuesses++;
    if (guess === secret) {
      msg = " Correct! You win in " + currentGuesses + " guesses!";
      updateBestScore(currentGuesses);
      disableInput();
    } else if (guess < secret) {
      msg = " Too low.";
      tries--;
    } else {
      msg = " Too high.";
      tries--;
    }
  }
  if (tries === 0 && guess !== secret) {
    msg = " Game Over! The number was " + secret + ".";
    disableInput();
  }
  document.getElementById('message').textContent = msg;
  document.getElementById('tries').textContent = tries;
}

function disableInput() {
  document.getElementById('guess').disabled = true;
}

function restartGame() {
  tries = 10;
  secret = Math.floor(Math.random() * (max - min + 1)) + min;
  currentGuesses = 0;
  document.getElementById('message').textContent = "";
  document.getElementById('tries').textContent = tries;
  document.getElementById('guess').disabled = false;
  document.getElementById('guess').value = '';
}

function updateBestScore(guesses) {
  var best = localStorage.getItem('bestScore');
  if (best === null || guesses < Number(best)) {
    localStorage.setItem('bestScore', guesses);
    document.getElementById('bestScore').textContent = guesses;
  }
}
