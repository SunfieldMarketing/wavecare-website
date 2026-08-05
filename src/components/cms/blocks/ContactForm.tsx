'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

/**
 * Lead capture form.
 *
 * The submit path is intentionally NOT configurable: it posts to /api/contact,
 * which upserts the contact into GoHighLevel and attaches the selected services
 * as a note. Only wording comes from the CMS, so an editor cannot break lead
 * capture by changing content.
 *
 * Logic below is carried over unchanged from the hand-written page, including
 * the PostHog identify/capture calls and the exact error copy.
 */
type FormCopy = {
  heading?: string;
  subheading?: string;
  subheadingLinkLabel?: string;
  subheadingLinkHref?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  chipsLabel?: string;
  chips?: Array<{ text: string }>;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  retryLabel?: string;
  note?: string;
  successTitle?: string;
  successBody?: string;
};

export default function ContactForm({ copy }: { copy?: FormCopy }) {
  const c = copy ?? {};
  const chips = (c.chips ?? []).map((x) => x.text).filter(Boolean);

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedChips, setSelectedChips] = useState<Record<string, boolean>>({});

  const toggleChip = (chip: string) =>
    setSelectedChips((prev) => ({ ...prev, [chip]: !prev[chip] }));

  const selected = () => Object.keys(selectedChips).filter((k) => selectedChips[k]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      services: selected(),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        (window as any).posthog?.identify(data.email as string, {
          email: data.email as string,
          name: (data.name as string) || undefined,
          company: (data.company as string) || undefined,
        });
        (window as any).posthog?.capture('contact_form_submitted', {
          services_selected: selected(),
          has_company: !!data.company,
          has_message: !!data.message,
        });

        // Google Ads conversion + GA4 key event — fires here and only here,
        // i.e. only once GHL has confirmed the lead was actually created.
        // Never on page load, never on the button click itself.
        const gadsConversionId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
        const gadsConversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
        if (typeof (window as any).gtag === 'function' && gadsConversionId && gadsConversionLabel) {
          (window as any).gtag('event', 'conversion', {
            send_to: `${gadsConversionId}/${gadsConversionLabel}`,
          });
          (window as any).gtag('event', 'qualify_lead');
        }
      } else {
        setErrorMsg(json.error || 'Something went wrong. Please try again.');
        setStatus('error');
        (window as any).posthog?.capture('contact_form_error', { services_selected: selected() });
      }
    } catch {
      setErrorMsg(
        'Could not connect to our servers. Please check your internet connection and try again.',
      );
      setStatus('error');
      (window as any).posthog?.capture('contact_form_error', { services_selected: selected() });
    }
  };

  return (
    <div
      className={`form-card ${status === 'success' ? 'done' : ''}`}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <form className={`form ${status === 'sending' ? 'sending' : ''}`} onSubmit={handleSubmit}>
        <h2>{c.heading ?? 'Send us a message'}</h2>
        <p className="fsub">
          {c.subheading ?? 'Prefer to talk?'}{' '}
          <Link
            href={c.subheadingLinkHref ?? '#calendar'}
            style={{ color: 'var(--teal-bright)', textDecoration: 'none' }}
          >
            {c.subheadingLinkLabel ?? 'Book a demo instead →'}
          </Link>
        </p>

        <div className="field">
          <label>
            {c.nameLabel ?? 'Name'} <span className="req">*</span>
          </label>
          <input type="text" name="name" placeholder={c.namePlaceholder ?? 'John Doe'} required />
        </div>

        <div className="field">
          <label>
            {c.emailLabel ?? 'Email'} <span className="req">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder={c.emailPlaceholder ?? 'john@example.com'}
            required
          />
        </div>

        <div className="field">
          <label>{c.companyLabel ?? 'Facility / Company'}</label>
          <input
            type="text"
            name="company"
            placeholder={c.companyPlaceholder ?? 'Oakwood Senior Living'}
          />
        </div>

        {chips.length > 0 && (
          <div>
            <div className="chips-label">{c.chipsLabel ?? 'What do you need help with?'}</div>
            <div className="chips">
              {chips.map((chip) => (
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
        )}

        <div className="field">
          <label>{c.messageLabel ?? 'Tell us about your facility (Optional)'}</label>
          <textarea
            name="message"
            placeholder={c.messagePlaceholder ?? "A sentence or two about what you're working on..."}
          />
        </div>

        {status === 'error' && (
          <div className="form-error-msg">
            <span className="form-error-icon">⚠</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <button type="submit" className="btn submit-btn" disabled={status === 'sending'}>
          <span className="spinner" />
          <span className="txt">
            {status === 'error' ? (c.retryLabel ?? 'Try Again') : (c.submitLabel ?? 'Send Message')}
          </span>
        </button>
        <p className="form-note">
          {c.note ?? 'Your information is secure and will never be shared.'}
        </p>
      </form>

      <div className="form-success">
        <div className="ok-ic">✓</div>
        <h3>{c.successTitle ?? 'Message Sent!'}</h3>
        <p>
          {c.successBody ??
            'Thanks for reaching out. We will get back to you within one business day.'}
        </p>
      </div>
    </div>
  );
}
