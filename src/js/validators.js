export function validateCardNumber(cardNumber) {
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');
  if (!cleanedCardNumber) {
    return false;
  }

  const digits = Array.from(cleanedCardNumber).map(Number).reverse();
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    if (i % 2 === 1) {
      const doubledDigit = digits[i] * 2;
      sum += doubledDigit > 9 ? doubledDigit - 9 : doubledDigit;
    } else {
      sum += digits[i];
    }
  }

  return sum % 10 === 0;
}

export function getCardType(cardNumber) {
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');
  const cardTypes = [
    { type: 'Visa', pattern: /^4/ },
    { type: 'Mastercard', pattern: /^5[1-5]/ },
    { type: 'American Express', pattern: /^3[47]/ },
    { type: 'JCB', pattern: /^35/ },
    { type: 'MIR', pattern: /^22/ },
  ];

  for (const cardType of cardTypes) {
    if (cardType.pattern.test(cleanedCardNumber)) {
      return cardType.type;
    }
  }

  return 'Unknown';
}
