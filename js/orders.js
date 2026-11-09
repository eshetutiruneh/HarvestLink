document.addEventListener('DOMContentLoaded', () => {
  ensureDemoData();

  const grid = document.querySelector('.product-grid');
  if (!grid) return;

  const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.products) || '[]');

  if (products.length === 0) {
    grid.innerHTML = '<p>No products available yet.</p>';
    return;
  }

  grid.innerHTML = products.map((product) => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.region} · ${product.city}</p>
        <p class="product-price">${product.price} ETB / ${product.unit}</p>
        <a href="product-details.html?id=${product.id}" class="btn">View Details</a>
      </div>
    </article>
  `).join('');
});
