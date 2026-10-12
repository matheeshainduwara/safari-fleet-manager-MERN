import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const stats = [
  { value: '10+', label: 'Years in Yala' },
  { value: '5k+', label: 'Happy Guests' },
  { value: '98%', label: 'Satisfaction' },
  { value: '100%', label: 'Licensed & Safe' },
];

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: 'Expert Trackers',
    desc: "Our guides have spent over a decade reading Yala's terrain — every trail, waterhole, and leopard corridor.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Prime Locations',
    desc: "We operate exclusively in Block 1 — Yala's most biodiverse zone, home to leopards, elephants & sloth bears.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: 'Premium Jeeps',
    desc: 'Open-top 4×4 Land Cruisers with coolers, charging ports, and binoculars for the perfect safari experience.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Eco-Responsible',
    desc: "Fully licensed by Sri Lanka's Dept. of Wildlife Conservation — we protect what we show you.",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();

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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  }, [isDark]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--section-bg)', color: 'var(--text-primary)' }}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans"
    >
      {/* Subtle ambient blobs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full blur-[140px]"
        style={{ background: isDark ? 'rgba(52,211,153,0.07)' : 'rgba(52,211,153,0.12)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full blur-[160px]"
        style={{ background: isDark ? 'rgba(22,101,52,0.12)' : 'rgba(22,101,52,0.08)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Heading ── */}
        <div className="text-center mb-16 reveal">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
            About <span className="gradient-text">Us</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-8" />

          <p className={`max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-light px-2 sm:px-0 ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>
            Since 2014, we've been guiding adventurers deep into Yala National Park — crafting wildlife
            encounters that stay with you for a lifetime.
          </p>
        </div>

        {/* ── Two-column: Image + Story ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Image */}
          <div className="reveal relative">
            <div
              className="relative rounded-3xl overflow-hidden group"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <img
                src="/images/about.jpg"
                alt="Safari guide with jeep in Yala National Park, Sri Lanka"
                className="w-full h-72 sm:h-[26rem] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Star badge overlay */}
              <div
                className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
                style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
                <span className="text-white text-xs font-medium">Top Rated on TripAdvisor</span>
              </div>
            </div>

            {/* Floating stat chip */}
            <div
              className="absolute -top-5 -right-4 sm:-right-6 px-5 py-3 rounded-2xl backdrop-blur-xl text-center hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div className="text-3xl font-black stat-number leading-none">10+</div>
              <div
                className="text-[11px] font-medium mt-1 uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Years in Yala
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="space-y-7">
            <div className="reveal">
              <p className="text-base leading-relaxed mb-4 font-light" style={{ color: 'var(--text-muted)' }}>
                Founded by veteran tracker{' '}
                <strong style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Suresh Bandara</strong>,
                Yala Safari Jeep grew from a single jeep and an obsession with Yala's wildlife into the park's
                most-requested safari service.
              </p>
              <p className="text-base leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                We operate strictly within guidelines set by the Department of Wildlife Conservation — so every
                sighting is ethical, every experience is sustainable, and the park stays wild for generations.
              </p>
            </div>

            {/* Stats row */}
            <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center py-4 px-2 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <div className="text-2xl font-black stat-number leading-none mb-1">{s.value}</div>
                  <div
                    className="text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal pt-1">
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
              >
                Book a Jeep Safari
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Feature pillars ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal group p-6 rounded-2xl cursor-default transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--card-shadow)',
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl mb-4 text-emerald-500 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white"
                style={{ background: 'var(--icon-bg)', border: '1px solid var(--border)' }}
              >
                {p.icon}
              </div>
              <h4 className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>
                {p.title}
              </h4>
              <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

