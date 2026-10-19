import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiImage } from 'react-icons/fi';

const DEFAULT_SLIDES = [
  { src: '/images/gallery_1.jpg', label: 'Sri Lankan Leopard', sub: 'Yala Block 1' },
  { src: '/images/gallery_2.jpg', label: 'Elephant Bathing', sub: 'Menik River, Yala' },
  { src: '/images/gallery_3.jpg', label: 'Jeep Safari Encounter', sub: 'Yala National Park' },
];

export default function Hero() {
  const textRef = useRef(null);
  const { isDark } = useTheme();
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  // Fetch dynamic hero slideshow photos from MongoDB
  useEffect(() => {
    let isMounted = true;
    async function fetchHeroSlides() {
      try {
        const res = await fetch('/api/gallery/hero');
        const data = await res.json();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item) => ({
            src: item.imageUrl || item.src,
            label: item.title || 'Yala Safari',
            sub: item.desc || item.tag || 'Yala National Park',
          }));

          if (mapped.length >= 3) {
            setSlides(mapped.slice(0, 3));
          } else {
            // Pad with defaults if fewer than 3 photos selected
            const padded = [...mapped];
            for (const def of DEFAULT_SLIDES) {
              if (padded.length >= 3) break;
              if (!padded.some((p) => p.src === def.src)) {
                padded.push(def);
              }
            }
            setSlides(padded);
          }
        }
      } catch (err) {
        console.warn('Could not load hero slides, using defaults:', err);
      }
    }

    fetchHeroSlides();
    return () => {
      isMounted = false;
    };
  }, []);

  const goTo = useCallback(
    (idx) => {
      if (transitioning) return;
      setPrevIdx(current);
      setTransitioning(true);
      setCurrent(idx);
      setTimeout(() => {
        setPrevIdx(null);
        setTransitioning(false);
      }, 900);
    },
    [current, transitioning],
  );

  const goNext = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo, slides.length],
  );

  // Auto-advance every 4 s
  useEffect(() => {
    const t = setTimeout(goNext, 4000);
    return () => clearTimeout(t);
  }, [current, goNext]);

  // Entrance animation
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  }, []);

  return (
    <section
      id="home"
      className={`relative h-[100dvh] flex items-center overflow-hidden font-sans transition-colors duration-500 ${isDark ? 'bg-[#0a0f0d] text-white' : 'bg-[#f0faf2] text-[#0d2b0d]'}`}
    >
      {/* Background Animated Aurora & Mesh Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Radial Spotlight behind the cards and content */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 95% 65% at 75% 45%, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.16) 40%, transparent 70%), radial-gradient(ellipse 75% 55% at 15% 30%, rgba(16, 185, 129, 0.25) 0%, transparent 65%)'
              : 'radial-gradient(ellipse 95% 65% at 75% 45%, rgba(16, 185, 129, 0.42) 0%, rgba(52, 211, 153, 0.2) 40%, transparent 70%), radial-gradient(ellipse 75% 55% at 15% 30%, rgba(5, 150, 105, 0.28) 0%, transparent 65%)',
          }}
        />

        {/* Animated Aurora Beam layer with feathered radial mask to hide all edges */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)',
          }}
        >
          <div
            className={`absolute -inset-[100%] transition-opacity duration-1000 ${isDark ? 'opacity-65 mix-blend-screen' : 'opacity-55 mix-blend-multiply'
              }`}
            style={{
              backgroundImage: isDark
                ? 'conic-gradient(from 180deg at 50% 50%, rgba(16, 185, 129, 0.35) 0deg, rgba(6, 95, 70, 0.05) 90deg, rgba(52, 211, 153, 0.3) 180deg, rgba(6, 95, 70, 0.05) 270deg, rgba(16, 185, 129, 0.35) 360deg)'
                : 'conic-gradient(from 180deg at 50% 50%, rgba(16, 185, 129, 0.45) 0deg, rgba(52, 211, 153, 0.1) 90deg, rgba(5, 150, 105, 0.4) 180deg, rgba(52, 211, 153, 0.1) 270deg, rgba(16, 185, 129, 0.45) 360deg)',
              filter: 'blur(60px)',
              animation: 'auroraRotate 28s linear infinite',
            }}
          />
        </div>

        {/* Soft breathing pulse behind the center carousel card */}
        <div
          className={`absolute top-1/2 right-[12%] -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[110px] pointer-events-none transition-all duration-700 ${isDark ? 'bg-emerald-500/35' : 'bg-emerald-400/40'
            }`}
          style={{
            animation: 'cardAuraPulse 7s ease-in-out infinite alternate',
          }}
        />

        {/* Enhanced grid texture overlay for depth (feathered to left side) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-[0.07]' : 'opacity-[0.06]'
            }`}
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)'
              : 'radial-gradient(rgba(13,43,13,0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 65% 70% at 25% 45%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 70% at 25% 45%, black 20%, transparent 75%)',
          }}
        />
      </div>

      {/* ── Seamless Blended Wildlife Showcase (Full section bleed, zero hard borders) ── */}
      <div className="hero-image-panel absolute inset-0 w-full h-full select-none pointer-events-none overflow-hidden z-10">
        {/* Dual-axis smooth feathered mask containers (no mask-composite quirks) */}
        <div className="hero-vertical-mask absolute inset-0 w-full h-full">
          <div className="hero-horizontal-mask absolute inset-0 w-full h-full">
            {/* Stacked images with smooth cross-fade */}
            {slides.map((slide, i) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.label}
                className="absolute inset-0 w-full h-full object-cover object-center lg:object-[75%_center]"
                style={{
                  opacity: i === current ? 1 : 0,
                  zIndex: i === current ? 2 : i === prevIdx ? 1 : 0,
                  transform: i === current ? 'scale(1.04)' : 'scale(1)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '1.2s, 8s',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1), ease-out',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Background & Accent Color Blend Overlays (Seamless Emerald + Bg Melt) ── */}

        {/* 1. Desktop Left Edge: Continuous color mix combining background tone with rich emerald accent glow */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          style={{
            background: isDark
              ? 'linear-gradient(to right, #0a0f0d 0%, rgba(10,15,13,0.96) 20%, rgba(6,78,59,0.5) 38%, rgba(16,185,129,0.2) 56%, rgba(10,15,13,0.08) 75%, transparent 92%)'
              : 'linear-gradient(to right, #f0faf2 0%, rgba(240,250,242,0.96) 20%, rgba(16,185,129,0.35) 38%, rgba(52,211,153,0.18) 56%, rgba(240,250,242,0.08) 75%, transparent 92%)',
          }}
        />

        {/* 2. Bottom Edge: Melts smoothly into section bottom with emerald accent undertone */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to top, #0a0f0d 0%, #0a0f0d 6%, rgba(10,15,13,0.85) 15%, rgba(6,78,59,0.22) 30%, transparent 50%)'
              : 'linear-gradient(to top, #f0faf2 0%, #f0faf2 6%, rgba(240,250,242,0.85) 15%, rgba(16,185,129,0.2) 30%, transparent 50%)',
          }}
        />

        {/* 3. Top Edge: Soft melt under navbar */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, #0a0f0d 0%, rgba(10,15,13,0.75) 8%, transparent 28%)'
              : 'linear-gradient(to bottom, #f0faf2 0%, rgba(240,250,242,0.75) 8%, transparent 28%)',
          }}
        />

        {/* 4. Mobile: Atmospheric wash blending emerald accent with background for legible text */}
        <div
          className="absolute inset-0 z-10 pointer-events-none lg:hidden"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(10,15,13,0.92) 0%, rgba(6,78,59,0.6) 40%, rgba(10,15,13,0.85) 75%, #0a0f0d 100%)'
              : 'linear-gradient(to bottom, rgba(240,250,242,0.92) 0%, rgba(16,185,129,0.45) 40%, rgba(240,250,242,0.88) 75%, #f0faf2 100%)',
          }}
        />
      </div>

      {/* ── Content Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pointer-events-none">
        <div className="flex items-center h-[100dvh]">

          {/* ── Left: Content ── */}
          <div ref={textRef} className="pointer-events-auto flex flex-col items-center lg:items-start text-center lg:text-left justify-center py-1 sm:py-4 lg:py-0 w-full lg:max-w-[50%] xl:max-w-[46%]">

            {/* Badge */}
            <div className={`inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full backdrop-blur-md mb-3.5 sm:mb-5 shadow-sm transition-all ${isDark ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' : 'bg-emerald-100 border border-emerald-300/80 text-emerald-900'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase">Yala National Park, Sri Lanka</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] mb-3.5 sm:mb-5 drop-shadow-sm ${isDark ? 'text-white' : 'text-[#0a230a]'}`}>
              Discover the<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-emerald-300 via-green-300 to-teal-200' : 'from-emerald-600 via-green-700 to-emerald-800'}`}>
                Untamed Wild
              </span>
            </h1>

            <p className={`text-base sm:text-lg lg:text-lg mb-5 sm:mb-7 leading-relaxed max-w-xl font-normal mx-auto lg:mx-0 ${isDark ? 'text-white/90' : 'text-emerald-950/85'}`}>
              Experience the world's highest density of wild leopards and majestic elephants on an unforgettable jeep safari through Yala National Park.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5">
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:px-8 sm:py-3.5 font-semibold text-sm sm:text-base text-center rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-[0.98] ${isDark ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]' : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'}`}
              >
                <span className="relative z-10">Book Safari</span>
                {isDark && <div className="absolute inset-0 bg-emerald-50 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />}
              </button>

              <button
                onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group px-5 py-3 sm:px-8 sm:py-3.5 font-medium text-sm sm:text-base rounded-full transition-all duration-300 flex items-center justify-center gap-2 sm:gap-2.5 backdrop-blur-md hover:scale-105 active:scale-[0.98] ${isDark ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white/70 border border-emerald-300/60 text-emerald-800 hover:bg-white shadow-sm'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${isDark ? 'bg-white/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                  <FiImage className="w-3.5 h-3.5" />
                </div>
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes auroraRotate {
          0%   { transform: rotate(0deg)   scale(1); }
          50%  { transform: rotate(180deg) scale(1.08); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes cardAuraPulse {
          0%   { transform: translateY(-50%) scale(0.92); opacity: 0.55; }
          50%  { transform: translateY(-50%) scale(1.14); opacity: 0.95; }
          100% { transform: translateY(-50%) scale(1);    opacity: 0.7; }
        }

        .hero-vertical-mask {
          -webkit-mask-image: linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 8%, black 25%);
          mask-image: linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 8%, black 25%);
        }

        @media (min-width: 1024px) {
          .hero-horizontal-mask {
            -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 22%, rgba(0,0,0,0.06) 36%, rgba(0,0,0,0.35) 54%, rgba(0,0,0,0.8) 72%, black 90%);
            mask-image: linear-gradient(to right, transparent 0%, transparent 22%, rgba(0,0,0,0.06) 36%, rgba(0,0,0,0.35) 54%, rgba(0,0,0,0.8) 72%, black 90%);
          }
        }

        @media (max-width: 1023px) {
          .hero-horizontal-mask {
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 35%, black 70%);
            mask-image: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 35%, black 70%);
          }
        }
      `}</style>
    </section>
  );
}
