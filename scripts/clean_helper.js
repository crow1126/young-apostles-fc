const fs = require('fs');
const path = require('path');

// 1. Clean encoding / mojibake function
function cleanEncoding(str) {
  if (!str) return '';
  return str
    // Score line and middle dots
    .replace(/WIN\s+[Ââ][\s\S]{0,4}FT/gi, 'WIN &bull; FT')
    .replace(/LOSS\s+[Ââ][\s\S]{0,4}FT/gi, 'LOSS &bull; FT')
    .replace(/DRAW\s+[Ââ][\s\S]{0,4}FT/gi, 'DRAW &bull; FT')
    .replace(/Ã‚·/g, '&bull;')
    .replace(/Â·/g, '&bull;')
    .replace(/Â¢/g, '&bull;')
    
    // Twi motto
    .replace(/#AgyaNa[^\s"'>]+Tumi/g, '#AgyaNa&#390;w&#596;Tumi')
    .replace(/AgyaNa[^\s"'>]+Tumi/g, 'AgyaNa&#390;w&#596;Tumi')
    .replace(/AGYA NA [^\s"'>]+ TUMI/g, 'AGYA NA &#390;W&#596; TUMI')
    .replace(/Agya Na [^\s"'>]+ Tumi/g, 'Agya Na &#390;w&#596; Tumi')
    
    // Soccer ball emoji & garbled representations
    .replace(/Ã¢Å¡½/g, '<i class="fa-solid fa-futbol"></i>')
    .replace(/âš½/g, '<i class="fa-solid fa-futbol"></i>')
    
    // Quotes and dashes
    .replace(/â€™/g, "'")
    .replace(/â€˜/g, "'")
    .replace(/â€œ/g, '&ldquo;')
    .replace(/â€ /g, '&rdquo;')
    .replace(/â€”/g, '&mdash;')
    .replace(/â€“/g, '&ndash;')
    .replace(/Ã¢â‚¬[^\s"']+/g, '&ndash;')
    
    // Checkmarks & trophies
    .replace(/ðŸ †/g, '🏆')
    .replace(/âœ…/g, '✅')
    
    // Stray Â
    .replace(/Â/g, '');
}

console.log('cleanEncoding helper ready');
