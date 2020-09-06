// Usado para os forms do PrimeNg
const DEFAULT_CLASS = "browser-default";

export function normalizeFormLayout() {
  setTimeout(() => {
    runNormalization();
  }, 100);
}

function runNormalization() {
  const formsInputsElements = document.getElementsByClassName(DEFAULT_CLASS);

  for (let i = 0; i < formsInputsElements.length; i++) {
    const formInputElement = formsInputsElements.item(i);
    const inputsElements = formInputElement.getElementsByTagName("input");

    for (let i2 = 0; i2 < inputsElements.length; i2++) {
      setInputAttrs(inputsElements.item(i2));
    }
  }
}

function setInputAttrs(inputElement: HTMLInputElement) {
  inputElement.setAttribute("type", "text");

  if (!inputElement.classList.contains(DEFAULT_CLASS)) {
    inputElement.classList.add(DEFAULT_CLASS);
  }
}
