//INPUTS
const inputs = document.querySelectorAll("div.numbers");
const prevOps = document.querySelector("div.prevOperand");
const currOps = document.querySelector("div.currOperand");
const operationsDiv = document.querySelector("#num-operations");
const clears = document.querySelector(".inputs.clears");
const operations = document.querySelectorAll("div.operations");
const equalsButton = document.querySelector("#equals");
const deleteBtn = document.querySelector("#delete");
const entryBox = document.querySelector("#entryBox");
const answerBox = document.createElement("div");
answerBox.style.height = "100%";

let operator = document.createElement("i");
operator.style.fontSize = "0.7rem";

//JS OOP
class Calcultor {
  constructor(prevOps, currOps) {
    this.preValue = prevOps;
    this.currValue = currOps;
    this.clear();
  }
  clear() {
    const { preValue, currValue } = this;
    preValue.innerText = "";
    currValue.innerText = "";
    answerBox.innerText = "";
    this.operation = undefined;
    this.answer = 0;
  }
  delete() {
    const { currValue } = this;
    currValue.innerText = currValue.innerText.slice(0, -1);
  }
  appendNumber(number) {
    const { currValue } = this;
    if (number === "." && currValue.innerText.includes(".")) return;
    if (answerBox !== "") {
      answerBox.innerText = "";
      this.answer = 0;
    }
    currOps.innerText += number;
  }
  chooseOperation(operation) {
    const { currValue, preValue } = this;
    this.operation = operation;
    if (currValue.innerText === "") return;
    if (preValue.innerText !== "" && currValue.innerText !== "") this.compute();
    
    // if (answerBox.innerText !== "") {
    //   preValue.innerText = `${answerBox.innerText}`;
    //   operator.className = operation;
    //   preValue.append(operator);
    // } 
      preValue.innerText = currValue.innerText;
      operator.className = `${operation}`;
      preValue.append(operator);
      currValue.innerText = "";
    
  }
  compute() {
    const { preValue, currValue } = this;
    if (currValue.innerText === "" || preValue.innerText === "") return;
    const operand = preValue.childNodes[1].className;
    let firstEntry = parseFloat(preValue.innerText);
    let secondEntry = parseFloat(currValue.innerText);
    let answer = 0;

    if (operand.includes("fa-divide")) {
      answer = firstEntry / secondEntry;
    } else if (operand.includes("fa-multiply")) {
      answer = firstEntry * secondEntry;
    } else if (operand.includes("fa-minus")) {
      answer = firstEntry - secondEntry;
    } else if (operand.includes("fa-plus")) {
      answer = firstEntry + secondEntry;
    }
    this.answer = answer;
  }
  updateDisplay() {}
}

const calculator = new Calcultor(prevOps, currOps);

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    calculator.appendNumber(input.innerText);
  });
});

clears.addEventListener("click", () => {
  calculator.clear();
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (answerBox.innerText !== "") {
      calculator.preValue.innerText = `${answerBox.innerText}`;
      answerBox.innerText = "";
    }
    let operatorClass = operation.childNodes[1].className;
    calculator.chooseOperation(operatorClass);
    if (calculator.answer != 0) {
      calculator.preValue.innerText = `${calculator.answer}`;
      calculator.preValue.append(operator);
      if (e.target.className.includes("fa-solid")) {
        operator.className = calculator.operation;
      }
      calculator.currValue.innerText = "";
    }
  });
});

equalsButton.addEventListener("click", (e) => {
  calculator.compute();
  calculator.preValue.innerText = "";
  calculator.currValue.innerText = "";
  answerBox.innerText = `${calculator.answer}`;
  entryBox.appendChild(answerBox);
  console.log(calculator.answer);
});

deleteBtn.addEventListener("click", (e) => {
  calculator.delete();
});
