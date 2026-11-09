const STORAGE_KEY = 'harvestlink-demo';

function getDemoData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setDemoData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function readStorage(key, fallback = []) {
  const value = localStorage.getItem(key);
  if (!value) return fallback;
  try { return JSON.parse(value); } catch { return fallback; }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showToast(message, type = 'success') {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = `alert alert-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB'
  }).format(Number(value || 0));
}

function formatDate(dateString) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-ET', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

window.HL = window.HL || {};
window.HL.readStorage = readStorage;
window.HL.writeStorage = writeStorage;
window.HL.showToast = showToast;
window.HL.formatCurrency = formatCurrency;
window.HL.formatDate = formatDate;
window.HL.escapeHtml = escapeHtml;
window.HL.resetDemoData = function () {
  localStorage.clear();
  location.reload();
};
