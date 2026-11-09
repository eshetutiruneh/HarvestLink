document.addEventListener('DOMContentLoaded', () => {
  ensureDemoData();

  const detailButtons = document.querySelectorAll('[data-order-id]');
  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-order-id');
      window.location.href = `order-details.html?id=${id}`;
    });
  });
});
