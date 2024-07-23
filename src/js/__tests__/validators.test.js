import { validateCardNumber, getCardType } from '../validators.js';

describe('validateCardNumber', () => {
  it('should return true for a valid card number', () => {
    expect(validateCardNumber('4111111111111111')).toBe(true);
  });

  it('should return false for an invalid card number', () => {
    expect(validateCardNumber('1234567890123456')).toBe(false);
  });

  it('should return false for an empty card number', () => {
    expect(validateCardNumber('')).toBe(false);
  });

  it('should return false for a non-numeric card number', () => {
    expect(validateCardNumber('abc')).toBe(false);
  });
});

describe('getCardType', () => {
  it('should return the correct card type for a valid card number', () => {
    expect(getCardType('4111111111111111')).toBe('Visa');
    expect(getCardType('5555555555554444')).toBe('Mastercard');
    expect(getCardType('378282246310005')).toBe('American Express');
    expect(getCardType('3530111333300000')).toBe('JCB');
    expect(getCardType('2200222233334444')).toBe('MIR');
  });

  it('should return "Unknown" for an invalid card number', () => {
    expect(getCardType('1234567890123456')).toBe('Unknown');
  });

  it('should return "Unknown" for an empty card number', () => {
    expect(getCardType('')).toBe('Unknown');
  });

  it('should return "Unknown" for a non-numeric card number', () => {
    expect(getCardType('abc')).toBe('Unknown');
  });
});
