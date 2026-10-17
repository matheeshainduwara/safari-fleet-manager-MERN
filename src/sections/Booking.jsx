import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  FiLock,
  FiCheck,
  FiUserCheck,
  FiShield,
  FiCalendar,
  FiClock,
  FiUsers,
  FiMapPin,
  FiCheckCircle,
  FiLoader,
  FiArrowRight,
} from 'react-icons/fi';

const defaultPackages = [
  {
    id: 'morning',
    name: 'Morning Game Drive',
    duration: '3–4 Hours',
    price: 'LKR 6,500',
    icon: '🌅',
    badge: 'Most Popular',
    badgeColor: 'from-emerald-500 to-green-600',
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
    badgeColor: 'from-teal-500 to-emerald-600',
    description: "Golden hour through Yala's lagoons — perfect for elephant herds, birds, and stunning Menik River sunsets.",
    features: ['2:30 PM – 6:30 PM', 'Max 6 passengers', 'Sunset lagoon route', 'Bottled water included', 'Ideal for photography'],
  },
];

export default function Booking() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  
  const [packagesList, setPackagesList] = useState(defaultPackages);
  const [selected, setSelected] = useState('fullday');
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date: '',
    guests: '2',
    package: 'fullday',
    hotel: '',
    message: '',
  });

  // Keep form synced when user logs in or out
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  // Fetch live packages from API if available, fallback to default packages
  useEffect(() => {
    fetch('/api/packages')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeOnly = data.filter((p) => p.active !== false);
          if (activeOnly.length > 0) {
            setPackagesList(
              activeOnly.map((p, idx) => ({
                id: p._id || p.id || `pkg-${idx}`,
                name: p.name,
                duration: p.duration,
                price: p.price,
                icon: p.icon || (idx === 0 ? '🌅' : idx === 1 ? '☀️' : '🌙'),
                badge: p.badge || (idx === 0 ? 'Featured' : ''),
                badgeColor: idx === 1 ? 'from-green-500 to-emerald-600' : 'from-emerald-500 to-green-600',
                description: p.description,
                features: Array.isArray(p.features) ? p.features : [],
              }))
            );
          }
        }
      })
      .catch((err) => console.warn('Using default safari packages fallback:', err));
  }, []);

  // Intersection observer for smooth reveals
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animElements = section.querySelectorAll('.reveal');
    if (!animElements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
              entry.target.setAttribute('data-revealed', 'true');
            }, Number(delay));
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [packagesList]);

  // Re-apply visible class after theme change re-renders the DOM
  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll('[data-revealed="true"]').forEach((el) => {
      el.classList.add('visible');
    });
  }, [isDark]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal('register');
      return;
    }

    setIsSubmitting(true);
    const selectedPkg = packagesList.find((p) => p.id === selected) || packagesList[0];

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      package: selectedPkg?.name || form.package,
      date: form.date,
      guests: Number(form.guests) || 1,
      hotel: form.hotel || 'Not specified',
      message: form.message || '',
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.warn('Booking API returned error:', errorData);
      }
    } catch (err) {
      console.warn('Booking network error (client handled gracefully):', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedData({
        ...payload,
        packageName: selectedPkg?.name,
        price: selectedPkg?.price,
      });
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedData(null);
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      date: '',
      guests: '2',
      package: selected,
      hotel: '',
      message: '',
    });
  };

  const selectedPkg = packagesList.find((p) => p.id === selected) || packagesList[0];

  const inputCls = `w-full rounded-xl px-4 py-3.5 text-sm transition-all duration-300 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 ${
    isDark
      ? 'bg-[#0a0f0d]/70 border border-white/10 text-white placeholder-neutral-500'
      : 'bg-[#f0faf0]/60 border border-emerald-300/50 text-[#0d2b0d] placeholder-neutral-400'
  }`;

  const labelCls = `block text-xs font-semibold mb-2 tracking-widest uppercase ${
    isDark ? 'text-neutral-300' : 'text-[#2e622e]'
  }`;

  return (
    <section
      id="booking"
      ref={sectionRef}
      className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#0a0f0d] text-white' : 'bg-[#f0faf0] text-[#0d2b0d]'
      }`}
    >
      {/* Dynamic Ambient Background Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER - matching Gallery's 2-column editorial header */}
        <div className="mb-10 sm:mb-14 reveal grid lg:grid-cols-[0.95fr_1fr] gap-6 lg:gap-12 items-end">
          <div>
            <h2
              className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-black tracking-tight leading-[1.08]"
              style={{ color: 'var(--text-primary)' }}
            >
              Reserve your safari jeep in<br />
              <span className="gradient-text">the heart of the wild.</span>
            </h2>
          </div>

          <p
            className={`text-[15px] sm:text-[15.5px] leading-relaxed font-normal ${
              isDark ? 'text-white/90' : 'text-emerald-950/85'
            }`}
          >
            Select your preferred expedition, customize your safari details, and secure your customized 4×4 open-top jeep with a licensed wildlife tracker. We confirm your date and pickup within hours.
          </p>
        </div>

        {/* STEP 1: Package Selection Sub-Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 reveal">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                isDark
                  ? 'bg-white/10 border border-white/20 text-white backdrop-blur-md'
                  : 'bg-emerald-800/10 border border-emerald-800/20 text-emerald-900 backdrop-blur-md'
              }`}
            >
              Step 01
            </span>
            <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
              Select Safari Experience
            </h3>
          </div>
          <span className={`text-xs font-light ${isDark ? 'text-neutral-400' : 'text-emerald-900/70'}`}>
            * All packages include licensed driver, tracker, and park assistance
          </span>
        </div>

        {/* Safari Package Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16 reveal">
          {packagesList.map((pkg, idx) => {
            const isSelected = selected === pkg.id;
            return (
              <button
                key={pkg.id}
                id={`pkg-${pkg.id}`}
                type="button"
                data-delay={idx * 100}
                onClick={() => {
                  setSelected(pkg.id);
                  setForm((f) => ({ ...f, package: pkg.id }));
                }}
                className={`text-left rounded-[2rem] p-6 sm:p-8 transition-all duration-300 border relative flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'border-emerald-500/80 bg-emerald-950/20 shadow-[0_0_35px_rgba(16,185,129,0.18)] ring-1 ring-emerald-500/50 scale-[1.01]'
                      : 'border-emerald-500/80 bg-white shadow-[0_0_35px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50 scale-[1.01]'
                    : isDark
                      ? 'border-white/10 bg-[#0e1612]/70 hover:border-white/20 hover:bg-[#0e1612]'
                      : 'border-emerald-300/30 bg-[#e7f5ea]/80 hover:border-emerald-400/50 hover:bg-[#e7f5ea]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 ${
                        isDark ? 'bg-white/5 border border-white/10' : 'bg-emerald-100/60 border border-emerald-200/50'
                      }`}
                    >
                      {pkg.icon}
                    </div>
                    {pkg.badge && (
                      <span
                        className={`text-[10px] font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r ${
                          pkg.badgeColor || 'from-emerald-500 to-green-600'
                        } shadow-md tracking-wider uppercase`}
                      >
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <h3 className={`font-bold text-xl sm:text-2xl mb-1 tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                    {pkg.name}
                  </h3>
                  <p className="text-emerald-500 text-xs font-semibold mb-4 uppercase tracking-wider">
                    {pkg.duration}
                  </p>

                  <div className={`text-3xl font-black mb-4 tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                    {pkg.price}{' '}
                    <span className={`text-sm font-normal ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>
                      / jeep
                    </span>
                  </div>

                  <p className={`text-sm mb-6 leading-relaxed font-light ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>
                    {pkg.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-3 text-sm font-light ${
                          isDark ? 'text-neutral-300' : 'text-[#1a4d1a]'
                        }`}
                      >
                        <FiCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isSelected ? (
                  <div className="pt-4 border-t border-emerald-500/20 text-emerald-500 text-sm font-semibold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Package Selected</span>
                  </div>
                ) : (
                  <div
                    className={`pt-4 border-t text-xs font-medium transition-colors ${
                      isDark
                        ? 'border-white/5 text-neutral-400 group-hover:text-emerald-400'
                        : 'border-emerald-200/40 text-emerald-800/60 group-hover:text-emerald-700'
                    }`}
                  >
                    Click to choose this package →
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* STEP 2: Booking Form Card */}
        <div
          className={`reveal rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl border backdrop-blur-xl ${
            isDark
              ? 'border-white/10 bg-[#0e1612]/80 shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
              : 'border-emerald-300/30 bg-white/95 shadow-[0_4px_30px_rgba(0,0,0,0.06)]'
          }`}
        >
          {submitted ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className={`text-2xl sm:text-4xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                Safari Reservation Requested!
              </h3>
              <p
                className={`max-w-lg mx-auto text-base sm:text-lg font-light leading-relaxed mb-6 ${
                  isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'
                }`}
              >
                Thank you! Our expedition coordinator will contact you via WhatsApp / Phone to confirm your{' '}
                <strong className="text-emerald-500 font-semibold">{submittedData?.packageName || selectedPkg?.name}</strong>{' '}
                safari jeep and coordinate hotel pickup.
              </p>

              {submittedData && (
                <div
                  className={`max-w-md mx-auto rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm border mb-8 ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-neutral-300'
                      : 'bg-emerald-50/60 border-emerald-200 text-[#1a4d1a]'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-2 pb-3 mb-3 border-b border-white/10">
                    <div>
                      <span className="opacity-60 block text-[11px] uppercase">Package</span>
                      <strong className="font-semibold">{submittedData.packageName || selectedPkg?.name}</strong>
                    </div>
                    <div>
                      <span className="opacity-60 block text-[11px] uppercase">Rate</span>
                      <strong className="font-semibold text-emerald-500">{submittedData.price || selectedPkg?.price}</strong>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="opacity-60 block text-[11px] uppercase">Date</span>
                      <span>{submittedData.date || 'To be confirmed'}</span>
                    </div>
                    <div>
                      <span className="opacity-60 block text-[11px] uppercase">Guests</span>
                      <span>{submittedData.guests} Guest(s)</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div
                  className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs sm:text-sm ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-neutral-300'
                      : 'bg-emerald-50 border border-emerald-200 text-[#1a4d1a]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Team response time: ~2 hours</span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                >
                  Book Another Safari
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Form Sub-Header with Status */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b ${
                  isDark ? 'border-white/10' : 'border-emerald-200/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                      isDark
                        ? 'bg-white/10 border border-white/20 text-white backdrop-blur-md'
                        : 'bg-emerald-800/10 border border-emerald-800/20 text-emerald-900 backdrop-blur-md'
                    }`}
                  >
                    Step 02
                  </span>
                  <div>
                    <h3
                      className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 ${
                        isDark ? 'text-white' : 'text-[#0d2b0d]'
                      }`}
                    >
                      <span>{selectedPkg?.icon}</span>
                      <span>{selectedPkg?.name} Details</span>
                    </h3>
                    <p className={`text-xs sm:text-sm font-light mt-0.5 ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>
                      {isAuthenticated
                        ? `Logged in as ${user?.name || 'Member'} — confirm your reservation details below`
                        : 'Please complete your reservation details below to reserve your safari jeep'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {isAuthenticated ? (
                    <div
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
                        isDark
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      }`}
                    >
                      <FiUserCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Verified Member</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border hover:scale-105 ${
                        isDark
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                          : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      <FiLock className="w-3.5 h-3.5" />
                      <span>Login to Auto-fill</span>
                    </button>
                  )}
                  <div
                    className={`px-4 py-1.5 rounded-full font-bold whitespace-nowrap text-sm tracking-wide ${
                      isDark
                        ? 'bg-emerald-900/30 border border-emerald-500/30 text-emerald-400'
                        : 'bg-emerald-100 border border-emerald-300 text-emerald-700'
                    }`}
                  >
                    {selectedPkg?.price} <span className="text-xs font-normal opacity-80">/ jeep</span>
                  </div>
                </div>
              </div>

              {!isAuthenticated && (
                <div
                  className={`mb-8 p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md ${
                    isDark
                      ? 'bg-amber-500/5 border-amber-500/20 text-neutral-300'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
                      <FiShield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Registered Guests Guarantee</p>
                      <p className="text-xs opacity-80 font-light">
                        To guarantee jeep availability & direct WhatsApp driver coordination, sign in or register before booking.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuthModal('register')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isDark
                          ? 'border-white/20 text-white hover:bg-white/10'
                          : 'border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                      }`}
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}

              <form id="booking-form" onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. David Miller"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="david@example.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>WhatsApp / Phone *</label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Safari Date *</label>
                  <input
                    id="booking-date"
                    name="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={inputCls}
                    style={{ colorScheme: isDark ? 'dark' : 'light' }}
                  />
                </div>

                <div>
                  <label className={labelCls}>Number of Guests *</label>
                  <select
                    id="booking-guests"
                    name="guests"
                    required
                    value={form.guests}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className={isDark ? 'bg-[#0a0f0d] text-white' : 'bg-white text-black'}>
                        {n} {n === 1 ? 'Guest' : 'Guests'} (Private Jeep)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Safari Package *</label>
                  <select
                    id="booking-package"
                    name="package"
                    value={form.package}
                    onChange={(e) => {
                      handleChange(e);
                      setSelected(e.target.value);
                    }}
                    className={inputCls}
                  >
                    {packagesList.map((p) => (
                      <option key={p.id} value={p.id} className={isDark ? 'bg-[#0a0f0d] text-white' : 'bg-white text-black'}>
                        {p.name} — {p.price}/jeep
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Hotel / Pickup Location in Yala or Tissamaharama</label>
                  <input
                    id="booking-hotel"
                    name="hotel"
                    type="text"
                    value={form.hotel}
                    onChange={handleChange}
                    placeholder="e.g. Jetwing Yala, Cinnamon Wild, or Tissamaharama Town"
                    className={inputCls}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Special Requests & Wildlife Focus</label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Mention specific interests (leopards, birding photography, binoculars, dietary preferences, child seats...)"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div
                  className={`sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t ${
                    isDark ? 'border-white/10' : 'border-emerald-200/50'
                  }`}
                >
                  <p
                    className={`text-xs flex items-center gap-2 font-light ${
                      isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'
                    }`}
                  >
                    <FiShield className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>No advance payment needed today. Permits & jeep are verified prior to confirmation.</span>
                  </p>

                  <button
                    id="booking-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full sm:w-auto px-10 py-4 font-semibold text-sm rounded-full overflow-hidden transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer ${
                      !isAuthenticated
                        ? isDark
                          ? 'bg-amber-400 text-black hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]'
                          : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-[0_0_30px_rgba(22,101,52,0.3)]'
                        : isDark
                          ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]'
                          : 'bg-[#166534] text-white hover:bg-[#15803d] hover:shadow-[0_0_30px_rgba(22,101,52,0.3)]'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <FiLoader className="w-4 h-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : !isAuthenticated ? (
                        <>
                          <FiLock className="w-4 h-4" />
                          <span>Login to Reserve Jeep</span>
                        </>
                      ) : (
                        <>
                          <span>Request Safari Jeep</span>
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    {isDark && isAuthenticated && (
                      <div className="absolute inset-0 bg-emerald-50 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    )}
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
