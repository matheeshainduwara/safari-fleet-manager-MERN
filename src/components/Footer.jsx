export default function Footer() {
  const currentYear = new Date().getFullYear();
  const handleNav = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative bg-green-200 border-t border-green-700/20 overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-green-500 via-green-500 to-green-500" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-lg">🐆</div>
              <div>
                <span className="font-bold text-lg text-green-400" style={{ fontFamily: 'Playfair Display, serif' }}>Yala Safari Jeep</span>
                <span className="block text-xs text-green-900 tracking-widest uppercase leading-none">Sri Lanka</span>
              </div>
            </div>
            <p className="text-green-900 text-sm leading-relaxed mb-5">
              Sri Lanka's most trusted jeep safari service in Yala National Park. Experience leopards, elephants & sloth bears up close since 2014.
            </p>
            <div className="flex gap-2">
              {['🐆', '🐘', '🦚', '🐻'].map((emoji, i) => (
                <span key={i} className="w-9 h-9 glass-card rounded-full flex items-center justify-center text-base hover:scale-110 transition-transform cursor-default">{emoji}</span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-green-900 font-semibold text-sm tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Wildlife Gallery', href: '#gallery' },
                { label: 'Book a Jeep', href: '#booking' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <button onClick={() => handleNav(link.href)}
                    className="text-green-900 hover:text-green-400 text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-green-500/40 group-hover:bg-green-400 transition-colors" />{link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h4 className="text-green-900 font-semibold text-sm tracking-widest uppercase mb-5">Safari Packages</h4>
            <ul className="space-y-3">
              {['🌅 Morning Game Drive', '☀️ Full Day Safari', '🌙 Evening Sunset Drive', '📸 Photography Safari', '👨‍👩‍👧 Family Safari'].map((item) => (
                <li key={item}>
                  <button onClick={() => handleNav('#booking')}
                    className="text-green-900 hover:text-green-400 text-sm transition-colors duration-200 text-left">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-green-900 font-semibold text-sm tracking-widest uppercase mb-5">Yala Updates</h4>
            <p className="text-green-900 text-sm mb-4">Get leopard sighting alerts, seasonal tips, and exclusive deals for Yala National Park.</p>
            <form id="footer-newsletter-form" onSubmit={(e) => { e.preventDefault(); e.target.reset(); }} className="space-y-2">
              <input id="footer-email-input" type="email" required placeholder="your@email.com"
                className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-2.5 text-green-900 placeholder-white/20 text-sm transition-all duration-300" />
              <button type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-green-50 font-bold text-sm rounded-xl hover:scale-[1.02] transition-all duration-300">
                Subscribe
              </button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2">
              {['🏆 TripAdvisor Rated', '🌿 Eco Certified', '🛡️ DWC Licensed'].map((badge) => (
                <span key={badge} className="glass-card text-green-900 text-xs px-2.5 py-1 rounded-full">{badge}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-700/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-900 text-xs text-center sm:text-left">
            © {currentYear} Yala Safari Jeep Service · Thissamaharama, Sri Lanka 🇱🇰 · All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Use', 'Park Guidelines'].map((item) => (
              <button key={item} className="text-green-900 hover:text-green-400 text-xs transition-colors duration-200">{item}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
