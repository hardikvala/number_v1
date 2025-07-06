
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
  let correct = num1 > num2 ? "left" : "right";

  leftBtn.textContent = num1;
  rightBtn.textContent = num2;

  function handleClick(side) {
    if (side === correct) {
      feedback.textContent = "🎉 Yay! That's right!";
      correctSound.play();
      level++;
      nextBtn.style.display = "inline-block";
    } else {
      feedback.textContent = "😢 Oops! Try next one!";
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
