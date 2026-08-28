/**
 * ==========================================================================
 * YOUNG APOSTLES FC — DYNAMIC JAVASCRIPT & MOTION ENGINE
 * Interactive match tabs, live countdown, squad filtering, and news modal
 * ==========================================================================
 */

// Squad Data (Official First Team Roster)
const SQUAD_DATA = [
  // Goalkeepers
  { id: 1, name: 'Frank Boateng', number: 1, position: 'goalkeeper', role: 'Goalkeeper', nationality: 'Ghana', appearances: 24, cleanSheets: 10 },
  { id: 2, name: 'Abdulai Kadel', number: 16, position: 'goalkeeper', role: 'Goalkeeper', nationality: 'Ghana', appearances: 8, cleanSheets: 3 },
  
  // Defenders
  { id: 3, name: 'Samuel Prempeh', number: 2, position: 'defender', role: 'Right Back', nationality: 'Ghana', appearances: 22, tackles: 48 },
  { id: 4, name: 'Mathias Amegbe', number: 3, position: 'defender', role: 'Left Back', nationality: 'Ghana', appearances: 20, assists: 3 },
  { id: 5, name: 'Joseph Mensah', number: 4, position: 'defender', role: 'Center Back', nationality: 'Ghana', appearances: 26, clearances: 84 },
  { id: 6, name: 'Razak Sarpong', number: 5, position: 'defender', role: 'Center Back (Captain)', nationality: 'Ghana', appearances: 28, clearances: 92 },
  { id: 7, name: 'Ibrahim Fuseini', number: 6, position: 'defender', role: 'Center Back', nationality: 'Ghana', appearances: 18, tackles: 38 },
  { id: 8, name: 'Vincent Mobilla', number: 12, position: 'defender', role: 'Full Back', nationality: 'Ghana', appearances: 15, tackles: 29 },

  // Midfielders
  { id: 9, name: 'Junior Afram', number: 8, position: 'midfielder', role: 'Central Midfielder', nationality: 'Ghana', appearances: 25, passAccuracy: '88%' },
  { id: 10, name: 'Richmond Ampong', number: 10, position: 'midfielder', role: 'Attacking Midfielder', nationality: 'Ghana', appearances: 27, goals: 6, assists: 7 },
  { id: 11, name: 'Foster Agyarko', number: 14, position: 'midfielder', role: 'Defensive Midfielder', nationality: 'Ghana', appearances: 23, recoveries: 54 },
  { id: 12, name: 'Issah Nyaabila', number: 17, position: 'midfielder', role: 'Right Winger / Mid', nationality: 'Ghana', appearances: 19, goals: 3 },
  { id: 13, name: 'Samuel Amankwah', number: 18, position: 'midfielder', role: 'Central Midfielder', nationality: 'Ghana', appearances: 16, passAccuracy: '85%' },
  { id: 14, name: 'Gideon Gyamfi', number: 20, position: 'midfielder', role: 'Box-to-Box Midfielder', nationality: 'Ghana', appearances: 21, tackles: 41 },

  // Forwards
  { id: 15, name: 'Agyemang Kingsford', number: 9, position: 'forward', role: 'Center Forward', nationality: 'Ghana', appearances: 26, goals: 12 },
  { id: 16, name: 'Prince Mensah', number: 11, position: 'forward', role: 'Left Winger', nationality: 'Ghana', appearances: 22, goals: 5, assists: 6 },
  { id: 17, name: 'Richmond Nsiah Coka', number: 19, position: 'forward', role: 'Center Forward', nationality: 'Ghana', appearances: 18, goals: 4 },
  { id: 18, name: 'Sule Muntalla', number: 21, position: 'forward', role: 'Right Winger', nationality: 'Ghana', appearances: 17, goals: 3 },
  { id: 19, name: 'Emmanuel Boateng', number: 23, position: 'forward', role: 'Striker', nationality: 'Ghana', appearances: 14, goals: 4 },
  { id: 20, name: 'Pius Yeboah Asante', number: 27, position: 'forward', role: 'Forward', nationality: 'Ghana', appearances: 12, goals: 2 }
];

// News Stories Archive
const NEWS_ARTICLES = {
  '1': {
    title: 'Newly Promoted Young Apostles FC Marks Triumphant Entry into Wenchi',
    category: 'Match Report & Celebrations',
    date: 'June 6, 2024',
    author: 'Young Apostles Media Team',
    image: 'assets/promotion-celebration.jpg',
    content: `
      <p>The town of Wenchi in the Bono Region was engulfed in a massive wave of jubilation as the Young Apostles FC made their historic entry following qualification into the Ghana Premier League (GPL).</p>
      <p>Thousands of devoted supporters, traditional rulers, and youth groups lined the main streets of Wenchi and Sunyani to welcome the players and technical staff after their breathtaking penalty shootout victory over Techiman Heroes at the Accra Sports Stadium.</p>
      <p>Speaking to the media upon arrival, club officials expressed profound gratitude to the entire community: <em>"This victory belongs to the people of Wenchi. It represents a decade of relentless perseverance and youth empowerment. We are ready to make our mark in the top flight."</em></p>
    `
  },
  '2': {
    title: 'From Wenchi to Scotland: How Mathew Anim Cudjoe\'s Breakthrough Inspired A Generation',
    category: 'Global Apostles',
    date: 'May 28, 2024',
    author: 'Club Editorial',
    image: 'assets/team-banner.jpg',
    content: `
      <p>Young Apostles FC has long prided itself on being one of West Africa's most progressive talent incubators. The meteoric ascent of Mathew Anim Cudjoe stands as a testament to the club's scouting philosophy.</p>
      <p>Discovered in local youth tournaments, Cudjoe was developed in Apostles' technical training system before earning high-profile domestic loan spells with Asante Kotoko and Legon Cities. In 2021, his performances culminated in a landmark transfer to Scottish Premiership side Dundee United.</p>
      <p>Today, the Young Apostles Academy continues to nurture over 60 youth prospects across the Bono Region, providing education, modern sports science, and pathways to professional careers worldwide.</p>
    `
  },
  '3': {
    title: 'Communications Chief Vincent Henneh: "Squad is Battle-Ready for Opening GPL Fixture"',
    category: 'First Team Update',
    date: 'August 21, 2026',
    author: 'Club PR',
    image: 'assets/news-1.jpg',
    content: `
      <p>Head of Communications Vincent Henneh addressed the press at the conclusion of the club's pre-season training camp in Sunyani, confirming that the first team is fully conditioned for the Ghana Premier League opener against Vision FC.</p>
      <p><em>"Our technical team has left no stone unturned. The fitness levels, tactical discipline, and hunger in this squad are exemplary. We urge every Apostles fan to rally behind the boys as we begin this exciting campaign,"</em> stated Henneh.</p>
      <p>The club also confirmed ongoing upgrades to the Wenchi Sports Stadium pitch and dressing room facilities ahead of home fixtures.</p>
    `
  },
  '4': {
    title: 'Christian Weah Mombo: The Media Maverick Driving Young Apostles\' Digital Success',
    category: 'Club Feature',
    date: 'May 9, 2024',
    author: 'Special Feature',
    image: 'assets/news-2.jpg',
    content: `
      <p>Off the pitch, Young Apostles FC has rapidly grown into one of Ghana's most active and engaging digital football brands, fueled by strategic storytelling and multimedia coverage.</p>
      <p>Under the stewardship of media strategist Christian Weah Mombo, the club has expanded its global reach on X (Twitter), Facebook, and Instagram, bringing fans closer to behind-the-scenes matchday vlogs, player interviews, and grassroots documentary series.</p>
    `
  }
};

// Document Initialization
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavigation();
  initMatchCountdown();
  initMatchTabs();
  initSquadModule();
  initNewsModal();
  initContactForm();
  initScrollAnimations();
  initBackToTop();
});

/* 1. Scroll Progress Bar */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });
}

/* 2. Navigation & Sticky Header */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile Menu Toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  });
}

/* 3. Live Match Countdown Timer */
function initMatchCountdown() {
  // Target match date: next fixture (e.g., 6 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 6);
  targetDate.setHours(15, 0, 0, 0);

  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minsEl = document.getElementById('cdMins');
  const secsEl = document.getElementById('cdSecs');

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* 4. Match Center Tabs */
function initMatchTabs() {
  const tabButtons = document.querySelectorAll('.match-tab-btn');
  const tabContents = document.querySelectorAll('.match-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetId = btn.dataset.target;
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* 5. Squad Roster & Filter Module */
function initSquadModule() {
  const grid = document.getElementById('squadGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderPlayers(filter = 'all') {
    if (!grid) return;
    const filtered = SQUAD_DATA.filter(p => filter === 'all' || p.position === filter);

    grid.innerHTML = filtered.map(player => `
      <div class="player-card" data-position="${player.position}">
        <div class="player-card__avatar">
          <i class="fa-solid fa-user player-card__avatar-icon"></i>
          <span class="player-card__number">#${player.number}</span>
        </div>
        <div class="player-card__body">
          <span class="player-card__position">${player.role}</span>
          <h4 class="player-card__name">${player.name}</h4>
          <div class="player-card__meta">
            <span><i class="fa-solid fa-flag"></i> ${player.nationality}</span>
            <span><i class="fa-solid fa-shirt"></i> Apps: ${player.appearances}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPlayers(btn.dataset.filter);
    });
  });

  renderPlayers();
}

/* 6. News Interactive Reading Modal */
function initNewsModal() {
  const modal = document.getElementById('newsModal');
  const modalBody = document.getElementById('newsModalBody');
  const closeBtn = document.getElementById('newsModalClose');
  const openButtons = document.querySelectorAll('.open-news-modal');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const newsId = btn.dataset.newsId;
      const article = NEWS_ARTICLES[newsId];

      if (article && modalBody) {
        modalBody.innerHTML = `
          <div class="news-modal__header" style="margin-bottom: 1.5rem;">
            <span class="section-tag" style="margin-bottom: 0.5rem;">${article.category}</span>
            <h2 style="font-family: var(--font-heading); font-size: 1.75rem; color: var(--text-pure-white); line-height: 1.25; margin-bottom: 0.75rem;">${article.title}</h2>
            <div style="font-size: 0.8125rem; color: var(--text-muted); display: flex; gap: 1rem;">
              <span><i class="fa-regular fa-calendar" style="color: var(--accent-cyan);"></i> ${article.date}</span>
              <span><i class="fa-regular fa-user" style="color: var(--accent-cyan);"></i> ${article.author}</span>
            </div>
          </div>
          <div style="border-radius: var(--border-radius-md); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-glass);">
            <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 260px; object-fit: cover;">
          </div>
          <div class="news-modal__text" style="color: var(--text-light); line-height: 1.75; font-size: 0.95rem;">
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
    modal.querySelector('.news-modal__overlay').addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
}

/* 7. Contact Form Handler */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';

    // Simulate submission delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Message';
      
      alertBox.className = 'form-alert form-alert--success';
      alertBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent to Young Apostles FC secretariat.';
      alertBox.style.display = 'block';
      form.reset();

      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 6000);
    }, 1000);
  });
}

/* 8. Scroll Reveal Animations */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(
    '.about-grid, .timeline-item, .fixture-card, .news-card, .pillar-card, .staff-card, .contact-detail-card, .form-card, .gallery-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* 9. Back to Top Button */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
