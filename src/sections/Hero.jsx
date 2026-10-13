import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiImage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  { src: '/images/gallery_1.jpg', label: 'Sri Lankan Leopard', sub: 'Yala Block 1' },
  { src: '/images/gallery_2.jpg', label: 'Elephant Bathing', sub: 'Menik River, Yala' },
  { src: '/images/gallery_5.jpg', label: 'Jeep Safari Encounter', sub: 'Yala National Park' },
  { src: '/images/gallery_4.jpg', label: 'Sloth Bear & Cubs', sub: 'Yala Block 1' },
  { src: '/images/about.jpg', label: 'Our Safari Jeep', sub: 'Ready for the Wild' },
];

export default function Hero() {
  const textRef = useRef(null);
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  // Auto-advance every 4 s
  useEffect(() => {
    const t = setTimeout(next, 4000);
    return () => clearTimeout(t);
  }, [current, next]);

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
      className={`relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-28 lg:pb-16 font-sans transition-colors duration-500 ${isDark ? 'bg-[#0a0f0d] text-white' : 'bg-[#f0faf2] text-[#0d2b0d]'}`}
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

        {/* Enhanced grid texture overlay for depth */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-[0.07]' : 'opacity-[0.06]'
            }`}
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)'
              : 'radial-gradient(rgba(13,43,13,0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-2 sm:py-4 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-10 items-center">

          {/* ── Left: Content ── */}
          <div ref={textRef} className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center py-1 sm:py-4 lg:py-0">

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

            <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group relative flex-1 sm:flex-initial px-5 py-3 sm:px-8 sm:py-3.5 font-semibold text-sm sm:text-base text-center rounded-full overflow-hidden transition-all hover:scale-105 ${isDark ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]' : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'}`}
              >
                <span className="relative z-10">Book Safari</span>
                {isDark && <div className="absolute inset-0 bg-emerald-50 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />}
              </button>

              <button
                onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group flex-1 sm:flex-initial px-4 py-3 sm:px-8 sm:py-3.5 font-medium text-sm sm:text-base rounded-full transition-all duration-300 flex items-center justify-center gap-2 sm:gap-2.5 backdrop-blur-md ${isDark ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white/70 border border-emerald-300/60 text-emerald-800 hover:bg-white'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${isDark ? 'bg-white/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                  <FiImage className="w-3.5 h-3.5" />
                </div>
                View Gallery
              </button>
            </div>
          </div>

          {/* ── Right: 3-Card Carousel with Smooth Slide Transition ── */}
          <div className="relative flex items-center justify-center h-[210px] sm:h-[300px] md:h-[360px] lg:h-[410px] w-full max-w-[560px] mx-auto select-none px-2 sm:px-6 mt-4 sm:mt-0 mb-8 sm:mb-12">

            {slides.map((slide, i) => {
              // Calculate wrapping offset relative to current slide
              let diff = (i - current) % slides.length;
              if (diff > Math.floor(slides.length / 2)) diff -= slides.length;
              if (diff < -Math.floor(slides.length / 2)) diff += slides.length;

              const isCenter = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;
              const isVisible = Math.abs(diff) <= 1;

              let translateX = '0%';
              let scale = 1;
              let opacity = 0;
              let zIndex = 0;

              if (isCenter) {
                translateX = '0%';
                scale = 1;
                opacity = 1;
                zIndex = 20;
              } else if (isPrev) {
                translateX = '-38%';
                scale = 0.86;
                opacity = 0.85;
                zIndex = 10;
              } else if (isNext) {
                translateX = '38%';
                scale = 0.86;
                opacity = 0.85;
                zIndex = 10;
              } else {
                translateX = diff < 0 ? '-65%' : '65%';
                scale = 0.72;
                opacity = 0;
                zIndex = 0;
              }

              return (
                <div
                  key={slide.src}
                  onClick={() => {
                    if (isPrev) prev();
                    if (isNext) next();
                  }}
                  aria-label={isPrev ? 'Previous photo' : isNext ? 'Next photo' : undefined}
                  role={!isCenter && isVisible ? 'button' : undefined}
                  className={`group absolute rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden select-none ${isCenter ? 'cursor-default' : isVisible ? 'cursor-pointer' : 'pointer-events-none'
                    }`}
                  style={{
                    width: '64%',
                    height: '92%',
                    transform: `translate3d(${translateX}, 0, 0) scale(${scale})`,
                    opacity,
                    zIndex,
                    boxShadow: isCenter
                      ? (isDark ? '0 20px 45px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.12)' : '0 20px 45px rgba(0,0,0,0.22), 0 0 0 1px rgba(52,211,153,0.25)')
                      : (isDark ? '0 15px 30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)' : '0 15px 30px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)'),
                    transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.7s ease',
                  }}
                >
                  <img
                    src={slide.src}
                    alt=""
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isCenter ? 'group-hover:scale-[1.04]' : ''
                      }`}
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${isCenter
                        ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:opacity-80'
                        : 'bg-black/30'
                      }`}
                  />
                </div>
              );
            })}

            {/* Controls */}
            <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'
                  }`}
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${i === current
                        ? 'w-5 h-1.5 bg-emerald-500'
                        : isDark
                          ? 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                          : 'w-1.5 h-1.5 bg-black/30 hover:bg-black/70'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next slide"
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'
                  }`}
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes auroraRotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.08);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes cardAuraPulse {
          0% {
            transform: translateY(-50%) scale(0.92);
            opacity: 0.55;
          }
          50% {
            transform: translateY(-50%) scale(1.14);
            opacity: 0.95;
          }
          100% {
            transform: translateY(-50%) scale(1);
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
}
