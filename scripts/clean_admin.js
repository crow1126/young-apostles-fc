const fs = require('fs');

function cleanAdmin(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content
    .replace(/Ã—/g, '×')
    .replace(/â€”/g, '—')
    .replace(/â€“/g, '–')
    .replace(/â€œ/g, '"')
    .replace(/â€ /g, '"')
    .replace(/â€™/g, "'")
    .replace(/â€˜/g, "'")
    .replace(/ðŸ“¸/g, '📸')
    .replace(/ðŸ“¢/g, '📢')
    .replace(/ðŸ””/g, '🔔')
    .replace(/âœ…/g, '✅')
    .replace(/⚽\s*ï¸\s*/g, '⚠️')
    .replace(/âš\s*ï¸\s*/g, '⚠️')
    .replace(/â•/g, '═')
    .replace(/âŽ‹/g, '⎋')
    .replace(/â‹®/g, '⋮')
    .replace(/âž•/g, '➕');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Cleaned ' + filePath);
}

cleanAdmin('admin.html');
cleanAdmin('public/admin.html');
