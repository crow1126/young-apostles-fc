/**
 * ==========================================================================
 * YOUNG APOSTLES FC — SCRIPT ENGINE (FC BARCELONA FORMAT)
 * Dynamic match strip countdown, squad filtering, search, and news modals
 * ==========================================================================
 */

// Squad Data (Official First Team Roster)
const SQUAD_ROSTER = [
  // Goalkeepers
  { id: 1, name: 'Frank Boateng', number: 1, position: 'goalkeeper', role: 'Goalkeeper', nationality: 'Ghana', appearances: 24, cleanSheets: 10 },
  { id: 2, name: 'Abdulai Kadel', number: 16, position: 'goalkeeper', role: 'Goalkeeper', nationality: 'Ghana', appearances: 8, cleanSheets: 3 },
  
  // Defenders
  { id: 3, name: 'Samuel Prempeh', number: 2, position: 'defender', role: 'Right Back', nationality: 'Ghana', appearances: 22, tackles: 48 },
  { id: 4, name: 'Mathias Amegbe', number: 3, position: 'defender', role: 'Left Back', nationality: 'Ghana', appearances: 20, assists: 3 },
  { id: 5, name: 'Joseph Mensah', number: 4, position: 'defender', role: 'Center Back', nationality: 'Ghana', appearances: 26, clearances: 84 },
  { id: 6, name: 'Razak Sarpong', number: 5, position: 'defender', role: 'Center Back (C)', nationality: 'Ghana', appearances: 28, clearances: 92 },
  { id: 7, name: 'Ibrahim Fuseini', number: 6, position: 'defender', role: 'Center Back', nationality: 'Ghana', appearances: 18, tackles: 38 },
  { id: 8, name: 'Vincent Mobilla', number: 12, position: 'defender', role: 'Full Back', nationality: 'Ghana', appearances: 15, tackles: 29 },

  // Midfielders
  { id: 9, name: 'Junior Afram', number: 8, position: 'midfielder', role: 'Central Midfielder', nationality: 'Ghana', appearances: 25, passAccuracy: '88%' },
  { id: 10, name: 'Richmond Ampong', number: 10, position: 'midfielder', role: 'Attacking Midfielder', nationality: 'Ghana', appearances: 27, goals: 6, assists: 7 },
  { id: 11, name: 'Foster Agyarko', number: 14, position: 'midfielder', role: 'Defensive Midfielder', nationality: 'Ghana', appearances: 23, recoveries: 54 },
  { id: 12, name: 'Issah Nyaabila', number: 17, position: 'midfielder', role: 'Right Winger', nationality: 'Ghana', appearances: 19, goals: 3 },
  { id: 13, name: 'Samuel Amankwah', number: 18, position: 'midfielder', role: 'Central Midfielder', nationality: 'Ghana', appearances: 16, passAccuracy: '85%' },
  { id: 14, name: 'Gideon Gyamfi', number: 20, position: 'midfielder', role: 'Box-to-Box Midfielder', nationality: 'Ghana', appearances: 21, tackles: 41 },

  // Forwards
  { id: 15, name: 'Agyemang Kingsford', number: 9, position: 'forward', role: 'Center Forward', nationality: 'Ghana', appearances: 26, goals: 12 },
  { id: 16, name: 'Prince Mensah', number: 11, position: 'forward', role: 'Left Winger', nationality: 'Ghana', appearances: 22, goals: 5, assists: 6 },
  { id: 17, name: 'Richmond Nsiah Coka', number: 19, position: 'forward', role: 'Striker', nationality: 'Ghana', appearances: 18, goals: 4 },
  { id: 18, name: 'Sule Muntalla', number: 21, position: 'forward', role: 'Right Winger', nationality: 'Ghana', appearances: 17, goals: 3 },
  { id: 19, name: 'Emmanuel Boateng', number: 23, position: 'forward', role: 'Striker', nationality: 'Ghana', appearances: 14, goals: 4 },
  { id: 20, name: 'Pius Yeboah Asante', number: 27, position: 'forward', role: 'Forward', nationality: 'Ghana', appearances: 12, goals: 2 }
];

// News Stories
const FCB_NEWS = {
  '1': {
    title: 'Pride of Wenchi: Young Apostles Launch Official 2026/27 Premier League Campaign',
    category: 'FIRST TEAM',
    date: 'June 6, 2024',
    author: 'Young Apostles Media',
    image: 'assets/promotion-celebration.jpg',
    content: `
      <p>The entire municipality of Wenchi in the Bono Region erupted in joyful celebration as Young Apostles FC officially marked their historic entry into the Ghana Premier League.</p>
      <p>Following a tense promotional playoff against Techiman Heroes at the Accra Sports Stadium that ended in a penalty shootout victory, the club has finalized intensive tactical conditioning in Sunyani and is ready for the top flight.</p>
      <p>The club administration has reinforced stadium infrastructure and player development programs to compete against the country's historic giants.</p>
    `
  },
  '2': {
    title: 'From Wenchi to Scotland: How Mathew Anim Cudjoe\'s Journey Inspired A Generation',
    category: 'GLOBAL APOSTLES',
    date: 'May 28, 2024',
    author: 'Club Editorial',
    image: 'assets/team-banner.jpg',
    content: `
      <p>Mathew Anim Cudjoe's development in the Young Apostles Academy remains one of Ghanaian football's crowning modern success stories.</p>
      <p>Scouted as a teenage prospect, Cudjoe developed through Apostles' technical system, starred in domestic loan spells at Asante Kotoko and Legon Cities, before signing a landmark contract with Scottish Premiership outfit Dundee United in 2021.</p>
    `
  },
  '3': {
    title: 'Vincent Henneh on GPL Readiness: "The Squad is Mentally and Tactically Prepared"',
    category: 'COMMUNICATIONS',
    date: 'August 21, 2026',
    author: 'Club PR',
    image: 'assets/news-1.jpg',
    content: `
      <p>Head of Communications Vincent Henneh addressed sports journalists today, confirming that all registration formalities and tactical preparation are finalized ahead of the Matchday 1 clash with Vision FC.</p>
    `
  }
};

// Document Lifecycle Setup
document.addEventListener('DOMContentLoaded', () => {
  initHeaderInteractivity();
  initMatchStripCountdown();
  initSquadSpotlight();
  initNewsModalEngine();
  initSearchOverlay();
  initLanguageSelector();
  initSupportForm();
  initBackToTopButton();
});

/* 1. Header & Navigation */
function initHeaderInteractivity() {
  const header = document.getElementById('mainHeader');
  const navToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('headerNav');
  const navLinks = document.querySelectorAll('.menu-link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 160;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  });
}

/* 2. Match Strip Live Countdown */
function initMatchStripCountdown() {
  const countdownEl = document.getElementById('stripCountdown');
  if (!countdownEl) return;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 6);
  targetDate.setHours(15, 0, 0, 0);

  function update() {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      countdownEl.textContent = 'MATCHDAY LIVE';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent = `${String(d).padStart(2, '0')}d : ${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`;
  }

  update();
  setInterval(update, 1000);
}

/* 3. Squad Spotlight Grid */
function initSquadSpotlight() {
  const grid = document.getElementById('barcaPlayersGrid');
  const tabs = document.querySelectorAll('.pos-tab-btn');

  function render(filter = 'all') {
    if (!grid) return;
    const filtered = SQUAD_ROSTER.filter(p => filter === 'all' || p.position === filter);

    grid.innerHTML = filtered.map(player => `
      <div class="player-card-barca" data-position="${player.position}">
        <div class="player-card-avatar">
          <i class="fa-solid fa-user player-card-icon"></i>
          <span class="player-card-number-bg">#${player.number}</span>
        </div>
        <div class="player-card-info">
          <span class="player-card-role">${player.role}</span>
          <h3 class="player-card-name">${player.name}</h3>
          <div class="player-card-footer">
            <span><i class="fa-solid fa-flag"></i> ${player.nationality}</span>
            <span><i class="fa-solid fa-shirt"></i> Apps: ${player.appearances}</span>
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

  render();
}

/* 4. Search Overlay */
function initSearchOverlay() {
  const toggleBtn = document.getElementById('searchToggle');
  const overlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener('click', () => {
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active') && searchInput) {
      searchInput.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }
}

/* 5. Language Selector Dropdown */
function initLanguageSelector() {
  const langBtn = document.getElementById('langBtn');
  const dropdown = document.getElementById('langDropdown');

  if (!langBtn || !dropdown) return;

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('show');
  });
}

/* 6. News Modal Engine */
function initNewsModalEngine() {
  const modal = document.getElementById('newsModal');
  const body = document.getElementById('newsModalBody');
  const closeBtn = document.getElementById('newsModalClose');
  const openBtns = document.querySelectorAll('.open-news-modal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.newsId;
      const article = FCB_NEWS[id];

      if (article && body) {
        body.innerHTML = `
          <div style="margin-bottom: 1.25rem;">
            <span class="category-badge category-badge--gold" style="margin-bottom: 0.5rem;">${article.category}</span>
            <h2 style="font-family: var(--font-condensed); font-size: 1.75rem; color: #FFFFFF; line-height: 1.2; margin-top: 0.5rem;">${article.title}</h2>
            <div style="font-size: 0.75rem; color: var(--fcb-text-muted); margin-top: 0.5rem; display: flex; gap: 1rem;">
              <span><i class="fa-regular fa-calendar" style="color: var(--fcb-gold);"></i> ${article.date}</span>
              <span><i class="fa-regular fa-user" style="color: var(--fcb-gold);"></i> ${article.author}</span>
            </div>
          </div>
          <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; border: 1px solid var(--fcb-border-subtle);">
            <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 260px; object-fit: cover;">
          </div>
          <div style="color: var(--fcb-text-light); line-height: 1.75; font-size: 0.95rem;">
            ${article.content}
          </div>
        `;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.querySelector('.barca-modal__backdrop').addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
}

/* 7. Support Form Handler */
function initSupportForm() {
  const form = document.getElementById('barcaContactForm');
  const toast = document.getElementById('formToastMsg');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> TRANSMITTING...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'SEND MESSAGE <i class="fa-solid fa-paper-plane"></i>';
      toast.className = 'form-toast-msg form-toast-msg--success';
      toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your submission has been transmitted to Young Apostles FC Secretariat.';
      toast.style.display = 'block';
      form.reset();

      setTimeout(() => {
        toast.style.display = 'none';
      }, 6000);
    }, 1000);
  });
}

/* 8. Back to Top */
function initBackToTopButton() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
