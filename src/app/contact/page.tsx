import './contact.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
  return (
    <>
      <header className="chero">
        <div className="chero-bg"><Image src="/images/img_114.jpeg" alt="Caregiver with resident at a senior care facility" layout="fill" objectFit="cover" /></div>
        <div className="container">
          <div className="chero-grid">

            <div data-reveal>
              <svg className="wave-accent" viewBox="0 0 78 26"><path d="M2 13 Q 12 2, 21 13 T 40 13 T 59 13 T 76 11"/></svg>
              <span className="label">Get in Touch</span>
              <h1>Let&apos;s make your<br /><span className="accent">seconds count.</span></h1>
              <p className="chero-sub">Tell us about your facility and we&apos;ll show you exactly what we&apos;d build, capture, or design to bring the right families through your doors.</p>

              <div className="trust-list">
                <div className="trust-item">
                  <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 2"/><circle cx="12" cy="12" r="9"/></svg></span>
                  <div><h4>Reply within one business day</h4><p>Real humans, 8 AM – 8 PM daily. No bots, no runaround.</p></div>
                </div>
                <div className="trust-item">
                  <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/></svg></span>
                  <div><h4>HIPAA-conscious from day one</h4><p>Privacy and resident dignity built into everything we produce.</p></div>
                </div>
                <div className="trust-item">
                  <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg></span>
                  <div><h4>Most projects launch in ~2 weeks</h4><p>From the first call to live, without the drawn-out timeline.</p></div>
                </div>
              </div>

              <div className="direct">
                <a href="mailto:info@wavecare.io" data-cursor><span className="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></span>info@wavecare.io</a>
                <a href="tel:+17329301934" data-cursor><span className="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h4l2 5-3 2a14 14 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 6a2 2 0 012-2z"/></svg></span>+1 732 930 1934</a>
              </div>
            </div>

            <div className="form-card" id="formCard" data-reveal>
              <h2>Send us a message</h2>
              <p className="fsub">Prefer to talk? <Link href="#book" style={{color: 'var(--teal-bright)'}} data-cursor>Book a call instead →</Link></p>

              <form className="form" id="contactForm" noValidate>
                <div className="field" data-validate="required">
                  <label>Full name <span className="req">*</span></label>
                  <input type="text" name="name" autoComplete="name" placeholder="Jane Doe" required />
                  <span className="check"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg></span>
                  <div className="hint">Please enter your name.</div>
                </div>

                <div className="field" data-validate="email">
                  <label>Email <span className="req">*</span></label>
                  <input type="email" name="email" autoComplete="email" inputMode="email" placeholder="jane@facility.com" required />
                  <span className="check"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg></span>
                  <div className="hint">Please enter a valid email.</div>
                </div>

                <div className="field" data-validate="required">
                  <label>Facility / Organization <span className="req">*</span></label>
                  <input type="text" name="facility" autoComplete="organization" placeholder="Park Gardens Rehabilitation" required />
                  <span className="check"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg></span>
                  <div className="hint">Let us know where you&apos;re reaching out from.</div>
                </div>

                <div className="field">
                  <label>Phone <span style={{color: 'var(--muted)', fontWeight: 400}}>(optional)</span></label>
                  <input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="(732) 930-1934" />
                </div>

                <div>
                  <div className="chips-label">What do you need help with?</div>
                  <div className="chips" id="chips">
                    <span className="chip" data-cursor>Brand &amp; Photos</span>
                    <span className="chip" data-cursor>Video</span>
                    <span className="chip" data-cursor>Design &amp; Print</span>
                    <span className="chip" data-cursor>Web Design</span>
                    <span className="chip" data-cursor>Not sure yet</span>
                  </div>
                  <input type="hidden" name="interests" id="interests" />
                </div>

                <div className="field">
                  <label>Tell us about your facility <span style={{color: 'var(--muted)', fontWeight: 400}}>(optional)</span></label>
                  <textarea name="message" placeholder="A sentence or two about what you&apos;re working on…"></textarea>
                </div>

                <button type="submit" className="btn submit-btn" data-magnetic data-cursor>
                  <span className="spinner"></span><span className="txt">Send Message</span><span className="arr">→</span>
                </button>
                <p className="form-note">No spam, ever. We reply within one business day.</p>
              </form>

              <div className="form-success">
                <div className="ok-ic"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg></div>
                <h3>Message sent — thank you.</h3>
                <p>We&apos;ve got it. A real human from Wavecare will be in touch within one business day.</p>
              </div>
            </div>

          </div>
        </div>
      </header>

      <section className="ink sec-pad">
        <div className="glow" style={{width: '480px', height: '480px', background: 'var(--teal-primary)', top: '-120px', right: '-120px'}}></div>
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">What Happens Next</span>
            <h2>From hello to live, here&apos;s the path.</h2>
          </div>
          <div className="steps stagger">
            <article className="step" data-cursor><div className="sn">01</div><h3>We listen &amp; audit</h3><p>We learn about your facility, your audience, and review your current online presence — what&apos;s working and what&apos;s costing you tours.</p></article>
            <article className="step" data-cursor><div className="sn">02</div><h3>We map the plan</h3><p>You get a clear, no-filler plan for exactly what we&apos;d build, capture, or design — with honest timelines and scope.</p></article>
            <article className="step" data-cursor><div className="sn">03</div><h3>We make it count</h3><p>We produce the work and optimize the journey, so the right families come across your community and say &quot;yeah, this feels right.&quot;</p></article>
          </div>
        </div>
      </section>

      <section className="deep sec-pad" id="book">
        <div className="glow" style={{width: '520px', height: '520px', background: 'var(--teal-accent)', bottom: '-160px', left: '-120px', opacity: 0.26}}></div>
        <div className="container" style={{position: 'relative', zIndex: 2}}>
          <div className="sec-head center" data-reveal>
            <span className="label">Rather Just Grab a Time?</span>
            <h2>Book a call that fits your schedule.</h2>
            <p className="lead" style={{margin: '0 auto'}}>Pick a slot and we&apos;ll come prepared with ideas specific to your facility.</p>
          </div>
          <div className="cal-wrap" data-reveal>
            <iframe src="https://go.wavecare.io/widget/bookings/wavecare-website-audit" scrolling="no" title="Book a call with Wavecare"></iframe>
            <div className="cal-fallback" style={{display: 'none'}} id="calFallback">
              <p>Having trouble loading the calendar?</p>
              <Link href="https://go.wavecare.io/widget/bookings/wavecare-website-audit" className="btn" data-cursor>Open Booking Page →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ink sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">You&apos;re in Good Company</span>
            <h2>Trusted by healthcare<br />brands across the country.</h2>
          </div>
          <div className="tstrip stagger">
            <article className="tmini" data-cursor><blockquote>&quot;We started receiving better-quality inquiries within weeks. The branding helped us look more professional and trustworthy.&quot;</blockquote><div className="who"><strong>Director</strong>Senior Care Facility</div></article>
            <article className="tmini" data-cursor><blockquote>&quot;They handled everything from creative direction to execution smoothly. The final results exceeded our expectations.&quot;</blockquote><div className="who"><strong>Marketing Manager</strong>Healthcare Practice</div></article>
            <article className="tmini" data-cursor><blockquote>&quot;Wavecare feels more like a partner than a vendor. Their experience in healthcare marketing really shows.&quot;</blockquote><div className="who"><strong>Operations Lead</strong>Medical Services Provider</div></article>
          </div>
        </div>
      </section>

      <section className="final">
        <canvas id="waveCanvas"></canvas>
        <div className="container">
          <span className="label" style={{justifyContent: 'center'}} data-reveal>Ready When You Are</span>
          <h2 data-reveal>Your next resident is<br />searching <span className="accent">right now.</span></h2>
          <p className="sub" data-reveal>Let&apos;s make sure that when they find you, they say yes.</p>
          <div data-reveal><Link href="#formCard" className="btn" data-magnetic data-cursor style={{background: '#fff', color: 'var(--teal-primary)'}}>Send a Message</Link></div>
        </div>
      </section>
    </>
  );
}
