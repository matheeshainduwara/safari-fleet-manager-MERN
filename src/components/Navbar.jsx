import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

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
  const { isDark, toggle } = useTheme();

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
        <div className={`flex items-center justify-between w-full max-w-5xl rounded-full transition-all duration-500 ${scrolled ? `backdrop-blur-xl border shadow-2xl px-6 py-3 ${isDark ? 'bg-black/40 border-white/10 shadow-black/20' : 'bg-white/80 border-emerald-200/50 shadow-emerald-900/10'}` : 'bg-transparent px-2 py-2'}`}>

          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.5)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-white text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>YS</span>
            </div>
            <div className={`transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-100'}`}>
              <span className={`font-bold text-xl tracking-wide ${isDark ? 'text-white' : 'text-emerald-900'}`} style={{ fontFamily: 'Playfair Display, serif' }}>Yala Safari</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1 backdrop-blur-md border ${isDark ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full group ${
                    isActive
                      ? isDark ? 'text-white' : 'text-emerald-900'
                      : isDark ? 'text-neutral-300 hover:text-white' : 'text-emerald-700 hover:text-emerald-900'
                  }`}>
                  {isActive && <span className={`absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] -z-10 ${isDark ? 'bg-white/10' : 'bg-emerald-500/10'}`} />}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA + Toggle */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button onClick={toggle} aria-label="Toggle theme"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
                isDark
                  ? 'bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20'
                  : 'bg-white/80 border-emerald-200 text-emerald-700 hover:bg-emerald-50'
              }`}>
              {isDark ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6z" /></svg>
              )}
            </button>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className={`px-6 py-2.5 font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-white text-black hover:bg-emerald-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30'
              }`}>
              Contact Us
            </a>
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border ${
                isDark ? 'bg-white/10 border-white/20 text-yellow-300' : 'bg-white/80 border-emerald-200 text-emerald-700'
              }`}>
              {isDark ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6z" /></svg>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 bg-white/10 rounded-full border border-white/10 backdrop-blur-md" aria-label="Toggle menu">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'}`} />
            </button>
          </div>
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
