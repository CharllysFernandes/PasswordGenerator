// Captura os elementos HTML que serão utilizados
const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const passwordLengthInput = document.getElementById("passwordLength");
const easyRadio = document.getElementsByName("group1")[0];
const mediumRadio = document.getElementsByName("group1")[1];
const hardRadio = document.getElementsByName("group1")[2];
const passwordDisplay = document.getElementById("passwordDisplay") // add by human

// Define as variáveis que serão utilizadas
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]\:;?><,./-=";

// Define a função que irá gerar a senha
function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
  let password = "";
  let chars = "";

  // Adiciona os caracteres de acordo com as opções selecionadas
  if (includeLowercase) {
    chars += lowercaseChars;
  }
  if (includeUppercase) {
    chars += uppercaseChars;
  }
  if (includeNumbers) {
    chars += numberChars;
  }
  if (includeSymbols) {
    chars += symbolChars;
  }

  // Gera a senha aleatória
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password
}

// Define a função que será executada ao clicar no botão "Gerar senha"
generateButton.addEventListener("click", function () {
  const length = parseInt(passwordLengthInput.value);
  const includeLowercase = easyRadio.checked || mediumRadio.checked || hardRadio.checked;
  const includeUppercase = mediumRadio.checked || hardRadio.checked;
  const includeNumbers = mediumRadio.checked || hardRadio.checked;
  const includeSymbols = hardRadio.checked;

  // Gera a senha e exibe no console
  const password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
  console.log(password);
  passwordDisplay.innerText = password
});

// Define a função que será executada ao clicar no botão "Copiar senha"
copyButton.addEventListener('click', function () {
  // Seleciona o elemento que exibe a senha gerada
  // const passwordDisplay = document.querySelector('#password-display');
  // Verifica se a senha foi gerada
  const password = passwordDisplay.innerText.length < 1 ? null : passwordDisplay.innerText;

  // Copia a senha para a área de transferência
  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      alert(`Senha copiada para a área de transferência: ${password}`);
    }, () => {
      alert('Não foi possível copiar a senha para a área de transferência.');
    });
  } else {
    alert('Clique em gerar senha');
  }
});