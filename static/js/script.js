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

// Challenge 4 : Change The color of all the Buttons
var all_buttons = document.getElementsByTagName("button");

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonColorReset();
  } else if (buttonThingy.value === "random") {
    randomColors();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  var choices = ["btn-primary", "btn-warning", "btn-danger", "btn-success"];
  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

// Challenge 5 : Black Jack
let blackjackGame = {
  you: { spanScore: "#your-blackjack-score", div: "#your-box", score: 0 },
  dealer: {
    spanScore: "#dealer-blackjack-score",
    div: "#dealer-box",
    score: 0,
  },
  card: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "K", "J", "Q"],
  cardMap: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    A: [1, 11],
    K: 10,
    J: 10,
    Q: 10,
  },
  wins: 0,
  lossess: 0,
  drew: 0,
  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("./static/sounds/hitcash.wav");

document
  .querySelector("#backjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#backjack-deal-button")
  .addEventListener("click", blackjackDeal);

document
  .querySelector("#backjack-stand-button")
  .addEventListener("click", dealerLogic);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    var cardImage = document.createElement("img");
    cardImage.setAttribute(
      "height",
      "100px",
      "width",
      "100px",
      "padding",
      "10px"
    );
    cardImage.src = `./static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;
    var yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    var dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");
    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }
    YOU["score"] = 0;
    DEALER["score"] = 0;
    document.querySelector("#your-blackjack-score").textContent = 0;
    document.querySelector("#dealer-blackjack-score").textContent = 0;
    document.querySelector("#your-blackjack-score").style.color = "white";
    document.querySelector("#dealer-blackjack-score").style.color = "white";
    document.querySelector("#blackjack-result").textContent = "Let's Play";
    document.querySelector("#blackjack-result").style.color = "black";
    blackjackGame["turnsOver"] = true;
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["card"][randomIndex];
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["spanScore"]).textContent = "BUST!";
    document.querySelector(activePlayer["spanScore"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["spanScore"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame["isStand"] = true;
  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  if (DEALER["score"] > 15) {
    blackjackGame["turnsOver"] = true;
    let winner = computeWinner();
    showResult(winner);
  }
}

function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      // You Won!
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      // You Lost!
      blackjackGame["lossess"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["drew"]++;
      // You Drew!
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    // You Lost!
    blackjackGame["lossess"]++;
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    // You Drew!
    blackjackGame["drew"]++;
  }
  return winner;
}

function showResult(winner) {
  if (blackjackGame["turnsOver"] === true) {
    let message, messageColor;
    if (winner == YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You Won!";
      messageColor = "green";
    } else if (winner === DEALER) {
      document.querySelector("#lossess").textContent = blackjackGame["lossess"];
      message = "You Lost!";
      messageColor = "red";
    } else {
      document.querySelector("#drew").textContent = blackjackGame["drew"];
      message = "You Drew!";
      messageColor = "black";
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}

// Challenge 6 : Random User Generator
const url = "https://randomuser.me/api/?results=10";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let authors = data.results;
    for (let i = 0; i < authors.length; i++) {
      let firstname = authors[i].name.first;
      let lastname = authors[i].name.last;
      // console.log(firstname, lastname);
      let imageUrl = authors[i].picture.large;
      // console.log(imageUrl);
      var div = document.createElement("div");
      var img = document.createElement("img");
      var p = document.createElement("p");
      var paraContent = document.createTextNode(`${firstname} ${lastname} `);
      img.src = imageUrl;
      p.appendChild(paraContent);
      div.appendChild(img);
      div.appendChild(p);
      let container = document.querySelector(".user-container");
      container.appendChild(div);
    }
  });
