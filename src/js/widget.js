export function displayCardType(cardType) {
  const logoContainer = document.querySelector('.logo-container');
  if (!logoContainer) {
    console.error('Logo container not found');
    return;
  }

  const cardLogos = logoContainer.querySelectorAll('.card-logo');
  cardLogos.forEach((logo) => {
    logo.classList.remove('active-logo');
  });

  const activeLogo = logoContainer.querySelector(`[alt="${cardType}"]`);
  if (activeLogo) {
    activeLogo.classList.add('active-logo');
  } else {
    console.warn(`Logo for card type "${cardType}" not found`);
  }
}
