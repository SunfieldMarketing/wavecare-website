import React from 'react';
import Script from 'next/script';

export const metadata = {
  title: 'Book a Strategy Session | Wavecare',
  description: 'Schedule your free strategy session with Wavecare.',
};

export default function BookPage() {
  return (
    <>
      <section className="sec-pad deep" style={{ minHeight: '100svh', paddingTop: '160px', paddingBottom: '80px', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ width: '100%' }}>
          <div className="sec-head center reveal" style={{ marginBottom: '60px' }}>
            <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--teal-bright)', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '24px' }}>
              FREE STRATEGY SESSION
            </span>
            <h1 style={{ fontSize: 'clamp(42px, 6vw, 64px)', color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
              Let's make your <span className="accent">seconds count.</span>
            </h1>
            <p className="lead" style={{ margin: '0 auto', maxWidth: '640px', textAlign: 'center', color: 'var(--on-dark)', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.6 }}>
              Pick a time on the calendar below. We'll come prepared with actionable marketing ideas specific to your facility to help you increase occupancy.
            </p>
          </div>
          
          <div className="cal-wrap reveal" style={{ minHeight: '600px', width: '100%', position: 'relative', background: '#fff', borderRadius: '24px', padding: '12px', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/BihxiP7RLvybBcV9yUHJ"
              style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px', borderRadius: '16px' }}
              scrolling="no"
              id="BihxiP7RLvybBcV9yUHJ"
              title="Book a Strategy Session"
            ></iframe>
            <Script src="https://api.leadconnectorhq.com/js/form_embed.js" strategy="lazyOnload" />
          </div>
        </div>
      </section>
    </>
  );
}
