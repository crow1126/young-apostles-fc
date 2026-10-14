const fs = require('fs');
const path = require('path');

console.log('--- UPDATING MAIN.JS, INDEX.HTML, STYLES.CSS ---');

// ==========================================
// 1. UPDATE JS/MAIN.JS
// ==========================================
function updateMainJs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  // Fix garbled dates in TOURNAMENTS_DATA
  code = code.replace(/15 August 2026[^\n']+25 May 2027/g, '15 August 2026 – 25 May 2027');
  code = code.replace(/October 2026[^\n']+June 2027/g, 'October 2026 – June 2027');
  code = code.replace(/February 2027[^\n']+November 2027/g, 'February 2027 – November 2027');

  // Fix garbled middle dots in countdown
  code = code.replace(/\$\{nextMatch\.venue\}\s+Ã‚·\s+\$\{dateStr\}\s+Ã‚·\s+15:00 GMT/g, '${nextMatch.venue} &bull; ${dateStr} &bull; 15:00 GMT');
  code = code.replace(/\$\{nextMatch\.venue\}\s+Â·\s+\$\{dateStr\}\s+Â·\s+15:00 GMT/g, '${nextMatch.venue} &bull; ${dateStr} &bull; 15:00 GMT');

  // Fix garbled scorer in renderFixturesModal
  code = code.replace(/\$\{fx\.venue\}\s+Ã‚·\s+\$\{fx\.date\}/g, '${fx.venue} &bull; ${fx.date}');
  code = code.replace(/\$\{fx\.venue\}\s+Â·\s+\$\{fx\.date\}/g, '${fx.venue} &bull; ${fx.date}');
  code = code.replace(/Ã¢Å¡½\s+\$\{fx\.scorer\}/g, '<i class="fa-solid fa-futbol"></i> ${fx.scorer}');
  code = code.replace(/âš½\s+\$\{fx\.scorer\}/g, '<i class="fa-solid fa-futbol"></i> ${fx.scorer}');

  // Fix sanitizeHeroText
  const newSanitize = `function sanitizeHeroText(str) {
  if (!str) return '';
  return String(str)
    .replace(/WIN\\s+[Ââ][\\s\\S]{0,4}FT/gi, 'WIN &bull; FT')
    .replace(/LOSS\\s+[Ââ][\\s\\S]{0,4}FT/gi, 'LOSS &bull; FT')
    .replace(/DRAW\\s+[Ââ][\\s\\S]{0,4}FT/gi, 'DRAW &bull; FT')
    .replace(/â€™/g, "'").replace(/â€˜/g, "'").replace(/[’‘]/g, "'")
    .replace(/â€œ/g, '&ldquo;').replace(/â€ /g, '&rdquo;')
    .replace(/â€”/g, '&mdash;').replace(/â€“/g, '&ndash;')
    .replace(/Ã¢â‚¬[^\s"']+/g, '&ndash;')
    .replace(/Æ†/g, '&#390;').replace(/É”/g, '&#596;')
    .replace(/Ã†/g, '&#390;').replace(/Ã‰/g, '&#596;')
    .replace(/AgyaNa[^\s"'>]+Tumi/g, 'AgyaNa&#390;w&#596;Tumi')
    .replace(/AGYA NA [^\s"'>]+ TUMI/g, 'AGYA NA &#390;W&#596; TUMI')
    .replace(/Agya Na [^\s"'>]+ Tumi/g, 'Agya Na &#390;w&#596; Tumi')
    .replace(/Ã¢Å¡½/g, '<i class="fa-solid fa-futbol"></i>')
    .replace(/âš½/g, '<i class="fa-solid fa-futbol"></i>')
    .replace(/Ã‚·/g, '&bull;').replace(/Â·/g, '&bull;').replace(/Â¢/g, '&bull;').replace(/Â/g, '')
    .replace(/ðŸ †/g, '🏆').replace(/âœ…/g, '✅');
}`;

  code = code.replace(/function sanitizeHeroText\(str\)[\s\S]*?\n\}/, newSanitize);

  // Fix checkStorageUpdates to avoid destroying hero every 2s
  const newCheckStorage = `let _lastHeroRaw = null;
let _lastPosterRaw = null;
function checkStorageUpdates() {
  try {
    const rawHero = localStorage.getItem('ya_hero_custom');
    if (rawHero && rawHero !== _lastHeroRaw) {
      _lastHeroRaw = rawHero;
      applyHeroWriteup();
    }
    const rawPoster = localStorage.getItem('ya_standings_poster');
    if (rawPoster !== _lastPosterRaw) {
      _lastPosterRaw = rawPoster;
      updateStandingsPosterVisibility();
    }
    updateStandingsUI();
    updateVipPassVisibility();
  } catch(e) {}
}`;

  code = code.replace(/function checkStorageUpdates\(\)[\s\S]*?\n\}/, newCheckStorage);

  // Fix startHeroSlideshow & goToHeroSlide
  const newSlideshow = `let heroSlideshowTimer = null;
let currentHeroImages = [];
let currentHeroIndex = 0;

function startHeroSlideshow() {
  if (heroSlideshowTimer) clearInterval(heroSlideshowTimer);
  if (!currentHeroImages || currentHeroImages.length <= 1) return;

  heroSlideshowTimer = setInterval(() => {
    const nextIdx = (currentHeroIndex + 1) % currentHeroImages.length;
    goToHeroSlide(nextIdx);
  }, 4000);
}

function goToHeroSlide(index) {
  if (!currentHeroImages || currentHeroImages.length <= 1) return;
  const slides = document.querySelectorAll('.hero-bg-slide');
  if (!slides || slides.length === 0) return;

  const count = currentHeroImages.length;
  currentHeroIndex = ((index % count) + count) % count;

  slides.forEach((sl, idx) => {
    if (idx === currentHeroIndex) {
      sl.classList.add('active');
    } else {
      sl.classList.remove('active');
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

  code = code.replace(/let heroSlideshowTimer = null;[\s\S]*?function updateHeroDots\(\)[\s\S]*?\n\}/, newSlideshow);

  // Fix applyHeroWriteup
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

  // Collect hero photos
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
    const existingSrcs = existingSlides.map(s => s.getAttribute('src'));
    const isMatching = existingSrcs.length === currentHeroImages.length && existingSrcs.every((src, i) => src === currentHeroImages[i]);

    if (!isMatching) {
      currentHeroIndex = 0;
      slidesWrap.innerHTML = currentHeroImages.map((src, idx) => \`
        <img src="\${src}" alt="Young Apostles FC Photo \${idx + 1}" class="hero-bg-slide \${idx === 0 ? 'active' : ''}" \${idx === 0 ? 'id="heroBgImage"' : ''} style="object-fit:cover; object-position:center 12% !important;">
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
          <button type="button" class="hero-slide-dot \${idx === currentHeroIndex ? 'active' : ''}" onclick="goToHeroSlide(\${idx}); startHeroSlideshow();" aria-label="Photo \${idx + 1}"></button>
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

  code = code.replace(/function applyHeroWriteup\(\)[\s\S]*?\n\}/, newApplyHero);

  // Fix renderNews() deduplication against hero
  const newRenderNews = `function renderNews() {
  const heroContainer = document.getElementById('newsHeroContainer');
  const stackedContainer = document.getElementById('newsStackedContainer');
  const bottomStrip = document.getElementById('newsBottomStrip');
  const stripCount = document.getElementById('newsStripCount');

  let blogs = getUnifiedBlogs();
  if (!blogs || blogs.length === 0) return;

  // POSITION 1: Featured News Card (Left)
  if (heroContainer && blogs[0]) {
    const lead = blogs[0];
    const leadImg = lead.image || 'assets/md2-prempeh-win.jpg';
    const tag = (lead.category || 'MATCH REPORT').toUpperCase();
    const dateText = lead.date || 'Oct 11, 2026';
    const readTime = lead.readTime || '3 min read';

    heroContainer.innerHTML = \`
      <article class="news-hero-card" onclick="openNewsArticle('\${lead.id}')">
        <img src="\${leadImg}" alt="\${lead.title}" class="news-hero-card__bg" onerror="this.src='assets/md2-prempeh-win.jpg'">
        <div class="news-hero-card__overlay"></div>
        <div class="news-hero-card__content">
          <span class="news-tag-badge">\${tag}</span>
          <h3 class="news-hero-card__title">\${lead.title}</h3>
          <div class="news-hero-card__meta">
            <span><i class="fa-regular fa-calendar"></i> \${dateText}</span>
            <span>&bull;</span>
            <span>\${readTime}</span>
          </div>
        </div>
      </article>
    \`;
  }

  // POSITIONS 2 & 3: 2 Stacked Cards (Right)
  if (stackedContainer) {
    const stackedBlogs = blogs.slice(1, 3);
    stackedContainer.innerHTML = stackedBlogs.map(art => {
      const artImg = art.image || 'assets/md2-holy-stars-preview.jpg';
      const tag = (art.category || 'ARTICLE').toUpperCase();
      const dateText = art.date || 'Recent';
      const readTime = art.readTime || '3 min read';

      return \`
        <article class="news-stacked-card" onclick="openNewsArticle('\${art.id}')">
          <img src="\${artImg}" alt="\${art.title}" class="news-stacked-card__bg" onerror="this.src='assets/md3-debibi-derby.jpg'">
          <div class="news-stacked-card__overlay"></div>
          <div class="news-stacked-card__content">
            <span class="news-tag-badge">\${tag}</span>
            <h4 class="news-stacked-card__title">\${art.title}</h4>
            <div class="news-hero-card__meta" style="font-size:0.75rem;">
              <span>\${dateText} &bull; \${readTime}</span>
            </div>
          </div>
        </article>
      \`;
    }).join('');
  }

  // POSITIONS 4+: Bottom Strip (Older Stories / Archive)
  if (bottomStrip) {
    const olderBlogs = blogs.slice(3);
    if (stripCount) {
      stripCount.textContent = \`\${olderBlogs.length} Story\${olderBlogs.length === 1 ? '' : 'ies'}\`;
    }

    if (olderBlogs.length === 0) {
      bottomStrip.innerHTML = \`
        <div style="grid-column: 1 / -1; padding: 1.25rem; color: rgba(255,255,255,0.6); font-size: 0.88rem; text-align: center;">
          <i class="fa-regular fa-newspaper" style="margin-right: 0.5rem; color: var(--ya-gold);"></i> All current dispatches are featured above.
        </div>
      \`;
    } else {
      bottomStrip.innerHTML = olderBlogs.map(art => {
        const artImg = art.image || 'assets/kit-home-2026.jpg';
        const tag = (art.category || 'CLUB NEWS').toUpperCase();
        const dateText = art.date || 'Past';

        return \`
          <div class="news-strip-item" onclick="openNewsArticle('\${art.id}')">
            <div class="news-strip-thumb">
              <img src="\${artImg}" alt="\${art.title}" onerror="this.src='assets/kit-home-2026.jpg'">
            </div>
            <div class="news-strip-info">
              <span class="news-strip-tag">\${tag}</span>
              <div class="news-strip-headline">\${art.title}</div>
              <div class="news-strip-date">\${dateText}</div>
            </div>
          </div>
        \`;
      }).join('');
    }
  }
}`;

  code = code.replace(/function renderNews\(\)[\s\S]*?function renderArchiveGrid/, newRenderNews + '\n\nfunction renderArchiveGrid');

  // Replace DEFAULT_UNIFIED_BLOGS
  const defaultBlogsCode = `const DEFAULT_UNIFIED_BLOGS = [
  {
    id: 'young-apostles-edge-aduana-bono-derby',
    title: "Young Apostles Edge Aduana in Bono Derby",
    category: "MATCH REPORT",
    badgeClass: "news-badge-pill--match",
    date: "Oct 11, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/md2-prempeh-win.jpg",
    excerpt: "Young Apostles claimed a hard-fought 1-0 victory over Aduana FC in an exciting Bono Derby encounter, with Samuel Prempeh's penalty proving decisive in a crucial Ghana Premier League clash.",
    content: \`<p>Young Apostles claimed a hard-fought 1-0 victory over Aduana FC in an exciting Bono Derby encounter, with Samuel Prempeh's penalty proving decisive in a crucial Ghana Premier League clash.</p><p>Prempeh stepped up to convert from the spot in the 46th minute of the first half, securing all three points for Young Apostles and taking his goal tally to three for the season.</p><p>Head coach Abdul Abu-Hanan hailed the victory as a significant moment for his side, expressing confidence that the result could serve as a turning point for his players as they look to build momentum in the league.</p><p>Meanwhile, Samuel Adamu emerged as another standout performer, earning the Man of the Match award for the second time this season. Adamu praised his teammates for their impressive performance, insisting that the team was well prepared for the victory.</p><p>He added that winning the individual accolade would further motivate him to work harder and continue delivering strong performances for the club.</p><p>With this important victory, Young Apostles will hope to build on the momentum and carry their renewed confidence into their upcoming fixtures.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid #0057B8;border-radius:0 8px 8px 0;"><p style="font-weight:800;color:#001489;font-size:1.1rem;margin:0 0 0.25rem;">FULL TIME: Young Apostles FC 1-0 Aduana Stars</p><p style="margin:0;color:#64748B;">⚽ Scorer: Samuel Prempeh (46' pen) &bull; Man of the Match: Samuel Adamu</p></div>\`,
    readTime: "3 min read"
  },
  {
    id: 'young-apostles-second-home-test-lions',
    title: "Young Apostles Set for Second Home Test Against Hearts of Lions",
    category: "CLUB NEWS",
    badgeClass: "news-badge-pill--preview",
    date: "Sep 26, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/md2-holy-stars-preview.jpg",
    excerpt: "Young Apostles FC return to the Nana Abrefa VII Stadium in Wenchi on Sunday as they host Hearts of Lions in their second home game of the 2026/27 Ghana Premier League season.",
    content: \`<p>Young Apostles FC return to the Nana Abrefa VII Stadium in Wenchi on Sunday as they host Hearts of Lions in their second home game of the 2026/27 Ghana Premier League season.</p><p>The Apostles head into Matchday 4 with three points from their opening three matches, having recorded one win and two defeats.</p><p>Young Apostles opened their campaign with a 3-0 defeat away to Vision FC before responding with a 1-0 victory over Basake Holy Stars in their first home game of the season.</p><p>They were, however, beaten 2-1 by Debibi United in their most recent outing and will be determined to return to winning ways in front of their home supporters.</p><p>Hearts of Lions are also searching for their first victory of the campaign. The Kpando-based side began the season with a goalless draw against Aduana FC before suffering a 2-1 away defeat to Asante Kotoko. They were held to another draw, this time 1-1, by Swedru All Blacks in their third match.</p><h4>Apostles Hold Recent Home Advantage</h4><p>Young Apostles have enjoyed a strong record against Hearts of Lions at the Nana Abrefa VII Stadium in recent meetings, winning both of the last two visits.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid #0057B8;border-radius:0 8px 8px 0;"><blockquote style="font-style:italic;font-size:1.05rem;color:#001489;margin:0 0 0.5rem 0;">"We can't afford to drop points at home. We have to go all out and fight for all three points against Hearts of Lions."</blockquote><cite style="font-weight:700;color:#C9943A;font-size:0.85rem;">&mdash; Assistant Coach Abubakar Fuseini</cite></div><p><strong>DATE: Sunday, September 27, 2026 &bull; Kick Off: 3:00 PM &bull; Nana Abrefa VII Stadium, Wenchi</strong></p>\`,
    readTime: "3 min read"
  },
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
    content: \`<p>Young Apostles FC will make the short trip to Derby Presby Park on Sunday for a Matchday 3 encounter against Debibi United FC in the 2026/27 Ghana Premier League.</p><p>The fixture will mark the first regional derby involving Young Apostles in the Ghana Premier League this season, with both sides set for another chapter in a growing local rivalry.</p><p>Young Apostles head into the contest with momentum after securing their first league victory of the campaign, a 1-0 home win over Basake Holy Stars, courtesy of an early Samuel Prempeh strike.</p><h4>Apostles Hold the Head-to-Head Advantage</h4><p>The two clubs have met five times in all competitions, with Young Apostles holding the better record. The Apostles have recorded three wins, one draw and one defeat, scoring six goals and conceding four.</p><h4>A Strong Record at Derby Presby Park</h4><p>Young Apostles have enjoyed success at Debibi Presby Park in their previous competitive meetings. The Apostles became the first club to defeat Debibi United at their home ground, winning 1-0 in a Division One League encounter.</p><p><strong>The first regional derby of the season awaits. Debibi United FC vs Young Apostles FC &bull; GPL MD3 &bull; Derby Presby Park &bull; Sun 20th Sep &bull; 3:00PM</strong></p>\`,
    readTime: "4 min read"
  },
  {
    id: 'samuel-prempeh-player-of-the-month',
    title: "Samuel Prempeh Wins AJ Construction & Building Player of the Month",
    category: "CLUB AWARD",
    badgeClass: "news-badge-pill--club",
    date: "Oct 12, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/prempeh-potm-award.jpg",
    images: [
      "assets/prempeh-potm-award.jpg",
      "assets/prempeh-potm-boots.jpg"
    ],
    excerpt: "Young Apostles FC striker Samuel Prempeh has been named the club's AJ Construction & Building Player of the Month following his impressive performances in the Ghana Premier League, having scored all three goals for the Apostles after Matchday Six.",
    content: \`<p>Young Apostles FC striker <strong>Samuel Prempeh</strong> has been named the club's <strong>AJ Construction & Building Player of the Month</strong> following his impressive performances in the Ghana Premier League.</p><p>Prempeh has scored all three of Young Apostles' goals after Matchday Six of the 2026/27 Ghana Premier League season, underlining his importance to the team's attacking efforts.</p><p>He emerged as the winner ahead of fellow nominees <strong>Samuel Adamu</strong> and <strong>John Afram Attah Jnr</strong> to claim the monthly award in recognition of his contribution to the club.</p><h4>Player of the Month Prize Package</h4><p>As part of his prize, Prempeh received an exclusive collection of official club gear:</p><ul><li>Customised Young Apostles FC team bag</li><li>Adidas Predator football boots</li><li>Customised shin guards</li><li>Official match socks and football hose</li></ul><div class="news-quote-box" style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid #0057B8;border-radius:0 8px 8px 0;"><blockquote style="font-style:italic;font-size:1.05rem;color:#001489;margin:0 0 0.5rem 0;">"This recognition will serve as additional motivation to keep working hard and scoring goals for the Apostles throughout the season."</blockquote><cite style="font-weight:700;color:#C9943A;font-size:0.85rem;">&mdash; Samuel Prempeh, Striker</cite></div><p>Speaking after receiving the award, the striker expressed his determination to maintain his form and continue delivering for the club. He noted that the recognition would serve as additional motivation to keep working hard and scoring goals for the Apostles throughout the season.</p><p>Prempeh's achievement highlights his growing influence within the team as Young Apostles continue their campaign in the Ghana Premier League.</p><p>The club congratulates Samuel Prempeh on winning the award and looks forward to more goals and outstanding performances from the striker.</p><div class="article-gallery-grid" style="margin:1.75rem 0;display:grid;grid-template-columns:1fr 1fr;gap:1rem;"><div style="border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);background:#0F172A;"><img src="assets/prempeh-potm-award.jpg" alt="Samuel Prempeh Receiving Player of the Month Award" style="width:100%;height:260px;object-fit:cover;display:block;"><div style="padding:0.6rem 0.8rem;color:#F8FAFC;font-size:0.78rem;text-align:center;font-weight:600;">🏆 Samuel Prempeh on pitch with award</div></div><div style="border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);background:#0F172A;"><img src="assets/prempeh-potm-boots.jpg" alt="Customized Bag, Predator Boots, and Shin Guards" style="width:100%;height:260px;object-fit:cover;display:block;"><div style="padding:0.6rem 0.8rem;color:#F8FAFC;font-size:0.78rem;text-align:center;font-weight:600;">⚽ Custom Bag, Predator Boots &amp; Shin Guards</div></div></div>\`,
    readTime: "3 min read"
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
    content: \`<p>Young Apostles FC secured their first victory of the 2026/27 Ghana Premier League season with a narrow 1-0 win over Basake Holy Stars in Wenchi.</p><p>Samuel Prempeh provided the decisive moment, scoring early to give the Apostles the lead and set the tone for a determined home performance.</p><p>Having suffered a 3-0 defeat to Vision FC on Matchday 1, Young Apostles responded with a disciplined display to claim all three points in their first home league game of the campaign.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid #0057B8;border-radius:0 8px 8px 0;"><p style="font-weight:800;color:#001489;font-size:1.1rem;margin:0 0 0.25rem;">FULL TIME: Young Apostles FC 1-0 Basake Holy Stars</p><p style="margin:0;color:#64748B;">⚽ Scorer: Samuel Prempeh</p></div>\`,
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
    content: \`<p>Young Apostles FC will return to action on Matchday 2 of the 2026/27 Ghana Premier League season when they host Basake Holy Stars in their first home league fixture of the campaign at Wenchi.</p><p>The Apostles will be looking to bounce back from their opening-day defeat to Vision FC, where they suffered a 3-0 loss in Tema.</p><p><strong>Young Apostles FC vs Basake Holy Stars &bull; Sun 12th Sep &bull; 3:00PM &bull; Wenchi Sports Stadium</strong></p>\`,
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
    content: \`<p>Young Apostles FC began their 2026/27 Ghana Premier League campaign with a 3-0 defeat to Vision FC on Saturday, September 5, 2026, at the Nii Adjei Kraku II Sports Complex.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(220,38,38,0.05);border-left:4px solid #dc2626;border-radius:0 8px 8px 0;"><p style="font-weight:800;color:#dc2626;font-size:1.05rem;margin:0 0 0.25rem;">FULL TIME: Vision FC 3-0 Young Apostles FC</p><p style="margin:0;color:#64748B;font-size:0.9rem;">⚽ Naziru (5') &bull; Aqetey (40', 68')</p></div>\`,
    readTime: "3 min read"
  }
];`;

  code = code.replace(/const DEFAULT_UNIFIED_BLOGS = \[[\s\S]*?\n\];/, defaultBlogsCode);

  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`✅ Updated ${filePath}`);
}

updateMainJs('js/main.js');
updateMainJs('public/js/main.js');

// ==========================================
// 2. UPDATE INDEX.HTML & PUBLIC/INDEX.HTML
// ==========================================
function updateIndexHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Hero section HTML updates: dual photos & live dots pre-rendered
  const oldHeroBlockRegex = /<section class="hero-section" id="home">[\s\S]*?<\/div>\s*<\/section>/;
  const newHeroBlock = `<section class="hero-section" id="home">
    <div class="hero-bg" id="heroBgContainer">
      <div class="hero-slides-wrap" id="heroSlidesWrap">
        <img src="assets/prempeh-potm-award.jpg" alt="Samuel Prempeh Player of the Month Award" class="hero-bg-slide active" id="heroBgImage">
        <img src="assets/prempeh-potm-boots.jpg" alt="Samuel Prempeh Award Gear & Boots" class="hero-bg-slide">
      </div>
      <div class="hero-overlay"></div>
    </div>

    <div class="container hero-content">
      <div class="hero-content__inner">
        <div class="hero-left">
          <div class="hero-slide-dots" id="heroSlideDots" aria-label="Hero photo indicators">
            <button type="button" class="hero-slide-dot active" onclick="goToHeroSlide(0); startHeroSlideshow();" aria-label="Photo 1"></button>
            <button type="button" class="hero-slide-dot" onclick="goToHeroSlide(1); startHeroSlideshow();" aria-label="Photo 2"></button>
          </div>
          <h1 class="hero-headline" id="heroHeadlineDisplay">
            Samuel Prempeh Wins AJ Construction &amp; Building Player of the Month
          </h1>
          <p class="hero-subtitle" id="heroSubtitleDisplay">
            Young Apostles FC striker Samuel Prempeh has been named the club's AJ Construction &amp; Building Player of the Month after scoring all 3 goals after Matchday Six of the 2026/27 Ghana Premier League season.<br><br><strong>#YAFC #AgyaNa&#390;w&#596;Tumi</strong>
          </p>
          <div class="hero-cta-row">
            <a href="#news" class="btn-hero-primary" id="heroCtaBtn" onclick="if(typeof openNewsArticle==='function'){event.preventDefault();openNewsArticle('samuel-prempeh-player-of-the-month');document.getElementById('news')?.scrollIntoView({behavior:'smooth'});}"><i class="fa-solid fa-trophy"></i> Read Full Award Story &amp; Gallery</a>
            <a href="#matches" class="btn-hero-secondary"><i class="fa-solid fa-calendar-check"></i> View GPL Fixtures</a>
          </div>
        </div>

        <div class="hero-right-badge">
          <div class="hero-badge-card">
            <div class="hero-badge-glow"></div>
            <div class="hero-badge-icon">
              <i class="fa-solid fa-trophy"></i>
            </div>
            <div class="hero-badge-meta">
              <span class="hero-badge-sub">2026/27 CAMPAIGN</span>
              <strong class="hero-badge-title">GHANA PREMIER LEAGUE</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  html = html.replace(oldHeroBlockRegex, newHeroBlock);

  // News section featured card updates (Aduana derby as featured, Lions & Debibi as stacked)
  const oldNewsGridRegex = /<!-- Chelsea-Style Grid: 1 Large Hero on Left \+ 2 Stacked Cards on Right -->[\s\S]*?<!-- BOTTOM STRIP:/;
  const newNewsGrid = `<!-- Chelsea-Style Grid: 1 Large Hero on Left + 2 Stacked Cards on Right -->
      <div class="news-pl-grid">
        <!-- LEFT: 1 Large Featured Hero Card (Position 1 from CMS) -->
        <div class="news-pl-hero" id="newsHeroContainer">
          <article class="news-hero-card" onclick="openNewsArticle('young-apostles-edge-aduana-bono-derby')">
            <img src="assets/md2-prempeh-win.jpg" alt="Young Apostles Edge Aduana in Bono Derby" class="news-hero-card__bg">
            <div class="news-hero-card__overlay"></div>
            <div class="news-hero-card__content">
              <span class="news-tag-badge">MATCH REPORT</span>
              <h3 class="news-hero-card__title">Young Apostles Edge Aduana in Bono Derby</h3>
              <div class="news-hero-card__meta">
                <span><i class="fa-regular fa-calendar"></i> Oct 11, 2026</span>
                <span>&bull;</span>
                <span>3 min read</span>
              </div>
            </div>
          </article>
        </div>

        <!-- RIGHT: 2 Stacked Secondary Cards (Positions 2 & 3 from CMS) -->
        <div class="news-pl-stacked" id="newsStackedContainer">
          <!-- Card 1 -->
          <article class="news-stacked-card" onclick="openNewsArticle('young-apostles-second-home-test-lions')">
            <img src="assets/md2-holy-stars-preview.jpg" alt="Young Apostles Set for Second Home Test Against Hearts of Lions" class="news-stacked-card__bg">
            <div class="news-stacked-card__overlay"></div>
            <div class="news-stacked-card__content">
              <span class="news-tag-badge">CLUB NEWS</span>
              <h4 class="news-stacked-card__title">Young Apostles Set for Second Home Test Against Hearts of Lions</h4>
              <div class="news-hero-card__meta" style="font-size:0.75rem;">
                <span>Sep 26, 2026 &bull; 3 min read</span>
              </div>
            </div>
          </article>

          <!-- Card 2 -->
          <article class="news-stacked-card" onclick="openNewsArticle('debibi-united-derby')">
            <img src="assets/md3-debibi-derby.jpg" alt="Young Apostles Face Debibi United in First Regional Derby" class="news-stacked-card__bg">
            <div class="news-stacked-card__overlay"></div>
            <div class="news-stacked-card__content">
              <span class="news-tag-badge">MATCH PREVIEW</span>
              <h4 class="news-stacked-card__title">Young Apostles Face Debibi United in First Regional Derby of GPL Season</h4>
              <div class="news-hero-card__meta" style="font-size:0.75rem;">
                <span>Sep 16, 2026 &bull; 4 min read</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- BOTTOM STRIP:`;

  html = html.replace(oldNewsGridRegex, newNewsGrid);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Updated ${filePath}`);
}

updateIndexHtml('index.html');
updateIndexHtml('public/index.html');

// ==========================================
// 3. UPDATE CSS/STYLES.CSS & PUBLIC/CSS/STYLES.CSS
// ==========================================
function updateStylesCss(filePath) {
  let css = fs.readFileSync(filePath, 'utf8');

  // Ensure clean mobile styles for hero section
  const mobileHeroRegex = /\/\* Hero Section Mobile Experience[\s\S]*?\.hero-right-badge \{/;
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
      rgba(0, 0, 0, 0.0) 30%,
      rgba(3, 5, 12, 0.35) 55%,
      rgba(3, 5, 12, 0.78) 78%,
      rgba(3, 5, 12, 0.96) 100%
    ) !important;
  }
  .hero-content {
    width: 100%;
    padding: 0 0.85rem;
  }
  .hero-left {
    max-width: 100%;
    padding: 1rem 1.1rem !important;
    border-radius: 16px !important;
    background: linear-gradient(180deg, rgba(3, 6, 16, 0.55) 0%, rgba(3, 6, 16, 0.85) 100%) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
  }
  .hero-slide-dots {
    margin-bottom: 0.5rem !important;
    padding: 3px 8px !important;
    gap: 6px !important;
  }
  .hero-headline {
    font-size: 1.25rem !important;
    line-height: 1.22 !important;
    margin-bottom: 0.4rem !important;
  }
  .hero-subtitle {
    font-size: 0.82rem !important;
    line-height: 1.4 !important;
    margin-bottom: 0.75rem !important;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .hero-content__inner {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  .hero-cta-row {
    flex-direction: column;
    gap: 0.5rem;
  }
  .btn-hero-primary, .btn-hero-secondary {
    width: 100%;
    justify-content: center;
    padding: 0.65rem 1rem !important;
    font-size: 0.86rem !important;
  }
  .hero-right-badge {`;

  css = css.replace(mobileHeroRegex, newMobileHero);

  fs.writeFileSync(filePath, css, 'utf8');
  console.log(`✅ Updated ${filePath}`);
}

updateStylesCss('css/styles.css');
updateStylesCss('public/css/styles.css');

console.log('--- ALL UPDATES COMPLETED SUCCESSFULLY ---');
