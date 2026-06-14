import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Wavecare Marketing',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn btn-primary" data-cursor>
          Return Home
        </Link>
      </div>
    </div>
  );
}
