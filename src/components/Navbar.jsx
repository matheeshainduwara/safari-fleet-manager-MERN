import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';

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
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [userDropdown, setUserDropdown] = useState(false);

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
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-full group ${
                    isActive
                      ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                      : isDark ? 'text-neutral-300 hover:text-white' : 'text-emerald-900/80 hover:text-emerald-900'
                  }`}>
                  {isActive && <span className={`absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] -z-10 ${isDark ? 'bg-emerald-500/15' : 'bg-emerald-600/10'}`} />}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA + Toggle */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border backdrop-blur-md focus:outline-none ${
                isDark
                  ? 'bg-white/5 border-white/10 text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                  : 'bg-emerald-500/10 border-emerald-300/60 text-emerald-800 hover:bg-emerald-500/20 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]'
              }`}
            >
              <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                <FiSun
                  className={`w-5 h-5 absolute transition-all duration-500 transform ${
                    isDark
                      ? 'rotate-90 scale-0 opacity-0'
                      : 'rotate-0 scale-100 opacity-100 text-amber-500'
                  }`}
                />
                <FiMoon
                  className={`w-4.5 h-4.5 absolute transition-all duration-500 transform ${
                    isDark
                      ? 'rotate-0 scale-100 opacity-100 text-emerald-400'
                      : '-rotate-90 scale-0 opacity-0'
                  }`}
                />
              </div>
            </button>

            {/* Login / User Profile CTA */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className={`px-4 py-2 font-semibold text-sm rounded-full transition-all duration-300 flex items-center gap-2 border ${
                    isDark
                      ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60'
                      : 'bg-emerald-100/80 border-emerald-300 text-emerald-900 hover:bg-emerald-200'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0]}</span>
                </button>

                {userDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-2xl p-2 shadow-2xl border backdrop-blur-xl z-50 ${
                      isDark ? 'bg-[#0f1713] border-white/10 text-white' : 'bg-white border-emerald-200 text-[#0d2b0d]'
                    }`}
                  >
                    <div className="px-3 py-2 border-b border-white/5">
                      <p className="text-xs font-bold truncate">{user?.name}</p>
                      <p className="text-[10px] text-neutral-400 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdown(false);
                      }}
                      className="w-full mt-1 px-3 py-2 text-xs font-medium rounded-xl text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                    >
                      <FiLogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className={`px-6 py-2.5 font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                  isDark
                    ? 'bg-white text-black hover:bg-emerald-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30'
                }`}
              >
                <FiUser className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 border backdrop-blur-md focus:outline-none ${
                isDark
                  ? 'bg-white/5 border-white/10 text-emerald-400'
                  : 'bg-emerald-500/10 border-emerald-300/60 text-emerald-800'
              }`}
            >
              <div className="relative w-4.5 h-4.5 flex items-center justify-center overflow-hidden">
                <FiSun
                  className={`w-4.5 h-4.5 absolute transition-all duration-500 transform ${
                    isDark
                      ? 'rotate-90 scale-0 opacity-0'
                      : 'rotate-0 scale-100 opacity-100 text-amber-500'
                  }`}
                />
                <FiMoon
                  className={`w-4 h-4 absolute transition-all duration-500 transform ${
                    isDark
                      ? 'rotate-0 scale-100 opacity-100 text-emerald-400'
                      : '-rotate-90 scale-0 opacity-0'
                  }`}
                />
              </div>
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
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a key={link.href} href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`text-2xl transition-colors duration-300 tracking-wider ${
                  isActive
                    ? isDark ? 'text-emerald-400 font-semibold' : 'text-emerald-600 font-semibold'
                    : isDark ? 'text-neutral-300 font-light hover:text-white' : 'text-emerald-900/80 font-light hover:text-emerald-900'
                }`}>
                {link.label}
              </a>
            );
          })}

          {isAuthenticated ? (
            <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-xs">
              <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                <FiUser className="w-4 h-4" />
                Signed in as {user?.name}
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full px-6 py-3.5 text-center font-semibold rounded-full text-base bg-red-500/20 text-red-300 border border-red-500/30"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileOpen(false);
                openAuthModal('login');
              }}
              className={`mt-8 px-8 py-4 w-full max-w-xs text-center font-semibold rounded-full text-lg flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  : 'bg-emerald-700 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]'
              }`}
            >
              <FiUser className="w-5 h-5" />
              Login / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
