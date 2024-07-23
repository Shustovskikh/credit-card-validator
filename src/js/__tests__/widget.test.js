import { displayCardType } from '../widget.js';

describe('displayCardType', () => {
  let logoContainer;
  let cardLogos;
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    document.body.innerHTML = `
            <div class="logo-container">
                <img class="card-logo" alt="Visa" />
                <img class="card-logo" alt="Mastercard" />
                <img class="card-logo" alt="American Express" />
                <img class="card-logo" alt="JCB" />
                <img class="card-logo" alt="MIR" />
            </div>
        `;
    logoContainer = document.querySelector('.logo-container');
    cardLogos = logoContainer.querySelectorAll('.card-logo');
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should display the correct card logo', () => {
    displayCardType('Visa');
    expect(cardLogos[0].classList.contains('active-logo')).toBe(true);
    expect(cardLogos[1].classList.contains('active-logo')).toBe(false);
    expect(cardLogos[2].classList.contains('active-logo')).toBe(false);
    expect(cardLogos[3].classList.contains('active-logo')).toBe(false);
    expect(cardLogos[4].classList.contains('active-logo')).toBe(false);
  });

  test('should remove active class from all logos if card type is not found', () => {
    displayCardType('Discover');
    cardLogos.forEach((logo) => {
      expect(logo.classList.contains('active-logo')).toBe(false);
    });
    expect(consoleWarnSpy).toHaveBeenCalledWith('Logo for card type "Discover" not found');
  });

  test('should log an error if logo container is not found', () => {
    document.body.innerHTML = '';
    displayCardType('Visa');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Logo container not found');
  });
});
