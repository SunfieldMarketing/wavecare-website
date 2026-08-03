import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Wavecare Marketing',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <section className="sec-pad ink" style={{ paddingTop: '160px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: 'clamp(80px, 10vw, 150px)', lineHeight: 1, marginBottom: '20px', color: 'var(--teal-bright)' }}>404</h1>
        <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
        <p style={{ marginBottom: '40px', color: 'rgba(255,255,255,0.7)' }}>The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn" data-cursor>
          Return Home
        </Link>
      </div>
    </section>
  );
}
