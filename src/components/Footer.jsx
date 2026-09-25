export default function Footer() {
  const currentYear = new Date().getFullYear();
  const handleNav = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative bg-[#0a0f0d] border-t border-white/10 overflow-hidden font-sans text-white">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-lg font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]" style={{ fontFamily: 'Playfair Display, serif' }}>YS</div>
              <div>
                <span className="font-bold text-xl text-white tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>Yala Safari</span>
                <span className="block text-[10px] text-emerald-400 tracking-widest uppercase leading-none mt-1">Sri Lanka</span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
              Sri Lanka's most trusted jeep safari service in Yala National Park. Experience leopards, elephants & sloth bears up close since 2014.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>, label: 'Facebook' },
                { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>, label: 'Instagram' },
              ].map((s, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Wildlife Gallery', href: '#gallery' },
                { label: 'Book a Jeep', href: '#booking' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <button onClick={() => handleNav(link.href)}
                    className="text-neutral-400 hover:text-emerald-400 text-sm transition-colors duration-200 flex items-center gap-3 group font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-emerald-400 transition-colors" />{link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6">Safari Packages</h4>
            <ul className="space-y-4">
              {['Morning Game Drive', 'Full Day Safari', 'Evening Sunset Drive', 'Photography Safari', 'Family Safari'].map((item) => (
                <li key={item}>
                  <button onClick={() => handleNav('#booking')}
                    className="text-neutral-400 hover:text-emerald-400 text-sm transition-colors duration-200 text-left flex items-center gap-3 group font-light">
                    <svg className="w-4 h-4 text-emerald-400/50 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6">Yala Updates</h4>
            <p className="text-neutral-400 text-sm mb-5 font-light leading-relaxed">Get leopard sighting alerts, seasonal tips, and exclusive deals for Yala National Park.</p>
            <form id="footer-newsletter-form" onSubmit={(e) => { e.preventDefault(); e.target.reset(); }} className="space-y-3">
              <input id="footer-email-input" type="email" required placeholder="your@email.com"
                className="w-full bg-[#0a0f0d]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm transition-all duration-300 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none" />
              <button type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm rounded-xl hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/30 transition-all duration-300">
                Subscribe
              </button>
            </form>
            <div className="mt-6 flex flex-wrap gap-2">
              {['TripAdvisor Rated', 'Eco Certified', 'DWC Licensed'].map((badge) => (
                <span key={badge} className="bg-white/5 border border-white/10 text-neutral-300 text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">{badge}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-neutral-500 text-xs text-center sm:text-left font-light tracking-wide">
            © {currentYear} Yala Safari Jeep Service · Thissamaharama, Sri Lanka · All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Park Guidelines'].map((item) => (
              <button key={item} className="text-neutral-500 hover:text-emerald-400 text-xs transition-colors duration-200 font-light">{item}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
