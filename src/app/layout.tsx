import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://wavecare.io'),
  title: 'Marketing for Senior Living & Skilled Nursing | Wavecare',
  description: 'Websites, photography, video tours, and branding for senior living, assisted living, and skilled nursing providers nationwide. Book a free audit.',
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

        {/* ── Structured Data / Schema Markup ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://wavecare.io/#organization",
                  "name": "Wavecare Marketing",
                  "url": "https://wavecare.io",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://wavecare.io/wavecare-marketing-logo.png",
                    "width": 300,
                    "height": 400
                  },
                  "description": "Wavecare Marketing is a healthcare-focused marketing agency specializing in branding, photography, video production, design, print, and conversion-first web design for senior care facilities and medical practices.",
                  "slogan": "Built for healthcare. Built for trust.",
                  "knowsAbout": [
                    "senior living",
                    "assisted living",
                    "memory care",
                    "skilled nursing",
                    "independent living",
                    "CCRC",
                    "rehabilitation",
                    "long-term care",
                    "hospice",
                    "home health",
                    "home care"
                  ],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Healthcare Marketing Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Senior living website design"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Facility photography and video tour production"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Branding and creative"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Free website and Google Business Profile audit"
                        }
                      }
                    ]
                  },
                  "areaServed": {
                    "@type": "Country",
                    "name": "United States"
                  },
                  "audience": {
                    "@type": "Audience",
                    "audienceType": "Senior Care Facilities, Nursing Homes, Assisted Living Communities, Medical Practices"
                  },
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "contactType": "sales",
                      "url": "https://wavecare.io/contact",
                      "availableLanguage": "English"
                    }
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://wavecare.io/#website",
                  "url": "https://wavecare.io",
                  "name": "Wavecare Marketing",
                  "description": "Healthcare marketing agency for senior care and medical practices.",
                  "publisher": {
                    "@id": "https://wavecare.io/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://wavecare.io/?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <PostHogProvider>
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
