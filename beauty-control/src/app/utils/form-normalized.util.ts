// Usado para os normalizar os forms do PrimeNG
const DEFAULT_CLASS = "browser-default";
const INPUT_TEXT_CLASS = "p-inputtext";

export function normalizeFormLayout() {
  setTimeout(() => {
    runNormalization();
  }, 100);
}

function runNormalization() {
  setDefaultInputAttrs();
  setPrimeNgTextInputAttrs();
}

function setDefaultInputAttrs() {
  const formsInputsElements = document.getElementsByClassName(DEFAULT_CLASS);

  for (let i = 0; i < formsInputsElements.length; i++) {
    const formInputElement = formsInputsElements.item(i);
    const inputsElements = formInputElement.getElementsByTagName("input");

    for (let i2 = 0; i2 < inputsElements.length; i2++) {
      setInputAttrs(inputsElements.item(i2));
    }
  }
}

function setPrimeNgTextInputAttrs() {
  const formsInputsElements = document.getElementsByClassName(INPUT_TEXT_CLASS);
  
  for (let i = 0; i < formsInputsElements.length; i++) {
    const formInputElement = formsInputsElements.item(i);
    formInputElement.classList.add(DEFAULT_CLASS);
  }
}

function setInputAttrs(inputElement: HTMLInputElement) {
  inputElement.setAttribute("type", "text");

  if (!inputElement.classList.contains(DEFAULT_CLASS)) {
    inputElement.classList.add(DEFAULT_CLASS);
  }
}
