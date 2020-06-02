// Object size
var paddleWidth = 10;
var paddleHeight = 40;
var ballSize = 3;

// Object positions
var paddle1Y = 50;
var paddle2Y = 50;

var ballX = 50;
var ballY = 50;

// Dynamics
var velocityX = 1;
var velocityY = velocityX;
var velocityPlayer = 3;

var paddle1DeltaY = 0;
var paddle2DeltaY = 0;

// Scores
var scorePlayer1 = 0;
var scorePlayer2 = 0;

// Game running
var reset_game = false;
var framerate = 60;
var isGameRunning = false;

window.onload = function () {
  var canvas = document.getElementById("drawing_canvas");
  var context = canvas.getContext("2d");

  window.addEventListener("keypress", (event) => {
    switch (event.code) {
      case "KeyQ": // Q - Player 1 up
        paddle1DeltaY = -velocityPlayer;
        break;
      case "KeyA": // W - Player 1 down
        paddle1DeltaY = velocityPlayer;
        break;
      case "KeyP": // P - Player 2 up
        paddle2DeltaY = -velocityPlayer;
        break;
      case "KeyL": // L - Player 2 down
        paddle2DeltaY = velocityPlayer;
        break;
      case "Space":
        isGameRunning = !isGameRunning;
        break;
      default:
        break;
    }
  });

  window.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "KeyQ": // Q - Player 1 up
        if (paddle1DeltaY == -velocityPlayer) {
          paddle1DeltaY = 0;
        }
        break;
      case "KeyA": // W - Player 1 down
        if (paddle1DeltaY == velocityPlayer) {
          paddle1DeltaY = 0;
        }
        break;
      case "KeyP": // P - Player 2 up
        if (paddle2DeltaY == -velocityPlayer) {
          paddle2DeltaY = 0;
        }
        break;
      case "KeyL": // L - Player 2 down
        if (paddle2DeltaY == velocityPlayer) {
          paddle2DeltaY = 0;
        }
        break;
      default:
        break;
    }
  });

  document
    .getElementById("button_save")
    .addEventListener("click", saveToLocalStorage);
  document
    .getElementById("button_load")
    .addEventListener("click", loadFromLocalStorage);

  var run_game = setInterval(run, 1000 / framerate);

  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    velocityX = -velocityX;
    velocityY = 3 + 2 * Math.random();
    if (Math.random() >= 0.5) {
      velocityY = -velocityY;
    }
  }

  function moveBall() {
    ballX += velocityX;
    ballY += velocityY;
  }

  function movePaddles() {
    newPaddle1Y = paddle1Y + paddle1DeltaY;
    if (newPaddle1Y >= -1 && newPaddle1Y < canvas.height - paddleHeight + 1) {
      paddle1Y = newPaddle1Y;
    }
    newPaddle2Y = paddle2Y + paddle2DeltaY;
    if (newPaddle2Y >= -1 && newPaddle2Y < canvas.height - paddleHeight + 1) {
      paddle2Y = newPaddle2Y;
    }
  }

  function bounceOff() {
    if (ballY < 0 && velocityY < 0) {
      velocityY = -velocityY;
    }
    if (ballY > canvas.height && velocityY > 0) {
      velocityY = -velocityY;
    }

    // Left paddle
    if (
      ballX < paddleWidth &&
      ballY > paddle1Y &&
      ballY < paddle1Y + paddleHeight
    ) {
      velocityX = -velocityX;
      delta_y = ballY - (paddle1Y + paddleHeight / 2);
      velocityY = delta_y * 0.3;
    }
    // Left wall
    else if (ballX < 0) {
      scorePlayer2++;
      resetBall();
    }

    // Right paddle
    if (
      ballX > canvas.width - paddleWidth &&
      ballY > paddle2Y &&
      ballY < paddle2Y + paddleHeight
    ) {
      velocityX = -velocityX;
      delta_y = ballY - (paddle2Y + paddleHeight / 2);
      velocityY = delta_y * 0.3;
    }
    // Right wall
    else if (ballX > canvas.width - ballSize) {
      scorePlayer1++;
      resetBall();
    }
  }

  function reload_canvas() {
    //fill in the canvas with objects
    context.fillStyle = "grey";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add the paddles' color
    context.fillStyle = "white";

    // Add paddle 1
    context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);

    // Add paddle 2
    context.fillRect(
      canvas.width - paddleWidth,
      paddle2Y,
      paddleWidth,
      paddleHeight
    );

    // Draw the ball
    context.fillRect(
      ballX - ballSize / 2,
      ballY - ballSize / 2,
      ballSize,
      ballSize
    );
  }

  function reloadScoreboards() {
    document.getElementById("score_display_player_1").innerHTML = scorePlayer1;
    document.getElementById("score_display_player_2").innerHTML = scorePlayer2;
  }

  function run() {
    if (isGameRunning) {
      movePaddles();
      moveBall();
    }
    bounceOff();
    reload_canvas();
    reloadScoreboards();
  }
};

// Local storage

function saveToLocalStorage() {
  localStorage.removeItem("scorePlayer1");
  localStorage.removeItem("scorePlayer2");
  localStorage.setItem("scorePlayer1", scorePlayer1);
  localStorage.setItem("scorePlayer2", scorePlayer2);
}

function loadFromLocalStorage() {
  if (localStorage.getItem("scorePlayer1") != null) {
    scorePlayer1 = localStorage.scorePlayer1;
  }
  if (localStorage.getItem("scorePlayer2") != null) {
    scorePlayer2 = localStorage.scorePlayer2;
  }
  document.getElementById("score_display_player_1").innerHTML = scorePlayer1;
  document.getElementById("score_display_player_2").innerHTML = scorePlayer2;
}
