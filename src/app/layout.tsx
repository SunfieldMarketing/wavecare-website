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
import { GoogleAnalytics } from '@next/third-parties/google';
import { PostHogProvider } from '@/components/PostHogProvider';
import { PostHogPageview } from '@/components/PostHogPageview';
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
        <PostHogProvider>
          <PostHogPageview />
          <div className="grain"></div>
          <div className="progress" id="progress"></div>
          <div className="cdot" id="cdot"></div>
          <div className="cring" id="cring"></div>

          <Navbar />
          {children}
          <Footer />

          {/* ── Google Analytics 4 ── */}
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}

          {/* ── Google Ads conversion tracking ── */}
          {process.env.NEXT_PUBLIC_GADS_ID && (
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GADS_ID}`}
              strategy="afterInteractive"
            />
          )}
          {process.env.NEXT_PUBLIC_GADS_ID && (
            <Script id="google-ads-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GADS_ID}');
              `}
            </Script>
          )}

          {/* ── Meta Pixel ── */}
          {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
          )}
          {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          )}

          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
