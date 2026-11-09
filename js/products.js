document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('.footer').forEach((footer) => {
    if (footer && !footer.dataset.yearSet) {
      footer.innerHTML = `<p>&copy; ${currentYear} HarvestLink. Connecting Farmers and Consumers.</p>`;
      footer.dataset.yearSet = 'true';
    }
  });

  const navLinks = document.querySelectorAll('.nav-links a, .navbar a');
  const currentUrl = window.location.pathname.split('/').pop();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentUrl) {
      link.classList.add('active');
    }
  });

  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.querySelector('.nav-links')?.classList.toggle('mobile-open');
    });
  }

  const topButton = document.getElementById('backToTop');
  if (topButton) {
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
