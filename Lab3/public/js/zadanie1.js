var isMouseDown = false;
var canvas = document.getElementById("drawing_canvas");
var body = document.getElementsByTagName("body")[0];
var canvasContext = canvas.getContext("2d");
var penLinesArray = [];
var currentToolSize = 5;
var currentPenColor = "#000000";
var currentBackgroundColor = "#FFFFFF";
var temporaryLinesArray = [];
const Tools = Object.freeze({"pen":1, "circle":2, "square":3, "line":4})
var currentTool = Tools.pen;

reloadCanvas();

// Input event listeners

document
  .getElementById("colorpicker_pen")
  .addEventListener("change", function () {
    currentPenColor = this.value;
  });
document
  .getElementById("colorpicker_bg")
  .addEventListener("change", function () {
    canvasContext.fillStyle = this.value;
    currentBackgroundColor = canvasContext.fillStyle;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    redrawLines();
  });
document
  .getElementById("input_tool_size")
  .addEventListener("change", function () {
    currentToolSize = this.value;
  });
document.getElementById("input_width").addEventListener("change", function () {
  if (this.value > this.max) {
    this.value = this.max;
  } else if (this.value < this.min) {
    this.value = this.min;
  }
  reloadCanvas();
});
document.getElementById("input_height").addEventListener("change", function () {
  if (this.value > this.max) {
    this.value = this.max;
  } else if (this.value < this.min) {
    this.value = this.min;
  }
  reloadCanvas();
});

// Button event listeners

document.getElementById("button_pen").addEventListener("click", enablePen);
document.getElementById("button_clear").addEventListener("click", clearCanvas);
document
  .getElementById("button_save")
  .addEventListener("click", saveToLocalStorage);
document
  .getElementById("button_load")
  .addEventListener("click", loadFromLocalStorage);

document
  .getElementById("button_clear_local_storage")
  .addEventListener("click", clearLocalStorage);

// Mouse event listeners

canvas.addEventListener("mousedown", function () {
  onMouseDown(canvas, event);
});
canvas.addEventListener("mousemove", function () {
  onMouseMove(canvas, event);
});
canvas.addEventListener("mouseup", onMouseUp);

// Mouse handling

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function onMouseDown(canvas, evt) {
  var mousePos = getMousePos(canvas, evt);
  isMouseDown = true;
  var currentPosition = getMousePos(canvas, evt);
  canvasContext.moveTo(currentPosition.x, currentPosition.y);
  canvasContext.beginPath();
  canvasContext.strokeStyle = currentPenColor;
  if (currentTool == Tools.pen){
    canvasContext.lineWidth = currentToolSize;
    canvasContext.lineCap = "round";
  } else if(currentTool=Tools.circle){
    canvasContext.arc(0,0,currentToolSize, 0,2*Math.PI);
    canvasContext.stroke();
  }
  
}

function onMouseMove(canvas, evt) {
  if (isMouseDown) {
    if(currentTool == Tools.pen){
    var currentPosition = getMousePos(canvas, evt);
    canvasContext.lineTo(currentPosition.x, currentPosition.y);
    canvasContext.stroke();
    storePenLine(
      currentPosition.x,
      currentPosition.y,
      currentToolSize,
      currentPenColor
    );
    }
  }
}

function onMouseUp() {
  isMouseDown = false;
  storePenLine();
}

// Canvas drawing implementation

function reloadCanvas() {
  canvas.width = parseInt(document.getElementById("input_width").value);
  canvas.height = parseInt(document.getElementById("input_height").value);
  redrawBackground();
  redrawLines();
}

function clearCanvas() {
  redrawBackground();
  penLinesArray = [];
}

function redrawBackground() {
  canvasContext.fillStyle = currentBackgroundColor;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function redrawLines() {
  for (var i = 1; i < penLinesArray.length; i++) {
    canvasContext.beginPath();
    canvasContext.moveTo(penLinesArray[i - 1].x, penLinesArray[i - 1].y);
    canvasContext.lineWidth = penLinesArray[i].size;
    canvasContext.lineCap = "round";
    canvasContext.strokeStyle = penLinesArray[i].color;
    canvasContext.lineTo(penLinesArray[i].x, penLinesArray[i].y);
    canvasContext.stroke();
  }
}

function storePenLine(x, y, s, c) {
  var line = {
    x: x,
    y: y,
    size: s,
    color: c,
  };
  penLinesArray.push(line);
}

// Drawing tool handling

function enablePen() {
  isEraserEnabled = false;
  currentToolColor = currentPenColor;
}

function enableEraser() {
  isEraserEnabled = true;
  currentToolColor = currentBackgroundColor;
}

// Local storage

function saveToLocalStorage() {
  localStorage.removeItem("currentBackgroundColor");
  localStorage.removeItem("penLinesArray");
  localStorage.setItem(
    "currentBackgroundColor",
    JSON.stringify(currentBackgroundColor)
  );
  localStorage.setItem("penLinesArray", JSON.stringify(penLinesArray));
}

function loadFromLocalStorage() {
  if (localStorage.getItem("currentBackgroundColor") != null) {
    currentBackgroundColor = JSON.parse(
      localStorage.getItem("currentBackgroundColor")
    );
  }
  if (localStorage.getItem("penLinesArray") != null) {
    penLinesArray = JSON.parse(localStorage.penLinesArray);
  }
  reloadCanvas();
}

function clearLocalStorage(){
  localStorage.removeItem("currentBackgroundColor");
  localStorage.removeItem("penLinesArray");
}