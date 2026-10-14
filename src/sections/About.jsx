import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  FiCompass,
  FiMapPin,
  FiTruck,
  FiShield,
  FiCheckCircle,
  FiArrowUpRight,
  FiMail,
} from 'react-icons/fi';

/* ── Data ─────────────────────────────────────────────────── */
const stats = [
  { value: '10+', label: 'Years in Yala' },
  { value: '5k+', label: 'Happy Guests' },
  { value: '98%', label: 'Satisfaction' },
  { value: '100%', label: 'Licensed & Safe' },
];

const pillars = [
  {
    tag: 'Field Mastery',
    title: 'Expert Trackers',
    desc: "Our guides have spent over a decade reading Yala's terrain — every trail, waterhole, and leopard corridor.",
    highlight: '10+ Years Field Exp',
    icon: FiCompass,
    accentGlow: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
  },
  {
    tag: 'Priority Entry',
    title: 'Prime Locations',
    desc: "Exclusive access to Block 1 & 5 — Yala's most biodiverse zones, home to leopards, elephants & sloth bears.",
    highlight: 'Block 1 Exclusive Permits',
    icon: FiMapPin,
    accentGlow: 'from-green-500/20 via-green-500/5 to-transparent',
  },
  {
    tag: 'Custom Fleet',
    title: 'Premium Jeeps',
    desc: 'Open-top 4×4 Land Cruisers with cushioned seating, coolers, USB charging ports, and precision optics.',
    highlight: 'Cushioned 4×4 & Optics',
    icon: FiTruck,
    accentGlow: 'from-teal-500/20 via-teal-500/5 to-transparent',
  },
  {
    tag: 'Wildlife Ethics',
    title: 'Eco-Responsible',
    desc: "Fully licensed by Sri Lanka's Dept. of Wildlife Conservation — we strictly protect and respect what we show you.",
    highlight: 'Govt. DWC Licensed',
    icon: FiShield,
    accentGlow: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
  },
];


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
      className={`relative scroll-mt-24 sm:scroll-mt-28 pt-12 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans transition-colors duration-500 border-y ${isDark
        ? 'bg-[#0e1713] border-white/[0.06] text-white'
        : 'bg-[#e7f5ea] border-emerald-900/10 text-[#0d2b0d]'
        }`}
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
        <div className="grid lg:grid-cols-[0.95fr_1fr] gap-8 lg:gap-12 items-center mb-14 sm:mb-20">

          {/* Image */}
          <div className="reveal">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}
            >
              <img
                src="/images/about.jpg"
                alt="Safari guide with jeep at Yala National Park, Sri Lanka"
                className="w-full h-56 sm:h-72 lg:h-[21rem] object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
            </div>
          </div>

          {/* Story + Stats + CTA */}
          <div className="space-y-6 flex flex-col justify-center">

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
            <div className="reveal flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-3.5">
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:px-8 sm:py-3.5 font-semibold text-sm sm:text-base text-center rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-[0.98] ${isDark
                    ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                  }`}
              >
                <span className="relative z-10">Book a Jeep</span>
                {isDark && (
                  <div className="absolute inset-0 bg-emerald-50 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                )}
              </button>

              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group px-5 py-3 sm:px-7 sm:py-3.5 font-medium text-sm sm:text-base rounded-full transition-all duration-300 flex items-center justify-center gap-2 sm:gap-2.5 backdrop-blur-md hover:scale-105 active:scale-[0.98] ${
                  isDark
                    ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    : 'bg-white/70 border border-emerald-300/60 text-emerald-800 hover:bg-white shadow-sm'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isDark ? 'bg-white/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  <FiMail className="w-3.5 h-3.5" />
                </div>
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* MODERN SECTION SEPARATOR */}
        <div className="reveal relative mb-12 sm:mb-16">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent" />
          <div
            className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 rotate-45 border border-emerald-500/40"
            style={{ background: isDark ? '#0e1713' : '#e7f5ea' }}
          />
        </div>

        {/* PILLARS HEADER */}
        <div className="reveal mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-8">
          <div className="max-w-xl">
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.12]"
              style={{ color: 'var(--text-primary)' }}
            >
              Why you choose <span className="gradient-text">us</span>
            </h3>
          </div>

          <div className="md:max-w-md">
            <p
              className={`text-justify text-xs sm:text-[13.5px] leading-relaxed font-normal mb-3 ${isDark ? 'text-white/80' : 'text-emerald-950/80'
                }`}
            >
              Built on over a decade of tracking expertise, uncompromising safety, and ethical wildlife exploration across Yala's most secluded zones.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="inline-flex items-center gap-1.5">
                <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                100% Ethical Wildlife Policy
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                DWC Licensed Naturalists
              </span>
            </div>
          </div>
        </div>

        {/* MODERN PILLAR BENTO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="reveal group relative flex flex-col justify-between p-6 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden backdrop-blur-md"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--card-shadow)',
                  transitionDelay: i * 60 + 'ms',
                }}
              >
                {/* Glowing Top Border Highlight Accent */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent group-hover:h-[3px] group-hover:via-emerald-400 transition-all duration-500" />

                {/* Ambient Card Hover Glow */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${p.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Top Row: Icon + Watermark Step Number */}
                <div className="relative z-10 flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[0_8px_20px_rgba(16,185,129,0.35)]"
                    style={{
                      background: 'var(--icon-bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-emerald-500 dark:group-hover:text-emerald-300" />
                  </div>

                  {/* Watermark Index */}
                  <span className="font-mono text-2xl font-black tracking-tight opacity-20 group-hover:opacity-50 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-300 select-none">
                    {p.step}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="relative z-10 space-y-2 mb-5">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                    {p.tag}
                  </span>
                  <h4
                    className="font-bold text-lg sm:text-[1.15rem] leading-snug tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {p.title}
                  </h4>
                  <p
                    className={`text-[13px] sm:text-[13.5px] leading-relaxed font-normal ${isDark ? 'text-white/80' : 'text-emerald-950/80'
                      }`}
                  >
                    {p.desc}
                  </p>
                </div>

                {/* Bottom Highlight Pill */}
                <div
                  className="relative z-10 pt-3.5 border-t flex items-center justify-between mt-auto"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {p.highlight}
                  </span>

                  <FiArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
