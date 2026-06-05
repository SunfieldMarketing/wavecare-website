import Link from 'next/link';

export default function CTA() {
  return (
    <section className="final">
      <canvas id="waveCanvas"></canvas>
      <div className="container">
        <span className="label" style={{ justifyContent: 'center' }} data-reveal>Get Started</span>
        <h2 data-reveal>Ready to look as good as<br />the <span className="accent">care</span> you provide?</h2>
        <p className="sub" data-reveal>Tell us about your facility and we'll show you exactly what we'd build, capture, or design to start bringing in more qualified inquiries.</p>
        <div data-reveal>
          <Link href="/contact" className="btn btn-light" data-magnetic data-cursor>Book a Call</Link>
        </div>
      </div>
    </section>
  );
}
