let accountsContainer = [];

if (localStorage.getItem("users") !== null) {
  accountsContainer = JSON.parse(localStorage.getItem("users"));
}
let userNameInput = document.getElementById("username");
let emailInput = document.getElementById("mail");
let passwordInput = document.getElementById("password");

// Start Sign Up function

function signUp() {
  if (inputsValidaitonSignUp() === true) {
    let account = {
      username: userNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    accountsContainer.push(account);
    localStorage.setItem("users", JSON.stringify(accountsContainer));
    clearInputs();
    document.getElementById("success").classList.replace("d-none", "d-block");
    [userNameInput, emailInput, passwordInput].forEach((ele) => {
      ele.classList.remove("is-valid");
    });
    document
      .querySelectorAll(".hide-message")
      .forEach((e) => e.classList.replace("d-block", "d-none"));
  }
}

// End Sign Up function

// Strat Log in funciton

function logIn() {
  if (isEmailExist() == true) {
    location.href = "home.html";
  }
}

// End Log in funciton

// Start Validation

function userNameValidation() {
  let userNameAlert = document.getElementById("userNameAlert");
  let userNameRegex = /^[a-zA-z]{3,10}(\s?[a-zA-Z]{3,10})?$/;

  if (userNameRegex.test(userNameInput.value)) {
    userNameInput.classList.remove("is-invalid");
    userNameInput.classList.add("is-valid");
    userNameAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userNameInput.classList.remove("is-valid");
    userNameInput.classList.add("is-invalid");
    userNameAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function emailValidation() {
  emailAlert = document.getElementById("emailAlert");
  emailRegex = /@[a-z]{5,10}(\.com)$/;

  if (emailRegex.test(emailInput.value)) {
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
    emailAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    emailInput.classList.remove("is-valid");
    emailInput.classList.add("is-invalid");
    emailAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function isEmailExist() {
  let counter = 0;
  if (accountsContainer.length > 0) {
    for (let i = 0; i < accountsContainer.length; i++) {
      if (accountsContainer[i].email === emailInput.value) {
        localStorage.setItem(
          "username",
          JSON.stringify(accountsContainer[i].username)
        );
        counter++;
      }
    }
    return counter !== 0 ? true : false;
  } else {
    emailInput.classList.replace("is-valid", "is-invalid");

    document
      .getElementById("emailExists")
      .classList.replace("d-none", "d-block");
    return false;
  }
}

function passwordValidation() {
  let passwordAlert = document.getElementById("passwordAlert");
  let passwordRegex = /^.{5,15}$/;

  if (passwordRegex.test(passwordInput.value)) {
    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.add("is-valid");
    passwordAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    passwordInput.classList.remove("is-valid");
    passwordInput.classList.add("is-invalid");
    passwordAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function isPasswordExist() {
  let counter;
  if (accountsContainer.length > 0) {
    for (let i = 0; i < accountsContainer.length; i++) {
      if (accountsContainer[i].password == passwordInput.value) {
        counter++;
      } else {
        document
          .getElementById("passwordIncorrect")
          .classList.replace("d-none", "d-block");
      }
    }
    return counter !== 0 ? true : false;
  } else {
    document
      .getElementById("passwordIncorrect")
      .classList.replace("d-none", "d-block");
    return false;
  }
}

function inputsValidaitonSignUp() {
  if (
    userNameValidation() == true &&
    passwordValidation() == true &&
    emailValidation() == true
  ) {
    if (isEmailExist() !== true) {
      return true;
    } else {
      document
        .getElementById("emailExists")
        .classList.replace("d-none", "d-block");
      return false;
    }
  } else {
    return false;
  }
}

function clearInputs() {
  userNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}
// End Validaiton

if (document.getElementById("sighUp") != null) {
  document.getElementById("sighUp").onclick = signUp;
}

if (document.getElementById("submit") != null) {
  document.getElementById("submit").onclick = logIn;
}

if (document.getElementById("welcome") != null) {
  document.getElementById("welcome").innerHTML +=
    " " + JSON.parse(localStorage.getItem("username"));
}
