/**
 * YOUNG APOSTLES FOOTBALL CLUB â€” OFFICIAL JAVASCRIPT
 * Dribbble Premier UI/UX Design System
 * 38-Player Squad, Team Shop, Cart System, GPL 2026/27 Fixtures, Rankings & Highlights
 */

// ==========================================
// 1. DATA: OFFICIAL FIRST TEAM SQUAD
// ==========================================
const SQUAD_DATA = [
  // GOALKEEPERS
  { id: 1,  name: 'Frank Boateng',          number: 31, role: 'GK', posName: 'Goalkeeper',     image: 'assets/players/frank-boateng.jpg' },
  { id: 2,  name: 'Osman Wahabu',           number: 16, role: 'GK', posName: 'Goalkeeper',     image: 'assets/players/osman-wahabu.jpg' },
  { id: 3,  name: 'Benjamin Twum',          number: 13, role: 'GK', posName: 'Goalkeeper',     image: 'assets/players/benjamin-twum.jpg' },
  { id: 4,  name: 'Stephen Narh',           number: 22, role: 'GK', posName: 'Goalkeeper',     image: 'assets/players/stephen-narh.jpg' },
  { id: 5,  name: 'Seidu Adams',            number: 1,  role: 'GK', posName: 'Goalkeeper',     image: 'assets/players/seidu-adams.jpg' },

  // DEFENDERS
  { id: 6,  name: 'Issah Nyaabila',         number: 4,  role: 'DF', posName: 'Center Back',    image: 'assets/players/issah-nyaabila.jpg' },
  { id: 8,  name: 'Mathias Van Amegbe',     number: 25, role: 'DF', posName: 'Left Back',      image: 'assets/players/mathias-van-amegbe.jpg' },
  { id: 9,  name: 'Illiasu Mumuni',         number: 24, role: 'DF', posName: 'Center Back',    image: 'assets/players/issah-salifu.jpg' },
  { id: 10, name: 'Abdul Musah Mohammed',   number: 12, role: 'DF', posName: 'Full Back',      image: 'assets/players/abdul-musah-mohammed.jpg' },
  { id: 11, name: 'Abdul Mobarick',         number: 34, role: 'DF', posName: 'Left Back',      image: 'assets/players/abdul-mobarick.jpg' },
  { id: 12, name: 'Emmanuel Owusu Bempah',  number: 44, role: 'DF', posName: 'Right Back',     image: 'assets/players/emmanuel-owusu-bempah.jpg' },
  { id: 13, name: 'Issah Salifu',           number: 23, role: 'DF', posName: 'Left Back',      image: 'assets/players/illiasu-mumuni.jpg' },
  { id: 14, name: 'Samuel Amankwah',        number: 3,  role: 'DF', posName: 'Center Back',    image: 'assets/players/samuel-amankwah.jpg' },
  { id: 15, name: 'Fumi Koulibaly Andrews', number: 48, role: 'DF', posName: 'Center Back',    image: 'assets/players/fumi-koulibaly-andrews.jpg' },
  { id: 16, name: 'Moses Titi',             number: 17, role: 'DF', posName: 'Wing Back',      image: 'assets/players/moses-titi.jpg' },

  // MIDFIELDERS
  { id: 17, name: 'Ramzy Abubakar',         number: 8,  role: 'MD', posName: 'Playmaker',      image: 'assets/players/ramzy-abubakar.jpg' },
  { id: 18, name: 'Abdul Muftaw Ganiyu',    number: 5,  role: 'MD', posName: 'Def. Midfielder', image: 'assets/players/abdul-muftaw-ganiyu.jpg' },
  { id: 19, name: 'Abdul Ganiwu',           number: 32, role: 'MD', posName: 'Central Mid',    image: 'assets/players/abdul-gamwu.jpg' },
  { id: 20, name: 'John Afram Attah Jnr',   number: 20, role: 'MD', posName: 'Att. Midfielder', image: 'assets/players/john-afram-attah-jnr.jpg' },
  { id: 21, name: 'Agyei Emmanuel',         number: 51, role: 'MD', posName: 'Central Mid',    image: 'assets/players/agyei-emmanuel.jpg' },
  { id: 22, name: 'Samuel Adamu',           number: 6,  role: 'MD', posName: 'Box-to-Box Mid', image: 'assets/players/samuel-amadu.jpg' },
  { id: 23, name: 'Awal Seidu',             number: 28, role: 'MD', posName: 'Central Mid',    image: 'assets/players/awal-seidu.jpg' },
  { id: 24, name: 'Felix Aboagye',          number: 18, role: 'MD', posName: 'Att. Midfielder', image: 'assets/players/felix-aboagye.jpg' },
  { id: 25, name: 'Huzaif Iddrisu',         number: 10, role: 'MD', posName: 'Att. Midfielder', image: 'assets/players/james-konadu.jpg' },

  // FORWARDS
  { id: 26, name: 'Joseph Mensah',          number: 7,  role: 'FW', posName: 'Right Winger',   image: 'assets/players/joseph-mensah.jpg' },
  { id: 27, name: 'Foster Adu Gyamfi',      number: 30, role: 'FW', posName: 'Striker',        image: 'assets/players/foster-adu-gyamfi.jpg' },
  { id: 28, name: 'Samuel Prempeh',         number: 21, role: 'FW', posName: 'Left Winger',    image: 'assets/players/samuel-prempeh.jpg' },
  { id: 29, name: 'Issah Huseine',          number: 11, role: 'FW', posName: 'Forward',        image: 'assets/players/issah-huseine.jpg' },
  { id: 30, name: 'Abdul Fatao Salifu',     number: 19, role: 'FW', posName: 'Striker',        image: 'assets/players/abdul-fatao-salifu.jpg' },
  { id: 31, name: 'Foster Amoah',           number: 45, role: 'FW', posName: 'Striker',        image: 'assets/players/foster-amoah.jpg' },
  { id: 32, name: 'Joel Gakpo',             number: 9,  role: 'FW', posName: 'Striker',        image: 'assets/players/joel-gakpo.jpg' },
  { id: 33, name: 'Kingsford Agyemang',     number: 55, role: 'FW', posName: 'Forward',        image: 'assets/players/kingsford-agyemang.jpg' },
  { id: 34, name: 'Richmond Opoku',         number: 40, role: 'FW', posName: 'Winger',         image: 'assets/players/richmond-opoku.jpg' },
  { id: 35, name: 'Andy Luis',              number: 29, role: 'FW', posName: 'Winger',         image: 'assets/players/andy-luis.jpg' },
  { id: 36, name: 'James Konadu',           number: 50, role: 'FW', posName: 'Forward',        image: 'assets/players/james-konadu.jpg' },
];

// ==========================================
// 2. DATA: TEAM SHOP PRODUCTS (VIP PRE-ORDER & WAITLIST ALLOCATION)
// ==========================================
const PRODUCTS_DATA = [
  {
    id: 'kit-home',
    name: 'Official 2026/27 Home Match Kit',
    category: 'kits',
    price: 200,
    image: 'assets/kit-home-player-2026.jpg',
    tag: 'VIP PRE-ORDER',
    description: 'The authentic 2026/27 Young Apostles FC Home Jersey engineered by Mayniak. Modeled by Ramzy Abubakar #8. Features radiant golden yellow textured fabric with navy blue trims, Ghana Premier League sleeve badge, breathable moisture-wicking technology, and the iconic club crest.',
    customizable: true
  },
  {
    id: 'kit-away',
    name: 'Official 2026/27 Away Kit (Mayniak Ivory White)',
    category: 'kits',
    price: 200,
    image: 'assets/kit-away-player-2026.jpg',
    tag: 'VIP PRE-ORDER',
    description: 'The authentic 2026/27 Young Apostles FC Away Jersey by Mayniak. Modeled by Mathias Van Amegbe #25. Designed with crisp ivory white, bronze-copper sleeve cuffs, breathable side panels, and dynamic checkered flank details.',
    customizable: true
  },
  {
    id: 'crest-cap',
    name: 'Official Young Apostles FC 3D Shield Snapback Cap',
    category: 'accessories',
    image: 'assets/ya-official-cap.jpg',
    tag: 'NEW ARRIVAL',
    description: 'Official structured 6-panel snapback cap in deep navy blue with radiant gold visor stitching and high-density 3D embroidered Young Apostles FC shield crest on the front crown. One size fits all with adjustable snap closure.',
    customizable: false
  },
  {
    id: 'fan-scarf',
    name: 'Official "Agya Na Ɔwɔ Tumi" Stadium Scarf',
    category: 'accessories',
    image: 'assets/ya-official-scarf.jpg',
    tag: 'CLUB HERITAGE',
    description: 'Premium double-knit jacquard stadium scarf featuring the club motto "Agya Na Ɔwɔ Tumi" in bold white lettering, radiant golden yellow and navy stripes, embroidered club shield crests on both ends, and classic gold and white fringe tassels.',
    customizable: false
  }
];

// ==========================================
// 3. DATA: 34-WEEK GPL FIXTURES (2026/27 OFFICIAL SEASON)
// ==========================================
const FIXTURES_ROUND_1 = [
  { week: 1, home: 'Vision FC', away: 'Young Apostles', venue: 'Nii Adjei Kraku Stadium', date: 'Sep 5, 2026', type: 'Away', score: '3 - 0', result: 'L' },
  { week: 2, home: 'Young Apostles', away: 'Basake Holy Stars', venue: 'Wenchi Sports Stadium', date: 'Sep 13, 2026', type: 'Home', score: '1 - 0', result: 'W', scorer: 'Samuel Prempeh 7\'' },
  { week: 3, home: 'Debibi United', away: 'Young Apostles', venue: 'Debibi Park', date: 'Sep 20, 2026', type: 'Away' },
  { week: 4, home: 'Young Apostles', away: 'Heart of Lions', venue: 'Wenchi Sports Stadium', date: 'Sep 27, 2026', type: 'Home' },
  { week: 5, home: 'Samartex', away: 'Young Apostles', venue: 'Nsenkyire Sports Complex', date: 'Oct 4, 2026', type: 'Away' },
  { week: 6, home: 'Young Apostles', away: 'Aduana Stars', venue: 'Wenchi Sports Stadium', date: 'Oct 11, 2026', type: 'Home' },
  { week: 7, home: 'Asante Kotoko', away: 'Young Apostles', venue: 'Baba Yara Sports Stadium', date: 'Oct 18, 2026', type: 'Away' },
  { week: 8, home: 'Young Apostles', away: 'Hearts of Oak', venue: 'Wenchi Sports Stadium', date: 'Oct 25, 2026', type: 'Home' },
  { week: 9, home: 'Berekum Chelsea', away: 'Young Apostles', venue: 'Golden City Park', date: 'Nov 1, 2026', type: 'Away' },
  { week: 10, home: 'Young Apostles', away: 'Medeama SC', venue: 'Wenchi Sports Stadium', date: 'Nov 8, 2026', type: 'Home' },
  { week: 11, home: 'Ashgold', away: 'Young Apostles', venue: 'Len Clay Stadium', date: 'Nov 15, 2026', type: 'Away' },
  { week: 12, home: 'Young Apostles', away: 'Swedru All Blacks', venue: 'Wenchi Sports Stadium', date: 'Nov 22, 2026', type: 'Home' },
  { week: 13, home: 'Bechem United', away: 'Young Apostles', venue: 'Nana Fosu Gyeabour Park', date: 'Nov 29, 2026', type: 'Away' },
  { week: 14, home: 'Young Apostles', away: 'Karela United', venue: 'Wenchi Sports Stadium', date: 'Dec 6, 2026', type: 'Home' },
  { week: 15, home: 'Port City', away: 'Young Apostles', venue: 'Port City Arena', date: 'Dec 13, 2026', type: 'Away' },
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
  { week: 28, home: 'Young Apostles', away: 'Ashgold', venue: 'Wenchi Sports Stadium', date: 'Apr 4, 2027', type: 'Home' },
  { week: 29, home: 'Swedru All Blacks', away: 'Young Apostles', venue: 'Swedru Park', date: 'Apr 11, 2027', type: 'Away' },
  { week: 30, home: 'Young Apostles', away: 'Bechem United', venue: 'Wenchi Sports Stadium', date: 'Apr 18, 2027', type: 'Home' },
  { week: 31, home: 'Karela United', away: 'Young Apostles', venue: 'Naa Sheriga Sports Complex', date: 'Apr 25, 2027', type: 'Away' },
  { week: 32, home: 'Young Apostles', away: 'Port City', venue: 'Wenchi Sports Stadium', date: 'May 2, 2027', type: 'Home' },
  { week: 33, home: 'Gold Stars FC', away: 'Young Apostles', venue: 'DUNâ€™s Park, Bibiani', date: 'May 9, 2027', type: 'Away' },
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
  showToast(`Added ${product.name} to waitlist!`);
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
// 5. RENDERING SQUAD SPOTLIGHT, PHOTO WALL & GRID
// ==========================================
// 5. RENDERING SQUAD GRID (Chelsea Style)
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

  // Only show players that have an official photo
  list = list.filter(p => p.image);

  grid.innerHTML = list.map(player => `
    <div class="squad-card squad-card--has-photo" onclick="openPlayerModal(${player.id})">
      <div class="squad-card__media">
        <img src="${player.image}" alt="${player.name}" class="squad-card__img" loading="lazy">
        <div class="squad-card__gradient"></div>
        <span class="squad-card__number-badge">#${player.number}</span>
      </div>
      <div class="squad-card__body squad-card__body--minimal">
        <div>
          <div class="squad-name">${player.name}</div>
          <div class="squad-pos-label">${player.posName}</div>
        </div>
        <div class="squad-jersey-num">#${player.number}</div>
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
        ${product.price != null ? `
        <div class="product-price-row">
          <span class="product-price">GHS ${product.price}.00</span>
          ${product.oldPrice ? `<span class="product-old-price">GHS ${product.oldPrice}.00</span>` : ''}
        </div>` : `<div class="product-price-row"><span class="product-price" style="font-size:0.85rem;color:var(--ya-gold);font-weight:600;">Price available on enquiry</span></div>`}
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart('${product.id}')">
            <i class="fa-solid fa-list-check"></i> Join Waitlist
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
        ${product.price != null
          ? `<div style="font-size:1.35rem; font-weight:800; color:var(--ya-green); margin-bottom:0.75rem;">GHS ${product.price}.00</div>`
          : `<div style="font-size:0.95rem; font-weight:600; color:var(--ya-gold); margin-bottom:0.75rem;">Price available on enquiry</div>`
        }
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:1rem;">${product.description}</p>
        
        <div class="form-group" style="margin-bottom:0.75rem;">
          <label>Select Size</label>
          <select id="modalSize">
            ${product.category === 'accessories' ? `
              <option value="One Size" selected>One Size Fits All (Adjustable)</option>
            ` : `
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L" selected>Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
              <option value="XXL">Double XL (XXL)</option>
            `}
          </select>
        </div>

        ${product.customizable ? `
          <div style="background:var(--bg-subtle); padding:0.75rem; border-radius:var(--radius-sm); margin-bottom:1rem;">
            <div style="font-size:0.8rem; font-weight:700; margin-bottom:0.5rem; color:var(--text-main); display:flex; justify-content:space-between; align-items:center;">
              <span><i class="fa-solid fa-shirt text-gold"></i> Free Official Player Printing</span>
              <span style="font-size:0.7rem; color:var(--text-muted);">Click star preset:</span>
            </div>
            <div class="form-grid" style="margin-bottom:0.4rem;">
              <div class="form-group">
                <input type="text" placeholder="Name (e.g. SALIFU)" id="modalCustomName">
              </div>
              <div class="form-group">
                <input type="number" placeholder="No (e.g. 19)" id="modalCustomNum">
              </div>
            </div>
            <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('NYAABILA', 4)">#4 NYAABILA</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('HUSEINE', 11)">#11 HUSEINE</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('SALIFU', 23)">#23 SALIFU</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('MUMUNI', 24)">#24 MUMUNI</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('KONADU', 50)">#50 KONADU</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('BOATENG', 31)">#31 BOATENG</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('GYAMFI', 30)">#30 GYAMFI</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('AMOAH', 45)">#45 AMOAH</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('SALIFU', 19)">#19 SALIFU</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('GAMWU', 32)">#32 GAMWU</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('MOBARICK', 34)">#34 MOBARICK</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('GANIYU', 5)">#5 GANIYU</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('EMMANUEL', 51)">#51 EMMANUEL</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('TWUM', 13)">#13 TWUM</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('BEMPAH', 44)">#44 BEMPAH</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('SEIDU', 28)">#28 SEIDU</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('ABOAGYE', 18)">#18 ABOAGYE</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('LUIS', 29)">#29 LUIS</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('RAMZY', 8)">#8 RAMZY</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('GAKPO', 9)">#9 GAKPO</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('MENSAH', 7)">#7 MENSAH</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('AFRAM', 20)">#20 AFRAM</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('AGYEMANG', 55)">#55 AGYEMANG</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('KOULIBALY', 48)">#48 KOULIBALY</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('VAN AMEGBE', 25)">#25 VAN AMEGBE</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('TITI', 17)">#17 TITI</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('MOHAMMED', 12)">#12 MOHAMMED</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('WAHABU', 16)">#16 WAHABU</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('OPOKU', 40)">#40 OPOKU</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('AMADU', 6)">#6 AMADU</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('AMANKWAH', 3)">#3 AMANKWAH</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('PREMPEH', 21)">#21 PREMPEH</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('S. ADAMS', 1)">#1 S. ADAMS</button>
              <button type="button" style="font-size:0.68rem; font-weight:700; background:#fff; border:1px solid var(--border-color); padding:3px 7px; border-radius:var(--radius-pill); cursor:pointer; color:var(--ya-blue);" onclick="setCustomKit('NARH', 22)">#22 NARH</button>
            </div>
          </div>
        ` : ''}

        <button class="btn-hero-primary" style="width:100%; justify-content:center;" onclick="handleModalAdd('${product.id}')">
          <i class="fa-solid fa-list-check"></i> Add to Waitlist Reservation
        </button>
      </div>
    </div>
  `;

  document.getElementById('productModal').classList.add('open');
}

function setCustomKit(name, num) {
  const nameInput = document.getElementById('modalCustomName');
  const numInput = document.getElementById('modalCustomNum');
  if (nameInput) nameInput.value = name;
  if (numInput) numInput.value = num;
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
// 8. ENHANCED PLAYER PROFILE MODAL
// ==========================================
function openPlayerModal(playerId) {
  const player = SQUAD_DATA.find(p => p.id === playerId);
  if (!player) return;

  const content = document.getElementById('playerModalContent');
  if (!content) return;

  const hasPhoto = !!player.image;

  content.innerHTML = `
    <div class="player-modal-layout" style="max-width:640px;">
      <div class="player-modal-media">
        ${hasPhoto ? `
          <img src="${player.image}" alt="${player.name}" class="player-modal-media__img" style="height:380px; object-fit:cover; object-position:center 10%;">
          <div class="player-modal-media__badge" style="background:#001489; color:#fff; font-size:1.5rem; padding:6px 14px; border-radius:6px;">#${player.number}</div>
        ` : `
          <div style="aspect-ratio:3/4; background:linear-gradient(135deg, #001489 0%, #0057B8 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align:center;">
            <img src="assets/official-logo.png" style="width:75px; margin-bottom:1rem;">
            <div style="font-family:var(--font-heading); font-size:4rem; font-weight:900; color:#fff; line-height:1;">#${player.number}</div>
          </div>
        `}
      </div>

      <div class="player-modal-details" style="padding:2rem 1.5rem; display:flex; flex-direction:column; justify-content:center;">
        <div class="player-modal-header">
          <span style="display:inline-block; font-size:0.78rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:#0057B8; margin-bottom:0.35rem;">${player.posName}</span>
          <h2 class="player-modal-name" style="font-size:2.2rem; font-weight:900; color:#001489; line-height:1.15; margin:0;">${player.name}</h2>
          <div style="font-family:var(--font-heading); font-size:1.4rem; font-weight:900; color:#0057B8; margin-top:0.4rem;">Squad #${player.number}</div>
        </div>

        <div style="margin:1.5rem 0; padding:1rem 1.25rem; background:var(--bg-subtle); border-radius:8px; border:1px solid var(--border-color);">
          <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.06em;">First Team Roster</div>
          <div style="font-weight:700; color:#001489; font-size:0.95rem; margin-top:0.25rem;">Young Apostles FC &middot; Ghana Premier League 2026/27</div>
        </div>

        <div class="player-modal-actions" style="display:flex; flex-direction:column; gap:0.75rem;">
          <button class="btn-hero-primary" style="justify-content:center; background:#001489; border-color:#001489; padding:0.9rem;" onclick="closePlayerModal(); openCustomKitModal('${player.name.replace(/'/g, "\\'")}', ${player.number});">
            <i class="fa-solid fa-shirt"></i> Order #${player.number} Official Jersey &rarr;
          </button>
          <button class="btn-hero-secondary" style="justify-content:center; background:var(--bg-subtle); color:var(--text-main); border-color:var(--border-color); padding:0.75rem;" onclick="closePlayerModal();">
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('playerModal').classList.add('open');
}

function openCustomKitModal(playerName, playerNumber) {
  // Extract simple surname/last word for jersey name printing
  const cleanName = playerName.split(' ').pop();
  openProductModal('kit-home');
  setTimeout(() => {
    setCustomKit(cleanName.toUpperCase(), playerNumber);
  }, 120);
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

function getAllFixtures() {
  try {
    const stored = localStorage.getItem('ya_club_fixtures');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Could not read fixtures from localStorage', e);
  }
  return [...FIXTURES_ROUND_1, ...FIXTURES_ROUND_2];
}

function renderFixturesModal(roundNum) {
  const container = document.getElementById('fixturesListModal');
  if (!container) return;

  const allFixtures = getAllFixtures();
  const list = roundNum === 1 ? allFixtures.slice(0, 17) : allFixtures.slice(17);
  container.innerHTML = list.map(fx => {
    const hasScore = Boolean(fx.score);
    const badgeColor = fx.result === 'W' ? 'background:#dcfce7; color:#15803d; border:1px solid #86efac;'
      : fx.result === 'L' ? 'background:#fee2e2; color:#b91c1c; border:1px solid #fca5a5;'
      : fx.result === 'D' ? 'background:#fef9c3; color:#854d0e; border:1px solid #fde047;'
      : fx.type === 'Home' ? 'background:#D1FAE5; color:#065F46;' : 'background:#F3F4F6; color:#374151;';
    const badgeText = hasScore ? `FT ${fx.score} (${fx.result})` : fx.type.toUpperCase();

    return `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:0.85rem 1rem; border-bottom:1px solid var(--border-subtle); font-size:0.875rem;">
      <div>
        <span style="font-weight:700; color:var(--ya-green); font-size:0.8rem; margin-right:0.5rem;">WK ${fx.week}</span>
        <strong>${fx.home}</strong> vs <strong>${fx.away}</strong>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
          ${fx.venue} Â· ${fx.date}
          ${fx.scorer ? `<span style="color:#15803d; font-weight:700; margin-left:6px;">âš½ ${fx.scorer}</span>` : ''}
        </div>
      </div>
      <span style="padding:4px 10px; border-radius:var(--radius-pill); font-size:0.75rem; font-weight:800; ${badgeColor}">
        ${badgeText}
      </span>
    </div>
  `;
  }).join('');
}

// ==========================================
// 10. SECURE MOMO PAYMENT GATEWAY & CHECKOUT
// ==========================================
let currentPendingOrder = null;
let currentPayMethod = 'momo';

function selectPayMethod(method, el) {
  currentPayMethod = method;
  document.querySelectorAll('.pay-method-option').forEach(opt => opt.classList.remove('active'));
  if (el) el.classList.add('active');
}

function openCheckoutModal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (subtotal === 0) {
    showToast('Your shopping bag is empty!');
    return;
  }
  const grandTotal = subtotal + 25;

  const subEl = document.getElementById('coSubtotalAmount');
  const totalEl = document.getElementById('coTotalAmount');
  if (subEl) subEl.textContent = `GHS ${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `GHS ${grandTotal.toFixed(2)}`;

  // Reset steps
  const step1 = document.getElementById('checkoutStepDetails');
  const step2 = document.getElementById('checkoutStepGateway');
  const step3 = document.getElementById('checkoutStepReceipt');
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  if (step3) step3.style.display = 'none';

  closeCartDrawer();
  document.getElementById('checkoutModal')?.classList.add('open');
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal')?.classList.remove('open');
}

function handleDetailsSubmit(e) {
  e.preventDefault();
  if (!cart || cart.length === 0) {
    showToast('Your waitlist bag is empty. Please select a kit first!');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const grandTotal = subtotal + 25;

  const name = document.getElementById('coName')?.value.trim();
  const phone = document.getElementById('coPhone')?.value.trim();
  const city = document.getElementById('coCity')?.value.trim();
  const address = document.getElementById('coAddress')?.value.trim();

  if (!name || !phone || !city || !address) {
    showToast('Please fill all required fields');
    return;
  }

  // Generate unique official queue reference
  const randomRef = 'YAFC-WAIT-' + Math.floor(1000 + Math.random() * 9000);

  currentPendingOrder = {
    ref: randomRef,
    name: name,
    phone: phone,
    city: city,
    address: address,
    items: JSON.parse(JSON.stringify(cart)),
    subtotal: subtotal,
    delivery: 25,
    total: grandTotal,
    status: 'On Waitlist',
    date: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
    timestamp: Date.now()
  };

  // Save to persistent storage
  saveWaitlistOrder(currentPendingOrder);

  // Update profile with name & phone if not saved yet
  try {
    const profile = JSON.parse(localStorage.getItem('ya_user_profile') || '{}');
    if (!profile.name) profile.name = name;
    if (!profile.phone) profile.phone = phone;
    localStorage.setItem('ya_user_profile', JSON.stringify(profile));
  } catch(e) {}

  // Populate Receipt UI
  const pillEl = document.getElementById('receiptQueuePill');
  const nameEl = document.getElementById('receiptFanName');
  const refEl = document.getElementById('receiptRefId');
  const phoneEl = document.getElementById('receiptPhone');
  const cityEl = document.getElementById('receiptCity');
  const itemsEl = document.getElementById('receiptItemsSummary');
  const totalEl = document.getElementById('receiptTotal');

  if (pillEl) pillEl.textContent = `QUEUE #${randomRef}`;
  if (nameEl) nameEl.textContent = name;
  if (refEl) refEl.textContent = randomRef;
  if (phoneEl) phoneEl.textContent = phone;
  if (cityEl) cityEl.textContent = `${city} (${address})`;
  if (itemsEl) {
    itemsEl.textContent = currentPendingOrder.items.map(i => `${i.name} [Size: ${i.size || 'L'}] x${i.qty}`).join(', ');
  }
  if (totalEl) totalEl.textContent = `GHS ${grandTotal.toFixed(2)}`;

  // Transition views: show receipt, hide details form
  const detailsEl = document.getElementById('checkoutStepDetails');
  const receiptEl = document.getElementById('checkoutStepReceipt');
  if (detailsEl) detailsEl.style.display = 'none';
  if (receiptEl) receiptEl.style.display = 'block';

  // Empty cart
  cart = [];
  saveCart();
  updateCartUI();

  showToast('Spot confirmed! You are now in the official waitlist queue.');
}

function sendWaitlistWhatsApp() {
  if (!currentPendingOrder) return;
  const itemsStr = (currentPendingOrder.items || []).map(i => `• ${i.name} (Size: ${i.size || 'L'}${i.customName ? ', Print: ' + i.customName + ' #' + i.customNum : ''}) x${i.qty}`).join('%0A');
  const msg = `*OFFICIAL YOUNG APOSTLES FC PRE-ORDER WAITLIST*%0A%0A` +
              `*Queue No:* ${currentPendingOrder.ref}%0A` +
              `*Customer:* ${currentPendingOrder.name}%0A` +
              `*WhatsApp:* ${currentPendingOrder.phone}%0A` +
              `*Location:* ${currentPendingOrder.city} (${currentPendingOrder.address})%0A%0A` +
              `*Reserved Gear:*%0A${itemsStr}%0A%0A` +
              `*Total Value:* GHS ${currentPendingOrder.total.toFixed(2)} (Pay on delivery)%0A%0A` +
              `_Agya Na Ɔwɔ Tumi! Please confirm my waitlist allocation._`;

  window.open(`https://wa.me/233539779380?text=${msg}`, '_blank');
}

function finishWaitlistReservation() {
  closeCheckoutModal();
  const detailsEl = document.getElementById('checkoutStepDetails');
  const receiptEl = document.getElementById('checkoutStepReceipt');
  if (detailsEl) detailsEl.style.display = 'block';
  if (receiptEl) receiptEl.style.display = 'none';
  loadProfileData();
  showToast('Reservation complete. Thank you for standing with Young Apostles FC!');
}

function renderOrderReceipt(order) {
  const container = document.getElementById('checkoutStepReceipt');
  if (!container) return;

  container.innerHTML = `
    <div class="receipt-card">
      <div class="receipt-header">
        <div style="width:52px; height:52px; border-radius:50%; background:rgba(22, 163, 74, 0.12); color:#16A34A; display:flex; align-items:center; justify-content:center; margin:0 auto 0.75rem; font-size:1.6rem;">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h3 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800; color:var(--ya-blue); margin-bottom:0.25rem;">
          PAYMENT VERIFIED &amp; ORDER CONFIRMED!
        </h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
          Official Young Apostles FC Digital Store Receipt
        </p>
        <span style="display:inline-block; font-family:monospace; font-size:0.95rem; font-weight:800; background:rgba(255, 184, 0, 0.15); color:var(--ya-blue-deep); padding:4px 12px; border-radius:999px; border:1px solid rgba(255,184,0,0.4);">
          ORDER REF: ${order.ref}
        </span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; font-size:0.82rem; margin-bottom:1.25rem; background:var(--bg-subtle); padding:0.9rem; border-radius:var(--radius-md);">
        <div>
          <span style="color:var(--text-muted); display:block; font-size:0.7rem; text-transform:uppercase;">Customer</span>
          <strong>${order.name}</strong><br>
          <span>${order.phone}</span>
        </div>
        <div>
          <span style="color:var(--text-muted); display:block; font-size:0.7rem; text-transform:uppercase;">Destination</span>
          <strong>${order.city}</strong><br>
          <span>${order.address}</span>
        </div>
        <div>
          <span style="color:var(--text-muted); display:block; font-size:0.7rem; text-transform:uppercase;">MoMo Recipient</span>
          <strong>Gerald Damoah Domfeh</strong><br>
          <span style="color:var(--ya-blue); font-weight:700;">0539779380</span>
        </div>
        <div>
          <span style="color:var(--text-muted); display:block; font-size:0.7rem; text-transform:uppercase;">Transaction ID</span>
          <strong style="font-family:monospace;">${order.txId}</strong><br>
          <span style="color:#16A34A; font-weight:700;"><i class="fa-solid fa-lock"></i> Secured</span>
        </div>
      </div>

      <table class="receipt-items-table">
        <thead>
          <tr>
            <th>Item &amp; Customization</th>
            <th style="text-align:center;">Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td>
                <div style="font-weight:700; color:var(--text-main);">${item.name}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">Size: ${item.size} ${item.customName ? `&bull; Print: ${item.customName} #${item.customNumber}` : ''}</div>
              </td>
              <td style="text-align:center;">${item.qty}</td>
              <td>GHS ${(item.price * item.qty).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="color:var(--text-muted); font-size:0.8rem;">Subtotal:</td>
            <td>GHS ${order.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2" style="color:var(--text-muted); font-size:0.8rem;">Nationwide Courier Dispatch:</td>
            <td>GHS 25.00</td>
          </tr>
          <tr>
            <td colspan="2" style="font-size:1rem; color:var(--ya-blue);">TOTAL PAID:</td>
            <td style="font-size:1.15rem; color:#16A34A;">GHS ${order.total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div style="display:flex; flex-direction:column; gap:0.65rem; margin-top:1.25rem;">
        <button type="button" class="btn-whatsapp-dispatch" onclick="sendOrderViaWhatsApp()">
          <i class="fa-brands fa-whatsapp" style="font-size:1.2rem;"></i> Send Receipt to Club WhatsApp (+233 539 779 380)
        </button>
        <button type="button" class="btn-hero-primary" style="justify-content:center; padding:0.85rem;" onclick="closeCheckoutModal(); window.location.href='#store';">
          <i class="fa-solid fa-bag-shopping"></i> Continue Shopping
        </button>
      </div>
    </div>
  `;

  document.getElementById('checkoutStepGateway').style.display = 'none';
  container.style.display = 'block';
}

function sendOrderViaWhatsApp() {
  if (!currentPendingOrder) return;

  const order = currentPendingOrder;
  const itemsText = order.items.map(i => 
    `• ${i.name} (Size: ${i.size}${i.customName ? `, ${i.customName} #${i.customNumber}` : ''}) x${i.qty} = GHS ${(i.price * i.qty).toFixed(2)}`
  ).join('\n');

  const message = 
`⚽ *YOUNG APOSTLES FC — OFFICIAL STORE ORDER*
━━━━━━━━━━━━━━━━━━━━
📋 *Order Reference:* ${order.ref}
👤 *Customer Name:* ${order.name}
📞 *Customer Phone:* ${order.phone}
📍 *Delivery City:* ${order.city}
🏠 *Address / Landmark:* ${order.address}

🛍️ *ORDERED ITEMS:*
${itemsText}

💰 *Items Subtotal:* GHS ${order.subtotal.toFixed(2)}
🚚 *Courier Delivery:* GHS 25.00
💳 *TOTAL AMOUNT:* GHS ${order.total.toFixed(2)}

📱 *MOMO PAYMENT DETAILS:*
• Paid to MoMo: *0539779380*
• Recipient: *Gerald Damoah Domfeh* (Young Apostles FC)
• Transaction ID: ${order.txId || document.getElementById('coTxId')?.value || 'Pending Verification'}
• Date: ${order.date}
━━━━━━━━━━━━━━━━━━━━
_Submitted via Official Young Apostles FC Digital Portal_`;

  const url = `https://wa.me/233539779380?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function openMembershipModal() {
  const modal = document.getElementById('membershipModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
  }
  document.body.style.overflow = 'hidden';
}

function closeMembershipModal() {
  const modal = document.getElementById('membershipModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('open');
  }
  document.body.style.overflow = '';
}

let pendingMembershipTier = 'Gold VIP Apostle';

function joinMembership(tierName) {
  pendingMembershipTier = tierName || 'Gold VIP Apostle';
  closeMembershipModal();
  openMembershipPaymentModal(tierName);
}

function openMembershipPaymentModal(tierName) {
  pendingMembershipTier = tierName || 'Gold VIP Apostle';
  const modal = document.getElementById('membershipPaymentModal');
  const titleEl = document.getElementById('memPayTitle');
  const tierEl = document.getElementById('memPayTierName');
  const amtEl = document.getElementById('memPayAmount');
  const refEl = document.getElementById('memPayRef');

  const isVip = pendingMembershipTier.includes('Gold') || pendingMembershipTier.includes('VIP');
  const amountStr = isVip ? 'GHS 500' : 'GHS 200';
  const randomRef = 'YAFC-' + (isVip ? 'VIP-' : 'STD-') + Math.floor(1000 + Math.random() * 9000);

  if (titleEl) titleEl.textContent = isVip ? 'Activate Gold VIP Pass' : 'Activate Standard Pass';
  if (tierEl) tierEl.textContent = pendingMembershipTier;
  if (amtEl) amtEl.textContent = amountStr;
  if (refEl) refEl.textContent = randomRef;

  const txInput = document.getElementById('memTxIdInput');
  if (txInput) txInput.value = '';

  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
  }
  document.body.style.overflow = 'hidden';
}

function closeMembershipPaymentModal() {
  const modal = document.getElementById('membershipPaymentModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('open');
  }
  document.body.style.overflow = '';
}

function handleMembershipPaymentSubmit(e) {
  e.preventDefault();
  const txId = (document.getElementById('memTxIdInput')?.value || '').trim();
  if (!txId) {
    showToast('⚠️ Please enter your MoMo Transaction ID.');
    return;
  }

  const isVip = pendingMembershipTier.includes('Gold') || pendingMembershipTier.includes('VIP');
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem('ya_user_profile') || '{}'); } catch(err) {}

  if (!profile.id) profile.id = 'YAFC-26-' + Math.floor(1000 + Math.random() * 9000);
  profile.tier = pendingMembershipTier;
  profile.subscription = '2026/27 GPL Season Pass';
  profile.status = 'Active';
  profile.hasPaid = true;
  profile.momoTxId = txId;
  profile.paidRef = document.getElementById('memPayRef')?.textContent || ('YAFC-' + Date.now());
  profile.paidAmount = isVip ? 500 : 200;
  profile.updatedAt = new Date().toISOString();

  try {
    localStorage.setItem('ya_user_profile', JSON.stringify(profile));

    // Update ya_members_list
    let list = JSON.parse(localStorage.getItem('ya_members_list') || '[]');
    if (!Array.isArray(list)) list = [];
    const idx = list.findIndex(m => (profile.phone && m.phone === profile.phone) || (m.id && m.id === profile.id));
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...profile };
    } else {
      list.unshift(profile);
    }
    localStorage.setItem('ya_members_list', JSON.stringify(list));

    if (window.BroadcastChannel) {
      const bc = new BroadcastChannel('ya_channel');
      bc.postMessage({ type: 'MEMBER_SAVED', profile: profile });
      bc.close();
    }
    window.dispatchEvent(new Event('storage'));
  } catch(err) {}

  closeMembershipPaymentModal();
  loadProfileData();
  updateVipPassVisibility();
  showToast('🎉 MoMo Payment confirmed! Your VIP Pass is now activated.');
  setTimeout(() => {
    openProfileModal();
  }, 400);
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

function openMobileNav() {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const icon = document.getElementById('mobileToggleIcon');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  if (icon) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');
  }
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const icon = document.getElementById('mobileToggleIcon');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  if (icon) {
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
  document.body.style.overflow = '';
}

function toggleMobileNav(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const drawer = document.getElementById('mobileDrawer');
  if (drawer && drawer.classList.contains('open')) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
}

function initDrawerPullGesture() {
  const drawer = document.getElementById('mobileDrawer');
  if (!drawer) return;
  let startY = 0;
  let isDragging = false;

  drawer.addEventListener('touchstart', (e) => {
    if (drawer.scrollTop <= 5) {
      startY = e.touches[0].clientY;
      isDragging = true;
    }
  }, { passive: true });

  drawer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff < -45) {
      isDragging = false;
      closeMobileNav();
    }
  }, { passive: true });

  drawer.addEventListener('touchend', () => {
    isDragging = false;
  }, { passive: true });
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
    dates: '15 August 2026 â€“ 25 May 2027',
    targetDate: new Date(Date.now() + 48 * 24 * 60 * 60 * 1000)
  },
  facup: {
    index: '02 / 04',
    title: 'MTN FA Cup Ghana',
    season: '2026/2027 Knockout Tournament',
    teams: '64 Clubs Nationwide',
    dates: 'October 2026 â€“ June 2027',
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
    dates: 'February 2027 â€“ November 2027',
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
// 12. REAL-TIME MATCH RENDERING
// ==========================================
function parseFixtureDate(dateStr) {
  // e.g. "Sep 4, 2026" or "Jan 17, 2027"
  return new Date(dateStr);
}

function renderMatches(typeFilter = 'all') {
  const grid = document.getElementById('upcomingMatchesGrid');
  if (!grid) return;

  const allFixtures = getAllFixtures();

  // ONLY fixtures with an explicit score are completed (Week 1 and Week 2)
  const completedFixtures = allFixtures.filter(f => Boolean(f.score));
  // All other fixtures are upcoming
  const upcomingFixtures = allFixtures.filter(f => !f.score);

  const applyFilter = arr => typeFilter === 'home' ? arr.filter(f => f.type === 'Home')
    : typeFilter === 'away' ? arr.filter(f => f.type === 'Away') : arr;

  // Show most recent completed match first (Week 2 vs Holy Stars 1-0, then Week 1 vs Vision FC 0-3)
  const pastSlice = applyFilter(completedFixtures).slice().reverse();
  // Show next 6 upcoming matches in calendar order
  const upcomingSlice = applyFilter(upcomingFixtures).slice(0, 6);

  const renderCard = (f, isNextMatch = false) => {
    const isYAHome  = f.home === 'Young Apostles';
    const opponent  = isYAHome ? f.away : f.home;

    // Map opponent names to their correct logo filenames
    const LOGO_MAP = {
      'Vision FC':          'assets/opponents/visionfc.png',
      'Basake Holy Stars':  'assets/opponents/basakeholystars.png',
      'Debibi United':      'assets/opponents/debibiunited.png',
      'Heart of Lions':     'assets/opponents/heartoflions.png',
      'Samartex':           'assets/opponents/samartex.png',
      'Aduana Stars':       'assets/opponents/aduanastars.png',
      'Asante Kotoko':      'assets/opponents/asantekotoko.png',
      'Hearts of Oak':      'assets/opponents/heartsofoak.png',
      'Berekum Chelsea':    'assets/opponents/berekumchelsea.png',
      'Medeama SC':         'assets/opponents/medeamasc.png',
      'Ashgold':            'assets/opponents/ashgold.png',
      'Swedru All Blacks':  'assets/opponents/swedruallblacks.png',
      'Bechem United':      'assets/opponents/bechemunited.png',
      'Karela United':      'assets/opponents/karelaunited.png',
      'Port City':          'assets/opponents/portcity.png',
      'Gold Stars FC':      'assets/opponents/goldstarsfc.png',
      'Dreams FC':          'assets/opponents/dreamsfc.png'
    };
    const oppLogo = LOGO_MAP[opponent] || 'assets/opponents/gpl-official.png';

    const dateObj   = parseFixtureDate(f.date);
    const dayStr    = isNaN(dateObj.getTime())
      ? (f.date || 'TBC').toUpperCase()
      : dateObj.toLocaleString('en', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    const isCompleted = Boolean(f.score);
    const cardClass = `match-card ${isCompleted ? 'match-card--past' : ''} ${f.type === 'Home' ? 'match-card--home' : 'match-card--away'}`;

    const homeName = isYAHome ? 'Young Apostles' : opponent;
    const homeLogo = isYAHome ? 'assets/official-logo.png' : oppLogo;
    const awayName = isYAHome ? opponent : 'Young Apostles';
    const awayLogo = isYAHome ? oppLogo : 'assets/official-logo.png';

    // Time/score center box
    const isWin = f.result === 'W';
    const isLoss = f.result === 'L';
    const resultTag = isWin ? 'WIN • FT' : isLoss ? 'LOSS • FT' : 'DRAW • FT';
    const resultColor = isWin ? '#15803D' : isLoss ? '#B91C1C' : '#475569';
    const resultBg = isWin ? '#DCFCE7' : isLoss ? '#FEE2E2' : '#F1F5F9';
    const resultBorder = isWin ? '#86EFAC' : isLoss ? '#FCA5A5' : '#CBD5E1';

    const centerBox = isCompleted
      ? `<div class="match-score-pill" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6px 12px; border-radius:10px; background:${resultBg}; border:1px solid ${resultBorder}; min-width:74px;">
           <span style="font-size:0.62rem; font-weight:800; color:${resultColor}; letter-spacing:0.08em; text-transform:uppercase;">${resultTag}</span>
           <span style="font-size:1.25rem; font-weight:900; color:${resultColor}; line-height:1.2; letter-spacing:0.02em;">${f.score}</span>
           ${f.scorer ? `<span style="font-size:0.62rem; color:#1F2937; margin-top:2px; font-weight:700; white-space:nowrap;">⚽ ${f.scorer}</span>` : ''}
         </div>`
      : `<div class="match-time-pill" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6px 12px; border-radius:10px; background:#F8FAFC; border:1px solid #E2E8F0; min-width:74px;">
           <span style="font-size:0.62rem; font-weight:800; color:#034694; letter-spacing:0.08em; text-transform:uppercase;">KICKOFF</span>
           <span style="font-size:1.15rem; font-weight:900; color:#0F172A; line-height:1.2;">15:00</span>
           <span style="font-size:0.6rem; color:#64748B; font-weight:700;">GMT</span>
         </div>`;

    return `
      <div class="${cardClass}">
        ${isNextMatch ? '<div class="match-next-tag"><i class="fa-solid fa-bolt"></i> NEXT FIXTURE</div>' : ''}
        <div class="match-card-header">
          <div class="match-card-date">${dayStr}</div>
          <div class="match-card-comp">GHANA PREMIER LEAGUE &bull; MD ${f.week}</div>
        </div>
        <div class="match-crests-row">
          <div class="match-crest-col">
            <img src="${homeLogo}" alt="${homeName}" onerror="this.src='assets/opponents/gpl-official.png'">
            <div class="match-crest-name">${homeName}</div>
          </div>
          ${centerBox}
          <div class="match-crest-col">
            <img src="${awayLogo}" alt="${awayName}" onerror="this.src='assets/opponents/gpl-official.png'">
            <div class="match-crest-name">${awayName}</div>
          </div>
        </div>
        <div class="match-venue">${f.venue}</div>
        <div class="match-card-actions">
          <button class="btn-match-centre" onclick="openFixturesModal()">Match Centre &rarr;</button>
        </div>
      </div>
    `;
  };

  const combined = [...pastSlice, ...upcomingSlice];
  if (combined.length === 0) {
    grid.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-muted);width:100%;">No matches found for this filter.</div>';
    return;
  }
  grid.innerHTML = combined.map((f, i) => renderCard(f, i === pastSlice.length)).join('');
}

// ==========================================
// 13. REAL-TIME MATCHDAY COUNTDOWN
// ==========================================
function updateCountdown() {
  const allFixtures = getAllFixtures();
  const now = new Date();

  // Find next upcoming fixture
  let nextMatch = null;
  for (const f of allFixtures) {
    const fDate = parseFixtureDate(f.date);
    fDate.setHours(15, 0, 0, 0); // 15:00 GMT kickoff
    if (fDate.getTime() > now.getTime()) {
      nextMatch = { ...f, kickoff: fDate };
      break;
    }
  }

  if (!nextMatch) return;

  const diff = nextMatch.kickoff.getTime() - now.getTime();
  if (diff <= 0) return;

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

  const indEl = document.getElementById('cdMatchIndicator');
  const headEl = document.getElementById('cdMatchHeadline');
  const venEl = document.getElementById('cdMatchVenue');

  const opponent = nextMatch.home === 'Young Apostles' ? nextMatch.away : nextMatch.home;
  const isHome = nextMatch.home === 'Young Apostles';

  if (indEl) indEl.innerHTML = `<i class="fa-solid fa-stopwatch"></i> MATCHDAY ${nextMatch.week} COUNTDOWN`;
  if (headEl) headEl.textContent = `${isHome ? 'Home' : 'Away'} vs ${opponent}`;
  if (venEl) {
    const dateStr = nextMatch.kickoff.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
    venEl.textContent = `${nextMatch.venue} Â· ${dateStr} Â· 15:00 GMT`;
  }
}

// ==========================================
// 13. MATCH CAROUSEL SCROLLER
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
// ==========================================
// 14. APOSTLES TV â€” YOUTUBE VIDEOS SYSTEM (DYNAMIC & ADMIN CONTROLLED)
// ==========================================
const DEFAULT_APOSTLES_TV_VIDEOS = [
  {
    id: 'fpleoX_sUIA',
    title: 'Match Highlights: Young Apostles 1 - 0 Basake Holy Stars',
    tag: 'MATCH HIGHLIGHTS',
    thumb: 'assets/apostle-tv-video1.jpg'
  },
  {
    id: 'ixgmCVIplsk',
    title: 'Pre-Match Interview | Young Apostles vs Basake Holy Stars | Assistant Coach Abubakar Fuseini',
    tag: 'PRE-MATCH INTERVIEW',
    thumb: 'assets/apostle-tv-video2.jpg'
  },
  {
    id: '9SFZE0KVGak',
    title: 'Match Highlights: Vision FC 3 - 0 Young Apostles FC',
    tag: 'MATCH HIGHLIGHTS',
    thumb: 'assets/apostle-tv-video3.jpg'
  },
  {
    id: '9AX0fmXUMU4',
    title: 'Official Club Anthem & Matchday Experience at Wenchi',
    tag: 'CLUB ANTHEM',
    thumb: 'assets/apostle-tv-video4.jpg'
  }
];

// (Apostles TV rendering is defined in Section 14 below)

// ==========================================
// 15. CLUB NEWS & BLOG PORTAL (DYNAMIC & ADMIN SYNCED)
// ==========================================
// 15. CLUB NEWS & DISPATCHES UNIFIED PIPELINE
// Arrangement:
// Position 1: Big Hero Featured Card (Index 0)
// Positions 2 & 3: Sub-Grid Cards (Index 1 & 2)
// Positions 4, 5, 6+: Live Dispatches Sidebar (Index 3, 4, 5...)
// ==========================================
const UNIFIED_BLOGS_KEY = "ya_club_unified_blogs";

const DEFAULT_UNIFIED_BLOGS = [
  {
    id: 'debibi-united-derby',
    title: "Young Apostles Face Debibi United in First Regional Derby of GPL Season",
    category: "MATCH PREVIEW",
    badgeClass: "news-badge-pill--preview",
    date: "Sep 16, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/md3-debibi-derby.jpg",
    excerpt: "Young Apostles FC will make the short trip to Derby Presby Park on Sunday for a Matchday 3 encounter against Debibi United FC in the 2026/27 Ghana Premier League. The fixture will mark the first regional derby involving Young Apostles in the Ghana Premier League this season.",
    content: `<p>Young Apostles FC will make the short trip to Derby Presby Park on Sunday for a Matchday 3 encounter against Debibi United FC in the 2026/27 Ghana Premier League.</p><p>The fixture will mark the first regional derby involving Young Apostles in the Ghana Premier League this season, with both sides set for another chapter in a growing local rivalry.</p><p>Young Apostles head into the contest with momentum after securing their first league victory of the campaign, a 1-0 home win over Basake Holy Stars, courtesy of an early Samuel Prempeh strike.</p><h4>Apostles Hold the Head-to-Head Advantage</h4><p>The two clubs have met five times in all competitions, with Young Apostles holding the better record. The Apostles have recorded three wins, one draw and one defeat, scoring six goals and conceding four. In their four previous Division One League meetings, Young Apostles have also dominated the head-to-head record, winning three and losing one.</p><h4>A Strong Record at Derby Presby Park</h4><p>Young Apostles have enjoyed success at Debibi Presby Park in their previous competitive meetings. The Apostles became the first club to defeat Debibi United at their home ground, winning 1-0 in a Division One League encounter.</p><p>With both clubs now competing in the Ghana Premier League, Sunday's meeting carries added significance. Young Apostles will be looking to build on their Matchday 2 victory and maintain their positive record against Debibi United, while the hosts will be seeking to claim the points on home soil.</p><p><strong>The first regional derby of the season awaits. Debibi United FC vs Young Apostles FC &bull; GPL MD3 &bull; Derby Presby Park &bull; Sun 20th Sep &bull; 3:00PM</strong></p>`,
    readTime: "4 min read"
  },
  {
    id: 'prempeh-winner-holy-stars',
    title: "Samuel Prempeh Strike Earns Young Apostles First Win of the Season",
    category: "MATCH REPORT",
    badgeClass: "news-badge-pill--match",
    date: "Sep 13, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/md2-prempeh-win.jpg",
    excerpt: "Young Apostles FC secured their first victory of the 2026/27 Ghana Premier League season with a narrow 1-0 win over Basake Holy Stars in Wenchi. Samuel Prempeh provided the decisive moment, scoring early to give the Apostles the lead.",
    content: `<p>Young Apostles FC secured their first victory of the 2026/27 Ghana Premier League season with a narrow 1-0 win over Basake Holy Stars in Wenchi.</p><p>Samuel Prempeh provided the decisive moment, scoring early to give the Apostles the lead and set the tone for a determined home performance.</p><p>Having suffered a 3-0 defeat to Vision FC on Matchday 1, Young Apostles responded with a disciplined display to claim all three points in their first home league game of the campaign.</p><p>The victory also extends Young Apostles' unbeaten record against Basake Holy Stars in Wenchi. The Apostles had won the previous two meetings at home by identical 2-0 scorelines, and Prempeh's early strike ensured that Holy Stars once again left Wenchi without a victory.</p><p>The Apostles managed the game effectively after taking the lead, protecting their advantage until the final whistle to give the home supporters a winning start to the club's home league campaign.</p><p>The result moves Young Apostles onto three points after two matches.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid var(--ya-blue);border-radius:0 8px 8px 0;"><p style="font-weight:800;color:var(--ya-blue-deep);font-size:1.1rem;margin:0 0 0.25rem;">FULL TIME: Young Apostles FC 1-0 Basake Holy Stars</p><p style="margin:0;color:var(--text-muted);">&#9917; Scorer: Samuel Prempeh</p></div>`,
    readTime: "3 min read"
  },
  {
    id: 'holy-stars-matchday2-preview',
    title: "Young Apostles Set for Basake Holy Stars Test in Wenchi",
    category: "MATCH PREVIEW",
    badgeClass: "news-badge-pill--preview",
    date: "Sep 11, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/md2-holy-stars-preview.jpg",
    excerpt: "Young Apostles FC will return to action on Matchday 2 of the 2026/27 Ghana Premier League season when they host Basake Holy Stars in their first home league fixture of the campaign at Wenchi.",
    content: `<p>Young Apostles FC will return to action on Matchday 2 of the 2026/27 Ghana Premier League season when they host Basake Holy Stars in their first home league fixture of the campaign at Wenchi.</p><p>The Apostles will be looking to bounce back from their opening-day defeat to Vision FC, where they suffered a 3-0 loss in Tema. With the home support behind them, Young Apostles will be aiming to put their first points of the season on the board.</p><h4>Holy Stars Yet to Win in Wenchi</h4><p>Basake Holy Stars arrive in Wenchi looking for a first victory at the venue, but their previous visits have ended in defeats. The two most recent meetings between the sides in Wenchi have both gone the way of Young Apostles, with the Apostles recording 2-0 victories in each encounter.</p><h4>Apostles Ready to Respond</h4><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid var(--ya-blue);border-radius:0 8px 8px 0;"><blockquote style="font-style:italic;font-size:1.05rem;color:var(--ya-blue-deep);margin:0 0 0.5rem 0;">"The players lost concentration at certain moments against Vision, but we've worked on those mistakes and we are fully prepared for Holy Stars."</blockquote><cite style="font-weight:700;color:var(--ya-gold-hover);font-size:0.85rem;">&mdash; Assistant Coach Abubakar Fuseini</cite></div><p><strong>Young Apostles FC vs Basake Holy Stars &bull; Sun 12th Sep &bull; 3:00PM &bull; Wenchi Sports Stadium</strong></p>`,
    readTime: "3 min read"
  },
  {
    id: 'gpl-opener-vision-fc',
    title: "Young Apostles Fall to 3-0 Defeat Against Vision FC in GPL Opener",
    category: "MATCH REPORT",
    badgeClass: "news-badge-pill--match",
    date: "Sep 6, 2026",
    source: "GPL MD 1",
    author: "Young Apostles FC",
    image: "assets/md1-vision-loss.jpg",
    excerpt: "Young Apostles FC began their 2026/27 Ghana Premier League campaign with a 3-0 defeat to Vision FC on Saturday, September 5, 2026, at the Nii Adjei Kraku II Sports Complex.",
    content: `<p>Young Apostles FC began their 2026/27 Ghana Premier League campaign with a 3-0 defeat to Vision FC on Saturday, September 5, 2026, at the Nii Adjei Kraku II Sports Complex.</p><p>The Apostles entered the opening fixture looking to start the new campaign on a positive note, but Vision FC took control early and opened the scoring in the fifth minute through Nyenye Naziru.</p><p>Young Apostles were unable to find an equaliser before the break, and Vision doubled their advantage in the 40th minute when Setsofia Aqetey found the back of the net to send the hosts into halftime with a 2-0 lead.</p><p>The second half saw Young Apostles push for a response, but Vision remained in control. Aqetey completed his brace in the 68th minute to make it 3-0.</p><p>Despite efforts from the Apostles to get back into the contest, Vision held on to secure all three points in the opening game of the 2026/27 league season. Young Apostles will now turn their attention to their next fixture, against Basake Holy Stars.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(220,38,38,0.05);border-left:4px solid #dc2626;border-radius:0 8px 8px 0;"><p style="font-weight:800;color:#dc2626;font-size:1.05rem;margin:0 0 0.25rem;">FULL TIME: Vision FC 3-0 Young Apostles FC</p><p style="margin:0;color:var(--text-muted);font-size:0.9rem;">&#9917; Naziru (5') &bull; Aqetey (40', 68')</p></div>`,
    readTime: "3 min read"
  }
];

const CMS_CONTENT_VERSION = "2026-09-17-v1";

function getUnifiedBlogs() {
  try {
    if (localStorage.getItem('ya_cms_content_version') !== CMS_CONTENT_VERSION) {
      localStorage.removeItem('ya_club_unified_blogs');
      localStorage.removeItem('ya_unified_blogs');
      localStorage.removeItem('ya_club_dispatches');
      localStorage.setItem('ya_cms_content_version', CMS_CONTENT_VERSION);
    }
    const raw = localStorage.getItem(UNIFIED_BLOGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {}
  return DEFAULT_UNIFIED_BLOGS;
}

// Backward compatibility alias
function getNewsArticles() {
  return getUnifiedBlogs();
}

function renderNews() {
  const heroContainer = document.getElementById('newsHeroContainer');
  const stackedContainer = document.getElementById('newsStackedContainer');
  const bottomStrip = document.getElementById('newsBottomStrip');
  const stripCount = document.getElementById('newsStripCount');

  const blogs = getUnifiedBlogs();
  if (!blogs || blogs.length === 0) return;

  // POSITION 1: Hero Card (Left)
  if (heroContainer && blogs[0]) {
    const lead = blogs[0];
    const leadImg = lead.image || 'assets/md3-debibi-derby.jpg';
    const tag = (lead.category || 'ARTICLE').toUpperCase();
    const dateText = lead.date || 'Sep 16, 2026';
    const readTime = lead.readTime || '4 min read';

    heroContainer.innerHTML = `
      <article class="news-hero-card" onclick="openNewsArticle('${lead.id}')">
        <img src="${leadImg}" alt="${lead.title}" class="news-hero-card__bg" onerror="this.src='assets/md3-debibi-derby.jpg'">
        <div class="news-hero-card__overlay"></div>
        <div class="news-hero-card__content">
          <span class="news-tag-badge">${tag}</span>
          <h3 class="news-hero-card__title">${lead.title}</h3>
          <div class="news-hero-card__meta">
            <span><i class="fa-regular fa-calendar"></i> ${dateText}</span>
            <span>&bull;</span>
            <span>${readTime}</span>
          </div>
        </div>
      </article>
    `;
  }

  // POSITIONS 2 & 3: 2 Stacked Cards (Right)
  if (stackedContainer) {
    const stackedBlogs = blogs.slice(1, 3);
    stackedContainer.innerHTML = stackedBlogs.map(art => {
      const artImg = art.image || 'assets/md2-prempeh-win.jpg';
      const tag = (art.category || 'ARTICLE').toUpperCase();
      const dateText = art.date || 'Recent';
      const readTime = art.readTime || '3 min read';

      return `
        <article class="news-stacked-card" onclick="openNewsArticle('${art.id}')">
          <img src="${artImg}" alt="${art.title}" class="news-stacked-card__bg" onerror="this.src='assets/md2-prempeh-win.jpg'">
          <div class="news-stacked-card__overlay"></div>
          <div class="news-stacked-card__content">
            <span class="news-tag-badge">${tag}</span>
            <h4 class="news-stacked-card__title">${art.title}</h4>
            <div class="news-hero-card__meta" style="font-size:0.75rem;">
              <span>${dateText} &bull; ${readTime}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // POSITIONS 4+: Bottom Strip (Older Stories)
  if (bottomStrip) {
    const olderBlogs = blogs.slice(3);
    if (stripCount) {
      stripCount.textContent = `${olderBlogs.length} Story${olderBlogs.length === 1 ? '' : 'ies'}`;
    }

    if (olderBlogs.length === 0) {
      bottomStrip.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 1.25rem; color: rgba(255,255,255,0.6); font-size: 0.88rem; text-align: center;">
          <i class="fa-regular fa-newspaper" style="margin-right: 0.5rem; color: var(--ya-gold);"></i> All current dispatches are featured above.
        </div>
      `;
    } else {
      bottomStrip.innerHTML = olderBlogs.map(art => {
        const artImg = art.image || 'assets/kit-home-2026.jpg';
        const tag = (art.category || 'CLUB NEWS').toUpperCase();
        const dateText = art.date || 'Past';

        return `
          <div class="news-strip-item" onclick="openNewsArticle('${art.id}')">
            <div class="news-strip-thumb">
              <img src="${artImg}" alt="${art.title}" onerror="this.src='assets/apostle-tv-video3.jpg'">
            </div>
            <div class="news-strip-text">
              <div class="news-strip-tag">${tag}</div>
              <h5 class="news-strip-heading">${art.title}</h5>
              <div class="news-strip-date">${dateText}</div>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

let currentArchiveFilter = 'all';

function filterArchiveCategory(category, buttonEl) {
  currentArchiveFilter = category;
  const buttons = document.querySelectorAll('.archive-filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');
  renderArchiveGrid();
}

function renderArchiveGrid() {
  const archiveGrid = document.getElementById('newsArchiveGrid');
  const countBadge = document.getElementById('newsArchiveCountBadge');
  if (!archiveGrid) return;

  const blogs = getUnifiedBlogs();
  const allOlder = blogs.slice(3);

  if (countBadge) {
    countBadge.textContent = `${allOlder.length} article${allOlder.length === 1 ? '' : 's'}`;
  }

  let filtered = allOlder;
  if (currentArchiveFilter !== 'all') {
    filtered = allOlder.filter(art => {
      const cat = (art.category || '').toUpperCase();
      return cat.includes(currentArchiveFilter.toUpperCase());
    });
  }

  if (filtered.length === 0) {
    archiveGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <i class="fa-regular fa-newspaper" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5; display: block;"></i>
        <p style="font-weight: 600; font-size: 0.9rem; margin: 0;">No older stories in this category.</p>
      </div>
    `;
    return;
  }

  archiveGrid.innerHTML = filtered.map(art => {
    const artImg = art.image || 'assets/kit-home-2026.jpg';
    const badgeClass = art.badgeClass || (art.category && art.category.includes('MATCH') ? 'news-badge-pill--match' : 'news-badge-pill--club');
    const badgeText = art.category || 'CLUB NEWS';
    const excerpt = art.excerpt || (art.content ? art.content.replace(/<[^>]+>/g, '').slice(0, 115) + '...' : '');

    return `
      <article class="archive-card" onclick="openNewsArticle('${art.id}')">
        <div class="archive-card__thumb">
          <img src="${artImg}" alt="${art.title}" onerror="this.src='assets/apostle-tv-video3.jpg'">
          <span class="news-badge-pill ${badgeClass}">${badgeText}</span>
        </div>
        <div class="archive-card__body">
          <div class="news-meta-row">
            <span class="news-meta-date"><i class="fa-regular fa-calendar"></i> ${art.date || 'Past'}</span>
            <span class="news-meta-dot">&bull;</span>
            <span class="news-meta-source">${art.source || 'Club Archive'}</span>
          </div>
          <h4 class="archive-card__title">${art.title}</h4>
          <p class="archive-card__excerpt">${excerpt}</p>
          <div class="archive-card__footer">
            <span>Read Article &rarr;</span>
            <span style="color:var(--text-muted); font-weight:600; font-size:0.72rem;">${art.readTime || '3 min read'}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}


function openNewsArticle(articleId) {
  const blogs = getUnifiedBlogs();
  let article = blogs.find(a => a.id === articleId);

  // Fallback to legacy dictionary
  if (!article && typeof CLUB_NEWS_ARTICLES !== 'undefined') {
    article = CLUB_NEWS_ARTICLES[articleId];
  }

  if (!article) return;

  const modal = document.getElementById('newsArticleModal');
  const imgEl = document.getElementById('newsModalImg');
  const catEl = document.getElementById('newsModalCategory');
  const dateEl = document.getElementById('newsModalDate');
  const srcEl = document.getElementById('newsModalSource');
  const titleEl = document.getElementById('newsModalTitle');
  const bodyEl = document.getElementById('newsModalContent');

  if (imgEl) {
    imgEl.src = article.image || 'assets/apostle-tv-video1.jpg';
    imgEl.style.display = 'block';
  }
  if (catEl) {
    catEl.textContent = article.category || 'CLUB NEWS';
    catEl.className = 'news-badge-pill ' + (article.badgeClass || 'news-badge-pill--match');
  }
  if (dateEl) dateEl.innerHTML = `<i class="fa-regular fa-calendar"></i> ${article.date || 'Sep 16, 2026'}`;
  if (srcEl) srcEl.innerHTML = `<i class="fa-brands fa-x-twitter"></i> ${article.source || 'Apostles Media Dispatch'}`;
  if (titleEl) titleEl.textContent = article.title;
  if (bodyEl) bodyEl.innerHTML = article.content || `<p>${article.excerpt || ''}</p>`;

  if (modal) modal.classList.add('open');
}

function closeNewsArticle() {
  document.getElementById('newsArticleModal')?.classList.remove('open');
}

// ==========================================
// 15B. APOSTLES TV SYSTEM (DYNAMIC & ADMIN SYNCED)
// ==========================================
const INITIAL_APOSTLES_TV = [
  {
    id: 'fpleoX_sUIA',
    title: 'Match Highlights: Young Apostles 1 - 0 Basake Holy Stars',
    tag: 'MATCH HIGHLIGHTS',
    thumb: 'assets/apostle-tv-video1.jpg'
  },
  {
    id: 'ixgmCVIplsk',
    title: 'Pre-Match Interview | Young Apostles vs Basake Holy Stars | Assistant Coach Abubakar Fuseini',
    tag: 'PRE-MATCH INTERVIEW',
    thumb: 'assets/apostle-tv-video2.jpg'
  },
  {
    id: '9SFZE0KVGak',
    title: 'Match Highlights: Vision FC 3 - 0 Young Apostles FC',
    tag: 'MATCH HIGHLIGHTS',
    thumb: 'assets/apostle-tv-video3.jpg'
  },
  {
    id: '9AX0fmXUMU4',
    title: 'Official Club Anthem & Matchday Experience at Wenchi',
    tag: 'CLUB ANTHEM',
    thumb: 'assets/apostle-tv-video4.jpg'
  }
];

function getApostlesTvVideos() {
  try {
    const raw = localStorage.getItem('ya_apostles_tv_videos');
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch(e) {}
  return (typeof DEFAULT_APOSTLES_TV_VIDEOS !== 'undefined') ? DEFAULT_APOSTLES_TV_VIDEOS : INITIAL_APOSTLES_TV;
}

function renderApostlesTv() {
  const container = document.getElementById('apostleTvGrid');
  if (!container) return;
  const videos = getApostlesTvVideos();
  if (!videos || videos.length === 0) return;

  container.innerHTML = videos.map((v) => {
    const cleanId = extractYouTubeId(v.id);
    const thumbUrl = v.thumb ? v.thumb : `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`;
    const fallbackThumb = `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`;
    const safeTitle = (v.title || 'Young Apostles FC Video').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const tag = v.tag || 'WATCH IN PLAYER';
    const ytUrl = `https://www.youtube.com/watch?v=${cleanId}`;

    return `
      <article class="video-card">
        <div class="video-card__thumb" onclick="playApostleVideo('${cleanId}', '${safeTitle}')" title="Play Video on Site">
          <img src="${thumbUrl}" alt="${safeTitle}" onerror="this.src='${fallbackThumb}'" loading="lazy">
          <div class="video-play-btn" title="Play Video"><i class="fa-solid fa-play"></i></div>
          <a class="video-yt-quick-badge" href="${ytUrl}" target="_blank" rel="noopener noreferrer" title="Open directly in YouTube" onclick="event.stopPropagation()">
            <i class="fa-brands fa-youtube"></i> YouTube
          </a>
        </div>
        <div class="video-card__content">
          <h3 class="video-card-title" onclick="playApostleVideo('${cleanId}', '${safeTitle}')" style="cursor:pointer;">${v.title}</h3>
          <div class="video-card-divider"></div>
          <div class="video-card-footer">
            <span class="video-card-tag" onclick="playApostleVideo('${cleanId}', '${safeTitle}')" style="cursor:pointer;"><i class="fa-solid fa-circle-play"></i> ${tag}</span>
            <a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="video-card-yt-link" title="Open directly on YouTube" onclick="event.stopPropagation()">
              <i class="fa-brands fa-youtube"></i> YouTube &rarr;
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function extractYouTubeId(urlOrId) {
  if (!urlOrId) return 'fpleoX_sUIA';
  const clean = String(urlOrId).trim();
  const match = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{11})/);
  if (match) return match[1];
  if (/^[\w-]{11}$/.test(clean)) return clean;
  if (clean === 'gpl-opener-vision') return '9SFZE0KVGak';
  return 'fpleoX_sUIA';
}

function playApostleVideo(videoId, title) {
  const modal = document.getElementById('videoPlayerModal');
  const frame = document.getElementById('videoPlayerFrame');
  const titleEl = document.getElementById('videoPlayerTitle');
  const directLink = document.getElementById('videoPlayerDirectLink');
  const modalDirectBtn = document.getElementById('videoPlayerModalDirectBtn');
  
  const cleanId = extractYouTubeId(videoId);
  const ytUrl = `https://www.youtube.com/watch?v=${cleanId}`;

  if (frame) {
    frame.src = `https://www.youtube.com/embed/${cleanId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
  }
  if (directLink) {
    directLink.href = ytUrl;
  }
  if (modalDirectBtn) {
    modalDirectBtn.href = ytUrl;
  }
  if (titleEl) titleEl.textContent = title || 'Apostles TV · Young Apostles FC';
  if (modal) modal.classList.add('open');
}

function closeVideoModal() {
  const modal = document.getElementById('videoPlayerModal');
  const frame = document.getElementById('videoPlayerFrame');
  if (frame) frame.src = '';
  if (modal) modal.classList.remove('open');
}

// ==========================================
// 16. EVENT LISTENERS INITIALIZATION
// ==========================================
function openYouTubeLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ==========================================
// 17. CLUB DISPATCHES (DEPRECATED - REPLACED BY 3 HOMEPAGE NEWS + MODERN ARCHIVE)
// ==========================================
function getDispatches() {
  return getUnifiedBlogs();
}

function renderDispatches() {
  // Live dispatches sidebar removed in favor of 3 homepage news sections + modern archive UI
}

function handleOlderStorySelect(articleId) {
  if (!articleId) return;
  openNewsArticle(articleId);
}

// ==========================================
// 18. STANDINGS QUICK SYNC & DYNAMIC TABLE
// ==========================================
function renderStandingsTable(tableData) {
  if (!Array.isArray(tableData) || tableData.length === 0) return;
  const tbody = document.getElementById('gplStandingsBody');
  if (!tbody) return;

  tbody.innerHTML = tableData.map((team, idx) => {
    const pos = team.pos || idx + 1;
    const isYA = team.isClub || (team.name && team.name.toLowerCase().includes('young apostles'));
    const crest = team.crest || 'assets/opponents/gpl-official.png';
    const played = team.played !== undefined ? team.played : 0;
    const diffNum = Number(team.diff);
    const diffStr = !isNaN(diffNum) && diffNum > 0 ? `+${diffNum}` : `${team.diff || 0}`;
    const diffColor = !isNaN(diffNum) ? (diffNum >= 0 ? '#16a34a' : '#dc2626') : '#16a34a';
    const pts = team.points !== undefined ? team.points : 0;

    if (isYA) {
      return `
        <tr class="standings-row--ya" id="standingsRowYA" style="background:#EFF6FF; border-left:4px solid #001489;">
          <td><span class="pos-pill pos-pill--ya" id="yaRankPill" style="background:#001489; color:#fff; font-weight:800;">${pos}</span></td>
          <td>
            <div class="tbl-club-cell">
              <img src="assets/official-logo.png" alt="Young Apostles FC" class="tbl-crest" style="box-shadow:0 0 0 2px #F5C800;">
              <strong style="color:#001489;">Young Apostles FC</strong>
            </div>
          </td>
          <td class="text-center" id="yaPlayed" style="font-weight:700;">${played}</td>
          <td class="text-center" id="yaGoalDiff" style="color:${diffColor}; font-weight:700;">${diffStr}</td>
          <td class="text-right pts-badge" id="yaPoints" style="background:#001489; color:#F5C800; font-weight:900;">${pts}</td>
        </tr>
      `;
    }

    const topBorder = pos === 1 ? ' style="border-left: 4px solid var(--ya-blue-deep);"' : '';
    const topPosPill = pos === 1 ? ' style="background:#EFF6FF; color:var(--ya-blue-deep); font-weight:800;"' : '';

    return `
      <tr${topBorder}>
        <td><span class="pos-pill"${topPosPill}>${pos}</span></td>
        <td>
          <div class="tbl-club-cell">
            <img src="${crest}" alt="${team.name}" class="tbl-crest" onerror="this.src='assets/opponents/gpl-official.png'">
            <span>${pos === 1 ? `<strong>${team.name}</strong>` : team.name}</span>
          </div>
        </td>
        <td class="text-center">${played}</td>
        <td class="text-center" style="color:${diffColor}; font-weight:700;">${diffStr}</td>
        <td class="text-right pts-badge">${pts}</td>
      </tr>
    `;
  }).join('');
}

function updateStandingsUI() {
  try {
    // 1. Render dynamic 18-team table if saved in storage
    const tableRaw = localStorage.getItem('ya_league_table');
    if (tableRaw) {
      try {
        const table = JSON.parse(tableRaw);
        renderStandingsTable(table);
      } catch(err) {}
    }

    // 2. Update Young Apostles specific row & top standings ribbon
    const stored = localStorage.getItem('ya_standings_record');
    if (!stored) return;
    const data = JSON.parse(stored);

    const rankEl = document.getElementById('yaRankPill');
    const playedEl = document.getElementById('yaPlayed');
    const diffEl = document.getElementById('yaGoalDiff');
    const ptsEl = document.getElementById('yaPoints');

    if (rankEl && data.rank !== undefined) rankEl.textContent = data.rank;
    if (playedEl && data.played !== undefined) playedEl.textContent = data.played;
    if (diffEl && data.diff !== undefined) {
      diffEl.textContent = (Number(data.diff) > 0 ? '+' : '') + data.diff;
      diffEl.style.color = Number(data.diff) >= 0 ? '#16a34a' : '#dc2626';
    }
    if (ptsEl && data.points !== undefined) ptsEl.textContent = data.points;
  } catch (e) {
    console.warn('Could not update standings UI', e);
  }
}

// ==========================================
// 19. LEGAL & POLICY MODALS
// ==========================================
const POLICY_DATA = {
  privacy: {
    title: 'Privacy Policy &middot; Young Apostles FC',
    content: `
      <div style="margin-bottom:1.25rem;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--ya-blue); text-transform:uppercase; letter-spacing:0.06em;">Official Club Policy &middot; Ghana Data Protection Act 2012 (Act 843)</span>
        <h4 style="font-size:1.15rem; font-weight:800; color:#0F172A; margin:0.35rem 0 0.75rem;">Your Privacy Matters to the Apostles Family</h4>
        <p>Young Apostles Football Club (&ldquo;the Club&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is deeply committed to safeguarding the privacy and personal information of our supporters, academy families, store customers, and website visitors across Ghana and the diaspora.</p>
      </div>

      <div style="margin-bottom:1.2rem;">
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-database" style="color:var(--ya-blue); margin-right:6px;"></i>1. Information We Collect</h5>
        <p>When you interact with our digital platforms, purchase jerseys in our Team Shop, or register for club membership, we collect only necessary details including:</p>
        <ul style="padding-left:1.25rem; margin:0.4rem 0;">
          <li>Full name and preferred contact telephone number (for order notifications and MoMo billing).</li>
          <li>Delivery location (residential address, regional capital, or pickup bus terminal across Ghana).</li>
          <li>Custom jersey printing specifications (player name, squad number, requested size).</li>
          <li>Opt-in email address for matchday dispatches and ticket booking receipts.</li>
        </ul>
      </div>

      <div style="margin-bottom:1.2rem;">
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-shield-check" style="color:#16a34a; margin-right:6px;"></i>2. How Your Data Is Protected &amp; Used</h5>
        <p>We strictly utilize your data to fulfill your orders, deliver customer support, verify official ticket passes at Wenchi Sports Stadium, and transmit verified match alerts. We <strong>never sell, rent, or distribute</strong> fan personal information to third-party commercial advertisers.</p>
      </div>

      <div>
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-headset" style="color:var(--ya-gold); margin-right:6px;"></i>3. Data Inquiries &amp; Club Contact</h5>
        <p>If you wish to update or delete your customer record from our digital directory, reach out directly to the Young Apostles Media &amp; Administrative Secretariat at <a href="mailto:youngapostlesfc@gmail.com" style="color:var(--ya-blue); font-weight:700;">youngapostlesfc@gmail.com</a>.</p>
      </div>
    `
  },
  terms: {
    title: 'Terms of Use &middot; Young Apostles FC',
    content: `
      <div style="margin-bottom:1.25rem;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--ya-blue); text-transform:uppercase; letter-spacing:0.06em;">Digital Services &middot; Stadium Regulations &middot; Fair Play</span>
        <h4 style="font-size:1.15rem; font-weight:800; color:#0F172A; margin:0.35rem 0 0.75rem;">Official Club Terms &amp; Conditions</h4>
        <p>Welcome to the official digital portal of Young Apostles Football Club (Wenchi, Bono Region, Ghana). By accessing this portal, browsing squad records, and ordering team apparel, you agree to comply with our Terms of Use.</p>
      </div>

      <div style="margin-bottom:1.2rem;">
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-copyright" style="color:var(--ya-blue); margin-right:6px;"></i>1. Intellectual Property &amp; Trademarks</h5>
        <p>The Young Apostles FC crest, our motto <em>&ldquo;Agya Na &#596;w&#596; Tumi&rdquo;</em>, official Mayniak match kit designs, player photographic assets, and Apostles TV broadcast content are the exclusive proprietary property of Young Apostles FC. Unauthorized commercial reproduction or counterfeit distribution is strictly prohibited under Ghanaian copyright statutes.</p>
      </div>

      <div style="margin-bottom:1.2rem;">
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-flag-checkered" style="color:#16a34a; margin-right:6px;"></i>2. GFA Matchday Conduct &amp; Stadium Safety</h5>
        <p>Spectators attending our Ghana Premier League home fixtures at the Wenchi Sports Stadium must uphold the Ghana Football Association (GFA) Fair Play Charter. Violence, pitch invasion, discriminatory chanting, and unauthorized pyrotechnics will lead to immediate expulsion and police prosecution.</p>
      </div>

      <div>
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-scale-balanced" style="color:var(--ya-gold); margin-right:6px;"></i>3. Governing Law</h5>
        <p>These terms are governed by and construed in accordance with the laws of the Republic of Ghana, with judicial jurisdiction seated in Sunyani and Wenchi, Bono Region.</p>
      </div>
    `
  },
  return: {
    title: 'Shop Return & Exchange Policy',
    content: `
      <div style="margin-bottom:1.25rem;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--ya-blue); text-transform:uppercase; letter-spacing:0.06em;">Official Mayniak Matchwear &middot; Fan Merchandise</span>
        <h4 style="font-size:1.15rem; font-weight:800; color:#0F172A; margin:0.35rem 0 0.75rem;">Jerseys &amp; Apparel Return Guidelines</h4>
        <p>We want every Apostles supporter to wear their golden yellow and royal blue colors with absolute pride and comfort. If you receive an item with sizing or manufacturing issues, here is our easy return process.</p>
      </div>

      <div style="margin-bottom:1.2rem;">
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-calendar-days" style="color:var(--ya-blue); margin-right:6px;"></i>1. 14-Day Exchange Guarantee</h5>
        <p>Merchandise may be exchanged within <strong>14 days of delivery</strong> provided the item is in pristine, unworn condition with all original Mayniak tags, holograms, and protective packaging intact.</p>
      </div>

      <div style="margin-bottom:1.2rem;">
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-shirt" style="color:#d97706; margin-right:6px;"></i>2. Custom Player &amp; Personal Name Printing</h5>
        <p>Jerseys customized with custom player names and numbers (e.g. <em>#21 PREMPEH</em>, <em>#8 RAMZY</em>, or custom fan names) cannot be returned for change of mind. If there is a typographical fault or factory print defect attributable to our team, we will replace your jersey free of charge.</p>
      </div>

      <div>
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-truck-fast" style="color:#16a34a; margin-right:6px;"></i>3. How to Initiate a Return</h5>
        <p>Send an email to <a href="mailto:youngapostlesfc@gmail.com" style="color:var(--ya-blue); font-weight:700;">youngapostlesfc@gmail.com</a> with your order name, phone number, and brief photos of the kit. Returns can be dropped off at the Wenchi Sports Stadium Club Office or forwarded via nationwide courier.</p>
      </div>
    `
  },
  momo: {
    title: 'Mobile Money (MoMo) Security Guidelines',
    content: `
      <div style="margin-bottom:1.25rem;">
        <span style="font-size:0.75rem; font-weight:700; color:#d97706; text-transform:uppercase; letter-spacing:0.06em;">MTN MoMo &middot; Telecel Cash &middot; AT Money Security</span>
        <h4 style="font-size:1.15rem; font-weight:800; color:#0F172A; margin:0.35rem 0 0.75rem;">Official Payment Safety &amp; Anti-Fraud Guidelines</h4>
        <p>Mobile Money is our primary payment gateway across Ghana. To protect supporters against impersonation scams and social engineering, please observe these vital rules.</p>
      </div>

      <div style="margin-bottom:1.2rem; background:#FEF3C7; padding:0.85rem 1rem; border-radius:8px; border-left:4px solid #D97706;">
        <div style="font-weight:800; color:#92400E; font-size:0.9rem; margin-bottom:0.25rem;"><i class="fa-solid fa-triangle-exclamation" style="margin-right:6px;"></i>Golden Rule: Never Share Your PIN</div>
        <div style="font-size:0.85rem; color:#78350F; line-height:1.5;">Young Apostles FC staff, players, and technical officials will <strong>NEVER</strong> phone, SMS, or WhatsApp you requesting your Mobile Money PIN, OTP password, or security credentials.</div>
      </div>

      <div style="margin-bottom:1.2rem; margin-top:1rem;">
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-clipboard-check" style="color:#16a34a; margin-right:6px;"></i>1. Verify Official Merchant Name &amp; Number</h5>
        <p>When authorizing payment (e.g. via <strong>*170#</strong> or MoMo App), verify that the recipient name confirms <strong>Young Apostles FC (Gerald Damoah Domfeh)</strong> on official MoMo line <strong>0539779380</strong> before entering your approval PIN.</p>
      </div>

      <div style="margin-bottom:1.2rem;">
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-receipt" style="color:var(--ya-blue); margin-right:6px;"></i>2. Transaction Reference &amp; SMS</h5>
        <p>Always retain your telco confirmation SMS containing the official Transaction ID. Our team uses this reference to instantly confirm your kit packaging and match ticket dispatch.</p>
      </div>

      <div>
        <h5 style="font-size:0.95rem; font-weight:800; color:#1E293B; margin-bottom:0.35rem;"><i class="fa-solid fa-phone-volume" style="color:#2563eb; margin-right:6px;"></i>3. Suspected Fraud Report</h5>
        <p>If anyone attempts to solicit funds in the name of Young Apostles FC using an unverified personal mobile number, report immediately to <a href="mailto:youngapostlesfc@gmail.com" style="color:var(--ya-blue); font-weight:700;">youngapostlesfc@gmail.com</a>.</p>
      </div>
    `
  }
};

function openPolicyModal(type) {
  const policy = POLICY_DATA[type];
  if (!policy) return;

  const titleEl = document.getElementById('policyModalTitle');
  const bodyEl = document.getElementById('policyModalBody');
  const modal = document.getElementById('policyModal');

  if (titleEl) titleEl.innerHTML = policy.title;
  if (bodyEl) bodyEl.innerHTML = policy.content;
  if (modal) {
    modal.classList.add('open');
    modal.style.display = 'flex';
  }
}

function closePolicyModal() {
  const modal = document.getElementById('policyModal');
  if (modal) {
    modal.classList.remove('open');
    modal.style.display = 'none';
  }
}

// ==========================================
// 20. REAL-TIME STORAGE SYNC & AUTO-POLLING
// ==========================================
let lastUnifiedBlogsHash = '';
let lastDispatchesHash = '';
let lastFixturesHash = '';
let lastStandingsHash = '';
let lastArticlesHash = '';
let lastApostlesTvHash = '';
let lastHeroHash = '';

// Apply hero write-up from admin localStorage
function applyHeroWriteup() {
  try {
    const stored = localStorage.getItem('ya_hero_custom');
    if (!stored) return;
    const data = JSON.parse(stored);
    const headlineEl = document.querySelector('.hero-headline');
    const subtitleEl = document.querySelector('.hero-subtitle');
    if (headlineEl && data.headline) headlineEl.textContent = data.headline;
    if (subtitleEl && data.subtitle) subtitleEl.innerHTML = data.subtitle;
  } catch (e) {}
}

function checkStorageUpdates() {
  try {
    const unifiedRaw = localStorage.getItem('ya_club_unified_blogs');
    if (unifiedRaw && unifiedRaw !== lastUnifiedBlogsHash) {
      lastUnifiedBlogsHash = unifiedRaw;
      renderNews();
      renderDispatches();
    }

    const dispRaw = localStorage.getItem('ya_club_dispatches');
    if (dispRaw && dispRaw !== lastDispatchesHash) {
      lastDispatchesHash = dispRaw;
      renderDispatches();
    }

    const fxRaw = localStorage.getItem('ya_club_fixtures');
    if (fxRaw && fxRaw !== lastFixturesHash) {
      lastFixturesHash = fxRaw;
      renderMatches();
      if (document.getElementById('fixturesModal')?.classList.contains('open')) {
        renderFixturesModal(currentFixturesRound);
      }
    }

    const standRaw = localStorage.getItem('ya_standings_record');
    if (standRaw && standRaw !== lastStandingsHash) {
      lastStandingsHash = standRaw;
      updateStandingsUI();
    }

    const artRaw = localStorage.getItem('ya_club_articles');
    if (artRaw && artRaw !== lastArticlesHash) {
      lastArticlesHash = artRaw;
      renderNews();
    }

    const tvRaw = localStorage.getItem('ya_apostles_tv_videos');
    if (tvRaw && tvRaw !== lastApostlesTvHash) {
      lastApostlesTvHash = tvRaw;
      renderApostlesTv();
    }

    const heroRaw = localStorage.getItem('ya_hero_custom');
    if (heroRaw && heroRaw !== lastHeroHash) {
      lastHeroHash = heroRaw;
      applyHeroWriteup();
    }
  } catch (err) {
    // Ignore storage polling errors
  }
}

// Storage event across tabs/windows
window.addEventListener('storage', (e) => {
  if (e.key === 'ya_club_unified_blogs' || e.key === 'ya_club_articles' || e.key === 'ya_club_dispatches') {
    renderNews();
    renderDispatches();
  }
  if (e.key === 'ya_club_fixtures') {
    renderMatches();
    if (document.getElementById('fixturesModal')?.classList.contains('open')) {
      renderFixturesModal(currentFixturesRound);
    }
  }
  if (e.key === 'ya_standings_record') {
    updateStandingsUI();
  }
  if (e.key === 'ya_league_table') {
    try {
      renderStandingsTable(JSON.parse(e.newValue));
    } catch(err) {}
  }
  if (e.key === 'ya_apostles_tv_videos') {
    renderApostlesTv();
  }
  if (e.key === 'ya_hero_custom') {
    applyHeroWriteup();
  }
});

// BroadcastChannel for cross-tab communication (instant reflections without page refresh)
if (window.BroadcastChannel) {
  try {
    const bc = new BroadcastChannel('ya_channel');
    bc.onmessage = (ev) => {
      if (ev.data && (ev.data.type === 'TV_UPDATED' || ev.data.type === 'CMS_UPDATED')) {
        if (ev.data.videos) {
          localStorage.setItem('ya_apostles_tv_videos', JSON.stringify(ev.data.videos));
        }
        renderApostlesTv();
      }
      if (ev.data && ev.data.type === 'FIXTURES_UPDATED') {
        if (ev.data.fixtures) {
          localStorage.setItem('ya_club_fixtures', JSON.stringify(ev.data.fixtures));
        }
        renderMatches();
        if (document.getElementById('fixturesModal')?.classList.contains('open')) {
          renderFixturesModal(currentFixturesRound);
        }
        updateCountdown();
      }
      if (ev.data && ev.data.type === 'HERO_UPDATED') {
        if (ev.data.hero) {
          localStorage.setItem('ya_hero_custom', JSON.stringify(ev.data.hero));
        }
        applyHeroWriteup();
      }
      if (ev.data && ev.data.type === 'STANDINGS_UPDATED') {
        if (ev.data.standings) {
          localStorage.setItem('ya_standings_record', JSON.stringify(ev.data.standings));
        }
        updateStandingsUI();
      }
      if (ev.data && ev.data.type === 'TABLE_UPDATED') {
        if (ev.data.table) {
          localStorage.setItem('ya_league_table', JSON.stringify(ev.data.table));
          renderStandingsTable(ev.data.table);
        }
      }
      if (ev.data && ev.data.type === 'MEMBER_SAVED') {
        loadProfileData();
        updateVipPassVisibility();
      }
    };
  } catch(e) {}
}

function applyHeroWriteup() {
  let heroData = null;
  try {
    const raw = localStorage.getItem('ya_hero_custom');
    if (raw) heroData = JSON.parse(raw);
  } catch(e) {}

  if (!heroData) return;

  const headlineEl = document.getElementById('heroHeadlineDisplay') || document.querySelector('.hero-headline');
  const subtitleEl = document.getElementById('heroSubtitleDisplay') || document.querySelector('.hero-subtitle');
  const bgImgEl = document.getElementById('heroBgImage') || document.querySelector('.hero-bg-image');
  const ctaBtn = document.getElementById('heroCtaBtn') || document.querySelector('.hero-cta-row .btn-hero-primary');

  if (headlineEl && heroData.headline) {
    headlineEl.textContent = heroData.headline;
  }
  if (subtitleEl && heroData.subtitle) {
    subtitleEl.innerHTML = heroData.subtitle;
  }
  if (bgImgEl && heroData.image) {
    bgImgEl.src = heroData.image;
  }
  if (ctaBtn) {
    if (heroData.ctaText) {
      ctaBtn.innerHTML = `<i class="fa-solid fa-calendar-check"></i> ${heroData.ctaText}`;
    }
    if (heroData.ctaLink) {
      ctaBtn.setAttribute('href', heroData.ctaLink);
    }
  }
}

function updateVipPassVisibility() {
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem('ya_user_profile') || '{}'); } catch(e) {}

  // The VIP pass button should be present ONLY after paying
  const isPaid = Boolean(
    profile.hasPaid === true ||
    profile.paymentStatus === 'paid' ||
    profile.moolreTxId ||
    profile.momoTxId ||
    profile.paidRef
  );

  const vipBtn = document.getElementById('mobileVipPassBtn');
  if (vipBtn) {
    if (isPaid) {
      vipBtn.style.display = 'inline-flex';
      vipBtn.classList.add('is-active-paid');
      vipBtn.title = `${profile.tier || 'VIP'} Member Pass Active`;
    } else {
      vipBtn.style.display = 'none';
      vipBtn.classList.remove('is-active-paid');
    }
  }
}

function checkStorageUpdates() {
  try {
    applyHeroWriteup();
    updateStandingsUI();
    updateVipPassVisibility();
  } catch(e) {}
}

// Cloud sync from central repository data/cms.json
async function initCloudSync() {
  try {
    const res = await fetch('data/cms.json?v=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      if (!data) return;

      // Sync blogs & dispatches
      if (Array.isArray(data.blogs) && data.blogs.length > 0) {
        localStorage.setItem('ya_unified_blogs', JSON.stringify(data.blogs));
        localStorage.setItem('ya_club_unified_blogs', JSON.stringify(data.blogs));
        localStorage.setItem('ya_club_dispatches', JSON.stringify(data.blogs));
        renderNews();
        renderDispatches();
      }

      // Sync Hero
      if (data.hero) {
        localStorage.setItem('ya_hero_custom', JSON.stringify(data.hero));
        applyHeroWriteup();
      }

      // Sync Apostles TV - direct authoritative sync so deletions reflect immediately
      if (Array.isArray(data.apostlesTv)) {
        localStorage.setItem('ya_apostles_tv_videos', JSON.stringify(data.apostlesTv));
        renderApostlesTv();
      }

      // Sync Standings Ribbon
      if (data.standings) {
        localStorage.setItem('ya_standings_record', JSON.stringify(data.standings));
        updateStandingsUI();
      }

      // Sync Full League Table (18 Teams)
      if (Array.isArray(data.leagueTable) && data.leagueTable.length > 0) {
        localStorage.setItem('ya_league_table', JSON.stringify(data.leagueTable));
        renderStandingsTable(data.leagueTable);
      }

      // Sync Fixtures
      if (Array.isArray(data.fixtures) && data.fixtures.length > 0) {
        localStorage.setItem('ya_club_fixtures', JSON.stringify(data.fixtures));
        renderMatches('all');
        if (document.getElementById('fixturesModal')?.classList.contains('open')) {
          renderFixturesModal(currentFixturesRound);
        }
        updateCountdown();
      }
    }
  } catch (e) {
    console.warn('Cloud sync fallback to local cache', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderSquad('all');
  renderProducts('all');
  renderMatches('all');
  renderNews();
  renderApostlesTv();
  renderDispatches();
  updateStandingsUI();
  applyHeroWriteup();
  initCloudSync(); // Fetch latest centralized cloud data for all devices
  updateCountdown(); // Call immediately so numbers show right away
  setInterval(updateCountdown, 1000);
  setInterval(checkStorageUpdates, 2000); // Poll for Admin live updates

  // Mobile Toggle & gestures
  document.getElementById('mobileToggle')?.addEventListener('click', toggleMobileNav);
  initDrawerPullGesture();

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

  // Match Category Tabs — real-time filter
  document.querySelectorAll('#matchCategoryTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#matchCategoryTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMatches(btn.getAttribute('data-match-cat'));
    });
  });

  // Init profile & VIP pass visibility
  loadProfileData();
  updateVipPassVisibility();
  updateWaitlistCount();
});


// ==========================================
// MEMBER PROFILE MODAL
// ==========================================
function openProfileModal() {
  loadProfileData();
  const modal = document.getElementById('profileModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
  }
  document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
  const modal = document.getElementById('profileModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('open');
  }
  document.body.style.overflow = '';
}

function openMembershipFromProfile() {
  closeProfileModal();
  setTimeout(() => {
    openMembershipModal();
  }, 200);
}

const openProfilePanel = openProfileModal;
const closeProfilePanel = closeProfileModal;

function loadProfileData() {
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem('ya_user_profile') || '{}'); } catch(e) {}

  // If name not set in ya_user_profile, check ya_members_list
  if (!profile.name || profile.name === 'Official Fan') {
    try {
      const list = JSON.parse(localStorage.getItem('ya_members_list') || '[]');
      if (Array.isArray(list) && list.length > 0 && list[0].name) {
        profile = { ...list[0], ...profile, name: list[0].name };
      }
    } catch(e) {}
  }

  // Ensure unique permanent pass ID
  if (!profile.id) {
    profile.id = 'YAFC-26-' + Math.floor(1000 + Math.random() * 9000);
    try { localStorage.setItem('ya_user_profile', JSON.stringify(profile)); } catch(e) {}
  }

  const nameEl = document.getElementById('profileName');
  const phoneEl = document.getElementById('profilePhone');
  const emailEl = document.getElementById('profileEmail');
  const tierEl = document.getElementById('profileTier');
  const passIdEl = document.getElementById('profilePassId');

  if (nameEl) nameEl.value = (profile.name && profile.name !== 'Official Fan') ? profile.name : '';
  if (phoneEl) phoneEl.value = profile.phone || '';
  if (emailEl) emailEl.value = profile.email || '';
  if (passIdEl) passIdEl.textContent = profile.id;
  
  const currentTier = profile.tier || '';
  if (tierEl) tierEl.value = currentTier;

  // Highlight tier card
  const optStd = document.getElementById('optTierStandard');
  const optGold = document.getElementById('optTierGold');
  if (optStd) optStd.classList.toggle('selected', currentTier.includes('Standard'));
  if (optGold) optGold.classList.toggle('selected', currentTier.includes('Gold VIP'));

  // Update display
  const displayName = (profile.name && profile.name !== 'Official Fan') ? profile.name : 'Official Fan';
  const initials = (profile.name && profile.name !== 'Official Fan')
    ? profile.name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'YA';

  const avatarEl = document.getElementById('profileAvatar');
  const nameDisplayEl = document.getElementById('profileDisplayName');
  const tierBadgeEl = document.getElementById('profileTierBadge');
  const topNameEl = document.getElementById('profileTopName');

  if (avatarEl) avatarEl.textContent = initials || 'YA';
  if (nameDisplayEl) nameDisplayEl.textContent = displayName;
  
  if (tierBadgeEl) {
    if (currentTier.includes('Gold VIP')) {
      tierBadgeEl.className = 'cool-tier-pill cool-tier-pill--gold';
      tierBadgeEl.innerHTML = '<i class="fa-solid fa-trophy"></i> Gold VIP &bull; 2026/27 Season Pass';
    } else if (currentTier.includes('Standard')) {
      tierBadgeEl.className = 'cool-tier-pill cool-tier-pill--standard';
      tierBadgeEl.innerHTML = '<i class="fa-solid fa-id-badge"></i> Standard Apostle &bull; 2026/27 Season Pass';
    } else {
      tierBadgeEl.className = 'cool-tier-pill cool-tier-pill--guest';
      tierBadgeEl.innerHTML = '<i class="fa-solid fa-ticket"></i> Fan Member &bull; 2026/27 Season';
    }
  }

  if (topNameEl) {
    topNameEl.textContent = (profile.name && profile.name !== 'Official Fan') ? profile.name.trim().split(' ')[0] : 'My Profile';
  }

  // Perks visibility
  const perkDiscount = document.getElementById('perkDiscount');
  const perkVip = document.getElementById('perkVip');
  if (perkDiscount) perkDiscount.style.opacity = currentTier ? '1' : '0.4';
  if (perkVip) perkVip.style.opacity = currentTier.includes('Gold VIP') ? '1' : '0.4';

  // Load waitlist orders
  renderProfileOrders();
  updateVipPassVisibility();
}

function selectTierInProfile(tier) {
  const tierEl = document.getElementById('profileTier');
  const current = tierEl ? tierEl.value : '';
  
  // Toggle: clicking already selected removes selection
  const newTier = (current === tier || current.includes(tier)) ? '' : tier;
  if (tierEl) tierEl.value = newTier;

  const optStd = document.getElementById('optTierStandard');
  const optGold = document.getElementById('optTierGold');
  if (optStd) optStd.classList.toggle('selected', newTier.includes('Standard'));
  if (optGold) optGold.classList.toggle('selected', newTier.includes('Gold VIP'));

  const tierBadgeEl = document.getElementById('profileTierBadge');
  if (tierBadgeEl) {
    if (newTier.includes('Gold VIP')) {
      tierBadgeEl.className = 'cool-tier-pill cool-tier-pill--gold';
      tierBadgeEl.innerHTML = '<i class="fa-solid fa-trophy"></i> Gold VIP &bull; 2026/27 Season Pass';
    } else if (newTier.includes('Standard')) {
      tierBadgeEl.className = 'cool-tier-pill cool-tier-pill--standard';
      tierBadgeEl.innerHTML = '<i class="fa-solid fa-id-badge"></i> Standard Apostle &bull; 2026/27 Season Pass';
    } else {
      tierBadgeEl.className = 'cool-tier-pill cool-tier-pill--guest';
      tierBadgeEl.innerHTML = '<i class="fa-solid fa-ticket"></i> Fan Member &bull; 2026/27 Season';
    }
  }
}

function saveProfile(e) {
  if (e && e.preventDefault) e.preventDefault();

  const name = document.getElementById('profileName')?.value.trim();
  const phone = document.getElementById('profilePhone')?.value.trim();
  const email = document.getElementById('profileEmail')?.value.trim();
  const tier = document.getElementById('profileTier')?.value || 'Official Fan Pass';

  if (!name) {
    showToast('⚠️ Please enter your Full Name.');
    document.getElementById('profileName')?.focus();
    return;
  }
  if (!phone) {
    showToast('⚠️ Please enter your Phone/WhatsApp Number.');
    document.getElementById('profilePhone')?.focus();
    return;
  }

  // Preserve pass ID and payment status if existing
  let existingProfile = {};
  try { existingProfile = JSON.parse(localStorage.getItem('ya_user_profile') || '{}'); } catch(err) {}

  const passId = existingProfile.id || ('YAFC-26-' + Math.floor(1000 + Math.random() * 9000));
  const now = new Date().toISOString();

  const profile = {
    id: passId,
    name: name,
    phone: phone,
    email: email || '',
    tier: tier,
    subscription: '2026/27 GPL Season Pass',
    status: existingProfile.status || 'Active',
    hasPaid: Boolean(existingProfile.hasPaid),
    momoTxId: existingProfile.momoTxId || '',
    moolreTxId: existingProfile.moolreTxId || '',
    paidRef: existingProfile.paidRef || '',
    paidAmount: existingProfile.paidAmount || null,
    joinDate: existingProfile.joinDate || now,
    updatedAt: now
  };

  // 1. Save active user profile
  try {
    localStorage.setItem('ya_user_profile', JSON.stringify(profile));
  } catch(err) {}

  // 2. Save / Update in ya_members_list for admin and persistent storage
  try {
    let list = JSON.parse(localStorage.getItem('ya_members_list') || '[]');
    if (!Array.isArray(list)) list = [];
    const idx = list.findIndex(m => (phone && m.phone === phone) || (m.id && m.id === passId) || (email && m.email === email));
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...profile };
    } else {
      list.unshift(profile);
    }
    localStorage.setItem('ya_members_list', JSON.stringify(list));
  } catch(err) {}

  // 3. Broadcast real-time storage event so open Admin tabs update immediately
  try {
    window.dispatchEvent(new Event('storage'));
    if (window.BroadcastChannel) {
      const bc = new BroadcastChannel('ya_channel');
      bc.postMessage({ type: 'MEMBER_SAVED', profile: profile });
      bc.close();
    }
  } catch(err) {}

  // 4. Update display in profile modal
  loadProfileData();

  // 5. Visual button feedback & status card
  const saveBtn = document.getElementById('btnProfileSave');
  if (saveBtn) {
    saveBtn.classList.add('saved');
    saveBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Profile &amp; 2026/27 Season Pass Saved!';
    setTimeout(() => {
      saveBtn.classList.remove('saved');
      saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Seasonal Profile Details';
    }, 4000);
  }

  const statusEl = document.getElementById('profileSaveStatus');
  if (statusEl) {
    statusEl.style.display = 'flex';
    statusEl.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#16A34A;font-size:1.15rem;flex-shrink:0;"></i> <div><strong>Profile Saved Successfully!</strong><br><span style="font-size:0.78rem;">Pass ID: <code>${passId}</code> &bull; <strong>${profile.subscription}</strong> (${tier}). Synced to Admin Control Panel.</span></div>`;
  }

  const waBtn = document.getElementById('btnProfileWhatsApp');
  if (waBtn) waBtn.style.display = 'flex';

  showToast(`✅ Profile saved! Welcome to Young Apostles FC 2026/27 Season, ${name}!`);
}

function sendProfileWhatsApp() {
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem('ya_user_profile') || '{}'); } catch(e) {}
  const name = profile.name || document.getElementById('profileName')?.value.trim() || 'Apostle Fan';
  const phone = profile.phone || document.getElementById('profilePhone')?.value.trim() || '—';
  const email = profile.email || document.getElementById('profileEmail')?.value.trim() || '—';
  const tier = profile.tier || 'Standard Apostle';
  const passId = profile.id || 'YAFC-26-PASS';

  const msg = `*OFFICIAL YOUNG APOSTLES FC — 2026/27 SEASONAL SUBSCRIPTION*%0A%0A` +
              `*Pass ID:* ${passId}%0A` +
              `*Member Name:* ${name}%0A` +
              `*Phone / WhatsApp:* ${phone}%0A` +
              `*Email:* ${email}%0A` +
              `*Subscription:* 2026/27 Ghana Premier League Season Pass%0A` +
              `*Tier:* ${tier}%0A` +
              `*Status:* Active Member%0A%0A` +
              `_Agya Na Ɔwɔ Tumi! Please confirm my 2026/27 official seasonal subscription._`;

  window.open(`https://wa.me/233539779380?text=${msg}`, '_blank');
}

function renderProfileOrders() {
  const container = document.getElementById('profileOrdersList');
  if (!container) return;

  let orders = [];
  try { orders = JSON.parse(localStorage.getItem('ya_waitlist_orders') || '[]'); } catch(e) {}

  if (!orders.length) {
    try { orders = JSON.parse(localStorage.getItem('ya_orders') || '[]'); } catch(e) {}
  }

  if (orders.length === 0) {
    container.innerHTML = `<div class="profile-orders-empty"><i class="fa-solid fa-basket-shopping"></i><p>No waitlist entries yet. Browse the shop!</p></div>`;
    return;
  }

  container.innerHTML = orders.slice(0, 5).map(order => `
    <div class="profile-order-entry">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div class="profile-order-ref">${order.ref || 'YAFC-ORDER'}</div>
          <div style="margin-top:0.2rem;font-size:0.8rem;color:var(--text-muted);">${order.date || ''}</div>
          <div style="margin-top:0.3rem;font-size:0.82rem;font-weight:600;">${(order.items || []).map(i => i.name).join(', ')}</div>
        </div>
        <div>
          <div class="profile-order-status">${order.status || 'On Waitlist'}</div>
          <div style="font-size:0.78rem;font-weight:700;color:var(--ya-blue);margin-top:0.25rem;text-align:right;">GHS ${order.total ? order.total.toFixed(2) : '0.00'}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================
// WAITLIST ORDER SAVE
// ==========================================
function saveWaitlistOrder(orderData) {
  try {
    const existing = JSON.parse(localStorage.getItem('ya_waitlist_orders') || '[]');
    existing.unshift({ ...orderData, status: 'On Waitlist', savedAt: new Date().toISOString() });
    localStorage.setItem('ya_waitlist_orders', JSON.stringify(existing));
    updateWaitlistCount();
  } catch(e) {}
}

function updateWaitlistCount() {
  const el = document.getElementById('shopWaitlistCount');
  if (!el) return;
  try {
    const orders = JSON.parse(localStorage.getItem('ya_waitlist_orders') || '[]');
    el.textContent = orders.length;
  } catch(e) { el.textContent = '0'; }
}

// Stub out old anticipate functions to prevent any residual errors
function openAnticipateOverlay() {}
function closeAnticipateOverlay() {}
function updateOverlayCountdown() {}
