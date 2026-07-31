'use client';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState, FormEvent } from 'react';

import './contact.css';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      services: Object.keys(selectedChips).filter(k => selectedChips[k]),
      message: formData.get('message')
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        window.posthog?.identify(data.email as string, {
          email: data.email as string,
          name: (data.name as string) || undefined,
          company: (data.company as string) || undefined,
        });
        window.posthog?.capture('contact_form_submitted', {
          services_selected: Object.keys(selectedChips).filter(k => selectedChips[k]),
          has_company: !!data.company,
          has_message: !!data.message,
        });
      } else {
        setErrorMsg(json.error || 'Something went wrong. Please try again.');
        setStatus('error');
        window.posthog?.capture('contact_form_error', {
          services_selected: Object.keys(selectedChips).filter(k => selectedChips[k]),
        });
      }
    } catch (err) {
      setErrorMsg('Could not connect to our servers. Please check your internet connection and try again.');
      setStatus('error');
      window.posthog?.capture('contact_form_error', {
        services_selected: Object.keys(selectedChips).filter(k => selectedChips[k]),
      });
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runScripts = () => {
      // @ts-ignore
      const gsap = window.gsap;
      // @ts-ignore
      const ScrollTrigger = window.ScrollTrigger;

      function initReveals() {
        const els = document.querySelectorAll('.reveal, .stagger');
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

  // Simple state for chips
  const [selectedChips, setSelectedChips] = useState<Record<string, boolean>>({});

  const toggleChip = (name: string) => {
    const next = !selectedChips[name];
    setSelectedChips(prev => ({ ...prev, [name]: next }));
    window.posthog?.capture('service_chip_selected', { service: name, selected: next });
  };

  return (
    <>
      <section className="chero">
        <div className="chero-bg">
          <Image src="/images/img_3.jpeg" alt="Background" fill sizes="100vw" style={{ objectFit:'cover', objectPosition:'center center' }} priority />
        </div>
        <div className="container">
          <div className="chero-grid">
            
            <div className="chero-content reveal" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div className="chero-content-top">
                <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--teal-bright)', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '24px' }}>
                  GET IN TOUCH
                </span>
                <h1>Let's make your<br/><span className="accent">seconds count.</span></h1>
                <p className="chero-sub">Tell us about your facility and we'll show you exactly what we'd build, capture, or design to bring the right families through your doors.</p>
                
                <div className="trust-list stagger">
                  <div className="trust-item">
                    <div className="ic">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <h4>Reply within one business day</h4>
                      <p>Real humans, 8 AM – 8 PM daily. No bots, no runaround.</p>
                    </div>
                  </div>
                  <div className="trust-item">
                    <div className="ic">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <div>
                      <h4>HIPAA-conscious from day one</h4>
                      <p>Privacy and resident dignity built into everything we produce.</p>
                    </div>
                  </div>
                  <div className="trust-item">
                    <div className="ic">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    </div>
                    <div>
                      <h4>Most projects launch in ~2 weeks</h4>
                      <p>From the first call to live, without the drawn-out timeline.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="direct reveal">
                <a href="mailto:info@wavecare.io"><span className="ic">✉</span> info@wavecare.io</a>
                <a href="tel:+17329301934"><span className="ic">☎</span> +1 732 930 1934</a>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.2s', height: '100%' }}>
              <div className={`form-card ${status === 'success' ? 'done' : ''}`} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <form className={`form ${status === 'sending' ? 'sending' : ''}`} onSubmit={handleSubmit}>
                  <h2>Send us a message</h2>
                  <p className="fsub">Prefer to talk? <Link href="#calendar" style={{ color: 'var(--teal-bright)', textDecoration: 'none' }}>Book a demo instead &rarr;</Link></p>

                  <div className="field">
                    <label>Name <span className="req">*</span></label>
                    <input type="text" name="name" placeholder="John Doe" required />
                  </div>

                  <div className="field">
                    <label>Email <span className="req">*</span></label>
                    <input type="email" name="email" placeholder="john@example.com" required />
                  </div>

                  <div className="field">
                    <label>Facility / Company</label>
                    <input type="text" name="company" placeholder="Oakwood Senior Living" />
                  </div>

                  <div>
                    <div className="chips-label">What do you need help with?</div>
                    <div className="chips">
                      {['Brand & Photos', 'Video', 'Design & Print', 'Web Design', 'Not sure yet'].map(chip => (
                        <div 
                          key={chip}
                          className={`chip ${selectedChips[chip] ? 'on' : ''}`}
                          onClick={() => toggleChip(chip)}
                        >
                          {chip}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>Tell us about your facility (Optional)</label>
                    <textarea name="message" placeholder="A sentence or two about what you're working on..."></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="form-error-msg">
                      <span className="form-error-icon">⚠</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button type="submit" className="btn submit-btn" disabled={status === 'sending'}>
                    <span className="spinner"></span>
                    <span className="txt">{status === 'error' ? 'Try Again' : 'Send Message'}</span>
                  </button>
                  <p className="form-note">Your information is secure and will never be shared.</p>
                </form>

                <div className="form-success">
                  <div className="ok-ic">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. We will get back to you within one business day.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="sec-pad ink">
        <div className="container">
          <div className="sec-head center reveal">
            <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--teal-bright)', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '24px', justifyContent: 'center' }}>
              <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3C3 1 5 1 7 3C9 5 11 5 13 3C15 1 17 1 19 3C21 5 23 5 23 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              WHAT HAPPENS NEXT
            </span>
            <h2>From hello to live, here's the path.</h2>
          </div>
          <div className="steps stagger">
            <div className="step">
              <div className="sn">01</div>
              <h3>We listen & audit</h3>
              <p>We learn about your facility, your audience, and review your current online presence, what's working and what's costing you tours.</p>
            </div>
            <div className="step">
              <div className="sn">02</div>
              <h3>We map the plan</h3>
              <p>You get a clear, no-filler plan for exactly what we'd build, capture, or design, with honest timelines and scope.</p>
            </div>
            <div className="step">
              <div className="sn">03</div>
              <h3>We make it count</h3>
              <p>We produce the work and optimize the journey, so the right families come across your community and say "yeah, this feels right."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-pad deep">
        <div className="container">
          <div className="sec-head center reveal" id="calendar">
            <h2>Rather Just Grab a Time?</h2>
            <p className="lead" style={{ margin: '20px auto 0', maxWidth: '600px', textAlign: 'center', color: 'var(--on-dark)' }}>
              Book a demo that fits your schedule.<br/>Pick a slot and we'll come prepared with ideas specific to your facility.
            </p>
          </div>
          <div className="cal-wrap reveal" style={{ minHeight: '600px', width: '100%', position: 'relative' }}>
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/BihxiP7RLvybBcV9yUHJ"
              style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }}
              scrolling="no"
              id="BihxiP7RLvybBcV9yUHJ"
              title="Book a Demo"
            ></iframe>
            <Script src="https://api.leadconnectorhq.com/js/form_embed.js" strategy="lazyOnload" />
          </div>
        </div>
      </section>
    </>
  );
}
