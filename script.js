"use strict";
let diceElement = document.querySelector(".dice");
diceElement.style.display = "none";

let currentPlayerOne = document.querySelector("#cureent--0");
let currentPlayerTwo = document.querySelector("#cureent--1");
let currentScore = 0;

const firstPlayer = document.querySelector(".player--0");
const secondPlayer = document.querySelector(".player--1");

let totalScore_one = document.querySelector("#score--0");
let totalScore_two = document.querySelector("#score--1");
let total_one = 0;
let total_two = 0;

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");

let playing = true;

/******************* Implement Events Functions *****************/
//Implement roll function
const rollFunction = function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceElement.setAttribute("src", `./imgs/dice-${diceNumber}.png`);
    diceElement.style.display = "block";
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      if (firstPlayer.classList.contains("player--active")) {
        currentPlayerOne.textContent = currentScore;
      } else {
        currentPlayerTwo.textContent = currentScore;
      }
    } else {
      switchPlayer();
    }
  }
};

//Implement Hold Function to save the player score
const holdFunction = function () {
  if (playing) {
    if (firstPlayer.classList.contains("player--active")) {
      total_one += currentScore;
      totalScore_one.textContent = total_one;
      if (isWin(total_one)) {
        firstPlayer.classList.add("player--winner");
        firstPlayer.classList.remove("player--active");
        diceElement.style.display = "none";
        playing = false;
      }
    } else {
      total_two += currentScore;
      totalScore_two.textContent = total_two;
      if (isWin(total_two)) {
        secondPlayer.classList.add("player--winner");
        secondPlayer.classList.remove("player--active");
        diceElement.style.display = "none";
        playing = false;
        return;
      }
    }
    if (!isWin(total_one) && !isWin(total_two)) {
      switchPlayer();
    }
  }
};

//Implement New Game function to reset scores
const newGameFunction = function () {
  playing = true;
  diceElement.style.display = "none";
  currentScore = 0;
  currentPlayerOne.textContent = currentScore;
  currentPlayerTwo.textContent = currentScore;
  total_one = 0;
  total_two = 0;
  totalScore_one.textContent = total_one;
  totalScore_two.textContent = total_two;
  firstPlayer.classList.remove("player--winner");
  secondPlayer.classList.remove("player--winner");
  firstPlayer.classList.add("player--active");
  secondPlayer.classList.remove("player--active");
};

/******************* Buttons Events *****************/
//Roll button event
btnRoll.addEventListener("click", rollFunction);

//Hold button event
btnHold.addEventListener("click", holdFunction);

//New Game button event
btnNewGame.addEventListener("click", newGameFunction);

/******************* Some Helpful Functions *****************/
//Implement Switch player
function switchPlayer() {
  if (firstPlayer.classList.contains("player--active")) {
    firstPlayer.classList.remove("player--active");
    secondPlayer.classList.add("player--active");
    currentScore = 0;
    currentPlayerOne.textContent = currentScore;
  } else {
    secondPlayer.classList.remove("player--active");
    firstPlayer.classList.add("player--active");
    currentScore = 0;
    currentPlayerTwo.textContent = currentScore;
  }
}
//Implement win check Function
function isWin(score) {
  let check = true;
  return score >= 100 ? check : !check;
}

/*soo Badd*/
