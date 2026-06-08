const fs = require('fs');
const code = fs.readFileSync('src/components/Footer.tsx', 'utf8');
const logoMatch = code.match(/src="(data:image\/png;base64,[^"]+)"/);
if (!logoMatch) throw new Error('Logo not found');

const newCode = `import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="f-grid">
          <div className="f-col f-brand">
            <div className="f-logo-row">
              <img src="${logoMatch[1]}" alt="Wavecare" />
              <div className="f-logo-text">WAVECARE</div>
            </div>
            <p>Healthcare marketing that helps facilities look as good as the care they provide. Built for Healthcare.</p>
          </div>
          <div className="f-col">
            <h4>Explore</h4>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="f-col">
            <h4>Get In Touch</h4>
            <ul>
              <li><a href="mailto:info@wavecare.io">info@wavecare.io</a></li>
              <li><a href="tel:+17329301934">+1 732 930 1934</a></li>
              <li><Link href="/contact" className="f-book">Book a Call &rarr;</Link></li>
            </ul>
          </div>
        </div>
        <div className="f-bottom">
          <div>&copy; 2026 Wavecare Marketing &middot; Miami, FL</div>
          <div>wavecare.io</div>
        </div>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync('src/components/Footer.tsx', newCode);
console.log('Footer updated');
