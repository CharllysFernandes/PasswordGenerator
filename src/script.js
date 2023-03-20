const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const passwordLengthInput = document.getElementById("passwordLength");
const easyRadio = document.getElementsByName("group1")[0];
const mediumRadio = document.getElementsByName("group1")[1];
const hardRadio = document.getElementsByName("group1")[2];
const passwordDisplay = document.getElementById("passwordDisplay") // add by human

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]\:;?><,./-=";

function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
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

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password
}

generateButton.addEventListener("click", function () {
  const length = parseInt(passwordLengthInput.value);
  const includeLowercase = easyRadio.checked || mediumRadio.checked || hardRadio.checked;
  const includeUppercase = mediumRadio.checked || hardRadio.checked;
  const includeNumbers = mediumRadio.checked || hardRadio.checked;
  const includeSymbols = hardRadio.checked;

  const password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
  console.log(password);
  passwordDisplay.innerText = password
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