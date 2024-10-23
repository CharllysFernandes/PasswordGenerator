const generateButton = document.getElementById("btnGenerate");
const copyButton = document.getElementById("copyButton");
const passwordLengthInput = document.getElementById("PasswordLength"); // Corrigido o id aqui
const passwordDisplay = document.getElementById("passwordDisplay"); // Para exibir a senha gerada

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";

function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols, includeSpaces) {
  let password = "";
  let chars = "";

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
  if (includeSpaces) {
    chars += " ";
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  
  // Se espaços forem permitidos, mas não houver nenhum na senha, force a inclusão
  if (includeSpaces && !password.includes(" ")) {
    const randomPos = Math.floor(Math.random() * password.length);
    password = password.substring(0, randomPos) + " " + password.substring(randomPos + 1);
  }


  return password;
}

generateButton.addEventListener("click", function () {
  const length = parseInt(passwordLengthInput.value);

  // Pega os checkboxes
  const includeLowercase = document.getElementById("inputLowerCase").checked;
  const includeUppercase = document.getElementById("inputUpperCase").checked;
  const includeNumbers = document.getElementById("inputNumber").checked;
  const includeSymbols = document.getElementById("inputSymbols").checked;
  const includeSpaces = document.getElementById("inputSpaces").checked;

  const password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols, includeSpaces);
  console.log(password);
  passwordDisplay.innerText = password;
});

copyButton.addEventListener('click', function () {
  const password = passwordDisplay.innerText.length < 1 ? null : passwordDisplay.innerText;

  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      alert(`Password copied to clipboard: ${password}`);
    }, () => {
      alert('Unable to copy password to clipboard.');
    });
  } else {
    alert('Click on generate password');
  }
});
