import './services.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Services() {
  return (
    <>
      <section className="hero">
        <div className="hero-video-wrap">
          <iframe
            src="https://player.vimeo.com/video/1187767005?background=1&autoplay=1&loop=1&muted=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Wavecare Commercial">
          </iframe>
        </div>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-inner">
            <span className="label reveal">Services</span>
            <h1 className="reveal delay-1">
              Healthcare Marketing<br />
              That Earns <span className="accent">Trust</span><br />
              <span className="italic-light">Before the First Tour</span>
            </h1>
            <p className="hero-sub reveal delay-2">
              From branding and photography to video and conversion-first web design,
              we help senior care facilities and healthcare practices look as professional
              online as they are in person.
            </p>
            <div className="hero-actions reveal delay-3">
              <Link href="/contact" className="btn">Book a Call</Link>
              <Link href="#services" className="btn btn-outline" style={{background: 'transparent'}}>See Our Services</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="dark" id="services">
        <div className="container">
          <div className="services-head reveal">
            <span className="label on-dark">Services</span>
            <h2>Everything your healthcare brand<br />needs — under one roof.</h2>
            <p className="lead">
              We work with senior living communities, memory care, assisted living, and
              healthcare practices to handle every piece of your marketing. Photography,
              video, print, and web — built with HIPAA-conscious workflows and the kind of
              turnaround healthcare decision-makers actually need.
            </p>
          </div>

          <div className="services-grid">
            <article className="service-card reveal delay-1">
              <span className="card-img" aria-hidden="true"></span>
              <span className="num">01</span>
              <h3>Brand &amp; Photoshoots</h3>
              <p>Professional photography that builds instant trust. Facility shots, staff portraits, resident moments, and brand imagery — captured with sensitivity and ready for every channel.</p>
            </article>

            <article className="service-card reveal delay-2">
              <span className="card-img" aria-hidden="true"></span>
              <span className="num">02</span>
              <h3>Video Production</h3>
              <p>Short-form, explainer, and facility tour videos that turn page views into booked tours and qualified inquiries. Built to perform on every channel.</p>
            </article>

            <article className="service-card reveal delay-3">
              <span className="card-img" aria-hidden="true"></span>
              <span className="num">03</span>
              <h3>Design &amp; Print</h3>
              <p>Patient-ready materials your team uses every day: brochures, signage, menus, banners, business cards — designed to match your brand and built to last.</p>
            </article>

            <article className="service-card reveal delay-4">
              <span className="card-img" aria-hidden="true"></span>
              <span className="num">04</span>
              <h3>Web Design &amp; Management</h3>
              <p>Fast, conversion-first websites built for healthcare. SEO-ready, mobile-first, and connected to Google Business so families find you when they search.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="deeper">
        <div className="container">
          <div className="split on-dark reveal">
            <div className="split-text">
              <span className="label on-dark">Websites</span>
              <h2>Conversion-first websites built for healthcare.</h2>
              <p className="split-body">
                Most healthcare websites are stuck in 2015. We build fast, mobile-first
                sites that load quickly, rank locally, and turn visitors into inquiries —
                optimized for the Google 3-Pack and integrated with Google Business so
                families find you the moment they start looking.
              </p>
              <ul className="feature-list">
                <li>Mobile-first, accessibility-conscious build</li>
                <li>SEO foundations + Google Business optimization</li>
                <li>Most projects launch in about two weeks</li>
                <li>Ongoing management — we work with existing sites too</li>
              </ul>
              <Link href="/webdesign" className="btn">Learn More</Link>
            </div>
            <div className="split-image">
              <Image src="/images/img_130.jpeg" alt="Park Gardens Rehabilitation & Nursing Center website designed by Wavecare" className="pos-top" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="container">
          <div className="split on-dark flipped reveal">
            <div className="split-image">
              <span className="placeholder">[REPLACE — Video still or short Vimeo loop]</span>
            </div>
            <div className="split-text">
              <span className="label on-dark">Video</span>
              <h2>Video that turns views into booked tours.</h2>
              <p className="split-body">
                Facility tours, commercials, testimonial films, and short-form social cuts —
                cinematic healthcare video that captures what makes your community feel
                different. Whether it&apos;s a 30-second ad, a 2-minute walkthrough, or a full
                brand film, every cut is built to perform across YouTube, Instagram, and
                your website.
              </p>
              <ul className="feature-list">
                <li>Commercials, explainers, and facility tour films</li>
                <li>Testimonial videos with families and staff</li>
                <li>Social-ready cuts in every aspect ratio</li>
                <li>Vimeo-hosted for fast, ad-free playback</li>
              </ul>
              <Link href="/videoservices" className="btn">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="deeper">
        <div className="container">
          <div className="split on-dark reveal">
            <div className="split-text">
              <span className="label on-dark">Photography</span>
              <h2>Photography that builds instant trust.</h2>
              <p className="split-body">
                Families decide in seconds. Professional photography of your facility,
                staff, residents, and daily moments tells them everything they need to know
                long before they ever fill out a form. Every shoot is planned with
                HIPAA-conscious workflows and produces a full library you can reuse across
                website, social, print, and ads.
              </p>
              <ul className="feature-list">
                <li>Facility interiors, exteriors, and amenities</li>
                <li>Staff portraits and resident lifestyle moments</li>
                <li>HIPAA-conscious release and shoot workflows</li>
                <li>Edited library delivered ready for every channel</li>
              </ul>
              <Link href="/photoservices" className="btn">Learn More</Link>
            </div>
            <div className="split-image">
              <Image src="/images/img_131.jpeg" alt="Wavecare healthcare photoshoot" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="container">
          <div className="split on-dark flipped reveal">
            <div className="split-image">
              <Image src="/images/img_132.jpeg" alt="Wavecare client website displayed on desktop monitor" layout="fill" objectFit="cover" />
            </div>
            <div className="split-text">
              <span className="label on-dark">Print</span>
              <h2>Patient-ready print<br />that matches the rest of your brand.</h2>
              <p className="split-body">
                Brochures, signage, menus, banners, business cards, welcome packets — every
                printed piece your team hands out is a chance to reinforce trust. We design
                and produce print collateral that matches your digital brand exactly, so
                nothing feels disconnected from website to lobby.
              </p>
              <ul className="feature-list">
                <li>Brochures, flyers, and welcome packets</li>
                <li>Interior signage, banners, and wayfinding</li>
                <li>Menus, event collateral, and seasonal pieces</li>
                <li>Business cards and stationery systems</li>
              </ul>
              <Link href="/design-print" className="btn">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="deeper">
        <div className="container">
          <div className="healthcare-head reveal">
            <span className="label on-dark">The Healthcare Advantage</span>
            <h2>Built for the way<br />healthcare actually works.</h2>
            <p className="lead">
              Marketing for healthcare isn&apos;t the same as marketing for everyone else.
              We&apos;ve built our workflows around the realities of senior care and medical
              practices — sensitivity, compliance, and decision-makers who don&apos;t have
              time for back-and-forth.
            </p>
          </div>

          <div className="feature-row">
            <article className="feature-card reveal delay-1">
              <h3>HIPAA-Conscious by Default</h3>
              <p>Every photoshoot, video, and webpage is planned with privacy and resident dignity at the front. No second-guessing what you can and can&apos;t publish.</p>
            </article>
            <article className="feature-card reveal delay-2">
              <h3>Fast Response, Real Humans</h3>
              <p>Customer service from 8 AM to 8 PM daily. Most projects launch in about two weeks. No drawn-out timelines or guess-work.</p>
            </article>
            <article className="feature-card reveal delay-3">
              <h3>Built for Decision-Makers</h3>
              <p>Whether you&apos;re an executive director, marketing manager, or owner — we communicate the way healthcare leaders actually work. Clear scopes, zero filler.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="light">
        <div className="container">
          <div className="trusted-head reveal">
            <span className="label on-light">Trusted Across the Country</span>
            <h2>Healthcare brands are growing with Wavecare.</h2>
            <p className="lead on-light">
              We&apos;ve helped senior living communities, memory care facilities, and
              healthcare practices across the country professionalize their marketing —
              and it shows in the numbers.
            </p>
          </div>

          <div className="stats-row reveal">
            <div className="stat">
              <div className="stat-num">95</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat">
              <div className="stat-num">700</div>
              <div className="stat-label">Assisted Placements</div>
            </div>
            <div className="stat">
              <div className="stat-num">2,400</div>
              <div className="stat-label">Smiles Captured</div>
            </div>
          </div>

          <div className="logos-row reveal">
            <div className="logo-placeholder">LOGO 1</div>
            <div className="logo-placeholder">LOGO 2</div>
            <div className="logo-placeholder">LOGO 3</div>
            <div className="logo-placeholder">LOGO 4</div>
            <div className="logo-placeholder">LOGO 5</div>
            <div className="logo-placeholder">LOGO 6</div>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-bg"></div>
        <div className="container">
          <div className="testimonial-head reveal">
            <span className="label on-dark">Client Voices</span>
            <h2>Don&apos;t just take our word for it.</h2>
            <p className="lead">
              Here&apos;s what facility directors, marketing managers, and operations leads
              have to say about working with Wavecare.
            </p>
          </div>

          <div className="testimonial-grid">
            <article className="testimonial-card reveal delay-1">
              <span className="quote-mark" aria-hidden="true">&quot;</span>
              <blockquote>
                From the first call, their team understood our facility, our audience,
                and the sensitivity required in healthcare. The visuals, website updates,
                and overall branding helped us look more professional and trustworthy.
                We started receiving better-quality inquiries within weeks.
              </blockquote>
              <div className="testimonial-attribution">
                <strong>Director</strong>
                Senior Care Facility
              </div>
            </article>

            <article className="testimonial-card reveal delay-2">
              <span className="quote-mark" aria-hidden="true">&quot;</span>
              <blockquote>
                What stood out most was their attention to detail and communication.
                They handled everything from creative direction to execution smoothly.
                The final results exceeded our expectations, especially the photos and
                website presentation.
              </blockquote>
              <div className="testimonial-attribution">
                <strong>Marketing Manager</strong>
                Healthcare Practice
              </div>
            </article>

            <article className="testimonial-card reveal delay-3">
              <span className="quote-mark" aria-hidden="true">&quot;</span>
              <blockquote>
                Wavecare feels more like a partner than a vendor. They took time to
                understand our goals and delivered solutions that actually made an impact.
                Their experience in healthcare marketing really shows.
              </blockquote>
              <div className="testimonial-attribution">
                <strong>Operations Lead</strong>
                Medical Services Provider
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-bg"></div>
        <div className="container">
          <span className="label on-dark reveal">Get Started</span>
          <h2 className="reveal delay-1">
            Ready to make your facility look<br />
            as good as the <span className="accent">care</span> you provide?
          </h2>
          <p className="final-cta-sub reveal delay-2">
            Tell us about your facility and we&apos;ll show you exactly what we&apos;d build,
            capture, or design to start bringing in more qualified inquiries.
          </p>
          <div className="reveal delay-3">
            <Link href="/contact" className="btn">Book a Call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
