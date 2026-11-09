document.addEventListener('DOMContentLoaded', () => {
  ensureDemoData();

  const session = JSON.parse(localStorage.getItem('harvestlink_session') || '{}');
  if (session.role) {
    const label = document.querySelector('[data-role-label]');
    if (label) label.textContent = session.role.charAt(0).toUpperCase() + session.role.slice(1);
  }
});
