const fs = require('fs');
const path = require('path');

const archiveDir = 'archive';
const publicImagesDir = path.join('public', 'images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

let count = 100;

const files = fs.readdirSync(archiveDir).filter(f => f.endsWith('.html') && !f.includes('_clean') && !f.includes('_with_links'));

for (const file of files) {
  const filepath = path.join(archiveDir, file);
  const html = fs.readFileSync(filepath, 'utf8');

  const newHtml = html.replace(/src="(data:image\/([^;]+);base64,([^"]+))"/g, (match, fullBase64, ext, data) => {
    if (ext === 'svg+xml') {
       return match; // ignore svg background
    }
    const filename = `img_${count++}.${ext}`;
    const imgpath = path.join(publicImagesDir, filename);
    fs.writeFileSync(imgpath, Buffer.from(data, 'base64'));
    return `src="/images/${filename}"`;
  });

  fs.writeFileSync(path.join(archiveDir, file.replace('.html', '_linked.html')), newHtml);
}
console.log('Done extracting images for all files.');
