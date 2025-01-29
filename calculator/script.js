const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalBtn = document.getElementById('equal');

let currentInput = '';
let firstOperand = null;
let operator = null;
let shouldResetScreen = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        
        if (value >= '0' && value <= '9' || value === '.') {
            handleNumber(value);
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        }
    });
});

equalBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', clear);

function handleNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function handleOperator(newOperator) {
    const inputValue = parseFloat(currentInput);
    
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculateResult(firstOperand, inputValue, operator);
        firstOperand = result;
        currentInput = result.toString();
        updateDisplay();
    }
    
    operator = newOperator;
    shouldResetScreen = true;
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    const inputValue = parseFloat(currentInput);
    currentInput = calculateResult(firstOperand, inputValue, operator).toString();
    operator = null;
    firstOperand = null;
    shouldResetScreen = true;
    updateDisplay();
}

function calculateResult(first, second, operator) {
    switch(operator) {
        case '+': return first + second;
        case '-': return first - second;
        case '*': return first * second;
        case '/': return first / second;
        default: return second;
    }
}

function clear() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    shouldResetScreen = false;
    display.textContent = '0';
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}