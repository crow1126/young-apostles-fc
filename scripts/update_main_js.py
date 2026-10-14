def update_main(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix scoreline resultTag and scorer icon
    old_score_box = """    const isWin = f.result === 'W';
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
         </div>`"""

    new_score_box = """    const isWin = f.result === 'W';
    const isLoss = f.result === 'L';
    const resultTag = isWin ? 'WIN &bull; FT' : isLoss ? 'LOSS &bull; FT' : 'DRAW &bull; FT';
    const resultColor = isWin ? '#15803D' : isLoss ? '#B91C1C' : '#475569';
    const resultBg = isWin ? '#DCFCE7' : isLoss ? '#FEE2E2' : '#F1F5F9';
    const resultBorder = isWin ? '#86EFAC' : isLoss ? '#FCA5A5' : '#CBD5E1';

    const centerBox = isCompleted
      ? `<div class="match-score-pill" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6px 12px; border-radius:10px; background:${resultBg}; border:1px solid ${resultBorder}; min-width:74px;">
           <span style="font-size:0.62rem; font-weight:800; color:${resultColor}; letter-spacing:0.08em; text-transform:uppercase;">${resultTag}</span>
           <span style="font-size:1.25rem; font-weight:900; color:${resultColor}; line-height:1.2; letter-spacing:0.02em;">${f.score}</span>
           ${f.scorer ? `<span style="font-size:0.62rem; color:#1F2937; margin-top:2px; font-weight:700; white-space:nowrap;"><i class="fa-solid fa-futbol" style="color:#001489; font-size:0.65rem; margin-right:3px;"></i>${f.scorer}</span>` : ''}
         </div>`"""

    # 2. Add sanitizeHeroText and apply it in applyHeroWriteup
    old_apply_hero = """function applyHeroWriteup() {
  let heroData = null;
  try {
    const raw = localStorage.getItem('ya_hero_custom');
    if (raw) heroData = JSON.parse(raw);
  } catch(e) {}

  if (!heroData) return;

  const headlineEl = document.getElementById('heroHeadlineDisplay') || document.querySelector('.hero-headline');
  const subtitleEl = document.getElementById('heroSubtitleDisplay') || document.querySelector('.hero-subtitle');
  const ctaBtn = document.getElementById('heroCtaBtn') || document.querySelector('.hero-cta-row .btn-hero-primary');
  const dotsContainer = document.getElementById('heroSlideDots');

  if (headlineEl && heroData.headline) {
    headlineEl.textContent = heroData.headline;
  }
  if (subtitleEl && heroData.subtitle) {
    subtitleEl.innerHTML = heroData.subtitle;
  }"""

    new_apply_hero = """function sanitizeHeroText(str) {
  if (!str) return '';
  return String(str)
    .replace(/â€™/g, "'").replace(/â€˜/g, "'").replace(/[’‘]/g, "'")
    .replace(/â€œ/g, '&ldquo;').replace(/â€ /g, '&rdquo;')
    .replace(/â€”/g, '&mdash;').replace(/â€“/g, '&ndash;')
    .replace(/Æ†/g, '&#390;').replace(/É”/g, '&#596;')
    .replace(/Ã†/g, '&#390;').replace(/Ã‰/g, '&#596;')
    .replace(/AgyaNaƆwɔTumi/g, 'AgyaNa&#390;w&#596;Tumi')
    .replace(/AGYA NA ƆWƆ TUMI/g, 'AGYA NA &#390;W&#596; TUMI')
    .replace(/âš½/g, '<i class=\"fa-solid fa-futbol\"></i>')
    .replace(/Â·/g, '&bull;').replace(/Â¢/g, '&bull;').replace(/Â/g, '');
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
  const ctaBtn = document.getElementById('heroCtaBtn') || document.querySelector('.hero-cta-row .btn-hero-primary');
  const dotsContainer = document.getElementById('heroSlideDots');

  if (headlineEl && heroData.headline) {
    headlineEl.innerHTML = sanitizeHeroText(heroData.headline);
  }
  if (subtitleEl && heroData.subtitle) {
    subtitleEl.innerHTML = sanitizeHeroText(heroData.subtitle);
  }"""

    # 3. Object position center 18% in slides wrap
    old_slides_wrap = """  const slidesWrap = document.getElementById('heroSlidesWrap') || document.querySelector('.hero-slides-wrap');
  if (slidesWrap) {
    slidesWrap.innerHTML = currentHeroImages.map((src, idx) => `
      <img src="${src}" alt="Young Apostles FC Photo ${idx + 1}" class="hero-bg-slide ${idx === currentHeroIndex ? 'active' : ''}" ${idx === 0 ? 'id="heroBgImage"' : ''} style="object-fit:cover; object-position:center top !important;">
    `).join('');"""

    new_slides_wrap = """  const slidesWrap = document.getElementById('heroSlidesWrap') || document.querySelector('.hero-slides-wrap');
  if (slidesWrap) {
    slidesWrap.innerHTML = currentHeroImages.map((src, idx) => `
      <img src="${src}" alt="Young Apostles FC Photo ${idx + 1}" class="hero-bg-slide ${idx === currentHeroIndex ? 'active' : ''}" ${idx === 0 ? 'id="heroBgImage"' : ''} style="object-fit:cover; object-position:center 18% !important;">
    `).join('');"""

    content_norm = content.replace('\r\n', '\n')
    old_score_box_norm = old_score_box.replace('\r\n', '\n')
    new_score_box_norm = new_score_box.replace('\r\n', '\n')
    old_apply_hero_norm = old_apply_hero.replace('\r\n', '\n')
    new_apply_hero_norm = new_apply_hero.replace('\r\n', '\n')
    old_slides_wrap_norm = old_slides_wrap.replace('\r\n', '\n')
    new_slides_wrap_norm = new_slides_wrap.replace('\r\n', '\n')

    if old_score_box_norm in content_norm:
        content_norm = content_norm.replace(old_score_box_norm, new_score_box_norm)
        print(f"1. Replaced score box in {path}")
    else:
        print(f"1. FAILED to find score box in {path}")

    if old_apply_hero_norm in content_norm:
        content_norm = content_norm.replace(old_apply_hero_norm, new_apply_hero_norm)
        print(f"2. Replaced applyHero in {path}")
    else:
        print(f"2. FAILED to find applyHero in {path}")

    if old_slides_wrap_norm in content_norm:
        content_norm = content_norm.replace(old_slides_wrap_norm, new_slides_wrap_norm)
        print(f"3. Replaced slides wrap in {path}")
    else:
        print(f"3. FAILED to find slides wrap in {path}")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content_norm)

if __name__ == '__main__':
    update_main('js/main.js')
    update_main('public/js/main.js')
