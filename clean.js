const fs = require('fs');
const html = fs.readFileSync('archive/index.html', 'utf8');
const clean = html.replace(/src=\"data:image\/[^;]+;base64,[^\"]+\"/g, 'src=\"[BASE64_IMAGE_REMOVED]\"');
fs.writeFileSync('archive/index_clean.html', clean);
