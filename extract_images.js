const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('archive/index.html', 'utf8');

const publicImagesDir = path.join('public', 'images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

let count = 1;
const newHtml = html.replace(/src="(data:image\/([^;]+);base64,([^"]+))"/g, (match, fullBase64, ext, data) => {
  if (ext === 'svg+xml') {
     return match; // ignore svg background
  }
  const filename = `img_${count++}.${ext}`;
  const filepath = path.join(publicImagesDir, filename);
  fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
  return `src="/images/${filename}"`;
});

fs.writeFileSync('archive/index_with_links.html', newHtml);
