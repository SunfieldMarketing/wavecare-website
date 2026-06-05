const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const archiveDir = './archive';
const files = fs.readdirSync(archiveDir).filter(f => f.endsWith('.html'));

let allStyles = '';

for (const file of files) {
  const html = fs.readFileSync(path.join(archiveDir, file), 'utf-8');
  const dom = new JSDOM(html);
  const styles = dom.window.document.querySelectorAll('style');
  
  if (styles.length > 0) {
    allStyles += `\n/* ===== Styles from ${file} ===== */\n`;
    styles.forEach(s => {
      allStyles += s.innerHTML + '\n';
    });
  }
}

fs.writeFileSync('./src/app/pageStyles.css', allStyles);
console.log('Styles extracted to src/app/pageStyles.css');
