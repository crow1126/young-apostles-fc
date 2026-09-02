/**
 * YOUNG APOSTLES FOOTBALL CLUB — OFFICIAL JAVASCRIPT
 * Dribbble Premier UI/UX Design System
 * 38-Player Squad, Team Shop, Cart System, GPL 2026/27 Fixtures, Rankings & Highlights
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
    name: 'Official 2026/27 Home Match Kit',
    category: 'kits',
    price: 350,
    oldPrice: 420,
    image: 'assets/kit-home-hanging.jpg',
    tag: 'OFFICIAL 2026/27',
    description: 'The authentic 2026/27 Young Apostles FC Home Jersey engineered by Mayniak. Features radiant golden yellow textured fabric with navy blue trims, Ghana Premier League sleeve badge, breathable moisture-wicking technology, and the iconic club crest.',
    customizable: true
  },
  {
    id: 'kit-home-showcase',
    name: 'Home Kit 2026/27 (Player Edition)',
    category: 'kits',
    price: 380,
    oldPrice: 450,
    image: 'assets/kit-home-2026.jpg',
    tag: 'PLAYER EDITION',
    description: 'Official 2026/27 Player Edition match jersey as modeled by Ramzy #8 and squad. Complete with matchday cut and breathable mesh ventilation.',
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
  }
];

// ==========================================
// 3. DATA: 34-WEEK GPL FIXTURES
// ==========================================
const FIXTURES_ROUND_1 = [
  { week: 1, home: 'Vision FC', away: 'Young Apostles', venue: 'Nii Adjei Kraku Stadium', date: 'Sep 4, 2026', type: 'Away' },
  { week: 2, home: 'Young Apostles', away: 'Basake Holy Stars', venue: 'Wenchi Sports Stadium', date: 'Sep 11, 2026', type: 'Home' },
  { week: 3, home: 'Debibi United', away: 'Young Apostles', venue: 'Debibi Park', date: 'Sep 20, 2026', type: 'Away' },
  { week: 4, home: 'Young Apostles', away: 'Heart of Lions', venue: 'Wenchi Sports Stadium', date: 'Sep 27, 2026', type: 'Home' },
  { week: 5, home: 'Samartex', away: 'Young Apostles', venue: 'Nsenkyire Sports Complex', date: 'Oct 4, 2026', type: 'Away' },
  { week: 6, home: 'Young Apostles', away: 'Aduana Stars', venue: 'Wenchi Sports Stadium', date: 'Oct 11, 2026', type: 'Home' },
  { week: 7, home: 'Asante Kotoko', away: 'Young Apostles', venue: 'Baba Yara Sports Stadium', date: 'Oct 18, 2026', type: 'Away' },
  { week: 8, home: 'Young Apostles', away: 'Hearts of Oak', venue: 'Wenchi Sports Stadium', date: 'Oct 25, 2026', type: 'Home' },
  { week: 9, home: 'Berekum Chelsea', away: 'Young Apostles', venue: 'Golden City Park', date: 'Nov 1, 2026', type: 'Away' },
  { week: 10, home: 'Young Apostles', away: 'Medeama SC', venue: 'Wenchi Sports Stadium', date: 'Nov 8, 2026', type: 'Home' },
  { week: 11, home: 'Accra Lions', away: 'Young Apostles', venue: 'Accra Sports Stadium', date: 'Nov 15, 2026', type: 'Away' },
  { week: 12, home: 'Young Apostles', away: 'Legon Cities', venue: 'Wenchi Sports Stadium', date: 'Nov 22, 2026', type: 'Home' },
  { week: 13, home: 'Bechem United', away: 'Young Apostles', venue: 'Nana Fosu Gyeabour Park', date: 'Nov 29, 2026', type: 'Away' },
  { week: 14, home: 'Young Apostles', away: 'Karela United', venue: 'Wenchi Sports Stadium', date: 'Dec 6, 2026', type: 'Home' },
  { week: 15, home: 'Nsoatreman FC', away: 'Young Apostles', venue: 'Nana Kronmansah Park', date: 'Dec 13, 2026', type: 'Away' },
  { week: 16, home: 'Young Apostles', away: 'Gold Stars FC', venue: 'Wenchi Sports Stadium', date: 'Dec 20, 2026', type: 'Home' },
  { week: 17, home: 'Dreams FC', away: 'Young Apostles', venue: 'Theatre of Dreams, Dawu', date: 'Jan 3, 2027', type: 'Away' }
];

const FIXTURES_ROUND_2 = [
  { week: 18, home: 'Young Apostles', away: 'Vision FC', venue: 'Wenchi Sports Stadium', date: 'Jan 17, 2027', type: 'Home' },
  { week: 19, home: 'Basake Holy Stars', away: 'Young Apostles', venue: 'Aiyinase Arena', date: 'Jan 24, 2027', type: 'Away' },
  { week: 20, home: 'Young Apostles', away: 'Debibi United', venue: 'Wenchi Sports Stadium', date: 'Jan 31, 2027', type: 'Home' },
  { week: 21, home: 'Heart of Lions', away: 'Young Apostles', venue: 'Kpando Stadium', date: 'Feb 7, 2027', type: 'Away' },
  { week: 22, home: 'Young Apostles', away: 'Samartex', venue: 'Wenchi Sports Stadium', date: 'Feb 14, 2027', type: 'Home' },
  { week: 23, home: 'Aduana Stars', away: 'Young Apostles', venue: 'Nana Agyemang Badu I Park', date: 'Feb 21, 2027', type: 'Away' },
  { week: 24, home: 'Young Apostles', away: 'Asante Kotoko', venue: 'Wenchi Sports Stadium', date: 'Feb 28, 2027', type: 'Home' },
  { week: 25, home: 'Hearts of Oak', away: 'Young Apostles', venue: 'Accra Sports Stadium', date: 'Mar 7, 2027', type: 'Away' },
  { week: 26, home: 'Young Apostles', away: 'Berekum Chelsea', venue: 'Wenchi Sports Stadium', date: 'Mar 14, 2027', type: 'Home' },
  { week: 27, home: 'Medeama SC', away: 'Young Apostles', venue: 'T&A Stadium, Tarkwa', date: 'Mar 21, 2027', type: 'Away' },
  { week: 28, home: 'Young Apostles', away: 'Accra Lions', venue: 'Wenchi Sports Stadium', date: 'Apr 4, 2027', type: 'Home' },
  { week: 29, home: 'Legon Cities', away: 'Young Apostles', venue: 'El-Wak Stadium', date: 'Apr 11, 2027', type: 'Away' },
  { week: 30, home: 'Young Apostles', away: 'Bechem United', venue: 'Wenchi Sports Stadium', date: 'Apr 18, 2027', type: 'Home' },
  { week: 31, home: 'Karela United', away: 'Young Apostles', venue: 'Naa Sheriga Sports Complex', date: 'Apr 25, 2027', type: 'Away' },
  { week: 32, home: 'Young Apostles', away: 'Nsoatreman FC', venue: 'Wenchi Sports Stadium', date: 'May 2, 2027', type: 'Home' },
  { week: 33, home: 'Gold Stars FC', away: 'Young Apostles', venue: 'DUN’s Park, Bibiani', date: 'May 9, 2027', type: 'Away' },
  { week: 34, home: 'Young Apostles', away: 'Dreams FC', venue: 'Wenchi Sports Stadium', date: 'May 16, 2027', type: 'Home' }
];

// ==========================================
// 4. CART & STATE MANAGEMENT
// ==========================================
let cart = [];

function loadCart() {
  try {
    const saved = localStorage.getItem('ya_cart');
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('ya_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, customName = '', customNumber = '', size = 'L') {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const itemKey = `${productId}-${size}-${customName}-${customNumber}`;
  const existing = cart.find(item => item.key === itemKey);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key: itemKey,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      customName: customName,
      customNumber: customNumber,
      qty: 1
    });
  }

  saveCart();
  showToast(`Added ${product.name} to bag!`);
  openCartDrawer();
}

function removeFromCart(key) {
  cart = cart.filter(item => item.key !== key);
  saveCart();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const grandTotal = subtotal > 0 ? subtotal + 25 : 0;

  // Badges
  const navBadge = document.getElementById('navCartCount');
  const floatBadge = document.getElementById('floatCartBadge');
  const drawerCount = document.getElementById('cartItemCount');
  const shopCounter = document.getElementById('shopCartCounter');

  if (navBadge) navBadge.textContent = totalCount;
  if (floatBadge) floatBadge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = totalCount;
  if (shopCounter) shopCounter.textContent = totalCount;

  // Totals
  const subtotalEl = document.getElementById('cartSubtotal');
  const grandTotalEl = document.getElementById('cartGrandTotal');
  if (subtotalEl) subtotalEl.textContent = `GHS ${subtotal.toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.textContent = `GHS ${grandTotal.toFixed(2)}`;

  // Cart List
  const listEl = document.getElementById('cartItemsList');
  if (listEl) {
    if (cart.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
          <i class="fa-solid fa-basket-shopping" style="font-size:2.5rem; margin-bottom:1rem; opacity:0.3;"></i>
          <p>Your shopping bag is empty.</p>
          <button class="btn-hero-primary" style="margin-top:1rem; font-size:0.85rem;" onclick="closeCartDrawer(); window.location.href='#store';">
            Explore 2026/27 Kits
          </button>
        </div>
      `;
    } else {
      listEl.innerHTML = cart.map(item => `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-meta">Size: ${item.size} ${item.customName ? `| Printing: ${item.customName} #${item.customNumber}` : ''}</div>
            <div class="cart-item-meta">Qty: ${item.qty}</div>
            <div class="cart-item-price">GHS ${(item.price * item.qty).toFixed(2)}</div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.key}')" title="Remove item">&times;</button>
        </div>
      `).join('');
    }
  }
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

// ==========================================
// 5. RENDERING SQUAD GRID
// ==========================================
function renderSquad(filter = 'all') {
  const grid = document.getElementById('squadGrid');
  if (!grid) return;

  let list = SQUAD_DATA;
  if (filter === 'GK') list = SQUAD_DATA.filter(p => p.role === 'GK');
  else if (filter === 'DF') list = SQUAD_DATA.filter(p => p.role === 'DF');
  else if (filter === 'MD') list = SQUAD_DATA.filter(p => p.role === 'MD');
  else if (filter === 'FW') list = SQUAD_DATA.filter(p => p.role === 'FW');
  else if (filter === 'U17') list = SQUAD_DATA.filter(p => p.isU17);

  grid.innerHTML = list.map(player => `
    <div class="squad-card" onclick="openPlayerModal(${player.id})">
      <div class="squad-card__top">
        <span class="squad-number">#${player.number}</span>
        <span class="squad-role-tag squad-role-tag--${player.role}">
          ${player.isU17 ? 'U-17 ' : ''}${player.role}
        </span>
      </div>
      <div class="squad-name">${player.name}</div>
      <div class="squad-pos-full">${player.posName}</div>
      <div class="squad-stats-mini">
        <span><i class="fa-solid fa-shirt"></i> Apps: ${player.apps}</span>
        <span><i class="fa-solid ${player.role === 'GK' ? 'fa-shield' : 'fa-futbol'}"></i> ${player.role === 'GK' ? `CS: ${player.cleanSheets}` : `Goals: ${player.goals || 0}`}</span>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 6. RENDERING TEAM SHOP PRODUCTS
// ==========================================
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  let list = PRODUCTS_DATA;
  if (filter !== 'all') list = PRODUCTS_DATA.filter(p => p.category === filter);

  grid.innerHTML = list.map(product => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}">
        <span class="product-tag-pill">${product.tag}</span>
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price-row">
          <span class="product-price">GHS ${product.price}.00</span>
          ${product.oldPrice ? `<span class="product-old-price">GHS ${product.oldPrice}.00</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart('${product.id}')">
            <i class="fa-solid fa-cart-plus"></i> Add to Bag
          </button>
          <button class="btn-quick-view" onclick="openProductModal('${product.id}')" title="Quick View & Customize">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 7. PRODUCT MODAL & CUSTOMIZER
// ==========================================
function openProductModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const content = document.getElementById('productModalContent');
  if (!content) return;

  content.innerHTML = `
    <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:1.5rem;">
      <div>
        <img src="${product.image}" alt="${product.name}" style="border-radius:var(--radius-md); width:100%;">
      </div>
      <div>
        <span style="font-size:0.75rem; font-weight:700; color:var(--ya-green); text-transform:uppercase;">${product.tag}</span>
        <h3 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800; margin:0.25rem 0 0.5rem;">${product.name}</h3>
        <div style="font-size:1.35rem; font-weight:800; color:var(--ya-green); margin-bottom:0.75rem;">GHS ${product.price}.00</div>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:1rem;">${product.description}</p>
        
        <div class="form-group" style="margin-bottom:0.75rem;">
          <label>Select Size</label>
          <select id="modalSize">
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L" selected>Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
            <option value="XXL">Double XL (XXL)</option>
          </select>
        </div>

        ${product.customizable ? `
          <div style="background:var(--bg-subtle); padding:0.75rem; border-radius:var(--radius-sm); margin-bottom:1rem;">
            <div style="font-size:0.8rem; font-weight:700; margin-bottom:0.5rem; color:var(--text-main);">
              <i class="fa-solid fa-shirt text-gold"></i> Free Official Player Printing
            </div>
            <div class="form-grid" style="margin-bottom:0;">
              <div class="form-group">
                <input type="text" placeholder="Name (e.g. RAMZY)" id="modalCustomName">
              </div>
              <div class="form-group">
                <input type="number" placeholder="No (e.g. 8)" id="modalCustomNum">
              </div>
            </div>
          </div>
        ` : ''}

        <button class="btn-hero-primary" style="width:100%; justify-content:center;" onclick="handleModalAdd('${product.id}')">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
      </div>
    </div>
  `;

  document.getElementById('productModal').classList.add('open');
}

function handleModalAdd(productId) {
  const size = document.getElementById('modalSize')?.value || 'L';
  const name = document.getElementById('modalCustomName')?.value || '';
  const num = document.getElementById('modalCustomNum')?.value || '';
  addToCart(productId, name, num, size);
  closeProductModal();
}

function closeProductModal() {
  document.getElementById('productModal')?.classList.remove('open');
}

// ==========================================
// 8. PLAYER MODAL
// ==========================================
function openPlayerModal(playerId) {
  const player = SQUAD_DATA.find(p => p.id === playerId);
  if (!player) return;

  const content = document.getElementById('playerModalContent');
  if (!content) return;

  content.innerHTML = `
    <div style="text-align:center;">
      <div style="width:70px; height:70px; border-radius:50%; background:var(--ya-green); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.75rem; font-weight:800; margin:0 auto 1rem; font-family:var(--font-heading);">
        #${player.number}
      </div>
      <h3 style="font-family:var(--font-heading); font-size:1.5rem; font-weight:800;">${player.name}</h3>
      <p style="color:var(--ya-green); font-weight:700; font-size:0.9rem;">${player.posName} (${player.role})</p>
      <p style="color:var(--text-muted); font-size:0.85rem; margin-top:0.25rem;">Hometown: ${player.origin} · GPL Registered 2026/27</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1.5rem 0; background:var(--bg-subtle); padding:1rem; border-radius:var(--radius-md);">
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted);">Season Appearances</span>
          <div style="font-size:1.25rem; font-weight:800;">${player.apps}</div>
        </div>
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted);">${player.role === 'GK' ? 'Clean Sheets' : 'Goals'}</span>
          <div style="font-size:1.25rem; font-weight:800; color:var(--ya-green);">${player.role === 'GK' ? player.cleanSheets : (player.goals || 0)}</div>
        </div>
      </div>

      <button class="btn-hero-primary" style="width:100%; justify-content:center;" onclick="closePlayerModal(); openProductModal('kit-home');">
        Order #${player.number} ${player.name.toUpperCase()} Jersey
      </button>
    </div>
  `;

  document.getElementById('playerModal').classList.add('open');
}

function closePlayerModal() {
  document.getElementById('playerModal')?.classList.remove('open');
}

// ==========================================
// 9. FIXTURES MODAL & SWITCHING
// ==========================================
let currentFixturesRound = 1;

function openFixturesModal() {
  renderFixturesModal(currentFixturesRound);
  document.getElementById('fixturesModal')?.classList.add('open');
}

function closeFixturesModal() {
  document.getElementById('fixturesModal')?.classList.remove('open');
}

function switchFixturesTab(roundNum) {
  currentFixturesRound = roundNum;
  document.getElementById('tabR1')?.classList.toggle('active', roundNum === 1);
  document.getElementById('tabR2')?.classList.toggle('active', roundNum === 2);
  document.getElementById('tabR3')?.classList.toggle('active', roundNum === 3);

  const listModal = document.getElementById('fixturesListModal');
  const posterModal = document.getElementById('fixturesPosterModal');

  if (roundNum === 3) {
    if (listModal) listModal.style.display = 'none';
    if (posterModal) posterModal.style.display = 'block';
  } else {
    if (listModal) listModal.style.display = 'block';
    if (posterModal) posterModal.style.display = 'none';
    renderFixturesModal(roundNum);
  }
}

function renderFixturesModal(roundNum) {
  const container = document.getElementById('fixturesListModal');
  if (!container) return;

  const list = roundNum === 1 ? FIXTURES_ROUND_1 : FIXTURES_ROUND_2;
  container.innerHTML = list.map(fx => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; border-bottom:1px solid var(--border-subtle); font-size:0.875rem;">
      <div>
        <span style="font-weight:700; color:var(--ya-green); font-size:0.8rem; margin-right:0.5rem;">WK ${fx.week}</span>
        <strong>${fx.home}</strong> vs <strong>${fx.away}</strong>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">${fx.venue} · ${fx.date}</div>
      </div>
      <span style="padding:2px 8px; border-radius:var(--radius-pill); font-size:0.7rem; font-weight:700; ${fx.type === 'Home' ? 'background:#D1FAE5; color:#065F46;' : 'background:#F3F4F6; color:#374151;'}">
        ${fx.type.toUpperCase()}
      </span>
    </div>
  `).join('');
}

// ==========================================
// 10. CHECKOUT & MEMBERSHIP MODALS
// ==========================================
function openCheckoutModal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (subtotal === 0) {
    showToast('Your cart is empty!');
    return;
  }
  const grandTotal = subtotal + 25;
  const totalEl = document.getElementById('coTotalAmount');
  if (totalEl) totalEl.textContent = `GHS ${grandTotal.toFixed(2)}`;

  closeCartDrawer();
  document.getElementById('checkoutModal')?.classList.add('open');
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal')?.classList.remove('open');
}

function handleCheckout(e) {
  e.preventDefault();
  const name = document.getElementById('coName')?.value;
  const phone = document.getElementById('coPhone')?.value;
  const city = document.getElementById('coCity')?.value;

  showToast(`Order confirmed for ${name}! MoMo prompt sent to ${phone}.`);
  cart = [];
  saveCart();
  closeCheckoutModal();
}

function openMembershipModal() {
  document.getElementById('membershipModal')?.classList.add('open');
}

function closeMembershipModal() {
  document.getElementById('membershipModal')?.classList.remove('open');
}

function joinMembership(tierName) {
  showToast(`Welcome to Young Apostles FC ${tierName}!`);
  closeMembershipModal();
}

function openNewsModal() {
  showToast('Opening full Apostles Media Portal...');
}

function openAboutModal() {
  showToast('Young Apostles FC Heritage & Academy Archive (Wenchi, 2012–2026)');
}

function openYouTubeLink(url) {
  window.open(url, '_blank');
}

function toggleMobileNav() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.toggle('open');
}

// ==========================================
// 11. TOURNAMENT SELECTOR & COUNTDOWN
// ==========================================
const TOURNAMENTS_DATA = {
  gpl: {
    index: '01 / 04',
    title: 'Ghana Premier League',
    season: '2026/2027 Season',
    teams: '18 Clubs',
    dates: '15 August 2026 – 25 May 2027',
    targetDate: new Date(Date.now() + 48 * 24 * 60 * 60 * 1000)
  },
  facup: {
    index: '02 / 04',
    title: 'MTN FA Cup Ghana',
    season: '2026/2027 Knockout Tournament',
    teams: '64 Clubs Nationwide',
    dates: 'October 2026 – June 2027',
    targetDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000)
  },
  supercup: {
    index: '03 / 04',
    title: "President's Super Cup",
    season: '2026 Championship Edition',
    teams: '4 Elite Finalists',
    dates: 'September 2026',
    targetDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
  },
  caf: {
    index: '04 / 04',
    title: 'CAF Champions League Preliminary',
    season: '2027 Pan-African Stage',
    teams: '54 African Champions',
    dates: 'February 2027 – November 2027',
    targetDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)
  }
};

let currentTournament = 'gpl';

function selectTournament(key) {
  currentTournament = key;
  const data = TOURNAMENTS_DATA[key];
  if (!data) return;

  document.querySelectorAll('.tournament-badge-item').forEach(item => item.classList.remove('active'));
  event?.currentTarget?.classList.add('active');

  const idxEl = document.getElementById('tournIndex');
  const titleEl = document.getElementById('tournTitle');
  const seasonEl = document.getElementById('tournSeason');
  const teamsEl = document.getElementById('tournTeams');
  const datesEl = document.getElementById('tournDates');

  if (idxEl) idxEl.textContent = data.index;
  if (titleEl) titleEl.textContent = data.title;
  if (seasonEl) seasonEl.textContent = data.season;
  if (teamsEl) teamsEl.textContent = data.teams;
  if (datesEl) datesEl.textContent = data.dates;
}

function updateCountdown() {
  const data = TOURNAMENTS_DATA[currentTournament];
  if (!data) return;

  const now = new Date().getTime();
  const diff = data.targetDate.getTime() - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('cdDays');
    const hEl = document.getElementById('cdHours');
    const mEl = document.getElementById('cdMins');
    const sEl = document.getElementById('cdSecs');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }
}

// ==========================================
// 12. MATCH CAROUSEL SCROLLER
// ==========================================
function scrollMatches(direction) {
  const grid = document.getElementById('upcomingMatchesGrid');
  if (grid) {
    grid.scrollBy({ left: direction * 280, behavior: 'smooth' });
  }
}

// ==========================================
// 13. TOAST MESSAGING
// ==========================================
function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  const text = document.getElementById('toastText');
  if (toast && text) {
    text.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

// ==========================================
// 14. EVENT LISTENERS INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderSquad('all');
  renderProducts('all');
  setInterval(updateCountdown, 1000);

  // Mobile Toggle
  document.getElementById('mobileToggle')?.addEventListener('click', toggleMobileNav);

  // Cart Trigger
  document.getElementById('navCartBtn')?.addEventListener('click', openCartDrawer);

  // Squad Tabs
  document.querySelectorAll('#squadPositionTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#squadPositionTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSquad(btn.getAttribute('data-squad-filter'));
    });
  });

  // Shop Tabs
  document.querySelectorAll('#shopFilterTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#shopFilterTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.getAttribute('data-shop-filter'));
    });
  });

  // Match Category Tabs
  document.querySelectorAll('#matchCategoryTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#matchCategoryTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Ranking Category Tabs
  document.querySelectorAll('#rankingCategoryTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#rankingCategoryTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Highlight Category Tabs
  document.querySelectorAll('#highlightTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#highlightTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
