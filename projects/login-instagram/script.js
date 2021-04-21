const inputs = document.getElementsByClassName('input-login');
const btnLogin = document.getElementById('btn-login');
const loginContainer = document.querySelector('login-container');
const inputPassword = document.getElementById('password-login');

const verifyInputsLogin = () => {
  const isError = document.getElementById('msg-error');

  if (isError !== null) {
    isError.remove();
  }

  for (let index = 0; index < inputs.length; index += 1) {
    if (inputs[index].value === '') {

      const mensageError = document.createElement('span');
      mensageError.id = 'msg-error'
      mensageError.style.marginLeft = '60px';
      mensageError.style.color = 'red';
      mensageError.style.fontSize = '12px';
      mensageError.innerText = 'Preencha os campos de login.'
      document.getElementById('mensage-error').appendChild(mensageError)
      break;
    }
  }
}

const verifyInputPassword = () => {
  const isErrorPassword = document.getElementById('msg-password');
  if (isErrorPassword !== null) {
    isErrorPassword.remove();
  }
  const valuePassword = inputPassword.value;
  if (valuePassword.length < 6) {
    const mensagePassword = document.createElement('span');
    mensagePassword.id ='msg-password';
    mensagePassword.style.marginLeft = '30px';
    mensagePassword.style.fontSize = '12px';
    mensagePassword.style.color = 'red';
    mensagePassword.innerText = 'A senha deve ter no mínimo 6 caracteres.';
    document.getElementById('mensage-password').appendChild(mensagePassword);
  }
}

// conta o número de visitas
const countVIsitors = () => {
  if (typeof Storage !== undefined) {
    if (localStorage.visitors) {
      localStorage.visitors = Number(localStorage.visitors) + 1;
      document.getElementById('visitors-numbers').innerHTML = localStorage.visitors;
    } else {
      localStorage.visitors = 1;
      document.getElementById('visitors-numbers').innerHTML = 1;
    }
  } else {
    document.getElementById('visitors-numbers').innerHTML = 'Desculpe, o seu navegador não tem suporte Storage';
  }
}
countVIsitors();

btnLogin.addEventListener('click', verifyInputsLogin);
btnLogin.addEventListener('click', verifyInputPassword);
