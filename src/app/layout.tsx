import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wavecare — Built for Healthcare',
  description: 'Wavecare is a healthcare marketing agency built for senior care — branding, photography, video, print, and conversion-first web design.',
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import './globals.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
      </head>
      <body>
        <div className="grain"></div>
        <div className="progress" id="progress"></div>
        <div className="cdot" id="cdot"></div>
        <div className="cring" id="cring"></div>

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
