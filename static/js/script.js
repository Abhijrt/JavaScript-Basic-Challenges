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
