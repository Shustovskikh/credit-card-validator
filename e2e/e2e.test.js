import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(100000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    let serverReady = false;
    while (!serverReady) {
      try {
        const response = await fetch(baseUrl);
        if (response.ok) {
          serverReady = true;
        }
      } catch (e) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();

    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should display card type when card number is entered', async () => {
    await page.goto(baseUrl);
    await page.type('#card-number', '4111111111111111');
    await page.waitForSelector('#card-type');
    const cardType = await page.$eval('#card-type', (el) => el.textContent);
    expect(cardType).toBe('Visa');
  }, 100000);

  test('should validate card number correctly', async () => {
    await page.goto(baseUrl);
    await page.type('#card-number', '4111111111111111');
    await page.click('#validate-button');
    const validationMessage = await page.$eval('#card-type', (el) => el.textContent);
    expect(validationMessage).toBe('Valid card number');

    await page.click('#card-number', { clickCount: 3 });
    await page.type('#card-number', '1234567890123456');
    await page.click('#validate-button');
    const invalidMessage = await page.$eval('#card-type', (el) => el.textContent);
    expect(invalidMessage).toBe('Invalid card number');
  });

  test('should display correct card logo', async () => {
    await page.goto(baseUrl);
    await page.type('#card-number', '4111111111111111');
    const visaLogo = await page.$('.card-logo[alt="Visa"].active-logo');
    expect(visaLogo).not.toBeNull();

    await page.click('#card-number', { clickCount: 3 });
    await page.type('#card-number', '5500000000000004');
    const mastercardLogo = await page.$('.card-logo[alt="Mastercard"].active-logo');
    expect(mastercardLogo).not.toBeNull();
  });
});
