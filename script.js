document.querySelector("#buttons").addEventListener("click", decisionTree);

const operations = ["+", "-", "*", "/"];
const decimal = ".";
function decisionTree(event) {
  let target = event.target;
  if (target.classList.contains("number")) {
    addNumber(target.textContent);
  } else if (target.classList.contains("operation")) {
    addOperation(target.textContent);
  } else if (target.classList.contains("decimal")) {
    addDecimal();
  } else if (target.classList.contains("clear")) {
    clear();
  } else if (target.classList.contains("backspace")) {
    backspace();
  } else if (target.classList.contains("calculate")) {
    calculate();
  }
}
const display = document.querySelector("#display");
function addNumber(number) {
  display.textContent += number;
}
function addDecimal() {
  let arr = display.textContent.split(".");
  if (
    operations.includes(display.textContent.at(-1)) ||
    display.textContent === ""
  )
    display.textContent += "0.";
  else if ((!isNaN(+arr.at(-1)) && arr.at(-2) == undefined) || arr.at(-1) == "")
    return;
  else display.textContent += decimal;
}
//learn boolean, nan, number or not etc. and waht stuff returns
//["1", "1.1", "1+1", "1+1.1","1.","1+1."].map((a)=>[a.split(".").at(-2),a.split(".").at(-1)])
function addOperation(operation) {
  if (display.textContent === "");
  else if (display.textContent === "" && operation === "-")
    display.textContent += operation;
  else if (operations.includes(display.textContent.at(-1)))
    display.textContent = display.textContent.slice(0, -1) + operation;
  else display.textContent += operation;
}
function clear() {
  display.textContent = "";
}
function backspace() {
  display.textContent = display.textContent.slice(0, -1);
}
function calculate() {
  if (display.textContent.length === 0 || isNaN(+display.textContent.at(-1)))
    return;
  let operationArray = display.textContent.split("").reduce(parseArr, []);
  while (operationArray.length > 1) {
    let i = [
      operationArray.indexOf("*"),
      operationArray.indexOf("/"),
      operationArray.indexOf("+"),
      operationArray.indexOf("-"),
    ].filter((index) => index !== -1)[0];
    let temp = 0;
    switch (operationArray[i]) {
      case "+":
        temp = add(operationArray[i - 1], operationArray[i + 1]);
        break;
      case "-":
        temp = subtract(operationArray[i - 1], operationArray[i + 1]);
        break;
      case "*":
        temp = multiply(operationArray[i - 1], operationArray[i + 1]);
        break;
      case "/":
        temp = divide(operationArray[i - 1], operationArray[i + 1]);
        break;
    }
    operationArray.splice(i - 1, 3, temp);
  }
  let result = operationArray.at(0);
  display.textContent = result.toString();
}

function parseArr(acc, curr, index) {
  let previous = acc.at(-1);
  let previousI = acc.length - 1;
  if (index === 0 && curr === "-") acc.push("0") + acc.push(curr);
  else if (curr === ".") acc[previousI] += curr;
  else if (!isNaN(+curr) && !isNaN(+previous)) acc[previousI] += curr;
  else acc.push(curr);
  return acc;
}
function add(a, b) {
  return +a + +b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
