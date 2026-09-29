import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const jeepPackages = [
  {
    id: 'morning',
    name: 'Morning Game Drive',
    duration: '3â€“4 Hours',
    price: 'LKR 6,500',
    icon: 'ðŸŒ…',
    badge: 'Most Popular',
    badgeColor: 'from-green-500 to-green-500',
    description: 'The best time to spot leopards and elephants as they head to waterholes at dawn in Yala Block 1.',
    features: ['5:30 AM â€“ 9:30 AM', 'Max 6 passengers', 'Licensed tracker & driver', 'Bottled water included', 'Photo stop at key spots'],
  },
  {
    id: 'fullday',
    name: 'Full Day Safari',
    duration: '8â€“9 Hours',
    price: 'LKR 14,500',
    icon: 'â˜€ï¸',
    badge: 'Best Value',
    badgeColor: 'from-green-500 to-emerald-600',
    description: 'Full park access from dawn to dusk â€” maximum wildlife sightings including leopard, sloth bear, and crocodile.',
    features: ['5:30 AM â€“ 2:30 PM', 'Max 6 passengers', 'Senior tracker', 'Lunch & refreshments', 'Block 1 + Block 5 access', 'Unlimited photo stops'],
  },
  {
    id: 'evening',
    name: 'Evening Sunset Drive',
    duration: '3â€“4 Hours',
    price: 'LKR 7,000',
    icon: 'ðŸŒ™',
    badge: 'Scenic Choice',
    badgeColor: 'from-purple-500 to-indigo-600',
    description: "Golden hour through Yala's lagoons â€” perfect for elephant herds, birds, and stunning Menik River sunsets.",
    features: ['2:30 PM â€“ 6:30 PM', 'Max 6 passengers', 'Sunset lagoon route', 'Bottled water included', 'Ideal for photography'],
  },
];

export default function Booking() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();
  const [selected, setSelected] = useState('fullday');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', guests: '2', package: 'fullday', hotel: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Re-apply visible class after theme change re-renders the DOM
  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  }, [isDark]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', date: '', guests: '2', package: 'fullday', hotel: '', message: '' });
    setSelected('fullday');
  };

  const selectedPkg = jeepPackages.find(p => p.id === selected);

  const inputCls = `w-full rounded-xl px-4 py-3.5 text-sm transition-all duration-300 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 ${
    isDark
      ? 'bg-[#0a0f0d]/50 border border-white/10 text-white placeholder-neutral-600'
      : 'bg-white border border-emerald-300/40 text-[#0d2b0d] placeholder-neutral-400'
  }`;

  const labelCls = `block text-xs font-semibold mb-2 tracking-widest uppercase ${isDark ? 'text-neutral-300' : 'text-[#4a7a4a]'}`;

  return (
    <section id="booking" ref={sectionRef} className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans transition-colors duration-300 ${isDark ? 'bg-[#0a0f0d] text-white' : 'bg-[#f0faf0] text-[#0d2b0d]'}`}>
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-900/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md mb-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-emerald-600/10 border border-emerald-400/25'}`}>
            <span className="text-[10px] md:text-xs font-medium tracking-widest text-emerald-500 uppercase">Reserve Your Jeep</span>
          </div>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black mt-2 mb-6 tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>Book a Yala Jeep Safari</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-8" />
          <p className={`max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-light px-2 sm:px-0 ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>
            Select a package and submit your details. We'll confirm your Yala safari booking within a few hours via WhatsApp or email.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16 reveal">
          {jeepPackages.map((pkg) => (
            <button key={pkg.id} id={`pkg-${pkg.id}`}
              onClick={() => { setSelected(pkg.id); setForm(f => ({ ...f, package: pkg.id })); }}
              className={`text-left rounded-3xl p-6 sm:p-8 transition-all duration-500 border backdrop-blur-md ${
                selected === pkg.id
                  ? isDark
                    ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] scale-[1.02]'
                    : 'bg-emerald-50 border-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.12)] scale-[1.02]'
                  : isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-white/80 border-emerald-300/30 hover:bg-white hover:border-emerald-400/50'
              }`}>
              <div className="flex items-start justify-between mb-5">
                <div className={`p-3 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-emerald-100/60 border border-emerald-200/50'}`}>
                  {pkg.icon}
                </div>
                {pkg.badge && (
                  <span className={`text-[10px] font-bold text-white px-3 py-1.5 rounded-full bg-gradient-to-r ${pkg.badgeColor} shadow-lg tracking-wider uppercase`}>{pkg.badge}</span>
                )}
              </div>
              <h3 className={`font-bold text-xl mb-1 tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>{pkg.name}</h3>
              <p className="text-emerald-500 text-xs font-medium mb-4 uppercase tracking-wider">{pkg.duration}</p>
              <div className={`text-3xl font-black mb-4 tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>{pkg.price} <span className={`text-sm font-normal ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>/ jeep</span></div>
              <p className={`text-sm mb-6 leading-relaxed font-light ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>{pkg.description}</p>
              <ul className="space-y-3">
                {pkg.features.map(f => (
                  <li key={f} className={`flex items-start gap-3 text-sm font-light ${isDark ? 'text-neutral-300' : 'text-[#1a4d1a]'}`}>
                    <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              {selected === pkg.id && (
                <div className="mt-6 pt-4 border-t border-emerald-500/20 text-emerald-500 text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Package Selected
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className={`reveal backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white/90 border border-emerald-300/30'}`}>
          {submitted ? (
            <div className="text-center py-16 sm:py-24">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className={`text-3xl sm:text-4xl font-bold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>Booking Request Received!</h3>
              <p className={`max-w-lg mx-auto text-lg font-light leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>
                Thank you! Our team will WhatsApp or email you within a few hours to confirm your <strong className="text-emerald-500 font-medium">{selectedPkg?.name}</strong> at Yala National Park.
              </p>
              <div className={`mt-8 inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm ${isDark ? 'bg-white/5 border border-white/10 text-neutral-300' : 'bg-emerald-50 border border-emerald-200 text-[#1a4d1a]'}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> We'll be in touch soon!
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                <div>
                  <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                    <span className={`hidden sm:inline-block p-2 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-emerald-100/60 border border-emerald-200/50'}`}>{selectedPkg?.icon}</span>
                    {selectedPkg?.name}
                  </h3>
                  <p className={`text-sm mt-2 font-light ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>Fill in your details â€” we'll confirm via WhatsApp</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold whitespace-nowrap text-sm tracking-wide ${isDark ? 'bg-emerald-900/30 border border-emerald-500/30 text-emerald-400' : 'bg-emerald-100 border border-emerald-300 text-emerald-700'}`}>
                  {selectedPkg?.price} / jeep
                </div>
              </div>

              <form id="booking-form" onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input id="booking-name" name="name" type="text" required value={form.name} onChange={handleChange}
                    placeholder="Your full name" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input id="booking-email" name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder="your@email.com" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>WhatsApp / Phone *</label>
                  <input id="booking-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
                    placeholder="+94 77 123 4567" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Safari Date *</label>
                  <input id="booking-date" name="date" type="date" required value={form.date} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={inputCls}
                    style={{ colorScheme: isDark ? 'dark' : 'light' }} />
                </div>
                <div>
                  <label className={labelCls}>Number of Guests *</label>
                  <select id="booking-guests" name="guests" required value={form.guests} onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all duration-300 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 ${isDark ? 'bg-[#0a0f0d] border border-white/10 text-white' : 'bg-white border border-emerald-300/40 text-[#0d2b0d]'}`}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Safari Package *</label>
                  <select id="booking-package" name="package" value={form.package}
                    onChange={(e) => { handleChange(e); setSelected(e.target.value); }}
                    className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all duration-300 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 ${isDark ? 'bg-[#0a0f0d] border border-white/10 text-white' : 'bg-white border border-emerald-300/40 text-[#0d2b0d]'}`}>
                    {jeepPackages.map(p => <option key={p.id} value={p.id}>{p.name} â€” {p.price}/jeep</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Your Hotel / Location in Yala Area</label>
                  <input id="booking-hotel" name="hotel" type="text" value={form.hotel} onChange={handleChange}
                    placeholder="e.g. Tissamaharama, Yala Village Hotel..." className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Special Requests</label>
                  <textarea id="booking-message" name="message" rows={3} value={form.message} onChange={handleChange}
                    placeholder="Dietary requirements, accessibility, anniversary, wildlife photography focus..."
                    className={`${inputCls} resize-none`} />
                </div>
                <div className={`sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-emerald-200/50'}`}>
                  <p className={`text-xs flex items-center gap-2 font-light ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    No payment required now. We confirm availability via WhatsApp first.
                  </p>
                  <button id="booking-submit-btn" type="submit"
                    className={`group relative w-full sm:w-auto px-10 py-4 font-semibold text-sm rounded-full overflow-hidden transition-all hover:scale-105 ${isDark ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]' : 'bg-[#166534] text-white hover:bg-[#15803d] hover:shadow-[0_0_30px_rgba(22,101,52,0.3)]'}`}>
                    <span className="relative z-10 flex items-center justify-center gap-2">Request My Safari <span className="group-hover:translate-x-1 transition-transform">â†’</span></span>
                    {isDark && <div className="absolute inset-0 bg-emerald-50 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
