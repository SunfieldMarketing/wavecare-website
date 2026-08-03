import Link from 'next/link';
import CaseStudyTracker from './CaseStudyTracker';

const cases: Record<string, { client: string; title: string; services: string[]; result: string; resultLabel: string; body: string[] }> = {
  oakwood: {
    client: 'Oakwood Senior Living',
    title: 'How a modern website and facility tour video increased bookings by 42%',
    services: ['Web Design', 'Video Production'],
    result: '42%',
    resultLabel: 'Increase in qualified tours',
    body: [
      'Oakwood was losing out to newer competitors despite offering better care. Their existing website was slow, outdated, and didn\'t communicate the warmth and professionalism of their team.',
      'We completely overhauled their digital presence, starting with a conversion-first website built around the Google 3-Pack, and pairing it with a cinematic facility tour video that gave prospective families a real feel for the community.',
      'Within three months of launch, qualified tour bookings had increased by 42%, and their Google Business profile moved from page 3 to position 2 in local search.',
    ],
  },
  pinnacle: {
    client: 'The Pinnacle',
    title: 'Elevating a luxury memory care brand through premium visuals',
    services: ['Photography', 'Print Collateral'],
    result: '3X',
    resultLabel: 'Higher engagement on ads',
    body: [
      'The Pinnacle offered luxury memory care but their marketing materials didn\'t reflect that promise. Stock imagery and dated brochures were costing them family trust at first glance.',
      'We ran a full-day HIPAA-conscious photoshoot capturing staff, residents (with consent), amenities, and the unique atmosphere of their community. The resulting image library powered new brochures, welcome packets, and a complete social media refresh.',
      'Ad campaigns using real photography saw 3x higher engagement compared to the previous stock imagery, and the new brochure is now cited by families as a key reason they scheduled a tour.',
    ],
  },
  harmony: {
    client: 'Harmony Care',
    title: 'A ground-up rebrand for a growing regional provider',
    services: ['Branding', 'Web Design', 'Print', 'Photography'],
    result: '15',
    resultLabel: 'Facilities launched under the new brand',
    body: [
      'Harmony Care was expanding rapidly across the region, but their brand hadn\'t kept pace. Each facility looked different, messaging was inconsistent, and their website couldn\'t handle their multi-location growth.',
      'We designed a scalable brand system from the ground up, logo, color palette, typography, and voice, then built a unified website architecture that let each location maintain its personality while presenting a cohesive parent brand.',
      'Within 18 months, 15 facilities had launched under the new Harmony Care brand, with a standardized marketing playbook that made each opening smoother than the last.',
    ],
  },
  mercy: {
    client: 'Mercy Health Partners',
    title: 'Dominating local search with a conversion-first medical site',
    services: ['Web Design', 'SEO', 'Google Business Optimization'],
    result: '+210%',
    resultLabel: 'Organic search traffic',
    body: [
      'Mercy Health Partners had five locations but almost no organic visibility. Their website was a single-page template that couldn\'t compete in local search, and their Google Business profiles were incomplete.',
      'We restructured their website into a proper multi-location architecture, dedicated pages for each practice, schema markup, and deep SEO foundations. We also audited and optimized all five Google Business profiles with new photos, correct categories, and review response templates.',
      'Within six months, organic search traffic had grown by 210%, and three of the five locations now appear in the Google 3-Pack for their target search terms.',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = cases[params.slug];

  if (!study) {
    return (
      <section style={{ padding: '180px 0 120px', textAlign: 'center', background: 'var(--teal-deep)' }}>
        <div className="container">
          <h1 style={{ color: '#fff', marginBottom: '24px' }}>Case study not found</h1>
          <Link href="/case-studies" className="btn">← Back to Case Studies</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <CaseStudyTracker slug={params.slug} client={study.client} services={study.services} />
      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero-bg">
          <div style={{ width: '100%', height: '100%', background: 'var(--teal-deep)' }}></div>
        </div>
        <div className="container hero-inner" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
          <span className="label">{study.client}</span>
          <h1 style={{ color: '#fff', maxWidth: '820px', margin: '16px 0 28px' }}>{study.title}</h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {study.services.map(s => (
              <span key={s} className="label" style={{ marginBottom: 0 }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Result stat */}
      <section className="sec-pad ink">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(40px,6vw,100px)', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--soft)', borderRadius: '18px', padding: '48px 32px' }}>
              <div className="stat">
                <div className="num" style={{ fontSize: 'clamp(64px,9vw,110px)', WebkitTextFillColor: 'transparent', background: 'linear-gradient(180deg,#fff,var(--teal-bright))', WebkitBackgroundClip: 'text' }}>{study.result}</div>
                <div className="cap" style={{ marginTop: '14px' }}>{study.resultLabel}</div>
              </div>
            </div>
            <div>
              {study.body.map((para, i) => (
                <p key={i} style={{ color: 'var(--on-dark)', fontSize: '17px', lineHeight: '1.85', marginBottom: '22px' }}>{para}</p>
              ))}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '36px' }}>
                <Link href="/contact" className="btn">Start Your Project</Link>
                <Link href="/case-studies" className="btn btn-ghost">← All Case Studies</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final">
        <canvas id="waveCanvas"></canvas>
        <div className="final-in">
          <span className="label">Ready for results like this?</span>
          <h2>Let's build your success story.</h2>
          <p className="sub">Book a free discovery call and we'll map out exactly what we'd build for your facility.</p>
          <Link href="/contact" className="btn">Book a Demo</Link>
        </div>
      </section>
    </>
  );
}
