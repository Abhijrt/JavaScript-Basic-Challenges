// Challenge 1 : Your Age in Days

function getAgeInDays() {
  var birthYear = prompt("What the year you born ....");
  var ageInDays = (2020 - birthYear) * 365;
  var h1 = document.createElement("h1");
  h1.setAttribute("id", "ageInDays");
  var answer = document.createTextNode("Your age " + ageInDays + " days old");
  h1.appendChild(answer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

// Challenge 2 : Generate Cat

function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

// Challenge 3 : Rocks, Paper, Scissors

function rpsGame(yourChoice) {
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randomToRpsInt());
  var results = decideWinner(humanChoice, botChoice);
  console.log(results);
  var message = finalMessage(results);
  rpsFrontEnd(humanChoice, botChoice, message);
}

// For generating the ramdom number between 0  to 3
function randomToRpsInt() {
  return Math.floor(Math.random() * 3);
}

// returning the choice
function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDataBase = {
    rock: {
      scissors: 1,
      rock: 0.5,
      paper: 0,
    },
    paper: {
      rock: 1,
      paper: 0.5,
      scissors: 0,
    },
    scissors: {
      paper: 1,
      scissors: 0.5,
      rock: 0,
    },
  };
  var yourScore = rpsDataBase[yourChoice][computerChoice];
  var computerScore = rpsDataBase[computerChoice][yourChoice];
  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore == 0) {
    return { message: "You Lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You tried!", color: "yellow" };
  } else {
    return { message: "You Won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImagechoice, finalMessage) {
  var imageDataBase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  // lets remove all the images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img style=' box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)' src='" +
    imageDataBase[humanImageChoice] +
    "'/>";
  messageDiv.innerHTML =
    "<h1 style='color:" +
    finalMessage["color"] +
    ";font-size:60px; padding: 30px;' >" +
    finalMessage["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img style=' box-shadow: 0px 10px 50px rgba(243, 38, 37, 1)' src='" +
    imageDataBase[botImagechoice] +
    "'/>";
  document.getElementById("flex-box-rps").appendChild(humanDiv);
  document.getElementById("flex-box-rps").appendChild(messageDiv);
  document.getElementById("flex-box-rps").appendChild(botDiv);
}
