/**
 * Young Apostles FC — Main JavaScript
 */

const SQUAD = [
  { name: 'Frank Boateng', position: 'goalkeeper', number: 1 },
  { name: 'Abdulai Kadel', position: 'goalkeeper', number: 16 },
  { name: 'Samuel Prempeh', position: 'defender', number: 2 },
  { name: 'Mathias Amegbe', position: 'defender', number: 3 },
  { name: 'Joseph Mensah', position: 'defender', number: 4 },
  { name: 'Razak Sarpong', position: 'defender', number: 5 },
  { name: 'Ibrahim Fuseini', position: 'defender', number: 6 },
  { name: 'Vincent Mobilla', position: 'defender', number: 12 },
  { name: 'Junior Afram', position: 'midfielder', number: 8 },
  { name: 'Richmond Ampong', position: 'midfielder', number: 10 },
  { name: 'Foster Agyarko', position: 'midfielder', number: 14 },
  { name: 'Issah Nyaabila', position: 'midfielder', number: 17 },
  { name: 'Samuel Amankwah', position: 'midfielder', number: 18 },
  { name: 'Gideon Gyamfi', position: 'midfielder', number: 20 },
  { name: 'Agyemang Kingsford', position: 'forward', number: 9 },
  { name: 'Prince Mensah', position: 'forward', number: 11 },
  { name: 'Richmond Nsiah Coka', position: 'forward', number: 19 },
  { name: 'Sule Muntalla', position: 'forward', number: 21 },
  { name: 'Emmanuel Boateng', position: 'forward', number: 23 },
  { name: 'Pius Yeboah Asante', position: 'forward', number: 27 },
];

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSquad();
  initFixtures();
  initContactForm();
  initScrollAnimations();
});

/* Navigation */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
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

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  });
}

/* Squad */
function initSquad() {
  const grid = document.getElementById('squad-grid');
  const filters = document.querySelectorAll('.squad__filter');

  function renderSquad(filter = 'all') {
    grid.innerHTML = SQUAD
      .filter(p => filter === 'all' || p.position === filter)
      .map(player => `
        <div class="player-card" data-position="${player.position}">
          <div class="player-card__number">${player.number}</div>
          <div class="player-card__info">
            <div class="player-card__name">${player.name}</div>
            <div class="player-card__position">${player.position}</div>
          </div>
        </div>
      `).join('');
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSquad(btn.dataset.filter);
    });
  });

  renderSquad();
}

/* Fixtures tabs */
function initFixtures() {
  const tabs = document.querySelectorAll('.fixtures__tab');
  const upcoming = document.getElementById('fixtures-upcoming');
  const results = document.getElementById('fixtures-results');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const isUpcoming = tab.dataset.tab === 'upcoming';
      upcoming.classList.toggle('fixtures__list--hidden', !isUpcoming);
      results.classList.toggle('fixtures__list--hidden', isUpcoming);
    });
  });
}

/* Contact form */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = 'Thank you! Your message has been received. Medaase!';
    note.classList.add('success');
    form.reset();

    setTimeout(() => {
      note.textContent = '';
      note.classList.remove('success');
    }, 5000);
  });
}

/* Scroll reveal */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(
    '.about__grid, .timeline__item, .player-card, .news__card, .contact__grid, .fixtures__match'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
