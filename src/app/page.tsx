import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="hero-bg">
          <Image src="/images/img_3.jpeg" alt="Caregiver with resident at a senior care facility" layout="fill" objectFit="cover" />
        </div>
        <div className="container hero-inner">
          <svg className="wave-accent" viewBox="0 0 78 26">
            <path d="M2 13 Q 12 2, 21 13 T 40 13 T 59 13 T 76 11" />
          </svg>
          <span className="label" data-hero>Healthcare Marketing Agency</span>
          <h1>
            <span className="line" data-hero><span>Built for</span></span>
            <span className="line" data-hero><span className="accent">Healthcare.</span></span>
          </h1>
          <p className="hero-sub" data-hero>
            We help senior care facilities and medical practices look as good as the care they
            provide — branding, video, print, and websites that turn attention into booked tours.
          </p>
          <div className="hero-actions" data-hero>
            <Link href="/contact" className="btn" data-magnetic data-cursor>Book a Call</Link>
            <Link href="#services" className="btn btn-ghost" data-magnetic data-cursor>See What We Do</Link>
          </div>
        </div>
        <div className="scroll-cue">
          <div className="m"></div>
          <span>Scroll</span>
        </div>
      </header>

      <section className="ink sec-pad">
        <div className="glow" style={{width: '520px', height: '520px', background: 'var(--teal-primary)', top: '-120px', left: '-140px'}}></div>
        <div className="container">
          <div className="showreel">
            <div data-reveal>
              <span className="label">Who We Are</span>
              <h2>Marketing that earns trust before the first tour.</h2>
              <p>A youthful, yet experienced healthcare marketing agency with bespoke solutions and tailored strategies — built around the sensitivity, compliance, and speed that senior care actually requires.</p>
              <p>See the work for yourself.</p>
              <Link href="/contact" className="btn" data-magnetic data-cursor style={{marginTop: '14px'}}>Book a Call</Link>
            </div>
            <div className="reel-frame" data-reveal data-cursor>
              <iframe src="https://player.vimeo.com/video/1187767005?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" title="Wavecare Commercial"></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="deep sec-pad" id="services">
        <div className="container">
          <div className="svc-head">
            <div data-reveal>
              <span className="label">What We Do</span>
              <h2>Everything your brand needs.</h2>
            </div>
            <div className="svc-arrows">
              <button id="svcPrev" aria-label="Previous" data-cursor>←</button>
              <button id="svcNext" aria-label="Next" data-cursor>→</button>
            </div>
          </div>
        </div>

        <div className="svc-viewport" id="svcViewport">
          <div className="svc-track" id="svcTrack">
            <article className="svc-card" data-cursor>
              <div className="svc-media">
                <span className="svc-num">01</span>
                <Image src="/images/img_4.jpeg" alt="Brand & photoshoots" layout="fill" objectFit="cover" />
              </div>
              <div className="svc-body">
                <h3>Brand &amp; Photoshoots</h3>
                <p className="svc-tag">Build instant trust with a clean, modern healthcare look.</p>
                <div className="svc-detail">
                  <ul>
                    <li>Facility interiors, exteriors &amp; amenities</li>
                    <li>Staff portraits &amp; resident lifestyle</li>
                    <li>HIPAA-conscious shoot workflows</li>
                    <li>Edited library for every channel</li>
                  </ul>
                  <Link href="/photoservices" className="btn" data-cursor>Learn More</Link>
                </div>
                <button className="svc-toggle">More info <span className="chev">▾</span></button>
              </div>
            </article>

            <article className="svc-card" data-cursor>
              <div className="svc-media">
                <span className="svc-num">02</span>
                <Image src="/images/img_5.jpeg" alt="Video production" layout="fill" objectFit="cover" />
              </div>
              <div className="svc-body">
                <h3>Video Production</h3>
                <p className="svc-tag">Short-form &amp; explainer videos that turn views into booked calls.</p>
                <div className="svc-detail">
                  <ul>
                    <li>Commercials &amp; facility tour films</li>
                    <li>Testimonial &amp; brand videos</li>
                    <li>Social-ready cuts, every ratio</li>
                    <li>Vimeo-hosted, ad-free playback</li>
                  </ul>
                  <Link href="/videoservices" className="btn" data-cursor>Learn More</Link>
                </div>
                <button className="svc-toggle">More info <span className="chev">▾</span></button>
              </div>
            </article>

            <article className="svc-card" data-cursor>
              <div className="svc-media">
                <span className="svc-num">03</span>
                <Image src="/images/img_6.jpeg" alt="Design & print" layout="fill" objectFit="cover" />
              </div>
              <div className="svc-body">
                <h3>Design &amp; Print</h3>
                <p className="svc-tag">Patient-ready brochures, banners, menus, and signage.</p>
                <div className="svc-detail">
                  <ul>
                    <li>Brochures, flyers &amp; welcome packets</li>
                    <li>Interior signage &amp; banners</li>
                    <li>Menus &amp; event collateral</li>
                    <li>Business cards &amp; stationery</li>
                  </ul>
                  <Link href="/design-print" className="btn" data-cursor>Learn More</Link>
                </div>
                <button className="svc-toggle">More info <span className="chev">▾</span></button>
              </div>
            </article>

            <article className="svc-card" data-cursor>
              <div className="svc-media">
                <span className="svc-num">04</span>
                <Image src="/images/img_7.jpeg" alt="Web design & management" layout="fill" objectFit="cover" />
              </div>
              <div className="svc-body">
                <h3>Web Design &amp; Management</h3>
                <p className="svc-tag">Fast, conversion-first websites that generate inquiries daily.</p>
                <div className="svc-detail">
                  <ul>
                    <li>Mobile-first, accessible builds</li>
                    <li>SEO + Google Business optimization</li>
                    <li>Most projects launch in ~2 weeks</li>
                    <li>Ongoing management &amp; updates</li>
                  </ul>
                  <Link href="/webdesign" className="btn" data-cursor>Learn More</Link>
                </div>
                <button className="svc-toggle">More info <span className="chev">▾</span></button>
              </div>
            </article>
          </div>
        </div>
        <div className="svc-hint">Drag, scroll, or use the arrows — tap a card for details</div>
      </section>

      <section className="light sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label dark">Trusted by Clients Across the Country</span>
            <h2>Join the leaders working with us.</h2>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-row" id="marqueeRow">
            <div className="m-logo">LINK</div>
            <div className="m-logo">CITADEL</div>
            <div className="m-logo">LOGO 3</div>
            <div className="m-logo">LOGO 4</div>
            <div className="m-logo">LOGO 5</div>
            <div className="m-logo">LOGO 6</div>
            <div className="m-logo">LOGO 7</div>
          </div>
        </div>
      </section>

      <section className="deep sec-pad">
        <div className="glow" style={{width: '600px', height: '600px', background: 'var(--teal-primary)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.3}}></div>
        <div className="container" style={{position: 'relative', zIndex: 2}}>
          <div className="sec-head center" data-reveal>
            <span className="label">Wavecare in Numbers</span>
            <h2>Results that speak for themselves.</h2>
          </div>
          <div className="stats stagger">
            <div className="stat"><div className="num" data-count="95">0</div><div className="cap">Happy Clients</div></div>
            <div className="stat"><div className="num" data-count="700">0</div><div className="cap">Assisted Placements</div></div>
            <div className="stat"><div className="num" data-count="2400" data-comma="1">0</div><div className="cap">Smiles Captured</div></div>
          </div>
        </div>
      </section>

      <section className="ink sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">Why Wavecare</span>
            <h2>Built for the way<br />healthcare actually works.</h2>
            <p className="lead">Sensitivity, compliance, and decision-makers who don&apos;t have time for back-and-forth — we built our workflows around the realities of senior care.</p>
          </div>
          <div className="features stagger">
            <article className="feature" data-cursor>
              <div className="fn">01</div>
              <h3>HIPAA-Conscious by Default</h3>
              <p>Every photoshoot, video, and webpage is planned with privacy and resident dignity at the front. No second-guessing what you can publish.</p>
            </article>
            <article className="feature" data-cursor>
              <div className="fn">02</div>
              <h3>Fast Response, Real Humans</h3>
              <p>Customer service from 8 AM to 8 PM daily. Most projects launch in about two weeks. No drawn-out timelines.</p>
            </article>
            <article className="feature" data-cursor>
              <div className="fn">03</div>
              <h3>Built for Decision-Makers</h3>
              <p>Executive director, marketing manager, or owner — we communicate the way healthcare leaders work. Clear scopes, zero filler.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="deep sec-pad">
        <div className="glow" style={{width: '500px', height: '500px', background: 'var(--teal-accent)', top: '-100px', right: '-80px', opacity: 0.28}}></div>
        <div className="container" style={{position: 'relative', zIndex: 2}}>
          <div className="sec-head" data-reveal>
            <span className="label">What Our Clients Say</span>
            <h2>Don&apos;t just take<br />our word for it.</h2>
            <p className="lead">See how we&apos;ve helped healthcare providers grow — in their own words.</p>
          </div>
          <div className="tcards stagger">
            <article className="tcard" data-cursor>
              <span className="q">&quot;</span>
              <blockquote>From the first call, their team understood our facility, our audience, and the sensitivity required in healthcare. The visuals, website updates, and overall branding helped us look more professional and trustworthy. We started receiving better-quality inquiries within weeks.</blockquote>
              <div className="who"><strong>Director</strong>Senior Care Facility</div>
            </article>
            <article className="tcard" data-cursor>
              <span className="q">&quot;</span>
              <blockquote>What stood out most was their attention to detail and communication. They handled everything from creative direction to execution smoothly. The final results exceeded our expectations, especially the photos and website presentation.</blockquote>
              <div className="who"><strong>Marketing Manager</strong>Healthcare Practice</div>
            </article>
            <article className="tcard" data-cursor>
              <span className="q">&quot;</span>
              <blockquote>Wavecare feels more like a partner than a vendor. They took time to understand our goals and delivered solutions that actually made an impact. Their experience in healthcare marketing really shows.</blockquote>
              <div className="who"><strong>Operations Lead</strong>Medical Services Provider</div>
            </article>
          </div>
        </div>
      </section>

      <section className="final">
        <canvas id="waveCanvas"></canvas>
        <div className="container">
          <span className="label" style={{justifyContent: 'center'}} data-reveal>Get Started</span>
          <h2 data-reveal>Ready to look as good as<br />the <span className="accent">care</span> you provide?</h2>
          <p className="sub" data-reveal>Tell us about your facility and we&apos;ll show you exactly what we&apos;d build, capture, or design to start bringing in more qualified inquiries.</p>
          <div data-reveal><Link href="/contact" className="btn btn-light" data-magnetic data-cursor>Book a Call</Link></div>
        </div>
      </section>
    </>
  );
}
