import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/* ── Data ─────────────────────────────────────────────────── */
const stats = [
  { value: '10+', label: 'Years in Yala' },
  { value: '5k+', label: 'Happy Guests' },
  { value: '98%', label: 'Satisfaction' },
  { value: '100%', label: 'Licensed & Safe' },
];

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
        <path d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
      </svg>
    ),
    title: 'Expert Trackers',
    desc: "Our guides have spent over a decade reading Yala's terrain — every trail, waterhole, and leopard corridor.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Prime Locations',
    desc: "Exclusive access to Block 1 — Yala's most biodiverse zone, home to leopards, elephants & sloth bears.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
      </svg>
    ),
    title: 'Premium Jeeps',
    desc: 'Open-top 4×4 Land Cruisers with coolers, charging ports, and binoculars for the perfect safari.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Eco-Responsible',
    desc: "Fully licensed by Sri Lanka's Dept. of Wildlife Conservation — we protect what we show you.",
  },
];

/* ── Star SVG ─────────────────────────────────────────────── */
function Star({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 90);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 55);
    });
  }, [isDark]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative scroll-mt-24 sm:scroll-mt-28 pt-8 sm:pt-12 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans"
      style={{ backgroundColor: 'var(--section-bg)', color: 'var(--text-primary)' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full blur-[150px] opacity-40"
        style={{ background: isDark ? 'rgba(52,211,153,0.07)' : 'rgba(52,211,153,0.13)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full blur-[130px] opacity-30"
        style={{ background: isDark ? 'rgba(16,185,129,0.06)' : 'rgba(16,185,129,0.10)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-5 sm:mb-7 reveal grid lg:grid-cols-[0.95fr_1fr] gap-8 lg:gap-12 items-end">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest"
                style={{ background: 'var(--badge-bg)', color: 'var(--badge-text)', border: '1px solid var(--border)' }}
              >
                <Star className="w-2.5 h-2.5" />
                Since 2014
              </span>
            </div>

            <h2
              className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-black tracking-tight leading-[1.08]"
              style={{ color: 'var(--text-primary)' }}
            >
              The heart behind<br />
              <span className="gradient-text">every safari.</span>
            </h2>
          </div>

          <p
            className={`text-[15px] sm:text-[15.5px] leading-relaxed font-normal ${isDark ? 'text-white/90' : 'text-emerald-950/85'}`}
          >
            Since 2014, we have been guiding adventurers deep into Yala National Park,
            crafting wildlife encounters that stay with you for a lifetime.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[0.95fr_1fr] gap-8 lg:gap-12 items-start mb-14 sm:mb-20">

          {/* Image */}
          <div className="reveal">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}
            >
              <img
                src="/images/about.jpg"
                alt="Safari guide with jeep at Yala National Park, Sri Lanka"
                className="w-full h-60 sm:h-[22rem] lg:h-[26rem] object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
            </div>
          </div>

          {/* Story + Stats + CTA */}
          <div className="space-y-6">

            {/* Story text */}
            <div className="reveal space-y-3.5">
              <p className={`text-[15px] sm:text-[15.5px] leading-relaxed font-normal ${isDark ? 'text-white/90' : 'text-emerald-950/85'}`}>
                Founded by veteran tracker{' '}
                <strong className={isDark ? 'text-white font-semibold' : 'text-emerald-900 font-semibold'}>Suresh Bandara</strong>,
                Yala Safari Jeep grew from a single jeep and an obsession with Yala's wildlife
                into the park's most-requested safari service.
              </p>
              <p className={`text-[15px] sm:text-[15.5px] leading-relaxed font-normal ${isDark ? 'text-white/90' : 'text-emerald-950/85'}`}>
                We operate strictly within guidelines set by the Department of Wildlife Conservation —
                so every sighting is ethical, every experience sustainable, and the park stays
                wild for generations.
              </p>
            </div>

            {/* Stats — always 2-col on mobile, 4-col on sm+ */}
            <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="py-4 px-2 rounded-xl text-center transition-transform duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <div className="text-xl sm:text-2xl font-black stat-number leading-none mb-1">{s.value}</div>
                  <div className="text-[9.5px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal">
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-[0.97]"
                style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
              >
                Book a Jeep Safari
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          className="reveal mb-10 sm:mb-14"
          style={{ height: '1px', background: 'var(--border)' }}
        />

        {/* PILLARS HEADER */}
        <div className="reveal mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-3"
              style={{ background: 'var(--badge-bg)', color: 'var(--badge-text)', border: '1px solid var(--border)' }}
            >
              Our Strengths
            </span>
            <h3
              className="text-2xl sm:text-3xl font-black tracking-tight leading-snug"
              style={{ color: 'var(--text-primary)' }}
            >
              Why you choose <span className="gradient-text">us</span>
            </h3>
          </div>
          <p
            className={`text-xs sm:text-[13px] leading-relaxed max-w-sm font-normal ${isDark ? 'text-white/80' : 'text-emerald-950/75'}`}
          >
            Built on over a decade of tracking expertise, uncompromising safety, and ethical wildlife exploration.
          </p>
        </div>

        {/* PILLARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal group p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--card-shadow)',
                transitionDelay: i * 55 + 'ms',
              }}
            >
              <div
                className="w-9 h-9 flex items-center justify-center rounded-xl mb-3.5 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white"
                style={{
                  background: 'var(--icon-bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                {p.icon}
              </div>
              <h4 className="font-semibold text-[14px] mb-1.5 leading-snug" style={{ color: 'var(--text-primary)' }}>
                {p.title}
              </h4>
              <p className={`text-[13px] leading-relaxed font-normal ${isDark ? 'text-white/90' : 'text-emerald-950/85'}`}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
