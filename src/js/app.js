import { validateCardNumber, getCardType } from './validators.js';
import { displayCardType } from './widget.js';

document.addEventListener('DOMContentLoaded', () => {
  const cardNumberInput = document.getElementById('card-number');
  const cardTypeDiv = document.getElementById('card-type');

  cardNumberInput.addEventListener('input', () => {
    const cardNumber = cardNumberInput.value;
    const cardType = getCardType(cardNumber);
    displayCardType(cardType);
    cardTypeDiv.textContent = cardType;
  });

  const validateButton = document.getElementById('validate-button');
  validateButton.addEventListener('click', () => {
    const cardNumber = cardNumberInput.value;
    const isValid = validateCardNumber(cardNumber);

    if (isValid) {
      cardTypeDiv.textContent = 'Valid card number';
    } else {
      cardTypeDiv.textContent = 'Invalid card number';
    }
  });
});
