import './casestudy.css';
import Link from 'next/link';

export default function CaseStudies() {
  return (
    <>
      <header className="hero">
        <div className="hero-bg">
          <div className="ph" data-label="hero.jpg &middot; caregiver + resident"></div>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-in">
          <div className="hero-content">
            <svg className="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
            <span className="label">Case Studies</span>
            <h1>The work behind <span className="accent">the trust.</span></h1>
            <p className="sub">Real facilities. Real families finding the right care. See how we help healthcare brands look as good as the care they provide.</p>
            <div className="hero-ctas">
              <Link href="#work" className="btn" data-cursor data-magnetic>See the projects <span className="arr">&rarr;</span></Link>
              <Link href="/contact" className="btn btn-ghost" data-cursor data-magnetic>Book a Call</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="panel light sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label dark">Built for Healthcare</span>
            <h2>Families judge a facility in seconds. <span className="accent">We make those seconds count.</span></h2>
            <p className="sub" style={{marginTop: '18px'}}>Every project below started the same way &mdash; a facility that wasn&apos;t being seen the way it deserved. Here&apos;s what changed once it was.</p>
          </div>
        </div>
      </section>

      <section className="panel ink sec-pad" id="work">
        <div className="glow" style={{width: '520px', height: '520px', background: 'var(--teal-secondary)', top: '-120px', right: '-120px'}}></div>
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">Selected Projects</span>
            <h2>Results we&apos;re <span className="lite">proud of.</span></h2>
          </div>
          <div className="cs-grid stagger">

            <Link href="/case-studies/park-gardens" className="cs-card" data-cursor>
              <div className="cs-media">
                <div className="ph"><span>[REPLACE &mdash; Park Gardens website screenshot]</span></div>
                <div className="cs-tag"><span>Web Design</span><span>Photography</span></div>
              </div>
              <div className="cs-body">
                <div className="cs-client">Park Gardens Rehabilitation &amp; Nursing</div>
                <h3>A skilled nursing site that finally matched the care inside.</h3>
                <p className="cs-desc">A full website rebuild and on-site photoshoot that gave families a real first impression &mdash; warm, clear, and built to convert tours.</p>
                <div className="cs-result"><span className="num">[RESULT]%</span><span className="lbl">more qualified inquiries</span></div>
                <span className="cs-go">View case study <span className="arr">&rarr;</span></span>
              </div>
            </Link>

            <Link href="/case-studies/project-two" className="cs-card" data-cursor>
              <div className="cs-media">
                <div className="ph"><span>[REPLACE &mdash; project image]</span></div>
                <div className="cs-tag"><span>Video Production</span></div>
              </div>
              <div className="cs-body">
                <div className="cs-client">[REPLACE &mdash; Facility / Client name]</div>
                <h3>A facility tour film that booked the room.</h3>
                <p className="cs-desc">[REPLACE &mdash; one-line summary: what they came to us for and what we delivered.]</p>
                <div className="cs-result"><span className="num">[RESULT]</span><span className="lbl">[REPLACE &mdash; metric label]</span></div>
                <span className="cs-go">View case study <span className="arr">&rarr;</span></span>
              </div>
            </Link>

            <Link href="/case-studies/project-three" className="cs-card" data-cursor>
              <div className="cs-media">
                <div className="ph"><span>[REPLACE &mdash; project image]</span></div>
                <div className="cs-tag"><span>Design &amp; Print</span><span>Branding</span></div>
              </div>
              <div className="cs-body">
                <div className="cs-client">[REPLACE &mdash; Facility / Client name]</div>
                <h3>A brand refresh that aged up the perception, not the people.</h3>
                <p className="cs-desc">[REPLACE &mdash; one-line summary: what they came to us for and what we delivered.]</p>
                <div className="cs-result"><span className="num">[RESULT]</span><span className="lbl">[REPLACE &mdash; metric label]</span></div>
                <span className="cs-go">View case study <span className="arr">&rarr;</span></span>
              </div>
            </Link>

            <Link href="/case-studies/project-four" className="cs-card" data-cursor>
              <div className="cs-media">
                <div className="ph"><span>[REPLACE &mdash; project image]</span></div>
                <div className="cs-tag"><span>Advertising</span></div>
              </div>
              <div className="cs-body">
                <div className="cs-client">[REPLACE &mdash; Facility / Client name]</div>
                <h3>Ad spend that finally filled beds, not just clicks.</h3>
                <p className="cs-desc">[REPLACE &mdash; one-line summary: what they came to us for and what we delivered.]</p>
                <div className="cs-result"><span className="num">[RESULT]</span><span className="lbl">[REPLACE &mdash; metric label]</span></div>
                <span className="cs-go">View case study <span className="arr">&rarr;</span></span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      <section className="panel deep sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">By the Numbers</span>
            <h2>A decade of <span className="accent">getting it right.</span></h2>
          </div>
          <div className="stats stagger">
            <div className="stat"><div className="n" data-count="10">0</div><div className="t">Years in Healthcare</div></div>
            <div className="stat"><div className="n" data-count="500" data-suffix="+">0</div><div className="t">Facilities Served</div></div>
            <div className="stat"><div className="n" data-count="700">0</div><div className="t">Assisted Placements</div></div>
            <div className="stat"><div className="n" data-count="2400" data-comma="1">0</div><div className="t">Smiles Captured</div></div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-fallback"></div>
        <canvas id="waveCanvas"></canvas>
        <div className="final-in" data-reveal>
          <span className="label">Your facility, seen the right way</span>
          <h2>Ready to be the next <span className="accent">case study?</span></h2>
          <p className="sub">Tell us about your facility. We&apos;ll show you exactly what a Wavecare rebuild could look like &mdash; and what it could do for your inquiries.</p>
          <Link href="/contact" className="btn btn-light" data-cursor data-magnetic>Book a Call <span className="arr">&rarr;</span></Link>
        </div>
      </section>
    </>
  );
}
