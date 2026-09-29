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
            <div className="transition-all duration-300">
              <span className={`font-bold text-xl tracking-wide transition-colors duration-300 ${isDark ? 'text-white' : scrolled ? 'text-emerald-900' : 'text-emerald-900'}`} style={{ fontFamily: 'Playfair Display, serif' }}>Yala Safari</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1 backdrop-blur-md border ${
            isDark ? 'bg-white/5 border-white/5' : 'bg-white/40 border-emerald-200/60'
          }`}>
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
                  {isActive && <span className={`absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] -z-10 ${isDark ? 'bg-white/10' : 'bg-emerald-500/15'}`} />}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA + Toggle */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button onClick={toggle} aria-label="Toggle theme"
              className={`relative w-14 h-7 rounded-full transition-all duration-500 border focus:outline-none ${
                isDark
                  ? 'bg-emerald-950 border-emerald-700/40 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                  : 'bg-emerald-100 border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              }`}>
              {/* Track icons */}
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none select-none">🌙</span>
              <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none select-none">☀️</span>
              {/* Sliding thumb */}
              <span className={`absolute top-0.5 w-6 h-6 rounded-full shadow-md transition-all duration-500 flex items-center justify-center ${
                isDark
                  ? 'left-0.5 bg-emerald-500 shadow-emerald-500/60'
                  : 'left-[calc(100%-1.625rem)] bg-emerald-500 shadow-emerald-500/50'
              }`}>
                {isDark
                  ? <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  : <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6z"/></svg>
                }
              </span>
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
              className={`relative w-12 h-6 rounded-full transition-all duration-500 border focus:outline-none ${
                isDark
                  ? 'bg-emerald-950 border-emerald-700/40 shadow-[0_0_10px_rgba(52,211,153,0.25)]'
                  : 'bg-emerald-100 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
              }`}>
              <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[9px] pointer-events-none select-none">🌙</span>
              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] pointer-events-none select-none">☀️</span>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-500 flex items-center justify-center ${
                isDark
                  ? 'left-0.5 bg-emerald-500 shadow-emerald-500/60'
                  : 'left-[calc(100%-1.375rem)] bg-emerald-500 shadow-emerald-500/50'
              }`}>
                {isDark
                  ? <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  : <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6z"/></svg>
                }
              </span>
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className={`w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 rounded-full border backdrop-blur-md ${
                isDark ? 'bg-white/10 border-white/10' : 'bg-white/60 border-emerald-200/60'
              }`} aria-label="Toggle menu">
              <span className={`block h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-emerald-900'} ${mobileOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
              <span className={`block h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-emerald-900'} ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
              <span className={`block h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-emerald-900'} ${mobileOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center -z-10 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} ${isDark ? 'bg-black/95' : 'bg-white/95'}`}>
        <div className="flex flex-col items-center gap-8 w-full px-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className={`text-2xl font-light transition-colors duration-300 tracking-wider ${
                isDark ? 'text-neutral-300 hover:text-white' : 'text-emerald-800 hover:text-emerald-900'
              }`}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className={`mt-8 px-8 py-4 w-full max-w-xs text-center font-semibold rounded-full text-lg ${
              isDark
                ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                : 'bg-emerald-700 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]'
            }`}>
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
