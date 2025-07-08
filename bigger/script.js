
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const instruction = document.getElementById("instruction");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const levelInfo = document.getElementById("level-info");
const restartBtn = document.getElementById("restart-btn");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

let level = 1;
let score = 0;
let totalQuestions = 0;
let leftNumber = 0;
let rightNumber = 0;

function getNumberRange(level) {
  if (level <= 3) return 50;
  if (level <= 6) return 100;
  return 200;
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
  if (totalQuestions >= 10) {
    showFinalScore();
    return;
  }

  feedback.textContent = "";
  nextBtn.style.display = "none";
  leftBtn.disabled = false;
  rightBtn.disabled = false;

  let [num1, num2] = generateNumbers();

  if (Math.random() < 0.5) {
    leftNumber = num1;
    rightNumber = num2;
  } else {
    leftNumber = num2;
    rightNumber = num1;
  }

  leftBtn.textContent = leftNumber;
  rightBtn.textContent = rightNumber;
}

function checkAnswer(side, compare = "bigger") {
  const chosen = side === "left" ? leftNumber : rightNumber;
  const other = side === "left" ? rightNumber : leftNumber;
  const isCorrect = compare === "bigger" ? (chosen > other) : (chosen < other);

  if (isCorrect) {
    feedback.textContent = "🎉 Yay! That's right!";
    feedback.style.color = "green";
    correctSound.play();
    score++;
  } else {
    feedback.textContent = "😢 Oops! Try next one!";
    feedback.style.color = "red";
    wrongSound.play();
  }

  totalQuestions++;
  leftBtn.disabled = true;
  rightBtn.disabled = true;
  nextBtn.style.display = "inline-block";
  level++;
  levelInfo.textContent = "Level " + level;
}

leftBtn.addEventListener("click", () => checkAnswer("left", instruction.dataset.compare));
rightBtn.addEventListener("click", () => checkAnswer("right", instruction.dataset.compare));
nextBtn.addEventListener("click", setNewNumbers);

restartBtn.addEventListener("click", () => {
  level = 1;
  score = 0;
  totalQuestions = 0;

  levelInfo.style.display = "block";
  leftBtn.style.display = "inline-block";
  rightBtn.style.display = "inline-block";
  nextBtn.style.display = "none";

  instruction.textContent = instruction.dataset.reset;
  levelInfo.textContent = "Level " + level;
  setNewNumbers();
});

// Init
instruction.dataset.reset = instruction.textContent;
instruction.dataset.compare = instruction.textContent.toLowerCase().includes("smaller") ? "smaller" : "bigger";
setNewNumbers();
