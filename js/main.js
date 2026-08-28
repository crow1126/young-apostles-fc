/**
 * YOUNG APOSTLES FC — MAIN JAVASCRIPT
 * Navbar, countdown, squad grid, modal, stories scroll
 */

const SQUAD = [
  { name: 'Frank Boateng', number: 1, position: 'goalkeeper', role: 'Goalkeeper', nationality: 'Ghana', appearances: 24 },
  { name: 'Abdulai Kadel', number: 16, position: 'goalkeeper', role: 'Goalkeeper', nationality: 'Ghana', appearances: 8 },
  { name: 'Samuel Prempeh', number: 2, position: 'defender', role: 'Right Back', nationality: 'Ghana', appearances: 22 },
  { name: 'Mathias Amegbe', number: 3, position: 'defender', role: 'Left Back', nationality: 'Ghana', appearances: 20 },
  { name: 'Joseph Mensah', number: 4, position: 'defender', role: 'Center Back', nationality: 'Ghana', appearances: 26 },
  { name: 'Razak Sarpong (C)', number: 5, position: 'defender', role: 'Center Back', nationality: 'Ghana', appearances: 28 },
  { name: 'Ibrahim Fuseini', number: 6, position: 'defender', role: 'Center Back', nationality: 'Ghana', appearances: 18 },
  { name: 'Vincent Mobilla', number: 12, position: 'defender', role: 'Full Back', nationality: 'Ghana', appearances: 15 },
  { name: 'Junior Afram', number: 8, position: 'midfielder', role: 'Central Midfielder', nationality: 'Ghana', appearances: 25 },
  { name: 'Richmond Ampong', number: 10, position: 'midfielder', role: 'Attacking Midfielder', nationality: 'Ghana', appearances: 27 },
  { name: 'Foster Agyarko', number: 14, position: 'midfielder', role: 'Defensive Midfielder', nationality: 'Ghana', appearances: 23 },
  { name: 'Issah Nyaabila', number: 17, position: 'midfielder', role: 'Right Winger', nationality: 'Ghana', appearances: 19 },
  { name: 'Samuel Amankwah', number: 18, position: 'midfielder', role: 'Central Midfielder', nationality: 'Ghana', appearances: 16 },
  { name: 'Gideon Gyamfi', number: 20, position: 'midfielder', role: 'Box-to-Box Midfielder', nationality: 'Ghana', appearances: 21 },
  { name: 'Agyemang Kingsford', number: 9, position: 'forward', role: 'Center Forward', nationality: 'Ghana', appearances: 26 },
  { name: 'Prince Mensah', number: 11, position: 'forward', role: 'Left Winger', nationality: 'Ghana', appearances: 22 },
  { name: 'Richmond Nsiah Coka', number: 19, position: 'forward', role: 'Striker', nationality: 'Ghana', appearances: 18 },
  { name: 'Sule Muntalla', number: 21, position: 'forward', role: 'Right Winger', nationality: 'Ghana', appearances: 17 },
  { name: 'Emmanuel Boateng', number: 23, position: 'forward', role: 'Striker', nationality: 'Ghana', appearances: 14 },
  { name: 'Pius Yeboah Asante', number: 27, position: 'forward', role: 'Forward', nationality: 'Ghana', appearances: 12 }
];

const NEWS = {
  '1': {
    title: 'Young Apostles FC: Pride of Wenchi Arrives in the Ghana Premier League',
    category: 'FIRST TEAM',
    date: 'June 6, 2024',
    author: 'Club Editorial',
    image: 'assets/promotion-celebration.jpg',
    body: `<p>The municipality of Wenchi erupted in celebration as Young Apostles FC clinched promotion to the Ghana Premier League via a penalty shootout victory against Techiman Heroes at the Accra Sports Stadium.</p>
           <p>After intensive pre-season conditioning in Sunyani under coach coordination by Vincent Henneh, the club declared the squad fully prepared for top-flight competition beginning September 4, 2026.</p>`
  },
  '2': {
    title: 'From Wenchi to Scotland: How Mathew Anim Cudjoe\'s Breakthrough Inspired A Generation',
    category: 'GLOBAL APOSTLES',
    date: 'May 28, 2024',
    author: 'Youth Development Desk',
    image: 'assets/team-banner.jpg',
    body: `<p>Mathew Anim Cudjoe's trajectory from the Young Apostles Academy to Dundee United remains Ghana football's most celebrated modern success story.</p>
           <p>Developed through Apostles' technical coaching system, he went on loan to Asante Kotoko and Legon Cities before securing a permanent move to the Scottish Premiership in 2021.</p>`
  },
  '3': {
    title: 'Squad Readiness Update: "Battle-Ready and Tactically Prepared"',
    category: 'COMMUNICATIONS',
    date: 'August 21, 2026',
    author: 'Vincent Henneh — Club PR',
    image: 'assets/news-1.jpg',
    body: `<p>In an official media communiqué ahead of Matchday 1, Head of Communications Vincent Henneh confirmed all player registrations are cleared with the Ghana Football Association.</p>
           <p>The first team squad returns from a concentrated pre-season block in Sunyani with no injury concerns reported.</p>`
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSearch();
  initCountdown();
  initSquadGrid();
  initModal();
  initStoriesScroll();
  initAccessScroll();
});

/* Navbar — mobile toggle, sticky effect */
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

  // Subtle shadow on scroll
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 16px rgba(0,0,0,0.18)'
      : '0 2px 8px rgba(0,0,0,0.12)';
  });
}

// Expose for onclick in HTML
function closeMobileNav() {
  const drawer = document.getElementById('navMobileDrawer');
  if (drawer) drawer.classList.remove('open');
}

/* Search drawer */
function initSearch() {
  const btn = document.getElementById('searchToggle');
  const drawer = document.getElementById('searchDrawer');
  const close = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');

  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    drawer.classList.toggle('show');
    if (drawer.classList.contains('show') && input) input.focus();
  });

  if (close) close.addEventListener('click', () => drawer.classList.remove('show'));
}

/* Live Countdown */
function initCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 6);
  target.setHours(15, 0, 0, 0);

  const dEl = document.getElementById('cdDays');
  const hEl = document.getElementById('cdHours');
  const mEl = document.getElementById('cdMins');
  const sEl = document.getElementById('cdSecs');

  if (!dEl) return;

  function tick() {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      dEl.textContent = hEl.textContent = mEl.textContent = '00';
      sEl.textContent = '00';
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

/* Squad Grid */
function initSquadGrid() {
  const grid = document.getElementById('squadGrid');
  const tabs = document.querySelectorAll('.pos-tab');

  function render(filter) {
    if (!grid) return;
    const players = SQUAD.filter(p => filter === 'all' || p.position === filter);
    grid.innerHTML = players.map(p => `
      <div class="player-box">
        <div class="player-box__top">
          <i class="fa-solid fa-user"></i>
          <span class="player-box__num">#${p.number}</span>
        </div>
        <div class="player-box__info">
          <span class="player-pos-tag">${p.role}</span>
          <h3 class="player-fullname">${p.name}</h3>
          <div class="player-meta-row">
            <span><i class="fa-solid fa-flag"></i> ${p.nationality}</span>
            <span><i class="fa-solid fa-shirt"></i> ${p.appearances} apps</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.dataset.filter);
    });
  });

  render('all');
}

/* News Modal */
function initModal() {
  const modal = document.getElementById('newsModal');
  const content = document.getElementById('newsModalContent');
  const closeBtn = document.getElementById('newsModalClose');

  document.querySelectorAll('.open-news-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const story = NEWS[btn.dataset.newsId];
      if (!story || !content) return;

      content.innerHTML = `
        <div style="margin-bottom:1rem;">
          <span style="
            display:inline-block;
            background:#0C1538;
            color:#FFCA00;
            font-family:'Oswald',sans-serif;
            font-size:0.6875rem;
            font-weight:800;
            letter-spacing:0.08em;
            padding:0.2rem 0.6rem;
            border-radius:3px;
            margin-bottom:0.6rem;
          ">${story.category}</span>
          <h2 style="font-family:'Oswald',sans-serif;font-size:1.6rem;font-weight:700;color:#0C1538;line-height:1.15;margin-bottom:0.5rem;">${story.title}</h2>
          <div style="font-size:0.75rem;color:#718096;display:flex;gap:1rem;">
            <span><i class="fa-regular fa-calendar" style="color:#004D98;"></i> ${story.date}</span>
            <span><i class="fa-regular fa-user" style="color:#004D98;"></i> ${story.author}</span>
          </div>
        </div>
        <div style="border-radius:6px;overflow:hidden;margin-bottom:1.25rem;">
          <img src="${story.image}" alt="${story.title}" style="width:100%;height:240px;object-fit:cover;">
        </div>
        <div style="color:#374151;line-height:1.75;font-size:0.9375rem;">
          ${story.body}
        </div>
      `;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.querySelector('.news-modal__bg').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* Stories horizontal scroll */
function initStoriesScroll() {
  const track = document.getElementById('storiesTrack');
  const nextBtn = document.getElementById('storiesNextBtn');

  if (nextBtn && track) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 400, behavior: 'smooth' });
    });
  }
}

/* Access cards scroll */
function initAccessScroll() {
  const track = document.getElementById('accessTrack');
  const prev = document.getElementById('accessPrev');
  const next = document.getElementById('accessNext');

  if (!track) return;

  if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -300, behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => track.scrollBy({ left: 300, behavior: 'smooth' }));
}
