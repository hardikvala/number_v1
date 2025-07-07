

const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const instruction = document.getElementById("instruction");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const levelInfo = document.getElementById("level-info");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

let level = 1;

function getNumberRange(level) {
  if (level <= 3) return 20;
  if (level <= 6) return 50;
  return 100;
}

function generateNumbers() {
  const max = getNumberRange(level);
  let num1 = Math.floor(Math.random() * max) + 1;
  let num2 = Math.floor(Math.random() * max) + 1;
  while (num1 === num2) {
    num2 = Math.floor(Math.random() * max) + 1;
  }
  return [num1, num2];
}

function setNewNumbers() {
  feedback.textContent = "";
  nextBtn.style.display = "none";
  let [num1, num2] = generateNumbers();
  let correct = num1 < num2 ? "left" : "right";

  leftBtn.textContent = num1;
  rightBtn.textContent = num2;

  function handleClick(side) {
    if (side === correct) {
      feedback.textContent = "🎉 Yay! That's right!";
      correctSound.play();
      level++;
      nextBtn.style.display = "inline-block";
    } else {
      feedback.textContent = "😢 Oops! Try the next one!";
      wrongSound.play();
      level++;
      nextBtn.style.display = "inline-block";
    }
    levelInfo.textContent = "Level " + (level <= 10 ? level : "Complete!");
    leftBtn.disabled = true;
    rightBtn.disabled = true;
  }

  leftBtn.onclick = () => handleClick("left");
  rightBtn.onclick = () => handleClick("right");
  leftBtn.disabled = false;
  rightBtn.disabled = false;
}

nextBtn.onclick = setNewNumbers;

window.onload = setNewNumbers;


// NEW VARIABLES
let score = 0;
let totalQuestions = 10;

// Modify existing checkAnswer to count score and check for game end
function checkAnswer(isLeft) {
  const correct = isLeft === (leftNum < rightNum);
  feedback.textContent = correct ? "✅ Correct!" : "❌ Try Again!";
  feedback.style.color = correct ? "green" : "red";
  feedback.style.display = "block";

  if (correct) {
    correctSound.play();
    score++;
    leftBtn.disabled = true;
    rightBtn.disabled = true;
    nextBtn.style.display = "inline-block";
  } else {
    wrongSound.play();
  }
}

// Modify nextLevel to check for game over
function nextLevel() {
  if (level > totalQuestions) {
    showScoreboard();
    return;
  }
  feedback.style.display = "none";
  nextBtn.style.display = "none";
  leftBtn.disabled = false;
  rightBtn.disabled = false;

  const range = getNumberRange(level);
  let num1 = Math.floor(Math.random() * range);
  let num2 = Math.floor(Math.random() * range);
  while (num1 === num2) {
    num2 = Math.floor(Math.random() * range);
  }

  leftNum = num1;
  rightNum = num2;

  leftBtn.textContent = num1;
  rightBtn.textContent = num2;
  levelInfo.textContent = "Level " + level;
  level++;
}

// NEW: show final score
function showScoreboard() {
  instruction.textContent = "🎉 You got " + score + " out of " + totalQuestions + " correct!";
  leftBtn.style.display = "none";
  rightBtn.style.display = "none";
  nextBtn.style.display = "none";
  levelInfo.style.display = "none";
}

// NEW: restart game logic
document.getElementById("restart-btn").addEventListener("click", () => {
  level = 1;
  score = 0;
  instruction.textContent = "Tap the SMALLER number!";
  leftBtn.style.display = "inline-block";
  rightBtn.style.display = "inline-block";
  levelInfo.style.display = "block";
  nextLevel();
});
