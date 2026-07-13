import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="f-grid">
          <div className="f-col f-brand">
            <div className="f-logo-row">
              <Image src="/wavecare-marketing-logo.png" alt="Wavecare Marketing" width={300} height={400} style={{ height: '140px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
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
              <li><Link href="/contact" className="f-book">Book a Demo &rarr;</Link></li>
            </ul>
          </div>
        </div>
        <div className="f-bottom">
          <div>&copy; 2026 Wavecare Marketing &middot; Miami, FL</div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/terms-of-service" style={{ color: 'inherit' }}>Terms of Service</Link>
            <Link href="/privacy-policy" style={{ color: 'inherit' }}>Privacy Policy</Link>
            <span>wavecare.io</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
