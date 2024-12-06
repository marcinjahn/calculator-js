import { calculate } from './math';
import { setupThemeSwitcher } from './theme';
import './style.css';

const display = document.getElementById('display');
let currentInput = "0";

let previousInput = null;

let operator = null;

/**
 * Updates the displayed values on the virtual calculator screen
 */
function updateDisplay() {
  display.textContent = currentInput;
}

/**
 * Configures all the buttons to invoke proper actions
 */
function setupButtons() {
  document.querySelector('.buttons').addEventListener('click', (event) => {
    const button = event.target;
    const action = button.getAttribute('data-action');
    const value = button.getAttribute('data-value');

    if (!button.classList.contains('btn')) return;

    if (action === 'clear') {
      clearDisplayClicked();
    } else if (action === 'sign') {
      signClicked();
    } else if (action === 'percent') {
      percentClicked();
    } else if (action === 'operator') {
      simpleOperatorClicked(value);
    } else if (action === 'calculate') {
      calculateClicked();
    } else {
      appendDigit(value);
    }

    updateDisplay();
  });
}

/**
 * Handles case where user clicked a digit
 */
function appendDigit(value) {
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }
}

/**
 * Handles case where user clicked "="
 */
function calculateClicked() {
  if (operator && previousInput !== null) {
    currentInput = calculate(previousInput, currentInput, operator);
    previousInput = null;
    operator = null;
  }
}

/**
 * Handles cases where user clicked + or - pr / or *
 */
function simpleOperatorClicked(value) {
  if (operator && previousInput !== null) {
    currentInput = calculate(previousInput, currentInput, operator);
  }

  operator = value;
  previousInput = currentInput;
  currentInput = '0';
}

/**
 * Handles case where user clicked "%"
 */
function percentClicked() {
  currentInput = String(parseFloat(currentInput) / 100);
}

/**
 * Handles case where user clicked "±"
 */
function signClicked() {
  currentInput = String(parseFloat(currentInput) * -1);
}

/**
 * Handles case where user clicked "C"
 */
function clearDisplayClicked() {
  currentInput = '0';
  previousInput = null;
  operator = null;
}

setupButtons();
setupThemeSwitcher();
updateDisplay();
