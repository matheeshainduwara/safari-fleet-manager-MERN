import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Booking', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'gallery', 'booking', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav id="navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-green-50 text-lg">🐆</span>
            </div>
            <div>
              <span className="font-bold text-xl text-green-900" style={{ fontFamily: 'Playfair Display, serif' }}>Yala Safari</span>
              <span className="block text-xs text-green-900 tracking-widest uppercase leading-none">Jeep Service · Sri Lanka</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg group ${isActive ? 'text-green-900' : 'text-green-900 hover:text-green-900'}`}>
                  {link.label}
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}`} />
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <a href="#booking" onClick={(e) => { e.preventDefault(); handleNavClick('#booking'); }}
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-green-50 font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300">
              Book a Jeep
            </a>
          </div>

          {/* Hamburger */}
          <button id="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu">
            <span className={`block h-0.5 bg-green-400 transition-all duration-300 ${mobileOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
            <span className={`block h-0.5 bg-green-400 transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-0.5 bg-green-400 transition-all duration-300 ${mobileOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mobile-menu-open bg-green-50/98 backdrop-blur-xl border-t border-green-700/20 px-4 pb-6 pt-2">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="flex items-center gap-3 py-3.5 text-green-900 hover:text-green-900 transition-colors duration-200 border-b border-white/5 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />{link.label}
            </a>
          ))}
          <a href="#booking" onClick={(e) => { e.preventDefault(); handleNavClick('#booking'); }}
            className="mt-4 block w-full text-center py-3 bg-gradient-to-r from-green-500 to-green-600 text-green-50 font-semibold rounded-full text-sm">
            Book a Jeep Safari
          </a>
        </div>
      )}
    </nav>
  );
}
