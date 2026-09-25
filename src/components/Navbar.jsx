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
          if (rect.top <= 150 && rect.bottom >= 150) { setActiveSection(id); break; }
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
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className={`flex items-center justify-between w-full max-w-5xl rounded-full transition-all duration-500 ${scrolled ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 px-6 py-3' : 'bg-transparent px-2 py-2'}`}>

          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.5)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-white text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>YS</span>
            </div>
            <div className={`transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-100'}`}>
              <span className="font-bold text-xl text-white tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>Yala Safari</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full group ${isActive ? 'text-white' : 'text-neutral-300 hover:text-white'}`}>
                  {isActive && <span className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] -z-10" />}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex shrink-0">
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="px-6 py-2.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-emerald-50 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
              Contact Us
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 bg-white/10 rounded-full border border-white/10 backdrop-blur-md" aria-label="Toggle menu">
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center -z-10 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center gap-8 w-full px-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-2xl font-light text-neutral-300 hover:text-white transition-colors duration-300 tracking-wider">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="mt-8 px-8 py-4 w-full max-w-xs text-center bg-white text-black font-semibold rounded-full text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
