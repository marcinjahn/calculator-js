/**
 * Performs a basic arithmetic operation on two numbers and returns the result as a string.
 *
 * @param {number} number1 - The first number
 * @param {number} number2 - The second number
 * @param {string} operator - The arithmetic operator to apply. Supported values are:
 *   - `"+"` for addition,
 *   - `"-"` for subtraction,
 *   - `"*"` for multiplication,
 *   - `"/"` for division.
 * @returns {number | null} The result of the operation as a number. If an unsupported operator is provided,
 * returns `number2`. If dividing by 0, returns null.
 *
 * @example
 * calculate(5, 3, "+"); // Returns 8
 * calculate(10, 2, "*");  // Returns 20
 * calculate(10, 0, "/");  // Returns null
 */
export function calculate(number1, number2, operator) {
  switch (operator) {
    case '+':
      return number1 + number2;
    case '-':
      return number1 - number2;
    case '*':
      return number1 * number2;
    case '/':
      return number2 !== 0 ? number1 / number2 : null;
    default:
      return number2;
  }
}
