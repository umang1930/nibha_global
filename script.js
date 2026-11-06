const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
const enquiryEmail = ''; // Add Nibha Global's business email here to address enquiries automatically.

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Business enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || 'Not provided'}\n\nEnquiry:\n${data.get('message')}`
  );
  const status = document.querySelector('.form-status');
  if (!enquiryEmail) {
    status.textContent = 'Please call 9313118520. Add a valid business email in script.js to enable email enquiries.';
    return;
  }
  status.textContent = 'Your email draft is ready.';
  window.location.href = `mailto:${enquiryEmail}?subject=${subject}&body=${body}`;
});

const rangeFilters = document.querySelectorAll('.range-filter');
const rangeCards = document.querySelectorAll('.range-card');
rangeFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    rangeFilters.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });
    rangeCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});
