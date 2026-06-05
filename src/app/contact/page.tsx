'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, FormEvent } from 'react';
import './contact.css';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Mock successful submit after 1.5s
    setTimeout(() => {
      setStatus('success');
    }, 1500);
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
    setSelectedChips(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <>
      <section className="chero">
        <div className="chero-bg">
          <div className="placeholder" style={{ width: '100%', height: '100%', background: '#062A24' }}></div>
        </div>
        <div className="container">
          <div className="chero-grid">
            
            <div className="chero-content reveal">
              <svg className="wave-accent" viewBox="0 0 74 24">
                <path d="M2,12 Q12,2 20,12 T38,12 T56,12 T72,12"></path>
              </svg>
              <h1>Let's Make Your<br/><span className="accent">Seconds Count.</span></h1>
              <p className="chero-sub">Tell us about your facility and we'll show you exactly what we'd build, capture, or design. We reply within one business day.</p>
              
              <div className="trust-list stagger">
                <div className="trust-item">
                  <div className="ic">✓</div>
                  <div>
                    <h4>Transparent Pricing</h4>
                    <p>No hidden fees. We scope everything upfront.</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="ic">✓</div>
                  <div>
                    <h4>Fast Turnarounds</h4>
                    <p>Healthcare moves fast. So do our deliverables.</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="ic">✓</div>
                  <div>
                    <h4>HIPAA Conscious</h4>
                    <p>We know how to operate safely in your environment.</p>
                  </div>
                </div>
              </div>

              <div className="direct reveal">
                <a href="mailto:info@wavecare.io"><span className="ic">✉</span> info@wavecare.io</a>
                <a href="tel:+17329301934"><span className="ic">☎</span> +1 732 930 1934</a>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <div className={`form-card ${status === 'success' ? 'done' : ''}`}>
                <form className={`form ${status === 'sending' ? 'sending' : ''}`} onSubmit={handleSubmit}>
                  <h2>Start a Project</h2>
                  <p className="fsub">Fill out the form below to get in touch.</p>

                  <div className="field">
                    <label>Name <span className="req">*</span></label>
                    <input type="text" placeholder="John Doe" required />
                  </div>

                  <div className="field">
                    <label>Email <span className="req">*</span></label>
                    <input type="email" placeholder="john@example.com" required />
                  </div>

                  <div className="field">
                    <label>Facility / Company</label>
                    <input type="text" placeholder="Oakwood Senior Living" />
                  </div>

                  <div>
                    <div className="chips-label">Services Interested In</div>
                    <div className="chips">
                      {['Web Design', 'Photography', 'Video', 'Print & Branding'].map(chip => (
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
                    <label>Project Details</label>
                    <textarea placeholder="Tell us a little bit about what you're looking for..."></textarea>
                  </div>

                  <button type="submit" className="btn submit-btn" disabled={status === 'sending'}>
                    <span className="spinner"></span>
                    <span className="txt">Send Message</span>
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
            <span className="label">Process</span>
            <h2>What happens next?</h2>
          </div>
          <div className="steps stagger">
            <div className="step">
              <div className="sn">01</div>
              <h3>Discovery Call</h3>
              <p>A quick 15-minute chat to understand your goals, timeline, and whether we're the right fit for your facility.</p>
            </div>
            <div className="step">
              <div className="sn">02</div>
              <h3>Custom Proposal</h3>
              <p>We'll send over a detailed scope of work with transparent pricing and a clear timeline for deliverables.</p>
            </div>
            <div className="step">
              <div className="sn">03</div>
              <h3>Kickoff</h3>
              <p>Once approved, we get straight to work. Web builds start immediately, and shoots are scheduled at your convenience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-pad deep">
        <div className="container">
          <div className="sec-head center reveal">
            <h2>Rather book a meeting?</h2>
            <p className="lead" style={{ margin: '20px auto 0', maxWidth: '600px', textAlign: 'center' }}>
              Skip the form and grab a time directly on our calendar. We'll send a brief questionnaire before we talk.
            </p>
          </div>
          <div className="cal-wrap reveal">
            <div className="cal-fallback">
              <p>Calendar integration would load here.</p>
              <a href="mailto:info@wavecare.io" className="btn">Email Us Instead</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
