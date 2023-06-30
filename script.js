const screenUp = document.querySelector(".up");
const screenDown = document.querySelector(".down");
const buttons = document.querySelectorAll(".button");

let currentOperand = "";
let digit = "";
let operandOne = "";
let operator = "";
let operandTwo = "";
let result = "";

const display = () => {
  if (currentOperand.length < 14 && result === "") {
    currentOperand = currentOperand + digit;
    operandOne = currentOperand;
    screenDown.textContent = operandOne;
  } else if (
    currentOperand.length < 14 &&
    (operandOne !== "" || result !== "")
  ) {
    currentOperand = currentOperand + digit;
    operandTwo = currentOperand;
    screenDown.textContent = `${operator} ${currentOperand}`;
    if (result === "") {
      if (operandOne % 1 === 0) {
        screenUp.textContent = `${operandOne}`;
      } else {
        screenUp.textContent = `${parseFloat(operandOne.toFixed(4))}`;
      }
    } else {
      if (result % 1 === 0) {
        screenUp.textContent = `${result}`;
      } else {
        screenUp.textContent = `${parseFloat(result.toFixed(4))}`;
      }
    }
  }
};

const operation = () => {
  digit = "";
  if (result === "") {
    if (operator === "+") {
      result = +operandOne + +operandTwo;
    }
    if (operator === "-") {
      result = +operandOne - +operandTwo;
    }
    if (operator === "*") {
      if (!operandTwo) {
        return;
      }
      result = +operandOne * +operandTwo;
    }
    if (operator === "/") {
      if (!operandTwo) {
        return;
      }
      result = +operandOne / +operandTwo;
    }
  } else {
    if (operator === "+") {
      result = +result + +operandTwo;
    }
    if (operator === "-") {
      result = +result - +operandTwo;
    }
    if (operator === "*") {
      if (!operandTwo) {
        return;
      }
      result = +result * +operandTwo;
    }
    if (operator === "/") {
      if (!operandTwo) {
        return;
      }
      result = +result / +operandTwo;
    }
  }
  operandTwo = "";
  currentOperand = "";
  display();
};

const checkDot = () => {
  if (currentOperand.includes(".")) {
    return true;
  }
};

const reset = () => {
  currentOperand = "";
  digit = "";
  operandOne = "";
  operator = "";
  operandTwo = "";
  result = "";
  screenDown.textContent = "";
  screenUp.textContent = "";
};

const backspace = () => {
  currentOperand = currentOperand.slice(0, -1);
  screenDown.textContent = `${operator} ${currentOperand}`;
};

buttons.forEach((button) => {
  button.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("digit")) {
      digit = ev.target.textContent;
      display();
    } else if (ev.target.classList.contains("oper")) {
      operator = ev.target.textContent;
      operation();
    } else if (ev.target.classList.contains("eval")) {
      operation();
      screenUp.textContent = "";
      screenDown.textContent = result;
    } else if (ev.target.classList.contains("dot")) {
      if (!checkDot()) {
        digit = ev.target.textContent;
        display();
      }
    } else if (ev.target.classList.contains("reset")) {
      reset();
    } else if (ev.target.classList.contains("backspace")) {
      backspace();
    }
  });
});
