const fs = require('fs');
const path = require('path');

console.log('--- APPLYING HERO BACKGROUND REMOVAL & 4S TRANSITION FIX ---');

// ========================================================
// 1. UPDATE CSS/STYLES.CSS & PUBLIC/CSS/STYLES.CSS
// ========================================================
function updateCss(filePath) {
  let css = fs.readFileSync(filePath, 'utf8');

  // 1. Desktop .hero-left: take the dark card background out completely
  const oldDesktopHeroLeft = /\.hero-left\s*\{[\s\S]*?box-shadow:\s*0\s*16px\s*48px\s*rgba\(0,\s*0,\s*0,\s*0\.6\);?\s*\}/;
  const newDesktopHeroLeft = `.hero-left {
  max-width: 760px;
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  box-shadow: none !important;
}`;

  css = css.replace(oldDesktopHeroLeft, newDesktopHeroLeft);

  // 2. Desktop .hero-overlay: soft vertical gradient so player is 100% visible
  const oldDesktopOverlay = /\.hero-overlay\s*\{[\s\S]*?pointer-events:\s*none;\s*\}/;
  const newDesktopOverlay = `.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.0) 0%,
    rgba(0, 0, 0, 0.0) 45%,
    rgba(3, 5, 12, 0.35) 65%,
    rgba(3, 5, 12, 0.82) 85%,
    rgba(3, 5, 12, 0.98) 100%
  );
  pointer-events: none;
}`;

  css = css.replace(oldDesktopOverlay, newDesktopOverlay);

  // 3. Mobile hero experience: remove dark box completely, hide redundant badge, let the photos shine!
  const oldMobileHero = /\/\* Hero Section Mobile Experience[\s\S]*?\.hero-right-badge\s*\{[\s\S]*?\}/;
  const newMobileHero = `/* Hero Section Mobile Experience: Let the Photos Shine! */
  .hero-section {
    min-height: 90vh;
    min-height: 90dvh;
    display: flex;
    align-items: flex-end;
    padding: 1rem 0 1.25rem;
    position: relative;
  }
  .hero-bg-slide, .hero-bg-image {
    object-fit: cover !important;
    object-position: center 12% !important;
  }
  .hero-overlay {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.0) 0%,
      rgba(0, 0, 0, 0.0) 42%,
      rgba(3, 5, 12, 0.35) 62%,
      rgba(3, 5, 12, 0.82) 82%,
      rgba(3, 5, 12, 0.98) 100%
    ) !important;
  }
  .hero-content {
    width: 100%;
    padding: 0 1rem;
    position: relative;
    z-index: 4;
  }
  .hero-left {
    max-width: 100%;
    padding: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  .hero-slide-dots {
    margin-bottom: 0.6rem !important;
    padding: 3px 8px !important;
    gap: 6px !important;
    background: rgba(3, 6, 16, 0.55) !important;
    backdrop-filter: blur(6px) !important;
  }
  .hero-headline {
    font-size: 1.35rem !important;
    line-height: 1.25 !important;
    margin-bottom: 0.4rem !important;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.95) !important;
  }
  .hero-subtitle {
    font-size: 0.85rem !important;
    line-height: 1.4 !important;
    margin-bottom: 0.75rem !important;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.95) !important;
  }
  .hero-content__inner {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
  .hero-cta-row {
    flex-direction: column;
    gap: 0.5rem;
  }
  .btn-hero-primary, .btn-hero-secondary {
    width: 100%;
    justify-content: center;
    padding: 0.7rem 1.1rem !important;
    font-size: 0.88rem !important;
  }
  .hero-right-badge {
    display: none !important;
  }`;

  css = css.replace(oldMobileHero, newMobileHero);

  fs.writeFileSync(filePath, css, 'utf8');
  console.log('✅ Updated CSS:', filePath);
}

updateCss('css/styles.css');
updateCss('public/css/styles.css');

// ========================================================
// 2. UPDATE JS/MAIN.JS & PUBLIC/JS/MAIN.JS
// ========================================================
function updateJs(filePath) {
  let js = fs.readFileSync(filePath, 'utf8');

  // Bulletproof slideshow logic
  const oldSlideshowLogic = /let heroSlideshowTimer = null;[\s\S]*?function updateHeroDots\(\)\s*\{[\s\S]*?\}/;
  const newSlideshowLogic = `let heroSlideshowTimer = null;
let currentHeroImages = [
  'assets/prempeh-potm-award.jpg',
  'assets/prempeh-potm-boots.jpg'
];
let currentHeroIndex = 0;

function startHeroSlideshow() {
  if (heroSlideshowTimer) return; // If already running, do NOT kill it!
  heroSlideshowTimer = setInterval(() => {
    goToHeroSlide(currentHeroIndex + 1);
  }, 4000);
}

function resetHeroSlideshowTimer() {
  if (heroSlideshowTimer) clearInterval(heroSlideshowTimer);
  heroSlideshowTimer = setInterval(() => {
    goToHeroSlide(currentHeroIndex + 1);
  }, 4000);
}

function goToHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-bg-slide');
  if (!slides || slides.length < 2) return;

  const count = slides.length;
  currentHeroIndex = ((index % count) + count) % count;

  slides.forEach((sl, idx) => {
    if (idx === currentHeroIndex) {
      sl.classList.add('active');
      sl.style.opacity = '1';
      sl.style.zIndex = '2';
    } else {
      sl.classList.remove('active');
      sl.style.opacity = '0';
      sl.style.zIndex = '1';
    }
  });

  updateHeroDots();
}

function updateHeroDots() {
  const dots = document.querySelectorAll('.hero-slide-dot');
  dots.forEach((d, idx) => {
    if (idx === currentHeroIndex) d.classList.add('active');
    else d.classList.remove('active');
  });
}`;

  js = js.replace(oldSlideshowLogic, newSlideshowLogic);

  // Update applyHeroWriteup to not interrupt the slideshow or wipe DOM unnecessarily
  const oldApplyHero = /function applyHeroWriteup\(\)\s*\{[\s\S]*?ctaBtn\.onclick[\s\S]*?\}\s*\}\s*\}/;
  const newApplyHero = `function applyHeroWriteup() {
  let heroData = null;
  try {
    const raw = localStorage.getItem('ya_hero_custom');
    if (raw) heroData = JSON.parse(raw);
  } catch(e) {}

  if (!heroData) {
    heroData = {
      headline: "Samuel Prempeh Wins AJ Construction & Building Player of the Month",
      subtitle: "Young Apostles FC striker Samuel Prempeh has been named the club's AJ Construction & Building Player of the Month after scoring all 3 goals after Matchday Six of the 2026/27 Ghana Premier League season.<br><br><strong>#YAFC #AgyaNa&#390;w&#596;Tumi</strong>",
      images: [
        "assets/prempeh-potm-award.jpg",
        "assets/prempeh-potm-boots.jpg"
      ],
      ctaText: "Read Full Award Story & Gallery",
      ctaLink: "#news"
    };
  }

  // Keep lastHeroRaw in sync to avoid 2-second polling re-trigger
  _lastHeroRaw = JSON.stringify(heroData);

  const headlineEl = document.getElementById('heroHeadlineDisplay') || document.querySelector('.hero-headline');
  const subtitleEl = document.getElementById('heroSubtitleDisplay') || document.querySelector('.hero-subtitle');
  const ctaBtn = document.getElementById('heroCtaBtn') || document.querySelector('.hero-cta-row .btn-hero-primary');
  const dotsContainer = document.getElementById('heroSlideDots');

  if (headlineEl && heroData.headline) {
    headlineEl.innerHTML = sanitizeHeroText(heroData.headline);
  }
  if (subtitleEl && heroData.subtitle) {
    subtitleEl.innerHTML = sanitizeHeroText(heroData.subtitle);
  }

  let imgList = [];
  if (Array.isArray(heroData.images) && heroData.images.length > 0) {
    imgList = heroData.images.filter(Boolean);
  } else {
    if (heroData.image) imgList.push(heroData.image);
    if (heroData.image2) imgList.push(heroData.image2);
    if (heroData.image3) imgList.push(heroData.image3);
  }

  if (imgList.length === 0) {
    imgList = ['assets/prempeh-potm-award.jpg', 'assets/prempeh-potm-boots.jpg'];
  }
  currentHeroImages = imgList;

  const slidesWrap = document.getElementById('heroSlidesWrap') || document.querySelector('.hero-slides-wrap');
  if (slidesWrap) {
    const existingSlides = Array.from(slidesWrap.querySelectorAll('.hero-bg-slide'));
    if (existingSlides.length !== currentHeroImages.length) {
      currentHeroIndex = 0;
      slidesWrap.innerHTML = currentHeroImages.map((src, idx) => \`
        <img src="\${src}" alt="Young Apostles FC Photo \${idx + 1}" class="hero-bg-slide \${idx === 0 ? 'active' : ''}" \${idx === 0 ? 'id="heroBgImage"' : ''} style="opacity:\${idx === 0 ? '1' : '0'}; z-index:\${idx === 0 ? '2' : '1'}; object-fit:cover; object-position:center 12% !important;">
      \`).join('');
    }
  }

  initHeroSwipe();

  if (dotsContainer) {
    if (currentHeroImages.length > 1) {
      dotsContainer.style.display = 'inline-flex';
      const existingDots = dotsContainer.querySelectorAll('.hero-slide-dot');
      if (existingDots.length !== currentHeroImages.length) {
        dotsContainer.innerHTML = currentHeroImages.map((_, idx) => \`
          <button type="button" class="hero-slide-dot \${idx === currentHeroIndex ? 'active' : ''}" onclick="goToHeroSlide(\${idx}); resetHeroSlideshowTimer();" aria-label="Photo \${idx + 1}"></button>
        \`).join('');
      } else {
        updateHeroDots();
      }
      startHeroSlideshow();
    } else {
      dotsContainer.style.display = 'none';
      if (heroSlideshowTimer) {
        clearInterval(heroSlideshowTimer);
        heroSlideshowTimer = null;
      }
    }
  }

  if (ctaBtn) {
    if (heroData.ctaText) {
      ctaBtn.innerHTML = \`<i class="fa-solid fa-trophy"></i> \${heroData.ctaText}\`;
    }
    if (heroData.ctaLink) {
      ctaBtn.setAttribute('href', heroData.ctaLink);
    }
    ctaBtn.onclick = function(e) {
      if (typeof openNewsArticle === 'function') {
        e.preventDefault();
        openNewsArticle('samuel-prempeh-player-of-the-month');
        const newsSection = document.getElementById('news');
        if (newsSection) newsSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }
}`;

  js = js.replace(oldApplyHero, newApplyHero);

  fs.writeFileSync(filePath, js, 'utf8');
  console.log('✅ Updated JS:', filePath);
}

updateJs('js/main.js');
updateJs('public/js/main.js');

// ========================================================
// 3. UPDATE INDEX.HTML & PUBLIC/INDEX.HTML (CACHE BUSTER & INLINE AUTOPLAY)
// ========================================================
function updateHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Cache buster v=4.2
  html = html.replace(/css\/styles\.css\?v=[0-9.]+/g, 'css/styles.css?v=4.2');
  html = html.replace(/js\/main\.js\?v=[0-9.]+/g, 'js/main.js?v=4.2');

  // Inline autoplay kickoff right in hero section
  const oldSlidesWrap = /<div class="hero-slides-wrap" id="heroSlidesWrap">[\s\S]*?<\/div>/;
  const newSlidesWrap = `<div class="hero-slides-wrap" id="heroSlidesWrap">
        <img src="assets/prempeh-potm-award.jpg" alt="Samuel Prempeh Player of the Month Award" class="hero-bg-slide active" id="heroBgImage" style="opacity:1; z-index:2;">
        <img src="assets/prempeh-potm-boots.jpg" alt="Samuel Prempeh Award Gear & Boots" class="hero-bg-slide" style="opacity:0; z-index:1;">
      </div>`;

  html = html.replace(oldSlidesWrap, newSlidesWrap);

  // Dots onclick: resetHeroSlideshowTimer
  html = html.replace(/goToHeroSlide\(0\);\s*startHeroSlideshow\(\);/g, 'goToHeroSlide(0); resetHeroSlideshowTimer();');
  html = html.replace(/goToHeroSlide\(1\);\s*startHeroSlideshow\(\);/g, 'goToHeroSlide(1); resetHeroSlideshowTimer();');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✅ Updated HTML:', filePath);
}

updateHtml('index.html');
updateHtml('public/index.html');

console.log('--- ALL FIXES APPLIED SUCCESSFULLY ---');
