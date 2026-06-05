import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
  <div className="container">
    <div className="f-grid">
      <div className="f-col f-brand">
        <img />
        <p>Healthcare marketing built for senior care and the practices that families trust most.</p>
      </div>
      <div className="f-col"><h4>Navigation</h4><ul><li><a href="index.html" data-cursor>Home</a></li><li><a href="services.html" data-cursor>Services</a></li><li><a href="contact.html" data-cursor>Contact</a></li></ul></div>
      <div className="f-col"><h4>Services</h4><ul><li><a href="photoservices.html" data-cursor>Brand &amp; Photoshoots</a></li><li><a href="videoservices.html" data-cursor>Video Production</a></li><li><a href="design-print.html" data-cursor>Design &amp; Print</a></li><li><a href="webdesign.html" data-cursor>Web Design</a></li></ul></div>
      <div className="f-col"><h4>Contact</h4><ul><li><a href="mailto:info@wavecare.io" data-cursor>info@wavecare.io</a></li><li><a href="tel:+17329301934" data-cursor>+1 732 930 1934</a></li></ul></div>
    </div>
    <div className="f-bottom"><span>© 2026 by Wavecare. All rights reserved.</span><span>Built for healthcare.</span></div>
  </div>
</footer>
  );
}
