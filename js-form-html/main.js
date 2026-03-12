const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirmation = document.querySelector('#password-confirmation');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmationValue = passwordConfirmation.value;

  if (!usernameValue.trim().length > 0) {
    setErrorFor(username, 'O nome de usuário é obrigatório!');
  } else {
    setSuccessFor(username);
  }

  if (!emailValue.trim().length > 0) {
    setErrorFor(email, 'O email é obrigatório!');
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, 'Digite um email válido.');
  } else {
    setSuccessFor(email);
  }

  if (!passwordValue.trim().length > 0) {
    setErrorFor(password, 'A senha é obrigatória!');
  } else if (passwordValue.length < 7) {
    setErrorFor(password, 'A senha deve ter no mínimo 7 caracteres');
  } else {
    setSuccessFor(password);
  }

  if (!passwordConfirmationValue.trim().length > 0) {
    setErrorFor(passwordConfirmation, 'A senha é obrigatória!');
  } else if (passwordConfirmationValue.length < 7 || passwordConfirmationValue !== passwordValue) {
    setErrorFor(passwordConfirmation, 'As senhas não conferem.');
  } else {
    setSuccessFor(passwordConfirmation);
  }

  const formControls = form.querySelectorAll('form-control');
  const formIsValid = [...formControls].every((formControl) => formControl.className === 'form-control success');
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  small.textContent = message;

  formControl.className = 'form-control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  formControl.className = 'form-control success';
}

function checkEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email.trim());
}
