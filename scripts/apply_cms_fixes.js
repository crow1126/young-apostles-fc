const fs = require('fs');
const path = require('path');

console.log('--- STARTING COMPREHENSIVE FIX SCRIPT ---');

// ==========================================
// 1. UPDATE CMS.JSON & PUBLIC/DATA/CMS.JSON
// ==========================================
function updateCms() {
  const cmsPath = path.resolve('data/cms.json');
  let cms = JSON.parse(fs.readFileSync(cmsPath, 'utf8'));

  // Clean hero
  cms.hero = {
    headline: "Samuel Prempeh Wins AJ Construction & Building Player of the Month",
    subtitle: "Young Apostles FC striker Samuel Prempeh has been named the club's AJ Construction & Building Player of the Month after scoring all 3 goals after Matchday Six of the 2026/27 Ghana Premier League season.<br><br><strong>#YAFC #AgyaNa&#390;w&#596;Tumi</strong>",
    image: "assets/prempeh-potm-award.jpg",
    image2: "assets/prempeh-potm-boots.jpg",
    ctaText: "Read Full Award Story & Gallery",
    ctaLink: "#news",
    images: [
      "assets/prempeh-potm-award.jpg",
      "assets/prempeh-potm-boots.jpg"
    ]
  };

  // Ensure Aduana derby article is clean and properly formatted
  const aduanaArticle = {
    id: "young-apostles-edge-aduana-bono-derby",
    title: "Young Apostles Edge Aduana in Bono Derby",
    category: "MATCH REPORT",
    badgeClass: "news-badge-pill--match",
    date: "Oct 11, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/md2-prempeh-win.jpg",
    excerpt: "Young Apostles claimed a hard-fought 1-0 victory over Aduana FC in an exciting Bono Derby encounter, with Samuel Prempeh's penalty proving decisive in a crucial Ghana Premier League clash.",
    content: `<p>Young Apostles claimed a hard-fought 1-0 victory over Aduana FC in an exciting Bono Derby encounter, with Samuel Prempeh's penalty proving decisive in a crucial Ghana Premier League clash.</p><p>Prempeh stepped up to convert from the spot in the 46th minute of the first half, securing all three points for Young Apostles and taking his goal tally to three for the season.</p><p>Head coach Abdul Abu-Hanan hailed the victory as a significant moment for his side, expressing confidence that the result could serve as a turning point for his players as they look to build momentum in the league.</p><p>Meanwhile, Samuel Adamu emerged as another standout performer, earning the Man of the Match award for the second time this season. Adamu praised his teammates for their impressive performance, insisting that the team was well prepared for the victory.</p><p>He added that winning the individual accolade would further motivate him to work harder and continue delivering strong performances for the club.</p><p>With this important victory, Young Apostles will hope to build on the momentum and carry their renewed confidence into their upcoming fixtures.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid #0057B8;border-radius:0 8px 8px 0;"><p style="font-weight:800;color:#001489;font-size:1.1rem;margin:0 0 0.25rem;">FULL TIME: Young Apostles FC 1-0 Aduana Stars</p><p style="margin:0;color:#64748B;">⚽ Scorer: Samuel Prempeh (46' pen) &bull; Man of the Match: Samuel Adamu</p></div>`,
    readTime: "3 min read"
  };

  // Ensure Lions match article is clean and formatted
  const lionsArticle = {
    id: "young-apostles-second-home-test-lions",
    title: "Young Apostles Set for Second Home Test Against Hearts of Lions",
    category: "CLUB NEWS",
    badgeClass: "news-badge-pill--preview",
    date: "Sep 26, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/md2-holy-stars-preview.jpg",
    excerpt: "Young Apostles FC return to the Nana Abrefa VII Stadium in Wenchi on Sunday as they host Hearts of Lions in their second home game of the 2026/27 Ghana Premier League season.",
    content: `<p>Young Apostles FC return to the Nana Abrefa VII Stadium in Wenchi on Sunday as they host Hearts of Lions in their second home game of the 2026/27 Ghana Premier League season.</p><p>The Apostles head into Matchday 4 with three points from their opening three matches, having recorded one win and two defeats.</p><p>Young Apostles opened their campaign with a 3-0 defeat away to Vision FC before responding with a 1-0 victory over Basake Holy Stars in their first home game of the season.</p><p>They were, however, beaten 2-1 by Debibi United in their most recent outing and will be determined to return to winning ways in front of their home supporters.</p><p>Hearts of Lions are also searching for their first victory of the campaign. The Kpando-based side began the season with a goalless draw against Aduana FC before suffering a 2-1 away defeat to Asante Kotoko. They were held to another draw, this time 1-1, by Swedru All Blacks in their third match.</p><h4>Apostles Hold Recent Home Advantage</h4><p>Young Apostles have enjoyed a strong record against Hearts of Lions at the Nana Abrefa VII Stadium in recent meetings, winning both of the last two visits.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid #0057B8;border-radius:0 8px 8px 0;"><blockquote style="font-style:italic;font-size:1.05rem;color:#001489;margin:0 0 0.5rem 0;">"We can't afford to drop points at home. We have to go all out and fight for all three points against Hearts of Lions."</blockquote><cite style="font-weight:700;color:#C9943A;font-size:0.85rem;">&mdash; Assistant Coach Abubakar Fuseini</cite></div><p><strong>DATE: Sunday, September 27, 2026 &bull; Kick Off: 3:00 PM &bull; Nana Abrefa VII Stadium, Wenchi</strong></p>`,
    readTime: "3 min read"
  };

  const potmArticle = {
    id: "samuel-prempeh-player-of-the-month",
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
    content: `<p>Young Apostles FC striker <strong>Samuel Prempeh</strong> has been named the club's <strong>AJ Construction & Building Player of the Month</strong> following his impressive performances in the Ghana Premier League.</p><p>Prempeh has scored all three of Young Apostles' goals after Matchday Six of the 2026/27 Ghana Premier League season, underlining his importance to the team's attacking efforts.</p><p>He emerged as the winner ahead of fellow nominees <strong>Samuel Adamu</strong> and <strong>John Afram Attah Jnr</strong> to claim the monthly award in recognition of his contribution to the club.</p><h4>Player of the Month Prize Package</h4><p>As part of his prize, Prempeh received an exclusive collection of official club gear:</p><ul><li>Customised Young Apostles FC team bag</li><li>Adidas Predator football boots</li><li>Customised shin guards</li><li>Official match socks and football hose</li></ul><div class="news-quote-box" style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid #0057B8;border-radius:0 8px 8px 0;"><blockquote style="font-style:italic;font-size:1.05rem;color:#001489;margin:0 0 0.5rem 0;">"This recognition will serve as additional motivation to keep working hard and scoring goals for the Apostles throughout the season."</blockquote><cite style="font-weight:700;color:#C9943A;font-size:0.85rem;">&mdash; Samuel Prempeh, Striker</cite></div><p>Speaking after receiving the award, the striker expressed his determination to maintain his form and continue delivering for the club. He noted that the recognition would serve as additional motivation to keep working hard and scoring goals for the Apostles throughout the season.</p><p>Prempeh's achievement highlights his growing influence within the team as Young Apostles continue their campaign in the Ghana Premier League.</p><p>The club congratulates Samuel Prempeh on winning the award and looks forward to more goals and outstanding performances from the striker.</p><div class="article-gallery-grid" style="margin:1.75rem 0;display:grid;grid-template-columns:1fr 1fr;gap:1rem;"><div style="border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);background:#0F172A;"><img src="assets/prempeh-potm-award.jpg" alt="Samuel Prempeh Receiving Player of the Month Award" style="width:100%;height:260px;object-fit:cover;display:block;"><div style="padding:0.6rem 0.8rem;color:#F8FAFC;font-size:0.78rem;text-align:center;font-weight:600;">🏆 Samuel Prempeh on pitch with award</div></div><div style="border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);background:#0F172A;"><img src="assets/prempeh-potm-boots.jpg" alt="Customized Bag, Predator Boots, and Shin Guards" style="width:100%;height:260px;object-fit:cover;display:block;"><div style="padding:0.6rem 0.8rem;color:#F8FAFC;font-size:0.78rem;text-align:center;font-weight:600;">⚽ Custom Bag, Predator Boots &amp; Shin Guards</div></div></div>`,
    readTime: "3 min read"
  };

  const debibiArticle = {
    id: "debibi-united-derby",
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
  };

  const holyStarsReport = {
    id: "prempeh-winner-holy-stars",
    title: "Samuel Prempeh Strike Earns Young Apostles First Win of the Season",
    category: "MATCH REPORT",
    badgeClass: "news-badge-pill--match",
    date: "Sep 13, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/md2-prempeh-win.jpg",
    excerpt: "Young Apostles FC secured their first victory of the 2026/27 Ghana Premier League season with a narrow 1-0 win over Basake Holy Stars in Wenchi. Samuel Prempeh provided the decisive moment, scoring early to give the Apostles the lead.",
    content: `<p>Young Apostles FC secured their first victory of the 2026/27 Ghana Premier League season with a narrow 1-0 win over Basake Holy Stars in Wenchi.</p><p>Samuel Prempeh provided the decisive moment, scoring early to give the Apostles the lead and set the tone for a determined home performance.</p><p>Having suffered a 3-0 defeat to Vision FC on Matchday 1, Young Apostles responded with a disciplined display to claim all three points in their first home league game of the campaign.</p><p>The victory also extends Young Apostles' unbeaten record against Basake Holy Stars in Wenchi. The Apostles had won the previous two meetings at home by identical 2-0 scorelines, and Prempeh's early strike ensured that Holy Stars once again left Wenchi without a victory.</p><p>The Apostles managed the game effectively after taking the lead, protecting their advantage until the final whistle to give the home supporters a winning start to the club's home league campaign.</p><p>The result moves Young Apostles onto three points after two matches.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid #0057B8;border-radius:0 8px 8px 0;"><p style="font-weight:800;color:#001489;font-size:1.1rem;margin:0 0 0.25rem;">FULL TIME: Young Apostles FC 1-0 Basake Holy Stars</p><p style="margin:0;color:#64748B;">⚽ Scorer: Samuel Prempeh</p></div>`,
    readTime: "3 min read"
  };

  const holyStarsPreview = {
    id: "holy-stars-matchday2-preview",
    title: "Young Apostles Set for Basake Holy Stars Test in Wenchi",
    category: "MATCH PREVIEW",
    badgeClass: "news-badge-pill--preview",
    date: "Sep 11, 2026",
    source: "Apostles Media Dispatch",
    author: "Young Apostles FC",
    image: "assets/md2-holy-stars-preview.jpg",
    excerpt: "Young Apostles FC will return to action on Matchday 2 of the 2026/27 Ghana Premier League season when they host Basake Holy Stars in their first home league fixture of the campaign at Wenchi.",
    content: `<p>Young Apostles FC will return to action on Matchday 2 of the 2026/27 Ghana Premier League season when they host Basake Holy Stars in their first home league fixture of the campaign at Wenchi.</p><p>The Apostles will be looking to bounce back from their opening-day defeat to Vision FC, where they suffered a 3-0 loss in Tema. With the home support behind them, Young Apostles will be aiming to put their first points of the season on the board.</p><h4>Holy Stars Yet to Win in Wenchi</h4><p>Basake Holy Stars arrive in Wenchi looking for a first victory at the venue, but their previous visits have ended in defeats. The two most recent meetings between the sides in Wenchi have both gone the way of Young Apostles, with the Apostles recording 2-0 victories in each encounter.</p><h4>Apostles Ready to Respond</h4><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(0,87,184,0.06);border-left:4px solid #0057B8;border-radius:0 8px 8px 0;"><blockquote style="font-style:italic;font-size:1.05rem;color:#001489;margin:0 0 0.5rem 0;">"The players lost concentration at certain moments against Vision, but we've worked on those mistakes and we are fully prepared for Holy Stars."</blockquote><cite style="font-weight:700;color:#C9943A;font-size:0.85rem;">&mdash; Assistant Coach Abubakar Fuseini</cite></div><p><strong>Young Apostles FC vs Basake Holy Stars &bull; Sun 12th Sep &bull; 3:00PM &bull; Wenchi Sports Stadium</strong></p>`,
    readTime: "3 min read"
  };

  const visionArticle = {
    id: "gpl-opener-vision-fc",
    title: "Young Apostles Fall to 3-0 Defeat Against Vision FC in GPL Opener",
    category: "MATCH REPORT",
    badgeClass: "news-badge-pill--match",
    date: "Sep 6, 2026",
    source: "GPL MD 1",
    author: "Young Apostles FC",
    image: "assets/md1-vision-loss.jpg",
    excerpt: "Young Apostles FC began their 2026/27 Ghana Premier League campaign with a 3-0 defeat to Vision FC on Saturday, September 5, 2026, at the Nii Adjei Kraku II Sports Complex.",
    content: `<p>Young Apostles FC began their 2026/27 Ghana Premier League campaign with a 3-0 defeat to Vision FC on Saturday, September 5, 2026, at the Nii Adjei Kraku II Sports Complex.</p><p>The Apostles entered the opening fixture looking to start the new campaign on a positive note, but Vision FC took control early and opened the scoring in the fifth minute through Nyenye Naziru.</p><p>Young Apostles were unable to find an equaliser before the break, and Vision doubled their advantage in the 40th minute when Setsofia Aqetey found the back of the net to send the hosts into halftime with a 2-0 lead.</p><p>The second half saw Young Apostles push for a response, but Vision remained in control. Aqetey completed his brace in the 68th minute to make it 3-0.</p><p>Despite efforts from the Apostles to get back into the contest, Vision held on to secure all three points in the opening game of the 2026/27 league season. Young Apostles will now turn their attention to their next fixture, against Basake Holy Stars.</p><div style="margin:1.5rem 0;padding:1.25rem;background:rgba(220,38,38,0.05);border-left:4px solid #dc2626;border-radius:0 8px 8px 0;"><p style="font-weight:800;color:#dc2626;font-size:1.05rem;margin:0 0 0.25rem;">FULL TIME: Vision FC 3-0 Young Apostles FC</p><p style="margin:0;color:#64748B;font-size:0.9rem;">⚽ Naziru (5') &bull; Aqetey (40', 68')</p></div>`,
    readTime: "3 min read"
  };

  // Set the 7 clean articles without duplication
  // Position 1: Aduana derby (MD6 win)
  // Position 2: Hearts of Lions preview (MD4)
  // Position 3: Debibi derby (MD3)
  // Position 4+: POTM award story, Holy stars win, Holy stars preview, Vision FC opener
  cms.blogs = [
    aduanaArticle,
    lionsArticle,
    debibiArticle,
    potmArticle,
    holyStarsReport,
    holyStarsPreview,
    visionArticle
  ];

  // Clean fixtures scorers
  if (Array.isArray(cms.fixtures)) {
    cms.fixtures.forEach(f => {
      if (f.scorer) {
        f.scorer = f.scorer.replace(/âš½/g, '').replace(/Ã¢Å¡½/g, '').replace(/⚽/g, '').trim();
      }
    });
  }

  const jsonStr = JSON.stringify(cms, null, 2);
  fs.writeFileSync('data/cms.json', jsonStr, 'utf8');
  fs.mkdirSync('public/data', { recursive: true });
  fs.writeFileSync('public/data/cms.json', jsonStr, 'utf8');
  console.log('✅ data/cms.json and public/data/cms.json updated successfully!');
}

updateCms();
