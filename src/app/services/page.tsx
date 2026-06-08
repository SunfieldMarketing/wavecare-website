'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import './services.css';

export default function Services() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runScripts = () => {
      // @ts-ignore
      const gsap = window.gsap;
      // @ts-ignore
      const ScrollTrigger = window.ScrollTrigger;

      function initReveals() {
        const els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
        const io = new IntersectionObserver(es => {
          es.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        els.forEach(e => io.observe(e));
        setTimeout(() => {
          els.forEach(e => { const r = e.getBoundingClientRect(); if (r.top < innerHeight) e.classList.add('in'); });
        }, 400);
      }

      // Check and execute
      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(checkScripts);
          initReveals();
          // @ts-ignore
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        } else if (retryCount > 100) {
          clearInterval(checkScripts); // Give up after ~5 seconds
          initReveals();
        }
      }, 50);
    };

    runScripts();
  }, []);

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
              <Link href="#services" className="btn btn-outline" style={{ background: 'transparent' }}>See Our Services</Link>
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
              <img src="/images/service_website.png" alt="Website Design" style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="container">
          <div className="split flipped on-dark reveal">
            <div className="split-text">
              <span className="label on-dark">Photo &amp; Video</span>
              <h2>Visuals that earn trust before the first tour.</h2>
              <p className="split-body">
                Stock photos don't book tours. Families want to see the real care,
                the real staff, and the real environment. We handle both photography
                and video production with a single, efficient footprint to minimize
                disruption to your community.
              </p>
              <ul className="feature-list">
                <li>Facility interiors, exteriors &amp; amenities</li>
                <li>Staff portraits &amp; resident lifestyle</li>
                <li>HIPAA-conscious shoot workflows</li>
                <li>Commercials &amp; facility tour films</li>
              </ul>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/photoservices" className="btn">Photo Services</Link>
                <Link href="/videoservices" className="btn btn-outline">Video Services</Link>
              </div>
            </div>
            <div className="split-image" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '16px' }}>
              <iframe 
                src="https://jumpshare.com/embed/MUXprcQJvoGtTZeWQLnA" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen 
                style={{ borderRadius: '16px', border: 'none' }}
                title="Photo & Video"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="light">
        <div className="container">
          <div className="split on-light reveal">
            <div className="split-text">
              <span className="label on-light">Print &amp; Collateral</span>
              <h2>Tangible touchpoints for a digital world.</h2>
              <p className="split-body">
                When a family leaves a tour, what do they take with them?
                We design premium, patient-ready materials that feel as good
                as they look — ensuring your brand stands out when the decision
                is made at the kitchen table.
              </p>
              <ul className="feature-list">
                <li>Brochures, flyers &amp; welcome packets</li>
                <li>Interior signage &amp; banners</li>
                <li>Menus &amp; event collateral</li>
                <li>Business cards &amp; stationery</li>
              </ul>
              <Link href="/design-print" className="btn">View Print Work</Link>
            </div>
            <div className="split-image">
              <img src="/images/service_print.png" alt="Print Mockup" style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="deeper">
        <div className="container">
          <div className="healthcare-head reveal">
            <span className="label on-dark">The Difference</span>
            <h2>Why senior care teams choose Wavecare.</h2>
          </div>
          <div className="feature-row">
            <div className="feature-card reveal delay-1">
              <h3>We Speak Your Language</h3>
              <p>We know the difference between AL and IL. We know what HIPAA compliance looks like on a shoot. You don't have to train us on your industry.</p>
            </div>
            <div className="feature-card reveal delay-2">
              <h3>Fast, Transparent Timelines</h3>
              <p>Healthcare moves fast, and so do we. Most websites launch in two weeks. Photos and videos are delivered quickly, without the agency runaround.</p>
            </div>
            <div className="feature-card reveal delay-3">
              <h3>Everything Under One Roof</h3>
              <p>Stop managing five different freelancers. We handle the web, the photo, the video, and the print — ensuring your brand is consistent everywhere.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="light">
        <div className="container">
          <div className="trusted-head reveal">
            <span className="label on-light">Trusted by the Best</span>
            <h2>Join the leaders working with us.</h2>
          </div>
          <div className="stats-row reveal">
            <div className="stat">
              <div className="stat-num">50+</div>
              <div className="stat-label">Facilities Served</div>
            </div>
            <div className="stat">
              <div className="stat-num">1M+</div>
              <div className="stat-label">Video Views</div>
            </div>
            <div className="stat">
              <div className="stat-num">100%</div>
              <div className="stat-label">HIPAA Compliant</div>
            </div>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-row" id="marqueeRow">
            <div className="m-logo"><img src="/images/logos/logo2.png" alt="The Enclave at Rye" className="scale-up" /></div>
            <div className="m-logo"><img src="/images/logos/logo3.png" alt="Heart Shield" /></div>
            <div className="m-logo"><img src="/images/logos/logo4.png" alt="Silverstream" /></div>
            <div className="m-logo"><img src="/images/logos/logo5.png" alt="Nyack Ridge" /></div>
            <div className="m-logo"><img src="/images/logos/logo6.png" alt="Galloway" /></div>
            <div className="m-logo"><img src="/images/logos/logo7.png" alt="South Shore" /></div>
            <div className="m-logo"><img src="/images/logos/logo8.png" alt="Link Homecare" className="invert" /></div>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-bg"></div>
        <div className="container">
          <div className="testimonial-head reveal">
            <span className="label on-dark">Testimonials</span>
            <h2>What our healthcare clients say.</h2>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card reveal delay-1">
              <span className="quote-mark">"</span>
              <blockquote>They completely transformed our digital presence. The new website books tours while we sleep, and the video captures exactly who we are.</blockquote>
              <div className="testimonial-attribution">
                <strong>Sarah Jenkins</strong>
                Marketing Director, Oakwood Senior Living
              </div>
            </div>
            <div className="testimonial-card reveal delay-2">
              <span className="quote-mark">"</span>
              <blockquote>Fast, professional, and they actually understand healthcare. The photo shoot was completely seamless and didn't disrupt our residents at all.</blockquote>
              <div className="testimonial-attribution">
                <strong>David Chen</strong>
                Executive Director, The Pinnacle
              </div>
            </div>
            <div className="testimonial-card reveal delay-3">
              <span className="quote-mark">"</span>
              <blockquote>We tried three other agencies before finding Wavecare. They are the only ones who delivered on time and exceeded our expectations on quality.</blockquote>
              <div className="testimonial-attribution">
                <strong>Elena Rostova</strong>
                VP of Operations, Harmony Care
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-bg"></div>
        <div className="container">
          <span className="label on-dark reveal">Ready to Start?</span>
          <h2 className="reveal delay-1">Let's build a brand that books tours.</h2>
          <p className="final-cta-sub reveal delay-2">
            Schedule a free discovery call to see how we can transform your facility's marketing.
          </p>
          <div className="reveal delay-3">
            <Link href="/contact" className="btn">Book a Call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
