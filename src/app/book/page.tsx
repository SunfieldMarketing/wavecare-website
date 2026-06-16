'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import '../contact/contact.css';

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedChips, setSelectedChips] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    els.forEach(e => io.observe(e));
    setTimeout(() => {
      els.forEach(e => { const r = e.getBoundingClientRect(); if (r.top < innerHeight) e.classList.add('in'); });
    }, 100);
    return () => io.disconnect();
  }, [step]);

  const toggleChip = (name: string) => {
    setSelectedChips(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData(e.currentTarget);
    
    const services = Object.entries(selectedChips)
      .filter(([_, isSelected]) => isSelected)
      .map(([name]) => name);

    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      company: fd.get('company'),
      message: fd.get('message'),
      services
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      } else {
        // Success! Move to Step 2
        setStep(2);
        setStatus('idle');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <>
      <section className="sec-pad deep" style={{ minHeight: '100svh', paddingTop: '160px', paddingBottom: '80px', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ width: '100%' }}>
          <div className="sec-head center reveal" style={{ marginBottom: step === 1 ? '40px' : '60px' }}>
            <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--teal-bright)', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '24px' }}>
              {step === 1 ? 'STEP 1: YOUR DETAILS' : 'STEP 2: BOOK A TIME'}
            </span>
            <h1 style={{ fontSize: 'clamp(42px, 6vw, 64px)', color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
              {step === 1 ? (
                <>Let's make your <span className="accent">seconds count.</span></>
              ) : (
                <>Great! Now <span className="accent">pick a time.</span></>
              )}
            </h1>
            <p className="lead" style={{ margin: '0 auto', maxWidth: '640px', textAlign: 'center', color: 'var(--on-dark)', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.6 }}>
              {step === 1 
                ? "Fill out the quick form below so we can come prepared with actionable marketing ideas specific to your facility."
                : "Select a time on the calendar below that works best for you and your team."
              }
            </p>
          </div>
          
          {step === 1 && (
            <div className="reveal" style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div className="form-card">
                <form className={`form ${status === 'sending' ? 'sending' : ''}`} onSubmit={handleSubmit}>
                  
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
                    <div className="chips-label" style={{ marginTop: '20px', marginBottom: '12px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--label)' }}>What do you need help with?</div>
                    <div className="chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {['Brand & Photos', 'Video', 'Design & Print', 'Web Design', 'Not sure yet'].map(chip => (
                        <div 
                          key={chip}
                          className={`chip ${selectedChips[chip] ? 'on' : ''}`}
                          onClick={() => toggleChip(chip)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '100px',
                            border: '1px solid var(--border)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: '0.2s',
                            background: selectedChips[chip] ? 'var(--teal-bright)' : 'transparent',
                            color: selectedChips[chip] ? '#fff' : 'inherit',
                            borderColor: selectedChips[chip] ? 'var(--teal-bright)' : 'var(--border)'
                          }}
                        >
                          {chip}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>Tell us about your facility (Optional)</label>
                    <textarea name="message" placeholder="A sentence or two about what you're working on..." style={{ minHeight: '100px' }}></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="form-error-msg" style={{ background: '#FEE2E2', color: '#B91C1C', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', display: 'flex', gap: '8px' }}>
                      <span className="form-error-icon">⚠</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button type="submit" className="btn submit-btn" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                    <span className="spinner" style={{ display: status === 'sending' ? 'inline-block' : 'none' }}></span>
                    <span className="txt">{status === 'error' ? 'Try Again' : 'Next Step: Book a Time'}</span>
                  </button>
                  <p className="form-note" style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--muted)' }}>Your information is secure and will never be shared.</p>
                </form>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="cal-wrap reveal" style={{ minHeight: '600px', width: '100%', position: 'relative', background: '#fff', borderRadius: '24px', padding: '12px', boxShadow: '0 24px 60px rgba(0,0,0,0.2)', animation: 'fadeInUp 0.6s ease-out' }}>
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/BihxiP7RLvybBcV9yUHJ"
                style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px', borderRadius: '16px' }}
                scrolling="no"
                id="BihxiP7RLvybBcV9yUHJ"
                title="Book a Strategy Session"
              ></iframe>
              <Script src="https://api.leadconnectorhq.com/js/form_embed.js" strategy="lazyOnload" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
