import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const textRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const animateEl = (el, delay) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      setTimeout(() => {
        el.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    };
    animateEl(textRef.current, 100);
  }, []);

  return (
    <section id="home" className={`relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-28 pb-12 md:pt-20 md:pb-0 font-sans transition-colors duration-500 ${isDark ? 'bg-[#0a0f0d] text-white' : 'bg-[#f0faf2] text-[#0d2b0d]'}`}>
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hero image — dimmed in dark, very subtle in light */}
        <div className={`absolute inset-0 bg-[url('/images/hero_img.webp')] bg-cover bg-center transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-30'}`} />
        {/* Gradient fade */}
        <div className={`absolute inset-0 bg-gradient-to-b transition-all duration-500 ${isDark ? 'from-transparent via-[#0a0f0d]/50 to-[#0a0f0d]' : 'from-[#f0faf2]/30 via-[#f0faf2]/60 to-[#f0faf2]'}`} />

        {/* Emerald glow orbs */}
        <div className={`absolute top-[10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-multiply transition-all duration-500 ${isDark ? 'bg-emerald-500/20 mix-blend-screen' : 'bg-emerald-400/25'}`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] transition-all duration-500 ${isDark ? 'bg-green-900/40 mix-blend-screen' : 'bg-emerald-300/30 mix-blend-multiply'}`} />
        <div className={`absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full blur-[100px] transition-all duration-500 ${isDark ? 'bg-yellow-500/10 mix-blend-screen' : 'bg-green-200/40 mix-blend-multiply'}`} />
        <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-10'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center justify-center">

          {/* Content */}
          <div ref={textRef} className="w-full max-w-4xl text-center z-20 flex flex-col items-center">

            <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
              Discover the <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-emerald-300 via-green-400 to-emerald-200' : 'from-emerald-600 via-green-700 to-emerald-500'}`}>Untamed Wild</span>
            </h1>

            <p className={`text-base md:text-xl mb-8 md:mb-10 leading-relaxed max-w-2xl font-light mx-auto px-2 sm:px-0 ${isDark ? 'text-white/70' : 'text-emerald-900/70'}`}>
              Embark on an unforgettable journey. Experience the highest density of wild leopards and majestic elephants in their natural, pristine habitat.
            </p>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 md:gap-5 mb-12 md:mb-16 justify-center px-4 sm:px-0">
              <button onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group relative w-full sm:w-auto px-8 py-3.5 md:py-4 font-semibold text-sm rounded-full overflow-hidden transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                }`}>
                <span className="relative z-10">Book Safari Now</span>
                {isDark && <div className="absolute inset-0 bg-emerald-50 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />}
              </button>

              <button onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group w-full sm:w-auto px-8 py-3.5 md:py-4 font-medium text-sm rounded-full transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md ${
                  isDark
                    ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                    : 'bg-white/70 border border-emerald-300/60 text-emerald-800 hover:bg-white hover:border-emerald-400'
                }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/10 group-hover:bg-white/20' : 'bg-emerald-100 group-hover:bg-emerald-200'}`}>
                  <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                View Gallery
              </button>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
