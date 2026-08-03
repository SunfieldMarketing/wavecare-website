const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function convertNodeToJsxString(node) {
  if (node.nodeType === 3) { // TEXT_NODE
    return node.textContent;
  }
  if (node.nodeType === 8) { // COMMENT_NODE
    return `{/* ${node.textContent} */}`;
  }
  if (node.nodeType !== 1) { // Not Element
    return '';
  }

  let tagName = node.tagName.toLowerCase();
  
  if (tagName === 'script' || tagName === 'nav' || tagName === 'footer') {
    return '';
  }
  if (tagName === 'style') {
    const css = node.innerHTML.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `<style dangerouslySetInnerHTML={{ __html: \`${css}\` }} />`;
  }

  if (node.classList && (
    node.classList.contains('preloader') || 
    node.classList.contains('grain') || 
    node.classList.contains('progress') || 
    node.classList.contains('cdot') || 
    node.classList.contains('cring') ||
    node.classList.contains('final')
  )) {
    return '';
  }

  if (tagName === 'a') {
    tagName = 'Link';
  }

  let attrs = '';
  for (let i = 0; i < node.attributes.length; i++) {
    const attr = node.attributes[i];
    let name = attr.name;
    let value = attr.value;

    if (name === 'class') name = 'className';
    else if (name === 'for') name = 'htmlFor';
    else if (name === 'viewbox') name = 'viewBox';
    else if (name === 'fill-rule') name = 'fillRule';
    else if (name === 'stroke-width') name = 'strokeWidth';
    else if (name === 'stroke-linecap') name = 'strokeLinecap';
    else if (name === 'stroke-linejoin') name = 'strokeLinejoin';
    else if (name === 'stroke-dasharray') name = 'strokeDasharray';
    else if (name === 'stroke-dashoffset') name = 'strokeDashoffset';
    else if (name === 'clip-path') name = 'clipPath';
    else if (name === 'novalidate') name = 'noValidate';
    else if (name === 'autocomplete') name = 'autoComplete';
    else if (name === 'tabindex') name = 'tabIndex';
    else if (name === 'minlength') name = 'minLength';
    else if (name === 'maxlength') name = 'maxLength';
    else if (name === 'inputmode') name = 'inputMode';
    else if (name === 'autoplay') name = 'autoPlay';
    else if (name === 'playsinline') name = 'playsInline';
    else if (name === 'allowfullscreen') name = 'allowFullScreen';

    if (name === 'href') {
      if (value.endsWith('.html')) {
        if (value === 'index.html') {
          value = '/';
        } else if (value === 'casestudy.html') {
          value = '/case-studies';
        } else if (value === 'photoservices.html') {
          value = '/services/brand-photoshoots';
        } else if (value === 'videoservices.html') {
          value = '/services/video-production';
        } else if (value === 'design-print.html') {
          value = '/services/design-print';
        } else if (value === 'webdesign.html') {
          value = '/services/web-design';
        } else {
          value = '/' + value.replace('.html', '');
        }
      }
    }

    if (name === 'style') {
      const styleObj = {};
      value.split(';').forEach(style => {
        if (!style.trim()) return;
        const parts = style.split(':');
        if (parts.length >= 2) {
          const k = parts[0].trim();
          const v = parts.slice(1).join(':').trim();
          let camelKey = k;
          if (k.startsWith('--')) {
            camelKey = `["${k}" as any]`;
          } else {
            camelKey = k.replace(/-([a-z])/g, g => g[1].toUpperCase());
          }
          styleObj[camelKey] = v;
        }
      });
      const styleStr = Object.entries(styleObj).map(([k, v]) => `${k}: "${v}"`).join(', ');
      attrs += ` style={{ ${styleStr} }}`;
    } else if (['noValidate', 'required', 'disabled', 'checked', 'readOnly', 'autoPlay', 'loop', 'muted', 'controls', 'playsInline', 'allowFullScreen'].includes(name)) {
      attrs += ` ${name}`;
    } else {
      attrs += ` ${name}="${value.replace(/"/g, '&quot;')}"`;
    }
  }

  const selfClosing = ['img', 'br', 'hr', 'input', 'source', 'area', 'col', 'embed', 'link', 'meta', 'param', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon'].includes(tagName);

  if (selfClosing) {
    return `<${tagName}${attrs} />`;
  }

  let inner = '';
  for (let i = 0; i < node.childNodes.length; i++) {
    inner += convertNodeToJsxString(node.childNodes[i]);
  }

  return `<${tagName}${attrs}>${inner}</${tagName}>`;
}

const archiveDir = path.join(__dirname, 'archive');
const mainDir = path.join(__dirname, 'src', 'app', '(main)');
const landingDir = path.join(__dirname, 'src', 'app', '(landing)');

function processFile(file, destDir, destFile) {
  const content = fs.readFileSync(path.join(archiveDir, file), 'utf8');
  
  const dom = new JSDOM(content);
  const body = dom.window.document.body;
  
  let jsx = '';
  for (let i = 0; i < body.childNodes.length; i++) {
    jsx += convertNodeToJsxString(body.childNodes[i]);
  }

  const destPath = path.join(destDir, destFile, 'page.tsx');
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  const template = `import Link from 'next/link';

export default function Page() {
  return (
    <main>
      ${jsx}
    </main>
  );
}`;

  fs.writeFileSync(destPath, template);
  console.log('Processed', file);
}

// System A (main)
processFile('index.html', mainDir, '');
processFile('about.html', mainDir, 'about');
processFile('services.html', mainDir, 'services');
processFile('casestudy.html', mainDir, 'case-studies');
processFile('contact.html', mainDir, 'contact');
processFile('photoservices.html', mainDir, 'services/brand-photoshoots');
processFile('videoservices.html', mainDir, 'services/video-production');
processFile('design-print.html', mainDir, 'services/design-print');
processFile('webdesign.html', mainDir, 'services/web-design');

// System B (landing)
processFile('testimonials.html', landingDir, 'testimonials');
processFile('commercial.html', landingDir, 'commercial');
