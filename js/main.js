/**
 * ==========================================================================
 * YOUNG APOSTLES FC — CLEAN TABBED SCRIPT ENGINE
 * Fast tab transitions, dynamic squad filters, match countdown & news modal
 * ==========================================================================
 */

// Squad Roster
const SQUAD_ROSTER = [
  { id: 1, name: 'Frank Boateng', number: 1, position: 'goalkeeper', role: 'Goalkeeper', nationality: 'Ghana', appearances: 24 },
  { id: 2, name: 'Abdulai Kadel', number: 16, position: 'goalkeeper', role: 'Goalkeeper', nationality: 'Ghana', appearances: 8 },
  { id: 3, name: 'Samuel Prempeh', number: 2, position: 'defender', role: 'Right Back', nationality: 'Ghana', appearances: 22 },
  { id: 4, name: 'Mathias Amegbe', number: 3, position: 'defender', role: 'Left Back', nationality: 'Ghana', appearances: 20 },
  { id: 5, name: 'Joseph Mensah', number: 4, position: 'defender', role: 'Center Back', nationality: 'Ghana', appearances: 26 },
  { id: 6, name: 'Razak Sarpong', number: 5, position: 'defender', role: 'Center Back (C)', nationality: 'Ghana', appearances: 28 },
  { id: 7, name: 'Ibrahim Fuseini', number: 6, position: 'defender', role: 'Center Back', nationality: 'Ghana', appearances: 18 },
  { id: 8, name: 'Vincent Mobilla', number: 12, position: 'defender', role: 'Full Back', nationality: 'Ghana', appearances: 15 },
  { id: 9, name: 'Junior Afram', number: 8, position: 'midfielder', role: 'Central Midfielder', nationality: 'Ghana', appearances: 25 },
  { id: 10, name: 'Richmond Ampong', number: 10, position: 'midfielder', role: 'Attacking Midfielder', nationality: 'Ghana', appearances: 27 },
  { id: 11, name: 'Foster Agyarko', number: 14, position: 'midfielder', role: 'Defensive Midfielder', nationality: 'Ghana', appearances: 23 },
  { id: 12, name: 'Issah Nyaabila', number: 17, position: 'midfielder', role: 'Right Winger', nationality: 'Ghana', appearances: 19 },
  { id: 13, name: 'Samuel Amankwah', number: 18, position: 'midfielder', role: 'Central Midfielder', nationality: 'Ghana', appearances: 16 },
  { id: 14, name: 'Gideon Gyamfi', number: 20, position: 'midfielder', role: 'Box-to-Box Midfielder', nationality: 'Ghana', appearances: 21 },
  { id: 15, name: 'Agyemang Kingsford', number: 9, position: 'forward', role: 'Center Forward', nationality: 'Ghana', appearances: 26 },
  { id: 16, name: 'Prince Mensah', number: 11, position: 'forward', role: 'Left Winger', nationality: 'Ghana', appearances: 22 },
  { id: 17, name: 'Richmond Nsiah Coka', number: 19, position: 'forward', role: 'Striker', nationality: 'Ghana', appearances: 18 },
  { id: 18, name: 'Sule Muntalla', number: 21, position: 'forward', role: 'Right Winger', nationality: 'Ghana', appearances: 17 },
  { id: 19, name: 'Emmanuel Boateng', number: 23, position: 'forward', role: 'Striker', nationality: 'Ghana', appearances: 14 },
  { id: 20, name: 'Pius Yeboah Asante', number: 27, position: 'forward', role: 'Forward', nationality: 'Ghana', appearances: 12 }
];

// News Database
const NEWS_ITEMS = {
  '1': {
    title: 'Pride of Wenchi: Young Apostles Ready for Historic Premier League Campaign',
    category: 'FIRST TEAM',
    date: 'June 6, 2024',
    author: 'Club Editorial',
    image: 'assets/promotion-celebration.jpg',
    content: `
      <p>The entire municipality of Wenchi in the Bono Region erupted in joyful celebration as Young Apostles FC officially marked their historic entry into the Ghana Premier League.</p>
      <p>Following a tense promotional playoff against Techiman Heroes at the Accra Sports Stadium that ended in a penalty shootout victory, the club has finalized intensive tactical conditioning in Sunyani and is ready for the top flight.</p>
    `
  },
  '2': {
    title: 'From Wenchi to Scotland: How Mathew Anim Cudjoe\'s Breakthrough Inspired A Generation',
    category: 'GLOBAL APOSTLES',
    date: 'May 28, 2024',
    author: 'Youth Development',
    image: 'assets/team-banner.jpg',
    content: `
      <p>Mathew Anim Cudjoe's development in the Young Apostles Academy remains one of Ghanaian football's crowning modern success stories.</p>
      <p>Scouted as a teenage prospect, Cudjoe developed through Apostles' technical system, starred in domestic loan spells at Asante Kotoko and Legon Cities, before signing a landmark contract with Scottish Premiership outfit Dundee United in 2021.</p>
    `
  },
  '3': {
    title: 'Vincent Henneh: "Squad is Battle-Ready and Focused on Tactical Discipline"',
    category: 'COMMUNICATIONS',
    date: 'August 21, 2026',
    author: 'Club PR',
    image: 'assets/news-1.jpg',
    content: `
      <p>Head of Communications Vincent Henneh confirmed that registration formalities and tactical conditioning are finalized ahead of the Matchday 1 clash with Vision FC.</p>
    `
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  initMatchStripCountdown();
  initSquadCards();
  initSearchDrawer();
  initNewsModal();
  initMembershipForm();
});

/* 1. Tab Navigation Engine */
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-nav-btn');
  const tabViews = document.querySelectorAll('.tab-view');
  const mainNavLinks = document.querySelectorAll('.navbar__menu .nav-btn');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  function switchView(targetViewId) {
    if (!targetViewId) return;

    // Activate View
    tabViews.forEach(view => {
      view.classList.toggle('active', view.id === targetViewId);
    });

    // Update active state on main navbar buttons
    mainNavLinks.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === targetViewId);
    });

    // Close mobile menu if open
    if (mainNav) mainNav.classList.remove('show');

    // Smooth scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = btn.dataset.view;
      if (targetView) {
        switchView(targetView);
      }
    });
  });

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('show');
    });
  }
}

/* 2. Live Match Countdown */
function initMatchStripCountdown() {
  const badge = document.getElementById('nextMatchCountdown');
  if (!badge) return;

  const matchDate = new Date();
  matchDate.setDate(matchDate.getDate() + 6);
  matchDate.setHours(15, 0, 0, 0);

  function tick() {
    const diff = matchDate.getTime() - new Date().getTime();
    if (diff <= 0) {
      badge.textContent = 'MATCHDAY LIVE';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    badge.textContent = `${String(d).padStart(2, '0')}d : ${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`;
  }

  tick();
  setInterval(tick, 1000);
}

/* 3. Squad Cards & Position Filter */
function initSquadCards() {
  const container = document.getElementById('squadCardsGrid');
  const filterBtns = document.querySelectorAll('.pos-btn');

  function render(filter = 'all') {
    if (!container) return;
    const players = SQUAD_ROSTER.filter(p => filter === 'all' || p.position === filter);

    container.innerHTML = players.map(p => `
      <div class="player-card-box">
        <div class="player-card-box__avatar">
          <i class="fa-solid fa-user"></i>
          <span class="player-card-box__num">#${p.number}</span>
        </div>
        <div class="player-card-box__info">
          <span class="player-role-tag">${p.role}</span>
          <h3 class="player-name-text">${p.name}</h3>
          <div class="player-meta-row">
            <span><i class="fa-solid fa-flag"></i> ${p.nationality}</span>
            <span><i class="fa-solid fa-shirt"></i> Apps: ${p.appearances}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });

  render();
}

/* 4. Search Drawer */
function initSearchDrawer() {
  const toggle = document.getElementById('searchToggleBtn');
  const drawer = document.getElementById('searchDrawer');
  const close = document.getElementById('searchCloseBtn');
  const input = document.getElementById('searchInput');

  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    drawer.classList.toggle('show');
    if (drawer.classList.contains('show') && input) {
      input.focus();
    }
  });

  if (close) {
    close.addEventListener('click', () => {
      drawer.classList.remove('show');
    });
  }
}

/* 5. News Modal */
function initNewsModal() {
  const modal = document.getElementById('newsModal');
  const body = document.getElementById('newsModalBody');
  const closeBtn = document.getElementById('newsModalClose');
  const openBtns = document.querySelectorAll('.open-news-modal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.newsId;
      const story = NEWS_ITEMS[id];

      if (story && body) {
        body.innerHTML = `
          <div style="margin-bottom: 1.25rem;">
            <span class="tag-pill tag-pill--gold">${story.category}</span>
            <h2 style="font-family: var(--font-barca); font-size: 1.6rem; color: #FFFFFF; line-height: 1.2; margin: 0.5rem 0;">${story.title}</h2>
            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; gap: 1rem;">
              <span><i class="fa-regular fa-calendar" style="color: var(--color-gold);"></i> ${story.date}</span>
              <span><i class="fa-regular fa-user" style="color: var(--color-gold);"></i> ${story.author}</span>
            </div>
          </div>
          <div style="border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 1.25rem;">
            <img src="${story.image}" alt="${story.title}" style="width: 100%; height: 240px; object-fit: cover;">
          </div>
          <div style="color: var(--text-light); line-height: 1.7; font-size: 0.9375rem;">
            ${story.content}
          </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function hideModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', hideModal);
  if (modal) {
    modal.querySelector('.news-modal__backdrop').addEventListener('click', hideModal);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideModal();
    });
  }
}

/* 6. Membership Form */
function initMembershipForm() {
  const form = document.getElementById('memberRegisterForm');
  const feedback = document.getElementById('memberFormFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.textContent = 'Registration submitted successfully! Welcome to Young Apostles FC.';
    feedback.style.display = 'block';
    form.reset();

    setTimeout(() => {
      feedback.style.display = 'none';
    }, 5000);
  });
}
