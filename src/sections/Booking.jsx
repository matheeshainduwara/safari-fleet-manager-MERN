import { useEffect, useRef, useState } from 'react';

const jeepPackages = [
  {
    id: 'morning',
    name: 'Morning Game Drive',
    duration: '3–4 Hours',
    price: 'LKR 6,500',
    icon: '🌅',
    badge: 'Most Popular',
    badgeColor: 'from-green-500 to-green-500',
    description: 'The best time to spot leopards and elephants as they head to waterholes at dawn in Yala Block 1.',
    features: ['5:30 AM – 9:30 AM', 'Max 6 passengers', 'Licensed tracker & driver', 'Bottled water included', 'Photo stop at key spots'],
  },
  {
    id: 'fullday',
    name: 'Full Day Safari',
    duration: '8–9 Hours',
    price: 'LKR 14,500',
    icon: '☀️',
    badge: 'Best Value',
    badgeColor: 'from-green-500 to-emerald-600',
    description: 'Full park access from dawn to dusk — maximum wildlife sightings including leopard, sloth bear, and crocodile.',
    features: ['5:30 AM – 2:30 PM', 'Max 6 passengers', 'Senior tracker', 'Lunch & refreshments', 'Block 1 + Block 5 access', 'Unlimited photo stops'],
  },
  {
    id: 'evening',
    name: 'Evening Sunset Drive',
    duration: '3–4 Hours',
    price: 'LKR 7,000',
    icon: '🌙',
    badge: 'Scenic Choice',
    badgeColor: 'from-purple-500 to-indigo-600',
    description: "Golden hour through Yala's lagoons — perfect for elephant herds, birds, and stunning Menik River sunsets.",
    features: ['2:30 PM – 6:30 PM', 'Max 6 passengers', 'Sunset lagoon route', 'Bottled water included', 'Ideal for photography'],
  },
];

export default function Booking() {
  const sectionRef = useRef(null);
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', date: '', guests: '2', package: 'fullday', hotel: '', message: '' });
    setSelected('fullday');
  };

  const selectedPkg = jeepPackages.find(p => p.id === selected);

  return (
    <section id="booking" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-green-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="text-green-900 text-sm font-semibold tracking-widest uppercase">Reserve Your Jeep</span>
          <h2 className="text-4xl sm:text-5xl font-black text-green-900 mt-3 mb-4">Book a Yala Jeep Safari</h2>
          <div className="section-divider mb-6" />
          <p className="text-green-900 max-w-xl mx-auto text-base">
            Select a package and submit your details. We'll confirm your Yala safari booking within a few hours via WhatsApp or email.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12 reveal">
          {jeepPackages.map((pkg) => (
            <button key={pkg.id} id={`pkg-${pkg.id}`}
              onClick={() => { setSelected(pkg.id); setForm(f => ({ ...f, package: pkg.id })); }}
              className={`jeep-card text-left glass-card rounded-2xl p-5 border-2 transition-all duration-300 ${selected === pkg.id ? 'border-green-400/60 bg-green-400/5' : 'border-transparent hover:border-green-700/30'}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{pkg.icon}</span>
                {pkg.badge && (
                  <span className={`text-xs font-bold text-green-900 px-2.5 py-1 rounded-full bg-gradient-to-r ${pkg.badgeColor}`}>{pkg.badge}</span>
                )}
              </div>
              <h3 className="text-green-900 font-bold text-lg mb-1">{pkg.name}</h3>
              <p className="text-green-900 text-xs mb-3">{pkg.duration}</p>
              <div className="text-xl font-black stat-number">{pkg.price} <span className="text-green-900 text-xs font-normal">/ jeep</span></div>
              <p className="text-green-900 text-xs mt-2 leading-relaxed">{pkg.description}</p>
              <ul className="mt-4 space-y-1.5">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-green-900">
                    <span className="text-green-400 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              {selected === pkg.id && (
                <div className="mt-4 pt-3 border-t border-green-700/30 text-green-400 text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Selected
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="reveal glass-card rounded-3xl p-6 sm:p-10 border border-green-700/20">
          {submitted ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🐆</div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">Booking Request Received!</h3>
              <p className="text-green-900 max-w-md mx-auto">
                Thank you! Our team will WhatsApp or email you within a few hours to confirm your <strong className="text-green-400">{selectedPkg?.name}</strong> at Yala National Park.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-green-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" /> We'll be in touch soon!
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold text-green-900">
                    {selectedPkg?.icon} {selectedPkg?.name}
                    <span className="ml-3 text-green-400">{selectedPkg?.price} / jeep</span>
                  </h3>
                  <p className="text-green-900 text-sm mt-1">Fill in your details — we'll confirm via WhatsApp</p>
                </div>
              </div>

              <form id="booking-form" onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Full Name *</label>
                  <input id="booking-name" name="name" type="text" required value={form.name} onChange={handleChange}
                    placeholder="Your full name"
                    className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 placeholder-white/20 text-sm transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Email Address *</label>
                  <input id="booking-email" name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 placeholder-white/20 text-sm transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">WhatsApp / Phone *</label>
                  <input id="booking-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 placeholder-white/20 text-sm transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Safari Date *</label>
                  <input id="booking-date" name="date" type="date" required value={form.date} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 text-sm transition-all duration-300"
                    style={{ colorScheme: 'dark' }} />
                </div>
                <div>
                  <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Number of Guests *</label>
                  <select id="booking-guests" name="guests" required value={form.guests} onChange={handleChange}
                    className="safari-input w-full bg-green-100 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 text-sm transition-all duration-300">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Safari Package *</label>
                  <select id="booking-package" name="package" value={form.package}
                    onChange={(e) => { handleChange(e); setSelected(e.target.value); }}
                    className="safari-input w-full bg-green-100 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 text-sm transition-all duration-300">
                    {jeepPackages.map(p => <option key={p.id} value={p.id}>{p.name} — {p.price}/jeep</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Your Hotel / Location in Yala Area</label>
                  <input id="booking-hotel" name="hotel" type="text" value={form.hotel} onChange={handleChange}
                    placeholder="e.g. Tissamaharama, Yala Village Hotel..."
                    className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 placeholder-white/20 text-sm transition-all duration-300" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Special Requests</label>
                  <textarea id="booking-message" name="message" rows={3} value={form.message} onChange={handleChange}
                    placeholder="Dietary requirements, accessibility, anniversary, wildlife photography focus..."
                    className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 placeholder-white/20 text-sm resize-none transition-all duration-300" />
                </div>
                <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-green-900 text-xs">🔒 No payment now. We confirm via WhatsApp first.</p>
                  <button id="booking-submit-btn" type="submit"
                    className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-green-50 font-bold text-sm rounded-full hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300">
                    Request My Safari →
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
