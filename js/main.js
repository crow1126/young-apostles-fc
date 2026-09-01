/**
 * YOUNG APOSTLES FOOTBALL CLUB — OFFICIAL JAVASCRIPT
 * Team Shop, Cart System, GPL 2026/27 Fixtures, 38-Player Squad, Apostles TV+
 */

// ==========================================
// 1. DATA: 38-MAN GPL REGISTERED SQUAD
// ==========================================
const SQUAD_DATA = [
  // GOALKEEPERS (GK)
  { id: 1, name: 'Frank Boateng', number: 31, role: 'GK', posName: 'Goalkeeper', isU17: false, apps: 28, cleanSheets: 12, origin: 'Sunyani' },
  { id: 2, name: 'Osman Wahabu', number: 16, role: 'GK', posName: 'Goalkeeper', isU17: false, apps: 14, cleanSheets: 6, origin: 'Wenchi' },
  { id: 3, name: 'Benjamin Twum', number: 13, role: 'GK', posName: 'Goalkeeper', isU17: false, apps: 8, cleanSheets: 3, origin: 'Berekum' },
  { id: 4, name: 'Stephen Narh', number: 22, role: 'GK', posName: 'Goalkeeper', isU17: true, apps: 4, cleanSheets: 2, origin: 'Academy' },
  { id: 5, name: 'Seidu Adams', number: 1, role: 'GK', posName: 'Goalkeeper', isU17: true, apps: 2, cleanSheets: 1, origin: 'Academy' },

  // DEFENDERS (DF)
  { id: 6, name: 'Issah Nyaabila', number: 4, role: 'DF', posName: 'Center Back', isU17: false, apps: 30, goals: 2, origin: 'Wenchi' },
  { id: 7, name: 'Abdul Rurf Rahman', number: 15, role: 'DF', posName: 'Right Back', isU17: false, apps: 26, goals: 1, origin: 'Tamale' },
  { id: 8, name: 'Mathias Van Amegbe', number: 25, role: 'DF', posName: 'Left Back', isU17: false, apps: 28, goals: 3, origin: 'Accra' },
  { id: 9, name: 'Illiasu Mumuni', number: 24, role: 'DF', posName: 'Center Back', isU17: false, apps: 22, goals: 0, origin: 'Kumasi' },
  { id: 10, name: 'Abdul Musah Mohammed', number: 12, role: 'DF', posName: 'Full Back', isU17: false, apps: 19, goals: 1, origin: 'Sunyani' },
  { id: 11, name: 'Abdul Mobarick', number: 34, role: 'DF', posName: 'Center Back', isU17: false, apps: 17, goals: 0, origin: 'Wenchi' },
  { id: 12, name: 'Emmanuel Owusu Bempah', number: 44, role: 'DF', posName: 'Right Back', isU17: false, apps: 24, goals: 1, origin: 'Berekum' },
  { id: 13, name: 'Issah Salifu', number: 23, role: 'DF', posName: 'Left Back', isU17: false, apps: 16, goals: 0, origin: 'Tamale' },
  { id: 14, name: 'Samuel Amankwah', number: 3, role: 'DF', posName: 'Center Back', isU17: false, apps: 21, goals: 1, origin: 'Wenchi' },
  { id: 15, name: 'Foster Agyarko', number: 33, role: 'DF', posName: 'Defensive Stopper', isU17: false, apps: 18, goals: 0, origin: 'Techiman' },
  { id: 16, name: 'Fumi Koulibaly Andrews', number: 48, role: 'DF', posName: 'Center Back', isU17: false, apps: 12, goals: 0, origin: 'Ivory Coast/Ghana' },
  { id: 17, name: 'Moses Titi', number: 17, role: 'DF', posName: 'Wing Back', isU17: true, apps: 6, goals: 0, origin: 'Academy' },

  // MIDFIELDERS (MD)
  { id: 18, name: 'Ramzy Abubakar', number: 8, role: 'MD', posName: 'Playmaker / CM', isU17: false, apps: 32, goals: 7, origin: 'Wenchi' },
  { id: 19, name: 'Abdul Muftaw Ganiyu', number: 5, role: 'MD', posName: 'Defensive Midfielder', isU17: false, apps: 29, goals: 2, origin: 'Sunyani' },
  { id: 20, name: 'Abdul Ganiwu Ali', number: 32, role: 'MD', posName: 'Central Midfielder', isU17: false, apps: 25, goals: 3, origin: 'Tamale' },
  { id: 21, name: 'John Afram Attah Jnr', number: 20, role: 'MD', posName: 'Attacking Midfielder', isU17: false, apps: 27, goals: 5, origin: 'Wenchi' },
  { id: 22, name: 'Emmanuel Agyei', number: 51, role: 'MD', posName: 'Central Midfielder', isU17: false, apps: 22, goals: 2, origin: 'Kumasi' },
  { id: 23, name: 'Samuel Amadu', number: 6, role: 'MD', posName: 'Box-to-Box Midfielder', isU17: false, apps: 20, goals: 1, origin: 'Sunyani' },
  { id: 24, name: 'Awal Seidu', number: 28, role: 'MD', posName: 'Midfielder', isU17: true, apps: 9, goals: 1, origin: 'Academy' },
  { id: 25, name: 'Felix Aboagye', number: 18, role: 'MD', posName: 'Midfielder', isU17: true, apps: 7, goals: 0, origin: 'Academy' },
  { id: 26, name: 'Huzaif Iddrisu', number: 10, role: 'MD', posName: 'Attacking Midfielder', isU17: true, apps: 11, goals: 3, origin: 'Academy' },

  // FORWARDS (FW)
  { id: 27, name: 'Joseph Mensah', number: 7, role: 'FW', posName: 'Right Winger', isU17: false, apps: 31, goals: 11, origin: 'Wenchi' },
  { id: 28, name: 'Foster Adu Gyamfi', number: 30, role: 'FW', posName: 'Center Forward', isU17: false, apps: 27, goals: 9, origin: 'Berekum' },
  { id: 29, name: 'Samuel Prempeh', number: 21, role: 'FW', posName: 'Left Winger', isU17: false, apps: 29, goals: 8, origin: 'Kumasi' },
  { id: 30, name: 'Issah Huseine', number: 11, role: 'FW', posName: 'Forward / Winger', isU17: false, apps: 24, goals: 6, origin: 'Tamale' },
  { id: 31, name: 'Abdul Fatao Salifu', number: 19, role: 'FW', posName: 'Striker', isU17: false, apps: 21, goals: 5, origin: 'Sunyani' },
  { id: 32, name: 'Foster Amoah', number: 45, role: 'FW', posName: 'Center Forward', isU17: false, apps: 18, goals: 4, origin: 'Wenchi' },
  { id: 33, name: 'Joel Gakpo', number: 9, role: 'FW', posName: 'Number 9 / Striker', isU17: false, apps: 26, goals: 10, origin: 'Accra' },
  { id: 34, name: 'Kingsford Agyemang', number: 55, role: 'FW', posName: 'Forward', isU17: false, apps: 23, goals: 7, origin: 'Techiman' },
  { id: 35, name: 'Richmond Opoku', number: 40, role: 'FW', posName: 'Winger', isU17: false, apps: 15, goals: 3, origin: 'Wenchi' },
  { id: 36, name: 'Prince Osei Amankwah', number: 35, role: 'FW', posName: 'Forward', isU17: false, apps: 14, goals: 2, origin: 'Sunyani' },
  { id: 37, name: 'Andy Luis', number: 29, role: 'FW', posName: 'Forward', isU17: true, apps: 8, goals: 2, origin: 'Academy' },
  { id: 38, name: 'James Konadu', number: 50, role: 'FW', posName: 'Forward', isU17: true, apps: 6, goals: 1, origin: 'Academy' }
];

// ==========================================
// 2. DATA: TEAM SHOP PRODUCTS
// ==========================================
const PRODUCTS_DATA = [
  {
    id: 'kit-home',
    name: 'Official 2026/27 Home Kit (Mayniak)',
    category: 'kits',
    price: 350,
    oldPrice: 420,
    image: 'assets/kit-home-2026.jpg',
    tag: 'OFFICIAL 2026/27',
    description: 'The official 2026/27 Young Apostles FC Home Jersey engineered by Mayniak. Features radiant golden yellow textured fabric with navy blue trims, breathable moisture-wicking technology, and the iconic club crest.',
    customizable: true
  },
  {
    id: 'kit-away',
    name: 'Official 2026/27 Away Kit (Mayniak)',
    category: 'kits',
    price: 350,
    oldPrice: 420,
    image: 'assets/kit-away-2026.jpg',
    tag: 'OFFICIAL AWAY',
    description: 'The elegant 2026/27 Young Apostles FC Away Jersey by Mayniak. Designed with crisp ivory white, bronze-copper sleeve cuffs, and dynamic checkered flank details.',
    customizable: true
  },
  {
    id: 'kit-gk-cyan',
    name: 'Official 2026/27 Goalkeeper Kit (Cyan)',
    category: 'kits',
    price: 350,
    oldPrice: 400,
    image: 'assets/kit-home-2026.jpg',
    tag: 'GOALKEEPER',
    description: 'Electric cyan matchday goalkeeper jersey worn by Frank Boateng and Osman Wahabu. Crafted with reinforced impact stitching and athletic airflow panels.',
    customizable: true
  },
  {
    id: 'training-top',
    name: 'Young Apostles Pre-Match Training Jersey',
    category: 'training',
    price: 250,
    oldPrice: 300,
    image: 'assets/kit-away-2026.jpg',
    tag: 'TRAINING WEAR',
    description: 'Lightweight, ultra-durable training top engineered for pre-match warmups and everyday athletic lifestyle.',
    customizable: false
  },
  {
    id: 'fan-scarf',
    name: 'Young Apostles "Agya Na ƆwƆ Tumi" Scarf',
    category: 'accessories',
    price: 120,
    oldPrice: 150,
    image: 'assets/team-banner.jpg',
    tag: 'FAN FAVORITE',
    description: 'Premium double-knit jacquard stadium scarf featuring the club motto "Agya Na Ɔwɔ Tumi" in bold golden yellow and royal blue lettering.',
    customizable: false
  },
  {
    id: 'crest-cap',
    name: 'Official 3D Embroidered Snapback Cap',
    category: 'accessories',
    price: 100,
    oldPrice: 130,
    image: 'assets/official-logo.png',
    tag: 'BESTSELLER',
    description: 'High-profile structured snapback with high-density embroidered Young Apostles shield crest on the front crown.',
    customizable: false
  },
  {
    id: 'fan-pin-pack',
    name: 'Matchday Silicone Band & Enamel Pin Set',
    category: 'accessories',
    price: 50,
    oldPrice: 70,
    image: 'assets/official-crest-hq.png',
    tag: 'ACCESSORY',
    description: 'Collector edition enamel club crest pin and 2x silicone matchday wristbands.',
    customizable: false
  }
];

// ==========================================
// 3. DATA: GPL 2026/27 FULL FIXTURES
// ==========================================
const FIXTURES_ROUND_1 = [
  { week: 1, home: 'Vision FC', away: 'Young Apostles', venue: 'Nii Adjei Kraku Stadium', date: 'Sep 4, 2026', type: 'Away' },
  { week: 2, home: 'Young Apostles', away: 'Basake Holy Stars', venue: 'Wenchi Sports Stadium', date: 'Sep 11, 2026', type: 'Home' },
  { week: 3, home: 'Debibi United', away: 'Young Apostles', venue: 'Debibi Park', date: 'Sep 20, 2026', type: 'Away' },
  { week: 4, home: 'Young Apostles', away: 'Heart of Lions', venue: 'Wenchi Sports Stadium', date: 'Sep 27, 2026', type: 'Home' },
  { week: 5, home: 'Samartex', away: 'Young Apostles', venue: 'Nsenkyire Sports Complex', date: 'Oct 4, 2026', type: 'Away' },
  { week: 6, home: 'Young Apostles', away: 'Aduana Stars', venue: 'Wenchi Sports Stadium', date: 'Oct 11, 2026', type: 'Home' },
  { week: 7, home: 'Asante Kotoko', away: 'Young Apostles', venue: 'Baba Yara Sports Stadium', date: 'Oct 18, 2026', type: 'Away' },
  { week: 8, home: 'Young Apostles', away: 'Swedru All Blacks', venue: 'Wenchi Sports Stadium', date: 'Oct 25, 2026', type: 'Home' },
  { week: 9, home: 'Young Apostles', away: 'Karela United', venue: 'Wenchi Sports Stadium', date: 'Nov 1, 2026', type: 'Home' },
  { week: 10, home: 'FC Ashantigold', away: 'Young Apostles', venue: 'Len Clay Stadium, Obuasi', date: 'Nov 8, 2026', type: 'Away' },
  { week: 11, home: 'Young Apostles', away: 'Medeama SC', venue: 'Wenchi Sports Stadium', date: 'Nov 15, 2026', type: 'Home' },
  { week: 12, home: 'Berekum Chelsea', away: 'Young Apostles', venue: 'Golden City Park', date: 'Nov 22, 2026', type: 'Away' },
  { week: 13, home: 'Young Apostles', away: 'Bibiani Gold Stars', venue: 'Wenchi Sports Stadium', date: 'Nov 29, 2026', type: 'Home' },
  { week: 14, home: 'Bechem United', away: 'Young Apostles', venue: 'Nana Fosu Gyeabour Park', date: 'Dec 6, 2026', type: 'Away' },
  { week: 15, home: 'Young Apostles', away: 'Hearts of Oak', venue: 'Wenchi Sports Stadium', date: 'Dec 13, 2026', type: 'Home' },
  { week: 16, home: 'Dreams FC', away: 'Young Apostles', venue: 'Tuba Astro Turf', date: 'Dec 20, 2026', type: 'Away' },
  { week: 17, home: 'Young Apostles', away: 'Port City', venue: 'Wenchi Sports Stadium', date: 'Jan 3, 2027', type: 'Home' }
];

const FIXTURES_ROUND_2 = [
  { week: 18, home: 'Young Apostles', away: 'Vision FC', venue: 'Wenchi Sports Stadium', date: 'Jan 17, 2027', type: 'Home' },
  { week: 19, home: 'Basake Holy Stars', away: 'Young Apostles', venue: 'Aiyinase Arena', date: 'Jan 24, 2027', type: 'Away' },
  { week: 20, home: 'Young Apostles', away: 'Debibi United', venue: 'Wenchi Sports Stadium', date: 'Jan 31, 2027', type: 'Home' },
  { week: 21, home: 'Heart of Lions', away: 'Young Apostles', venue: 'Kpando Stadium', date: 'Feb 7, 2027', type: 'Away' },
  { week: 22, home: 'Young Apostles', away: 'Samartex', venue: 'Wenchi Sports Stadium', date: 'Feb 14, 2027', type: 'Home' },
  { week: 23, home: 'Aduana Stars', away: 'Young Apostles', venue: 'Nana Agyemang Badu Park', date: 'Feb 21, 2027', type: 'Away' },
  { week: 24, home: 'Young Apostles', away: 'Asante Kotoko', venue: 'Wenchi Sports Stadium', date: 'Feb 28, 2027', type: 'Home' },
  { week: 25, home: 'Swedru All Blacks', away: 'Young Apostles', venue: 'Swedru Sports Stadium', date: 'Mar 7, 2027', type: 'Away' },
  { week: 26, home: 'Karela United', away: 'Young Apostles', venue: 'Naa Sheriga Sports Complex', date: 'Mar 14, 2027', type: 'Away' },
  { week: 27, home: 'Young Apostles', away: 'FC Ashantigold', venue: 'Wenchi Sports Stadium', date: 'Mar 21, 2027', type: 'Home' },
  { week: 28, home: 'Medeama SC', away: 'Young Apostles', venue: 'TnA Stadium, Tarkwa', date: 'Apr 4, 2027', type: 'Away' },
  { week: 29, home: 'Young Apostles', away: 'Berekum Chelsea', venue: 'Wenchi Sports Stadium', date: 'Apr 11, 2027', type: 'Home' },
  { week: 30, home: 'Bibiani Gold Stars', away: 'Young Apostles', venue: 'DUN’s Park, Bibiani', date: 'Apr 18, 2027', type: 'Away' },
  { week: 31, home: 'Young Apostles', away: 'Bechem United', venue: 'Wenchi Sports Stadium', date: 'Apr 25, 2027', type: 'Home' },
  { week: 32, home: 'Hearts of Oak', away: 'Young Apostles', venue: 'Accra Sports Stadium', date: 'May 2, 2027', type: 'Away' },
  { week: 33, home: 'Young Apostles', away: 'Dreams FC', venue: 'Wenchi Sports Stadium', date: 'May 9, 2027', type: 'Home' },
  { week: 34, home: 'Port City', away: 'Young Apostles', venue: 'Port City Stadium', date: 'May 16, 2027', type: 'Away' }
];

// ==========================================
// 4. SHOPPING CART STATE & MANAGEMENT
// ==========================================
let cart = [];
let appliedDiscount = 0;
const SHIPPING_FEE = 25; // GHS

try {
  const saved = localStorage.getItem('yafc_cart');
  if (saved) cart = JSON.parse(saved);
} catch (e) {
  cart = [];
}

function saveCart() {
  try {
    localStorage.setItem('yafc_cart', JSON.stringify(cart));
  } catch (e) {}
  updateCartUI();
}

function addToCart(productId, size = 'L', customization = '', qty = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const itemKey = `${productId}_${size}_${customization.trim()}`;
  const existing = cart.find(item => item.key === itemKey);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      key: itemKey,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      customization: customization.trim(),
      qty: qty
    });
  }

  saveCart();
  showToast(`"${product.name}" added to cart!`);
}

function updateItemQty(itemKey, delta) {
  const item = cart.find(i => i.key === itemKey);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.key !== itemKey);
  }
  saveCart();
}

function removeItem(itemKey) {
  cart = cart.filter(i => i.key !== itemKey);
  saveCart();
  showToast('Item removed from cart.');
}

function clearCart() {
  cart = [];
  appliedDiscount = 0;
  saveCart();
}

function getCartSubtotal() {
  return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
}

function getCartTotalCount() {
  return cart.reduce((acc, item) => acc + item.qty, 0);
}

function updateCartUI() {
  const count = getCartTotalCount();
  const subtotal = getCartSubtotal();
  const discountAmount = subtotal * appliedDiscount;
  const grandTotal = subtotal > 0 ? (subtotal - discountAmount + SHIPPING_FEE) : 0;

  const badge = document.getElementById('cartCountBadge');
  const floatingBadge = document.getElementById('floatingCartBadge');
  const mobileCount = document.getElementById('cartCountMobile');
  const totalItemsHeader = document.getElementById('cartTotalItems');

  if (badge) badge.textContent = count;
  if (floatingBadge) floatingBadge.textContent = count;
  if (mobileCount) mobileCount.textContent = count;
  if (totalItemsHeader) totalItemsHeader.textContent = count;

  const listEl = document.getElementById('cartItemsList');
  const cartFooter = document.getElementById('cartFooter');

  if (listEl) {
    if (cart.length === 0) {
      listEl.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-basket-shopping cart-empty-icon"></i>
          <p>Your shopping bag is empty.</p>
          <button class="btn-shop-now" onclick="closeCartDrawer(); window.location.href='#store';">Explore 2026/27 Kits</button>
        </div>
      `;
      if (cartFooter) cartFooter.style.display = 'none';
    } else {
      if (cartFooter) cartFooter.style.display = 'block';
      listEl.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item__img">
          <div class="cart-item__details">
            <h4 class="cart-item__title">${item.name}</h4>
            <div class="cart-item__meta">
              <span>Size: <strong>${item.size}</strong></span>
              ${item.customization ? `<span class="cart-item__custom">Badge: <strong>${item.customization}</strong></span>` : ''}
            </div>
            <div class="cart-item__price">GHS ${(item.price * item.qty).toFixed(2)}</div>
            <div class="cart-item__qty-ctrl">
              <button onclick="updateItemQty('${item.key}', -1)"><i class="fa-solid fa-minus"></i></button>
              <span>${item.qty}</span>
              <button onclick="updateItemQty('${item.key}', 1)"><i class="fa-solid fa-plus"></i></button>
              <button class="cart-item__del" onclick="removeItem('${item.key}')" title="Remove item"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('cartDiscountRow');
  const discountEl = document.getElementById('cartDiscount');
  const grandTotalEl = document.getElementById('cartGrandTotal');

  if (subtotalEl) subtotalEl.textContent = `GHS ${subtotal.toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.textContent = `GHS ${grandTotal.toFixed(2)}`;

  if (discountRow) {
    if (appliedDiscount > 0 && subtotal > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `- GHS ${discountAmount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function showToast(message) {
  const toast = document.getElementById('shopToast');
  const text = document.getElementById('shopToastText');
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ==========================================
// 5. STORE PRODUCTS RENDERING & FILTER
// ==========================================
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const items = PRODUCTS_DATA.filter(p => filter === 'all' || p.category === filter);
  grid.innerHTML = items.map(product => `
    <div class="product-card">
      <div class="product-card__thumb">
        <span class="product-tag">${product.tag}</span>
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-overlay-actions">
          <button class="btn-quick-view" onclick="openProductQuickView('${product.id}')"><i class="fa-regular fa-eye"></i> Quick View</button>
        </div>
      </div>
      <div class="product-card__body">
        <span class="product-cat">${product.category.toUpperCase()}</span>
        <h3 class="product-name" onclick="openProductQuickView('${product.id}')">${product.name}</h3>
        <div class="product-price-row">
          <span class="product-price-main">GHS ${product.price.toFixed(2)}</span>
          ${product.oldPrice ? `<span class="product-price-old">GHS ${product.oldPrice.toFixed(2)}</span>` : ''}
        </div>
        <div class="product-card__footer">
          <button class="btn-add-cart-sm" onclick="addToCart('${product.id}', 'L', '', 1)">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
          </button>
          <button class="btn-customize-sm" onclick="openProductQuickView('${product.id}')" title="Personalize or View Options">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function initStoreFilters() {
  const pills = document.querySelectorAll('.store-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderProducts(pill.dataset.filter);
    });
  });
}

// ==========================================
// 6. PRODUCT QUICK VIEW / PERSONALIZATION MODAL
// ==========================================
let currentModalProductId = null;
let selectedProductSize = 'L';

function openProductQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  currentModalProductId = productId;
  selectedProductSize = 'L';

  const modal = document.getElementById('productModal');
  const content = document.getElementById('productModalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="prod-modal-grid">
      <div class="prod-modal-media">
        <img src="${product.image}" alt="${product.name}" id="modalProductImg" class="modal-large-img">
        ${product.customizable ? `
          <div class="jersey-preview-badge" id="jerseyBadgePreview" style="display:none;">
            <div class="badge-num" id="badgePreviewNum">8</div>
            <div class="badge-name" id="badgePreviewName">RAMZY</div>
          </div>
        ` : ''}
      </div>

      <div class="prod-modal-info">
        <span class="product-tag">${product.tag}</span>
        <h2 class="prod-modal-title">${product.name}</h2>
        <div class="prod-modal-price-row">
          <span class="prod-modal-price">GHS ${product.price.toFixed(2)}</span>
          ${product.oldPrice ? `<span class="prod-modal-old-price">GHS ${product.oldPrice.toFixed(2)}</span>` : ''}
          <span class="in-stock-pill"><i class="fa-solid fa-circle-check"></i> In Stock (Wenchi Store)</span>
        </div>

        <p class="prod-modal-desc">${product.description}</p>

        <!-- Size Picker -->
        <div class="prod-option-block">
          <label class="prod-option-label">SELECT SIZE:</label>
          <div class="size-selector-pills">
            <button class="size-btn" onclick="selectSize(this, 'S')">S</button>
            <button class="size-btn" onclick="selectSize(this, 'M')">M</button>
            <button class="size-btn active" onclick="selectSize(this, 'L')">L</button>
            <button class="size-btn" onclick="selectSize(this, 'XL')">XL</button>
            <button class="size-btn" onclick="selectSize(this, 'XXL')">XXL</button>
          </div>
        </div>

        <!-- Customization -->
        ${product.customizable ? `
          <div class="prod-option-block customization-box">
            <label class="prod-option-label"><i class="fa-solid fa-wand-magic-sparkles text-gold"></i> PLAYER / CUSTOM PRINTING (FREE):</label>
            <div class="custom-input-grid">
              <input type="text" id="customJerseyName" placeholder="Name on back (e.g. RAMZY, MENSAH)" maxlength="14" oninput="updateJerseyPreview()">
              <input type="number" id="customJerseyNum" placeholder="No." min="1" max="99" oninput="updateJerseyPreview()">
            </div>
            <div class="quick-player-tags">
              <span>Quick select:</span>
              <button type="button" class="btn-q-player" onclick="applyQuickPlayer('RAMZY', '8')">#8 RAMZY</button>
              <button type="button" class="btn-q-player" onclick="applyQuickPlayer('MENSAH', '7')">#7 MENSAH</button>
              <button type="button" class="btn-q-player" onclick="applyQuickPlayer('BOATENG', '31')">#31 BOATENG</button>
              <button type="button" class="btn-q-player" onclick="applyQuickPlayer('GAKPO', '9')">#9 GAKPO</button>
            </div>
          </div>
        ` : ''}

        <!-- Add to cart button row -->
        <div class="prod-action-row">
          <div class="qty-stepper">
            <button onclick="stepModalQty(-1)"><i class="fa-solid fa-minus"></i></button>
            <input type="number" id="modalQtyInput" value="1" min="1" max="10" readonly>
            <button onclick="stepModalQty(1)"><i class="fa-solid fa-plus"></i></button>
          </div>
          <button class="btn-add-modal" onclick="submitModalAddToCart()">
            <i class="fa-solid fa-bag-shopping"></i> ADD TO CART
          </button>
        </div>

        <div class="prod-badges-guarantee">
          <span><i class="fa-solid fa-shield-check text-gold"></i> 100% Official Mayniak Apparel</span>
          <span><i class="fa-solid fa-truck text-gold"></i> Fast Doorstep Dispatch across Ghana</span>
        </div>

      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function selectSize(btn, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedProductSize = size;
}

function applyQuickPlayer(name, num) {
  const nameInput = document.getElementById('customJerseyName');
  const numInput = document.getElementById('customJerseyNum');
  if (nameInput && numInput) {
    nameInput.value = name;
    numInput.value = num;
    updateJerseyPreview();
  }
}

function updateJerseyPreview() {
  const nameInput = document.getElementById('customJerseyName');
  const numInput = document.getElementById('customJerseyNum');
  const badgeWrap = document.getElementById('jerseyBadgePreview');
  const badgeName = document.getElementById('badgePreviewName');
  const badgeNum = document.getElementById('badgePreviewNum');

  if (!badgeWrap || !nameInput || !numInput) return;

  const nameVal = nameInput.value.trim().toUpperCase();
  const numVal = numInput.value.trim();

  if (nameVal || numVal) {
    badgeWrap.style.display = 'block';
    badgeName.textContent = nameVal || 'APOSTLE';
    badgeNum.textContent = numVal || '26';
  } else {
    badgeWrap.style.display = 'none';
  }
}

function stepModalQty(delta) {
  const input = document.getElementById('modalQtyInput');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 10) val = 10;
  input.value = val;
}

function submitModalAddToCart() {
  if (!currentModalProductId) return;

  const qtyInput = document.getElementById('modalQtyInput');
  const nameInput = document.getElementById('customJerseyName');
  const numInput = document.getElementById('customJerseyNum');

  const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
  let customization = '';
  if (nameInput && numInput && (nameInput.value.trim() || numInput.value.trim())) {
    customization = `${nameInput.value.trim().toUpperCase()} #${numInput.value.trim()}`;
  }

  addToCart(currentModalProductId, selectedProductSize, customization, qty);
  closeProductModal();
  openCartDrawer();
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// 7. CHECKOUT & MOMO SIMULATION
// ==========================================
function initCheckout() {
  const proceedBtn = document.getElementById('proceedCheckoutBtn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty.');
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }

  const couponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');
  const couponMsg = document.getElementById('couponMessage');

  if (couponBtn && couponInput) {
    couponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim().toUpperCase();
      if (code === 'APOSTLES10' || code === 'WENCHI10' || code === 'GPL2026') {
        appliedDiscount = 0.10;
        if (couponMsg) {
          couponMsg.innerHTML = '<span class="text-green"><i class="fa-solid fa-check"></i> Coupon applied: 10% Discount!</span>';
        }
        saveCart();
      } else {
        if (couponMsg) {
          couponMsg.innerHTML = '<span class="text-red"><i class="fa-solid fa-xmark"></i> Invalid coupon code. Try "APOSTLES10".</span>';
        }
      }
    });
  }
}

function openCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  const count = getCartTotalCount();
  const subtotal = getCartSubtotal();
  const discountAmount = subtotal * appliedDiscount;
  const grandTotal = subtotal - discountAmount + SHIPPING_FEE;

  document.getElementById('coItemCount').textContent = count;
  document.getElementById('coSubtotal').textContent = `GHS ${subtotal.toFixed(2)}`;
  document.getElementById('coGrandTotal').textContent = `GHS ${grandTotal.toFixed(2)}`;
  document.getElementById('coPayBtnAmount').textContent = `GHS ${grandTotal.toFixed(2)}`;

  document.getElementById('checkoutFormStep').style.display = 'block';
  document.getElementById('checkoutSuccessStep').style.display = 'none';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btnPayNow');
  const custName = document.getElementById('custName').value.trim();
  const custPhone = document.getElementById('custPhone').value.trim();
  const custCity = document.getElementById('custCity').value.trim();
  const custAddress = document.getElementById('custAddress').value.trim();
  const method = document.querySelector('input[name="payMethod"]:checked').value;

  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing MoMo Payment...`;
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `<i class="fa-solid fa-lock"></i> AUTHORIZE & PAY`;
    btn.disabled = false;

    const orderRef = `#YAFC-${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById('confirmedOrderRef').textContent = orderRef;

    const subtotal = getCartSubtotal();
    const discountAmount = subtotal * appliedDiscount;
    const grandTotal = subtotal - discountAmount + SHIPPING_FEE;

    const receipt = document.getElementById('receiptSummary');
    if (receipt) {
      receipt.innerHTML = `
        <div class="rcpt-row"><span>Customer:</span> <strong>${custName} (${custPhone})</strong></div>
        <div class="rcpt-row"><span>Delivery To:</span> <strong>${custAddress}, ${custCity}</strong></div>
        <div class="rcpt-row"><span>Payment Channel:</span> <strong>${method === 'mtn_momo' ? 'MTN Mobile Money' : method === 'telecel' ? 'Telecel Cash' : 'Card'}</strong></div>
        <div class="rcpt-divider"></div>
        <div class="rcpt-items">
          ${cart.map(item => `
            <div class="rcpt-item-row">
              <span>${item.qty}x ${item.name} (${item.size}) ${item.customization ? `[${item.customization}]` : ''}</span>
              <strong>GHS ${(item.price * item.qty).toFixed(2)}</strong>
            </div>
          `).join('')}
        </div>
        <div class="rcpt-divider"></div>
        <div class="rcpt-row total"><span>Total Paid:</span> <strong class="text-gold">GHS ${grandTotal.toFixed(2)}</strong></div>
      `;
    }

    document.getElementById('checkoutFormStep').style.display = 'none';
    document.getElementById('checkoutSuccessStep').style.display = 'block';
  }, 1800);
}

// ==========================================
// 8. SQUAD RENDERING & POSITION TABS
// ==========================================
function renderSquad(filter = 'all') {
  const grid = document.getElementById('squadGrid');
  if (!grid) return;

  let players = SQUAD_DATA;
  if (filter === 'GK') players = SQUAD_DATA.filter(p => p.role === 'GK');
  else if (filter === 'DF') players = SQUAD_DATA.filter(p => p.role === 'DF');
  else if (filter === 'MD') players = SQUAD_DATA.filter(p => p.role === 'MD');
  else if (filter === 'FW') players = SQUAD_DATA.filter(p => p.role === 'FW');
  else if (filter === 'U17') players = SQUAD_DATA.filter(p => p.isU17);

  grid.innerHTML = players.map(p => `
    <div class="player-box">
      <div class="player-box__top">
        <div class="player-box__silhouette">
          <i class="fa-solid fa-user-shield"></i>
        </div>
        <span class="player-box__num">#${p.number}</span>
        ${p.isU17 ? '<span class="player-badge-u17">U-17</span>' : ''}
      </div>
      <div class="player-box__info">
        <span class="player-pos-tag">${p.posName.toUpperCase()}</span>
        <h3 class="player-fullname">${p.name}</h3>
        <div class="player-meta-row">
          <span><i class="fa-solid fa-shirt"></i> GPL 2026/27</span>
          <span><i class="fa-solid fa-location-dot"></i> ${p.origin}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function initSquadFilter() {
  const tabs = document.querySelectorAll('.pos-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSquad(tab.dataset.filter);
    });
  });
}

// ==========================================
// 9. FIXTURES MODAL & ROUND SWITCHER
// ==========================================
function switchFixturesRound(roundNum) {
  const btn1 = document.getElementById('tabRound1');
  const btn2 = document.getElementById('tabRound2');
  const btn3 = document.getElementById('tabOfficialSheet');
  const listContainer = document.getElementById('fixturesListContainer');
  const sheetContainer = document.getElementById('officialSheetContainer');

  [btn1, btn2, btn3].forEach(b => b && b.classList.remove('active'));

  if (roundNum === 1) {
    if (btn1) btn1.classList.add('active');
    if (listContainer) listContainer.style.display = 'grid';
    if (sheetContainer) sheetContainer.style.display = 'none';
    renderFixturesList(FIXTURES_ROUND_1, 1);
  } else if (roundNum === 2) {
    if (btn2) btn2.classList.add('active');
    if (listContainer) listContainer.style.display = 'grid';
    if (sheetContainer) sheetContainer.style.display = 'none';
    renderFixturesList(FIXTURES_ROUND_2, 2);
  } else if (roundNum === 3) {
    if (btn3) btn3.classList.add('active');
    if (listContainer) listContainer.style.display = 'none';
    if (sheetContainer) sheetContainer.style.display = 'block';
  }
}

function renderFixturesList(list, roundNum) {
  const container = document.getElementById('fixturesListContainer');
  if (!container) return;

  container.innerHTML = list.map(m => `
    <div class="fx-modal-item ${m.type === 'Home' ? 'fx-home-item' : ''}">
      <div class="fx-modal-week">WEEK ${m.week} · ${m.type.toUpperCase()}</div>
      <div class="fx-modal-match-row">
        <strong class="${m.home.includes('Young Apostles') ? 'text-gold' : ''}">${m.home}</strong>
        <span class="fx-vs-mini">vs</span>
        <strong class="${m.away.includes('Young Apostles') ? 'text-gold' : ''}">${m.away}</strong>
      </div>
      <div class="fx-modal-meta">
        <span><i class="fa-regular fa-calendar"></i> ${m.date}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${m.venue}</span>
      </div>
    </div>
  `).join('');
}

function openFixturesModal() {
  const modal = document.getElementById('fixturesModal');
  if (modal) {
    switchFixturesRound(1);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeFixturesModal() {
  const modal = document.getElementById('fixturesModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// 10. APOSTLES TV+ YOUTUBE LINKS
// ==========================================
function openYouTubeLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ==========================================
// 11. MEMBERSHIP MODAL
// ==========================================
function openMembershipModal() {
  const modal = document.getElementById('membershipModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMembershipModal() {
  const modal = document.getElementById('membershipModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function joinMembership(tierName) {
  alert(`Thank you for choosing ${tierName}! Welcome to the Young Apostles FC family.`);
  closeMembershipModal();
}

// ==========================================
// 12. SEARCH DRAWER & LIVE FILTER
// ==========================================
function initSearch() {
  const btn = document.getElementById('searchToggle');
  const drawer = document.getElementById('searchDrawer');
  const close = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');
  const resultsBox = document.getElementById('searchResultsBox');

  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    drawer.classList.toggle('show');
    if (drawer.classList.contains('show') && input) input.focus();
  });

  if (close) close.addEventListener('click', () => drawer.classList.remove('show'));

  if (input && resultsBox) {
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        resultsBox.innerHTML = '';
        return;
      }

      const matchedPlayers = SQUAD_DATA.filter(p => p.name.toLowerCase().includes(q) || p.posName.toLowerCase().includes(q));
      const matchedProducts = PRODUCTS_DATA.filter(p => p.name.toLowerCase().includes(q));
      const matchedFixtures = FIXTURES_ROUND_1.filter(f => f.home.toLowerCase().includes(q) || f.away.toLowerCase().includes(q));

      let html = '<div class="search-results-list">';
      if (matchedPlayers.length > 0) {
        html += '<div class="sr-category">FIRST TEAM PLAYERS</div>';
        matchedPlayers.slice(0, 5).forEach(p => {
          html += `
            <div class="sr-item" onclick="window.location.href='#firstteam'; document.getElementById('searchDrawer').classList.remove('show');">
              <i class="fa-solid fa-user-shield text-blue"></i>
              <span>#${p.number} ${p.name} (${p.posName})</span>
            </div>
          `;
        });
      }

      if (matchedProducts.length > 0) {
        html += '<div class="sr-category">STORE ITEMS</div>';
        matchedProducts.forEach(p => {
          html += `
            <div class="sr-item" onclick="openProductQuickView('${p.id}'); document.getElementById('searchDrawer').classList.remove('show');">
              <i class="fa-solid fa-shirt text-gold"></i>
              <span>${p.name} — <strong>GHS ${p.price}</strong></span>
            </div>
          `;
        });
      }

      if (matchedFixtures.length > 0) {
        html += '<div class="sr-category">FIXTURES</div>';
        matchedFixtures.slice(0, 4).forEach(f => {
          html += `
            <div class="sr-item" onclick="openFixturesModal(); document.getElementById('searchDrawer').classList.remove('show');">
              <i class="fa-solid fa-calendar-days text-gold"></i>
              <span>Week ${f.week}: ${f.home} vs ${f.away}</span>
            </div>
          `;
        });
      }

      if (matchedProducts.length === 0 && matchedPlayers.length === 0 && matchedFixtures.length === 0) {
        html += '<div class="sr-item sr-empty">No matching results found for "' + q + '".</div>';
      }

      html += '</div>';
      resultsBox.innerHTML = html;
    });
  }
}

// ==========================================
// 13. COUNTDOWN TIMER (MATCHDAY 1)
// ==========================================
function initCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 4);
  target.setHours(15, 0, 0, 0);

  const dEl = document.getElementById('cdDays');
  const hEl = document.getElementById('cdHours');
  const mEl = document.getElementById('cdMins');
  const sEl = document.getElementById('cdSecs');

  if (!dEl) return;

  function tick() {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
      return;
    }
    dEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    hEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    mEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    sEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

// Mobile Navbar
function initNavbar() {
  const hamburger = document.getElementById('navHamburger');
  const drawer = document.getElementById('navMobileDrawer');
  const nav = document.getElementById('mainNav');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 6px 20px rgba(0,0,0,0.18)'
        : '0 2px 8px rgba(0,0,0,0.12)';
    }
  });
}

function closeMobileNav() {
  const drawer = document.getElementById('navMobileDrawer');
  if (drawer) drawer.classList.remove('open');
}

// ==========================================
// 14. INITIALIZE ALL COMPONENTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSearch();
  initCountdown();
  renderSquad('all');
  initSquadFilter();
  renderProducts('all');
  initStoreFilters();
  initCheckout();
  updateCartUI();

  // Cart button triggers
  const navCartBtn = document.getElementById('navCartBtn');
  const floatCartBtn = document.getElementById('floatingCartBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartOverlay = document.getElementById('cartOverlay');

  if (navCartBtn) navCartBtn.addEventListener('click', openCartDrawer);
  if (floatCartBtn) floatCartBtn.addEventListener('click', openCartDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

  // Fixtures modal buttons
  const openFxBtn1 = document.getElementById('openFixturesModalBtn');
  const openFxBtn2 = document.getElementById('openFullFixturesModal');
  const openFxBtn3 = document.getElementById('openFixturesFromTableBtn');

  if (openFxBtn1) openFxBtn1.addEventListener('click', (e) => { e.preventDefault(); openFixturesModal(); });
  if (openFxBtn2) openFxBtn2.addEventListener('click', openFixturesModal);
  if (openFxBtn3) openFxBtn3.addEventListener('click', openFixturesModal);

  // Membership buttons
  const memBtn = document.getElementById('openMembershipBtn');
  if (memBtn) memBtn.addEventListener('click', openMembershipModal);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeProductModal();
      closeCheckoutModal();
      closeFixturesModal();
      closeMembershipModal();
    }
  });
});
