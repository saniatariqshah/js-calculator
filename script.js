const buttons = document.querySelectorAll('.btn');
const screen = document.querySelector('.calculator-screen');
let screenValue = '';
let operator = null;
let previousValue = '';
let isOperatorClicked = false;

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const value = this.textContent;

        // Clear screen if "C" is clicked
        if (value === 'C') {
            screenValue = '';
            operator = null;
            previousValue = '';
            screen.value = '';
            isOperatorClicked = false;
            return;
        }

        // Handle operators
        if (['+', '-', '*', '/'].includes(value)) {
            if (screenValue === '' && previousValue === '') return; // Prevent operator click if no values

            if (!isOperatorClicked) {
                previousValue = screenValue;
                screenValue = '';
                operator = value;
                isOperatorClicked = true;
            }
            return;
        }

        // Handle equal sign
        if (value === '=') {
            if (previousValue && operator && screenValue) {
                screen.value = eval(`${previousValue} ${operator} ${screenValue}`);
                previousValue = screen.value;  // Save result to previousValue
                screenValue = '';
                operator = null;
                isOperatorClicked = false;
            }
            return;
        }

        // Append clicked number or decimal point
        screenValue += value;
        screen.value = screenValue;
    });
});
