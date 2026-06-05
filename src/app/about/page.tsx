import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <header className="hero">
        <div className="hero-bg">
          <Image src="/images/img_102.jpeg" alt="Caregiver with resident at a senior care facility" layout="fill" objectFit="cover" />
        </div>
        <div className="container hero-inner">
          <svg className="wave-accent" viewBox="0 0 78 26">
            <path d="M2 13 Q 12 2, 21 13 T 40 13 T 59 13 T 76 11" />
          </svg>
          <span className="label" data-hero>About Wavecare</span>
          <h1>
            <span className="line" data-hero><span>Your facility gets</span></span>
            <span className="line" data-hero><span>judged in seconds.</span></span>
            <span className="line" data-hero><span className="accent">We make them count.</span></span>
          </h1>
          <p className="hero-sub" data-hero>
            For over a decade we&apos;ve helped hundreds of nursing homes and healthcare operators get
            seen the way they deserve to be seen. This is why we built Wavecare.
          </p>
          <div className="hero-actions" data-hero>
            <Link href="/contact" className="btn" data-magnetic data-cursor>Book a Call</Link>
            <Link href="#story" className="btn btn-ghost" data-magnetic data-cursor>Our Story</Link>
          </div>
        </div>
        <div className="scroll-cue"><div className="m"></div><span>Scroll</span></div>
      </header>

      <section className="ink sec-pad" id="story">
        <div className="glow" style={{width: '520px', height: '520px', background: 'var(--teal-primary)', top: '-120px', left: '-140px'}}></div>
        <div className="container">
          <div className="story">
            <div data-reveal>
              <span className="label">Why We Exist</span>
              <h2>Ten years. Hundreds of facilities. One problem.</h2>
              <p>Over the past ten years, we&apos;ve worked with hundreds of nursing homes and healthcare operators across the country. And honestly, most of them had the same problem — they weren&apos;t being seen the way they deserved to be seen.</p>
              <p>From a broken website to a video from the 90s, we&apos;ve seen it all. Nothing says <em>&quot;we&apos;ll take great care of your loved one&quot;</em> like an online experience that feels clear, trustworthy, and easy from start to finish.</p>
              <p>So we built Wavecare — to showcase quality of care in the light it deserves.</p>
              <Link href="/services" className="btn" data-magnetic data-cursor style={{marginTop: '14px'}}>What We Do</Link>
            </div>
            <div className="story-img" data-reveal data-cursor>
              <Image src="/images/img_103.jpeg" alt="Caregiver supporting a resident" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="insight deep sec-pad">
        <div className="glow" style={{width: '560px', height: '560px', background: 'var(--teal-accent)', bottom: '-160px', right: '-120px', opacity: 0.3}}></div>
        <div className="container">
          <span className="label" style={{justifyContent: 'center'}}>The Stakes</span>
          <p className="big" id="insightText">Families are making one of the biggest decisions of their lives — and your facility gets judged in seconds. We make those seconds count.</p>
          <p className="foot" data-reveal>When families come across your community, it&apos;s about trust. It&apos;s about confidence. It&apos;s about that moment where they say: yeah, this feels right.</p>
        </div>
      </section>

      <section className="ink sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">What We Optimize For</span>
            <h2>Trust. Confidence.<br />That &quot;this feels right&quot; moment.</h2>
          </div>
          <div className="values stagger">
            <article className="value" data-cursor>
              <div className="vmark">01</div><h3>Trust</h3>
              <p>Every visual, page, and frame is built to make a family feel safe handing you one of the biggest decisions of their lives.</p>
            </article>
            <article className="value" data-cursor>
              <div className="vmark">02</div><h3>Confidence</h3>
              <p>We showcase your quality of care in the light it deserves — branding, video, and high-converting websites that hold up to scrutiny.</p>
            </article>
            <article className="value" data-cursor>
              <div className="vmark">03</div><h3>The Right Fit</h3>
              <p>We optimize the entire journey to get more suitable residents through your doors — not just clicks, but the right families saying yes.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="deep sec-pad">
        <div className="glow" style={{width: '600px', height: '600px', background: 'var(--teal-primary)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.3}}></div>
        <div className="container" style={{position: 'relative', zIndex: 2}}>
          <div className="sec-head center" data-reveal>
            <span className="label">A Decade of Results</span><h2>The numbers behind the work.</h2>
          </div>
          <div className="stats stagger">
            <div className="stat"><div className="num" data-count="10">0</div><div className="cap">Years Experience</div></div>
            <div className="stat"><div className="num" data-count="500" data-suffix="+">0</div><div className="cap">Facilities Served</div></div>
            <div className="stat"><div className="num" data-count="700">0</div><div className="cap">Assisted Placements</div></div>
            <div className="stat"><div className="num" data-count="2400" data-comma="1">0</div><div className="cap">Smiles Captured</div></div>
          </div>
        </div>
      </section>

      <section className="ink sec-pad" id="services">
        <div className="container">
          <div className="svc-head" data-reveal>
            <span className="label">What We Do</span>
            <h2>Everything your brand needs.</h2>
          </div>
          <div className="accordion" id="accordion">
            <article className="acc-panel active" data-cursor>
              <Image src="/images/img_104.jpeg" alt="Brand & photoshoots" layout="fill" objectFit="cover" /><span className="acc-num">01</span>
              <div className="acc-content">
                <div className="acc-title">Brand &amp; Photoshoots</div>
                <p className="acc-tag">Build instant trust with a clean, modern healthcare look.</p>
                <div className="acc-detail"><span>Facility &amp; lifestyle</span><span>Staff portraits</span><span>HIPAA-conscious</span></div>
                <div className="acc-cta"><Link href="/photoservices" className="btn" data-cursor>Learn More</Link></div>
              </div>
            </article>
            <article className="acc-panel" data-cursor>
              <Image src="/images/img_105.jpeg" alt="Video production" layout="fill" objectFit="cover" /><span className="acc-num">02</span>
              <div className="acc-content">
                <div className="acc-title">Video Production</div>
                <p className="acc-tag">Short-form &amp; explainer videos that turn views into booked calls.</p>
                <div className="acc-detail"><span>Commercials</span><span>Facility tours</span><span>Social cuts</span></div>
                <div className="acc-cta"><Link href="/videoservices" className="btn" data-cursor>Learn More</Link></div>
              </div>
            </article>
            <article className="acc-panel" data-cursor>
              <Image src="/images/img_106.jpeg" alt="Design & print" layout="fill" objectFit="cover" /><span className="acc-num">03</span>
              <div className="acc-content">
                <div className="acc-title">Design &amp; Print</div>
                <p className="acc-tag">Patient-ready brochures, banners, menus, and signage.</p>
                <div className="acc-detail"><span>Brochures</span><span>Signage</span><span>Stationery</span></div>
                <div className="acc-cta"><Link href="/design-print" className="btn" data-cursor>Learn More</Link></div>
              </div>
            </article>
            <article className="acc-panel" data-cursor>
              <Image src="/images/img_107.jpeg" alt="Web design & management" layout="fill" objectFit="cover" /><span className="acc-num">04</span>
              <div className="acc-content">
                <div className="acc-title">Web Design &amp; Management</div>
                <p className="acc-tag">Fast, conversion-first websites that generate inquiries daily.</p>
                <div className="acc-detail"><span>Mobile-first</span><span>SEO + GBP</span><span>~2-week launch</span></div>
                <div className="acc-cta"><Link href="/webdesign" className="btn" data-cursor>Learn More</Link></div>
              </div>
            </article>
          </div>
          <div className="acc-hint">Hover or tap a panel to explore</div>
        </div>
      </section>

      <section className="deep sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">See For Yourself</span>
            <h2>Our story, in our own words.</h2>
          </div>
          <div className="reel-wrap" data-reveal data-cursor>
            <div className="reel-frame">
              <iframe src="https://player.vimeo.com/video/1187767005?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" title="Wavecare Commercial"></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="ink sec-pad">
        <div className="glow" style={{width: '500px', height: '500px', background: 'var(--teal-accent)', top: '-100px', right: '-80px', opacity: 0.22}}></div>
        <div className="container" style={{position: 'relative', zIndex: 2}}>
          <div className="sec-head" data-reveal>
            <span className="label">What Our Clients Say</span>
            <h2>Don&apos;t just take<br />our word for it.</h2>
            <p className="lead">See how we&apos;ve helped healthcare providers grow — in their own words.</p>
          </div>
          <div className="tcards stagger">
            <article className="tcard" data-cursor><span className="q">&quot;</span><blockquote>From the first call, their team understood our facility, our audience, and the sensitivity required in healthcare. The visuals, website updates, and overall branding helped us look more professional and trustworthy. We started receiving better-quality inquiries within weeks.</blockquote><div className="who"><strong>Director</strong>Senior Care Facility</div></article>
            <article className="tcard" data-cursor><span className="q">&quot;</span><blockquote>What stood out most was their attention to detail and communication. They handled everything from creative direction to execution smoothly. The final results exceeded our expectations, especially the photos and website presentation.</blockquote><div className="who"><strong>Marketing Manager</strong>Healthcare Practice</div></article>
            <article className="tcard" data-cursor><span className="q">&quot;</span><blockquote>Wavecare feels more like a partner than a vendor. They took time to understand our goals and delivered solutions that actually made an impact. Their experience in healthcare marketing really shows.</blockquote><div className="who"><strong>Operations Lead</strong>Medical Services Provider</div></article>
          </div>
        </div>
      </section>

      <section className="final">
        <canvas id="waveCanvas"></canvas>
        <div className="container">
          <span className="label" style={{justifyContent: 'center'}} data-reveal>Get Started</span>
          <h2 data-reveal>Let&apos;s make your<br />seconds <span className="accent">count.</span></h2>
          <p className="sub" data-reveal>Tell us about your facility and we&apos;ll show you exactly what we&apos;d build, capture, or design to start bringing the right families through your doors.</p>
          <div data-reveal><Link href="/contact" className="btn btn-light" data-magnetic data-cursor>Book a Call</Link></div>
        </div>
      </section>
    </>
  );
}
