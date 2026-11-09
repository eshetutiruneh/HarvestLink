document.addEventListener('DOMContentLoaded', () => {
  ensureDemoData();

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim().toLowerCase();
      const password = document.getElementById('loginPassword')?.value;
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
      const user = users.find((item) => item.email === email && item.password === password);

      if (!user) {
        const message = document.getElementById('loginMessage');
        if (message) {
          message.textContent = 'Invalid email or password.';
          message.className = 'form-message error';
        }
        return;
      }

      localStorage.setItem('harvestlink_session', JSON.stringify({ userId: user.id, role: user.role }));
      const targetMap = {
        farmer: 'farmer-dashboard.html',
        consumer: 'consumer-dashboard.html',
        collector: 'collector-dashboard.html',
        driver: 'driver-dashboard.html',
        admin: 'admin-dashboard.html'
      };
      window.location.href = targetMap[user.role] || 'index.html';
    });
  }

  const logoutLink = document.querySelector('a[href="login.html"]');
  if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('harvestlink_session');
      window.location.href = 'login.html';
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const payload = Object.fromEntries(formData.entries());
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');

      if (users.some((user) => user.email === payload.email.trim().toLowerCase())) {
        showToast('User already exists.', 'danger');
        return;
      }

      const newUser = {
        id: Date.now(),
        fullName: payload.fullName,
        email: payload.email.trim().toLowerCase(),
        phone: payload.phone,
        location: payload.location,
        role: payload.role,
        password: payload.password,
        status: 'active'
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
      showToast('Registration successful.', 'success');
      setTimeout(() => window.location.href = 'login.html', 700);
    });
  }
});
