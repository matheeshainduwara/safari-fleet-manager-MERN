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

          if (mapped.length > 0) {
            if (mapped.length >= 3 || !Array.isArray(DEFAULT_SLIDES) || DEFAULT_SLIDES.length === 0) {
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
      if (transitioning || slides.length === 0) return;
      setPrevIdx(current);
      setTransitioning(true);
      setCurrent(idx);
      setTimeout(() => {
        setPrevIdx(null);
        setTransitioning(false);
      }, 900);
    },
    [current, transitioning, slides.length],
  );

  const goNext = useCallback(
    () => {
      if (slides.length <= 1) return;
      goTo((current + 1) % slides.length);
    },
    [current, goTo, slides.length],
  );

  // Auto-advance every 4 s
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setTimeout(goNext, 4000);
    return () => clearTimeout(t);
  }, [current, goNext, slides.length]);

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
      {/* Background Ambient Depth Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft atmospheric depth glow behind typography on the left */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: isDark
              ? 'radial-gradient(circle 540px at 18% 45%, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.05) 50%, transparent 75%), radial-gradient(ellipse 65% 35% at 55% 100%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle 540px at 18% 45%, rgba(16, 185, 129, 0.11) 0%, rgba(52, 211, 153, 0.04) 50%, transparent 75%), radial-gradient(ellipse 65% 35% at 55% 100%, rgba(16, 185, 129, 0.09) 0%, transparent 70%)',
          }}
        />

        {/* Soft breathing accent pulse anchored to the left content zone */}
        <div
          className={`absolute top-1/2 left-[12%] -translate-y-1/2 w-[460px] h-[460px] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${
            isDark ? 'bg-emerald-500/15' : 'bg-emerald-400/10'
          }`}
          style={{
            animation: 'ambientPulse 8s ease-in-out infinite alternate',
          }}
        />

        {/* Tactile dot grid texture overlay for depth (feathered to left side) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark ? 'opacity-[0.05]' : 'opacity-[0.04]'
          }`}
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)'
              : 'radial-gradient(rgba(13,43,13,0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 65% 70% at 20% 45%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 70% at 20% 45%, black 20%, transparent 75%)',
          }}
        />
      </div>

      {/* ── Seamless Blended Wildlife Showcase (Full section bleed, zero hard borders) ── */}
      <div className="hero-image-panel absolute inset-0 w-full h-full select-none pointer-events-none overflow-hidden z-10">
        {/* Dual-axis smooth feathered mask containers */}
        <div className="hero-vertical-mask absolute inset-0 w-full h-full">
          <div className="hero-horizontal-mask absolute inset-0 w-full h-full">
            {/* Stacked images with smooth cross-fade */}
            {slides.map((slide, i) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.label}
                className="absolute inset-0 w-full h-full object-cover object-center lg:object-[82%_center]"
                style={{
                  opacity: i === current ? 1 : 0,
                  zIndex: i === current ? 2 : i === prevIdx ? 1 : 0,
                  transform: i === current ? 'scale(1.02)' : 'scale(1)',
                  filter: isDark ? 'brightness(0.96) contrast(1.04)' : 'brightness(1.01) contrast(1.02) saturate(1.03)',
                  transitionProperty: 'opacity, transform, filter',
                  transitionDuration: '1.2s, 8s, 0.5s',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1), ease-out, ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Modern Seamless Optical Dissolve Overlays ── */}

        {/* 1. Desktop Left Edge: Clean, modern roll-off with subtle emerald bridge */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block transition-all duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(to right, #0a0f0d 0%, #0a0f0d 16%, rgba(10,15,13,0.92) 24%, rgba(6,46,32,0.40) 34%, rgba(16,185,129,0.08) 44%, transparent 54%)'
              : 'linear-gradient(to right, #f0faf2 0%, #f0faf2 16%, rgba(240,250,242,0.92) 24%, rgba(209,250,229,0.45) 34%, rgba(16,185,129,0.08) 44%, transparent 54%)',
          }}
        />

        {/* 2. Bottom Edge: Melts smoothly into section bottom and About section with accent underglow */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(to top, #0a0f0d 0%, rgba(10,15,13,0.95) 5%, rgba(6,78,59,0.32) 14%, rgba(16,185,129,0.10) 22%, transparent 34%)'
              : 'linear-gradient(to top, #f0faf2 0%, rgba(240,250,242,0.95) 5%, rgba(16,185,129,0.16) 14%, rgba(52,211,153,0.06) 22%, transparent 34%)',
          }}
        />

        {/* 3. Top Edge: Soft melt under navbar */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, #0a0f0d 0%, rgba(10,15,13,0.65) 5%, transparent 16%)'
              : 'linear-gradient(to bottom, #f0faf2 0%, rgba(240,250,242,0.70) 5%, transparent 16%)',
          }}
        />

        {/* 4. Mobile: Atmospheric wash keeping typography crystal clear */}
        <div
          className="absolute inset-0 z-10 pointer-events-none lg:hidden transition-all duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgba(10,15,13,0.95) 0%, rgba(10,15,13,0.74) 38%, rgba(6,78,59,0.30) 68%, #0a0f0d 100%)'
              : 'linear-gradient(to bottom, rgba(240,250,242,0.96) 0%, rgba(240,250,242,0.76) 38%, rgba(16,185,129,0.15) 68%, #f0faf2 100%)',
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
          -webkit-mask-image: linear-gradient(to top, transparent 0%, rgba(0,0,0,0.2) 5%, rgba(0,0,0,0.7) 14%, black 26%);
          mask-image: linear-gradient(to top, transparent 0%, rgba(0,0,0,0.2) 5%, rgba(0,0,0,0.7) 14%, black 26%);
        }

        @media (min-width: 1024px) {
          .hero-horizontal-mask {
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              transparent 28%,
              rgba(0,0,0,0.03) 38%,
              rgba(0,0,0,0.16) 48%,
              rgba(0,0,0,0.48) 58%,
              rgba(0,0,0,0.84) 70%,
              black 82%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              transparent 28%,
              rgba(0,0,0,0.03) 38%,
              rgba(0,0,0,0.16) 48%,
              rgba(0,0,0,0.48) 58%,
              rgba(0,0,0,0.84) 70%,
              black 82%
            );
          }
        }

        @media (max-width: 1023px) {
          .hero-horizontal-mask {
            -webkit-mask-image: linear-gradient(
              to bottom,
              rgba(0,0,0,0.15) 0%,
              rgba(0,0,0,0.45) 30%,
              rgba(0,0,0,0.85) 60%,
              black 85%
            );
            mask-image: linear-gradient(
              to bottom,
              rgba(0,0,0,0.15) 0%,
              rgba(0,0,0,0.45) 30%,
              rgba(0,0,0,0.85) 60%,
              black 85%
            );
          }
        }
      `}</style>
    </section>
  );
}
