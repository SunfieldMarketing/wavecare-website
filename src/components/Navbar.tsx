import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="nav" id="nav">
      <div className="nav-inner">
        <Link href="/" className="logo" data-cursor>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd8AAAFbCAYAAACUIYSWAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAABKNklEQVR4nO2d6XriOLdG15ZkQ1JVPfd37v/yeq4xwYO0zw/JxhAyVALBOHv1407KTIZgvd6zqCqPMdxHRB69r2EYy2JYIVL56cpPGfdM7jTcQ7a7bNUw3iKP6WZ4zYMxDOMySUxFt+w5dN1e1hllV6xNgA1jF/f4XQzDeKtMRRT2hHe6HXjM4z41w3i7mOVrGMZ3sCe8U5NW3B3hNQE2jMOY+BqG8USKDbxv7co2xht372muNcO4Bzs3DMN4hETUDgFS29HdNuSkqhzNTQodeYtAowkFatCvNzdnPG7DmC9m+RqG8SgxRggeV1W4UK7ZExCEyCC6CqLEmHgXnAKsVquzHbNhzBmzfA3DeJRVqAAHUYt/Wblp2tHa3QA/imgL/BLC6JT23p/ngA1j5pj4GoZxLwL0XYuUzKqokncGYfWuJgK3bGO8v+NG4d0Ux7RhGHcxt7NhGA9SVStASAm8L8lVkmO83xR+lcNJzQJ3M6INwwDM8jUM4xEGq1eKkMYI35pIBNw9wvoZpOnAmuIZxmFMfA3DeJCkiaRp9CG7APXKk4Cf7ynlTcCqgid0rzWMN4m5nQ3jjbOvj7J3Y06ZcsSk9CK0ksX1xwd6aHiABMVLbRjGHia+hrF4huYYe44u2W0fmfIuPJN4bVLQBLGF1ZoW+PBI46pvIBWwchC7Hl/ZMmMY+5jb2TDeGpP2kDLZddhCLQodAi1K88hT/1eEN6RIih2+siXGMA5hZ4ZhLBzFsXOqC7tKm7a77lTlCuAc+MBNjPz2iNU72LjOOVJKD93VMN40YvN8DWPZ7MzVfWAM4Hh/VVQV0XzOqxMaYP2I8P4FcgXUZVONZc2wa3zj7fGYbtpZYRhvnYkbWjUCCRFFPEQnfAW+PuFparLl7MgLj4jQ9/3pjtswLhgTX8N4SzzkvNKY3c8iILlzRk/uYPWYuxnyYuLLFmOeb2TtJQ3jMJaGaBhvhLtJVWkyeFfzFnJ8eJjJewP874ljeR2T2LEvr2ShKsM4iFm+hvGGULhr/e7N5x2mFH2Lzb1NNA4RAInbOFfTNOjTH24YbwoTX8NYOPvJzXcEuO+zheoDqnlEYIOCf/o4wI8gMUHwMsp1CDVyN3/aMAxMfA3DCAGioinRI/RAQh7sYLXPEOudPsKqIwzjfkx8DWPp7ElojudOintVIPg8qlfKbN7vEF7IC8k4ZEEV1CE2UNAw7sXODsN4C+jU05zGlpJTn7R6Rw/88p3COz7VVHyxXCvDeAgTX8NYMpMa3ru43O/ZCV2vqMDNC/KjBECGPtKWaGUYD2Hia" alt="Wavecare" />
        </Link>
        <div className="nav-links">
          <Link href="/" data-cursor>Home</Link>
          <div className="nav-dropdown">
            <Link href="/services" data-cursor>Services ▾</Link>
            <div className="dropdown-content">
              <Link href="/services/brand-photoshoots" data-cursor>Brand & Photoshoots</Link>
              <Link href="/services/video-production" data-cursor>Video Production</Link>
              <Link href="/services/design-print" data-cursor>Design & Print</Link>
              <Link href="/services/web-design" data-cursor>Web Design</Link>
            </div>
          </div>
          <Link href="/case-studies" data-cursor>Case Studies</Link>
          <Link href="/about" data-cursor>About</Link>
          <Link href="/contact" data-cursor>Contact</Link>
          <Link href="/contact" className="btn" data-magnetic data-cursor>Book a Call</Link>
        </div>
      </div>
    </nav>
  );
}
