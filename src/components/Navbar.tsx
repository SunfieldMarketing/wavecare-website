"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="nav" id="nav">
      <div className="nav-inner">
        <Link href="/" className="logo" data-cursor onClick={() => setMobileMenuOpen(false)}>
          <Image src="/wavecare-marketing-logo-white.png" alt="Wavecare Marketing" width={300} height={400} style={{ height: '110px', width: 'auto' }} priority />
        </Link>
        <button className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span><span></span><span></span>
        </button>
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link href="/" data-cursor onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <div className="nav-dropdown">
            <Link href="/services" data-cursor onClick={() => setMobileMenuOpen(false)}>Services ▾</Link>
            <div className="dropdown-content">
              <Link href="/photoservices" data-cursor onClick={() => setMobileMenuOpen(false)}>Brand & Photoshoots</Link>
              <Link href="/videoservices" data-cursor onClick={() => setMobileMenuOpen(false)}>Video Production</Link>
              <Link href="/design-print" data-cursor onClick={() => setMobileMenuOpen(false)}>Design & Print</Link>
              <Link href="/webdesign" data-cursor onClick={() => setMobileMenuOpen(false)}>Web Design</Link>
            </div>
          </div>
          <Link href="/about" data-cursor onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/case-studies" data-cursor onClick={() => setMobileMenuOpen(false)}>Case Studies</Link>
          <Link href="/contact" data-cursor onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="/contact" className="btn" data-magnetic data-cursor onClick={() => setMobileMenuOpen(false)}>Book a Demo</Link>
        </div>
      </div>
    </nav>
  );
}
