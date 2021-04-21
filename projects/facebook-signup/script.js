const buttonLogin = document.getElementById('button-login');
const singUpBtn = document.getElementById('facebook-register');
const genderCustom = document.getElementById('personalizado');
const genderMale = document.getElementById('masculino');
const genderFemale = document.getElementById('feminino');
const mainFormInput = document.getElementsByClassName('main-form');

// Exibe o email do usuário quando o botão Entrar for clicado
buttonLogin.addEventListener('click', () => {
  const userEmail = document.getElementById('user-email-phone').value;
  alert(userEmail);
});

// Verifica se há algum campo não preenchido
singUpBtn.addEventListener('click', (event) => {
  const element = event;
  element.preventDefault();
  const isError = document.getElementById('error-message');
  if (isError !== null) {
    isError.remove();
  }
  for (let index = 0; index < mainFormInput.length; index += 1) {
    if (mainFormInput[index].value === '') {
      const newElement = document.createElement('p');
      newElement.id = 'error-message';
      newElement.innerHTML = 'Campos inválidos';
      document.querySelector('.form-registration').appendChild(newElement);
      break;
    }
  }
});

// Adiona um campo de texto se o gênero personalizado for selecionado
const newField = document.createElement('input');
const nameNewField = 'gender-custom';
genderCustom.addEventListener('click', () => {
  newField.setAttribute('name', nameNewField);
  newField.setAttribute('placeholder', 'Gênero (opcional)');
  document.querySelector('.gender-container').appendChild(newField);
});

// Remove o elemento do gênero personalizado caso outro gênero seja selecionado
function removeCustomGender() {
  if (document.getElementsByName(nameNewField)[0]) {
    document.getElementsByName(nameNewField)[0].remove();
  }
}
genderMale.addEventListener('click', removeCustomGender);
genderFemale.addEventListener('click', removeCustomGender);

// Exibe mensagem de validação
function welcomeMessage() {
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const login = document.getElementById('phone-email').value;
  const birthdate = document.getElementById('birthdate').value;
  const gender = document.querySelector('input:checked').value;

  return `Olá, ${firstName} ${lastName}
  ${login}
  ${birthdate}
  ${gender}`;
}

function validationPassed() {
  let isValid = '';
  for (let index = 0; index < mainFormInput.length; index += 1) {
    if (mainFormInput[index].value === '') {
      isValid = false;
    }
  }
  if (isValid === '') {
    const message = welcomeMessage();
    document.querySelector('.right-content').innerText = message;
  }
}

singUpBtn.addEventListener('click', validationPassed);
