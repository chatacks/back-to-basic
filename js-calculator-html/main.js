const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  calculate() {
    let result;

    const previousOperand = parseFloat(this.previousOperand);
    const currentOperand = parseFloat(this.currentOperand);

    if (isNaN(previousOperand) || isNaN(currentOperand)) {
      return;
    }

    switch (this.operation) {
      case '+':
        result = previousOperand + currentOperand;
        break;
      case '÷':
        result = previousOperand / currentOperand;
        break;
      case '-':
        result = previousOperand - currentOperand;
        break;
      case '*':
        result = previousOperand * currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result.toString();
    this.operation = undefined;
    this.previousOperand = '';
  }

  chooseOperation(operation) {
    if (this.previousOperand !== '') {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  appendNumber(number) {
    if (this.currentOperand.includes('.') && number === '.') {
      return;
    }
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation || ''}`;
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

for (const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener('click', () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
});
// window.addEventListener('keydown', (e) => {
//   if (['/', '*', '-', '+', '.'].includes(e.key)) {
//     e.preventDefault();
//   }

//   const button = document.querySelector(`button[data-key="${e.key}"]`);

//   if (button) {
//     console.log(button);
//     button.click();
//     button.classList.add('active');
//     setTimeout(() => button.classList.remove('active'), 100);
//   }
// });
