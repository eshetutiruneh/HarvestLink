document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profileForm');
  if (!profileForm) return;

  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Profile saved successfully.', 'success');
  });
});
