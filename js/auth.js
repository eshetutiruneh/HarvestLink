const STORAGE_KEYS = {
  users: 'harvestlink_users',
  products: 'harvestlink_products',
  orders: 'harvestlink_orders',
  messages: 'harvestlink_messages',
  complaints: 'harvestlink_complaints'
};

const demoUsers = [
  {
    id: 1,
    fullName: 'Farmer Demo',
    email: 'farmer@harvestlink.test',
    phone: '0911111111',
    location: 'Harar',
    role: 'farmer',
    password: 'Harvest123',
    status: 'active'
  },
  {
    id: 2,
    fullName: 'Consumer Demo',
    email: 'consumer@harvestlink.test',
    phone: '0922222222',
    location: 'Dire Dawa',
    role: 'consumer',
    password: 'Harvest123',
    status: 'active'
  },
  {
    id: 3,
    fullName: 'Collector Demo',
    email: 'collector@harvestlink.test',
    phone: '0933333333',
    location: 'Harar',
    role: 'collector',
    password: 'Harvest123',
    status: 'active'
  },
  {
    id: 4,
    fullName: 'Driver Demo',
    email: 'driver@harvestlink.test',
    phone: '0944444444',
    location: 'Dire Dawa',
    role: 'driver',
    password: 'Harvest123',
    status: 'active'
  },
  {
    id: 5,
    fullName: 'Admin Demo',
    email: 'admin@harvestlink.test',
    phone: '0955555555',
    location: 'Addis Ababa',
    role: 'admin',
    password: 'Harvest123',
    status: 'active'
  }
];

const demoProducts = [
  {
    id: 101,
    name: 'Fresh Tomatoes',
    category: 'vegetables',
    price: 45,
    quantity: 80,
    unit: 'kg',
    farmerId: 1,
    region: 'Oromia',
    city: 'Harar',
    collectionPoint: 'Harar Rural Collection Center',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=700'
  },
  {
    id: 102,
    name: 'Potatoes',
    category: 'vegetables',
    price: 35,
    quantity: 120,
    unit: 'kg',
    farmerId: 1,
    region: 'Oromia',
    city: 'Harar',
    collectionPoint: 'Rural Collection Center A',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700'
  },
  {
    id: 103,
    name: 'Wheat',
    category: 'grains',
    price: 55,
    quantity: 200,
    unit: 'kg',
    farmerId: 1,
    region: 'Amhara',
    city: 'Bahir Dar',
    collectionPoint: 'Bahir Dar Storage Hub',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700'
  }
];

function ensureDemoData() {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(demoUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(demoProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.orders)) {
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.messages)) {
    localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.complaints)) {
    localStorage.setItem(STORAGE_KEYS.complaints, JSON.stringify([]));
  }
}

window.HL = window.HL || {};
window.HL.STORAGE_KEYS = STORAGE_KEYS;
window.HL.ensureDemoData = ensureDemoData;
window.HL.demoUsers = demoUsers;
window.HL.demoProducts = demoProducts;
