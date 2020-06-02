let inputToInfoMap = new Map();

let panelInfo;
let panelInfoTitle;
let panelInfoBody;

let inputCoefficientA;
let inputCoefficientB;
let inputCoefficientC;

window.addEventListener("load", () => {
  document.getElementById("btn-submit").addEventListener("click", onSubmit);

  inputCoefficientA = document.getElementById("coefficient_a");
  inputCoefficientB = document.getElementById("coefficient_b");
  inputCoefficientC = document.getElementById("coefficient_c");

  let inputCoefficientAInfo = document.getElementById("coefficient_a_info");
  let inputCoefficientBInfo = document.getElementById("coefficient_b_info");
  let inputCoefficientCInfo = document.getElementById("coefficient_c_info");

  panelInfo = document.getElementById("panel_info");
  panelInfoTitle = panelInfo.getElementsByClassName("panel-title")[0];
  panelInfoBody = panelInfo.getElementsByClassName("panel-body")[0];

  inputToInfoMap.set(inputCoefficientA, inputCoefficientAInfo);
  inputToInfoMap.set(inputCoefficientB, inputCoefficientBInfo);
  inputToInfoMap.set(inputCoefficientC, inputCoefficientCInfo);

  addBlurListenersToInputs();
});

function addBlurListenersToInputs() {
  for (let [inputElem, inputInfoElem] of inputToInfoMap) {
    inputElem.addEventListener("blur", () => {
      inputInfoElem.classList.add("hidden-fade");
    });
  }
}

function isValidNumberFormat(text) {
  return /^\-?[1-9]?[0-9]+(\.[0-9]+)?$/.test(text);
}

function onSubmit() {
  let isAllCorrect = true;

  let coeffA, coeffB, coeffC;

  for (let [inputElem, inputInfoElem] of inputToInfoMap) {
    currentVal = inputElem.value;
    if (isValidNumberFormat(currentVal)) {
      inputInfoElem.classList.add("hidden-fade");
      inputInfoElem.innerText = "";

      currentNumber = parseFloat(currentVal);

      switch (inputElem.id) {
        case "coefficient_a":
          coeffA = currentNumber;
          break;
        case "coefficient_b":
          coeffB = currentNumber;
          break;
        case "coefficient_c":
          coeffC = currentNumber;
          break;
        default:
          break;
      }
    } else {
      isAllCorrect = false;
      inputInfoElem.classList.remove("hidden-fade");
      inputInfoElem.classList.add("bold-red");

      inputInfoElem.innerText = "Niepoprawny format liczby.";
    }
  }

  if (isAllCorrect) {
    roots = calcRoots([coeffA, coeffB, coeffC]);
    console.log(roots);
    showRootsInPanel(roots);
  } else {
    panelInfo.classList.add("hidden-fade");
  }
}

function showRootsInPanel(roots) {
  panelInfo.classList.remove("hidden-fade");
  panelInfo.classList.add("panel-success");
  panelInfoTitle.innerText = "Pierwiastki";

  if (roots.length === 0) {
    panelInfoBody.innerText = "Brak pierwiastków.";
  } else if (roots.length === 1) {
    panelInfoBody.innerText = "x=" + roots[0];
  } else {
    panelInfoBody.innerText = "x1=" + roots[0] + "\nx2=" + roots[1];
  }
}

function calcRoots(coefficients) {
  roots = [];
  let a, b, c;
  [a, b, c] = coefficients;
  if (a !== 0) {
    delta = b * b - 4 * a * c;
    if (delta === 0) {
      roots.push((-b / 2) * a);
    } else if (delta > 0) {
      deltaSqrt = Math.sqrt(delta);
      roots.push(((-b - deltaSqrt) / 2) * a);
      roots.push(((-b + deltaSqrt) / 2) * a);
    }
  } else if (b !== 0) {
    roots.push(-c / b);
  }

  return roots;
}
