import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wavecare Marketing | Built for Healthcare',
  description: 'Wavecare is a premier healthcare marketing agency built for senior care, offering branding, photography, video production, design, print, and conversion-first web design.',
  keywords: ['healthcare marketing', 'senior care marketing', 'medical marketing agency', 'healthcare web design', 'healthcare branding', 'medical video production'],
  authors: [{ name: 'Wavecare Marketing' }],
  creator: 'Wavecare Marketing',
  publisher: 'Wavecare Marketing',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Wavecare Marketing | Healthcare Marketing Agency',
    description: 'We build beautiful, conversion-first marketing assets for healthcare facilities.',
    url: 'https://wavecare.io',
    siteName: 'Wavecare Marketing',
    images: [
      {
        url: '/wavecare-marketing-logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wavecare Marketing',
    description: 'Healthcare marketing that helps facilities look as good as the care they provide.',
    images: ['/wavecare-marketing-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import './globals.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Fonts — preconnect then load async */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Core animation libs — load after page paint so they don't block preloads */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
      </head>
      <body>
        <div className="grain"></div>
        <div className="progress" id="progress"></div>
        <div className="cdot" id="cdot"></div>
        <div className="cring" id="cring"></div>

        <Navbar />
        {children}
        <Footer />
        {/* Add Google Analytics, GTM, and Meta Pixel IDs here when ready:
             GA:  <GoogleAnalytics gaId="G-YOURCODE" />
             GTM: <GoogleTagManager gtmId="GTM-YOURCODE" />
             Pixel: uncomment and set real ID in the script below
        */}
      </body>
    </html>
  );
}
