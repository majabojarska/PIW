let inputToInfoMap = new Map();
let inputToRegexMap = new Map();
let infoToErrorMsgMap = new Map();

let panelInfo;
let panelInfoTitle;
let panelInfoBody;

let inputFirstName;
let inputLastName;
let inputPhoneNumber;
let inputBirthDate;
let inputEmail;
let inputLogin;
let inputPassword;
let inputPasswordRepeat;

window.addEventListener("load", () => {
  document.getElementById("btn-submit").addEventListener("click", onSubmit);

  inputFirstName = document.getElementById("firstname");
  inputLastName = document.getElementById("lastname");
  inputPhoneNumber = document.getElementById("phonenumber");
  inputBirthDate = document.getElementById("birthdate");
  inputEmail = document.getElementById("email");
  inputLogin = document.getElementById("login");
  inputPassword = document.getElementById("password");
  inputPasswordRepeat = document.getElementById("password-repeat");

  let inputFirstNameInfo = document.getElementById("firstname_info");
  let inputLastNameInfo = document.getElementById("lastname_info");
  let inputPhoneNumberInfo = document.getElementById("phonenumber_info");
  let inputBirthDateInfo = document.getElementById("birthdate_info");
  let inputEmailInfo = document.getElementById("email_info");
  let inputLoginInfo = document.getElementById("login_info");
  let inputPasswordInfo = document.getElementById("password_info");
  let inputPasswordRepeatInfo = document.getElementById("password_repeat_info");

  inputToRegexMap.set(inputFirstName, /^[A-Za-z]+$/);
  inputToRegexMap.set(inputLastName, /^[A-Za-z]+$/);
  inputToRegexMap.set(inputPhoneNumber, /^\+\d{11}$/);
  inputToRegexMap.set(inputBirthDate, /^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.([0-9]{4})$/);
  inputToRegexMap.set(inputEmail, /^\w+@\w+\.[\w\.]+$/);
  inputToRegexMap.set(inputLogin, /^[a-z]{6,}$/);
  inputToRegexMap.set(inputPassword, /^\S{8,}$/);

  panelInfo = document.getElementById("panel_info");
  panelInfoTitle = panelInfo.getElementsByClassName("panel-title")[0];
  panelInfoBody = panelInfo.getElementsByClassName("panel-body")[0];

  inputToInfoMap.set(inputFirstName, inputFirstNameInfo);
  inputToInfoMap.set(inputLastName, inputLastNameInfo);
  inputToInfoMap.set(inputPhoneNumber, inputPhoneNumberInfo);
  inputToInfoMap.set(inputBirthDate, inputBirthDateInfo);
  inputToInfoMap.set(inputEmail, inputEmailInfo);
  inputToInfoMap.set(inputLogin, inputLoginInfo);
  inputToInfoMap.set(inputPassword, inputPasswordInfo);
  inputToInfoMap.set(inputPasswordRepeat, inputPasswordRepeatInfo);

  infoToErrorMsgMap.set(inputFirstNameInfo, "Imię musi się składać z liter.");
  infoToErrorMsgMap.set(
    inputLastNameInfo,
    "Nazwisko musi się składać z liter."
  );
  infoToErrorMsgMap.set(
    inputPhoneNumberInfo,
    "Niepoprawny format numeru.\nOczekiwany format to +00123456789"
  );
  infoToErrorMsgMap.set(inputBirthDateInfo, "Niepoprawny format daty.");
  infoToErrorMsgMap.set(inputEmailInfo, "Niepoprawny format adresu e-mail.");
  infoToErrorMsgMap.set(inputLoginInfo, "Dozwolone są tylko małe litery.");
  infoToErrorMsgMap.set(
    inputPasswordInfo,
    "Niepoprawne hasło. Wprowadź min. 6 znaków, bez spacji."
  );
  infoToErrorMsgMap.set(
    inputPasswordRepeatInfo,
    'Treść niezgodna z polem "Hasło".'
  );

  addBlurListenersToInputs();
});

function addBlurListenersToInputs() {
  for (let [inputElem, inputInfoElem] of inputToInfoMap) {
    inputElem.addEventListener("blur", () => {
      inputInfoElem.classList.add("hidden-fade");
    });
  }
}

function isInputTextValid(inputElement) {
  return inputToRegexMap.get(inputElement).test(inputElement.value);
}

function onSubmit() {
  let isAllCorrect = true;

  for (let [inputElem, inputInfoElem] of inputToInfoMap) {
    if (inputToRegexMap.has(inputElem)) {
      if (isInputTextValid(inputElem)) {
        inputInfoElem.classList.add("hidden-fade");
        inputInfoElem.innerText = "";
      } else {
        isAllCorrect = false;
        inputInfoElem.classList.remove("hidden-fade");
        inputInfoElem.classList.add("bold-red");

        inputInfoElem.innerText = infoToErrorMsgMap.get(inputInfoElem);
      }
    }
  }
  
  inputPassRepInfo = inputToInfoMap.get(inputPasswordRepeat);

  if (inputPassword.value != inputPasswordRepeat.value) {
    isAllCorrect = false;
    inputPassRepInfo.classList.remove("hidden-fade");
    inputPassRepInfo.classList.add("bold-red");

    inputPassRepInfo.innerText = infoToErrorMsgMap.get(inputPassRepInfo);
  } else {
    inputPassRepInfo.classList.add("hidden-fade");
    inputPassRepInfo.innerText = "";
  }

  if(isAllCorrect){
    showRootsInPanel();
  }
  else{
    panelInfo.classList.add("hidden-fade");
  }
}

function showRootsInPanel() {
  panelInfo.classList.remove("hidden-fade");
  panelInfo.classList.add("panel-success");
  panelInfoTitle.innerText = "Wprowadzone dane";
  splitDate = inputBirthDate.value.split('.') 
  
  panelInfoBody.innerText =
    "Imię: " +
    inputFirstName.value +
    "\nNazwisko: " +
    inputLastName.value +
    "\nNumer telefonu: " +
    inputPhoneNumber.value +
    "\nDzień urodzenia: " +
    splitDate[0] +
    "\nMiesiąc urodzenia: " +
    splitDate[1] +
    "\nRok urodzenia: " +
    splitDate[2] +
    "\nAdres e-mail: " +
    inputEmail.value +
    "\nLogin: " +
    inputLogin.value;
}
