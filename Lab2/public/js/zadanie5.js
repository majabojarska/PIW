let rocketship;
let starfield;
let isMovingRight = true;
let speed = 0.2;
window.addEventListener("load", () => {
  rocketship = document.getElementById("rocketship");
  starfield = document.getElementById("starfield");

  window.setInterval(moveRocketship, 5);

  let speedInput = document.getElementById("speed_input");
  let speedLabel = document.getElementById("speed_label");
  speedInput.value = speed * 100;
  speedLabel.innerText = "Szybkość: " + speed;

  speedInput.addEventListener("change", (event) => {
    speed = event.srcElement.value / 100;
    speedLabel.innerText = "Szybkość: " + speed;
  });
});

function moveRocketship() {
  let newLeftValue;
  currentLeftPosVal = parseFloat(rocketship.style.left.split("%")[0]);
  if (isMovingRight) {
    newLeftValue = currentLeftPosVal + speed + "%";
  } else {
    newLeftValue = currentLeftPosVal - speed + "%";
  }
  rocketship.style.left = newLeftValue;

  rocketshipRightBorder = rocketship.offsetLeft + rocketship.offsetWidth;
  starfieldRightBorder = starfield.offsetLeft + starfield.offsetWidth;

  if (rocketshipRightBorder >= starfieldRightBorder) {
    isMovingRight = false;
    rocketship.src = "img/starship/rocketship_mirror.gif";
  } else if (rocketship.offsetLeft <= starfield.offsetLeft) {
    isMovingRight = true;
    rocketship.src = "img/starship/rocketship.gif";
  }
}
