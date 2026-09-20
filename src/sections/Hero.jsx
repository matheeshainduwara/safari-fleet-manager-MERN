import { useEffect, useRef } from 'react';

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, 200);
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-green-50 pt-20 pb-16">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-green-400/20"
            style={{ width: `${Math.random() * 6 + 2}px`, height: `${Math.random() * 6 + 2}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`, animationDelay: `${Math.random() * 4}s` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div ref={textRef} className="w-full lg:w-1/2 text-left">
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-6 border border-green-700/10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-900 text-xs font-bold tracking-widest uppercase">Yala National Park · Sri Lanka</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
              <span className="text-green-900">Explore the Wild</span>
              <br />
              <span className="gradient-text">Heart of Yala</span>
            </h1>

            <p className="text-lg text-green-900 mb-10 leading-relaxed max-w-xl">
              Sri Lanka's premier jeep safari service in Yala National Park — home to the world's highest density of wild leopards, majestic elephants, sloth bears, and over 200 bird species.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button id="hero-book-btn" onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-green-50 font-bold text-base rounded-full hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300">
                Book Your Jeep Safari →
              </button>
              <button id="hero-gallery-btn" onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 glass-card border border-green-700/20 text-green-900 font-semibold text-base rounded-full hover:bg-green-400/10 transition-all duration-300">
                ▷ View Wildlife Gallery
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-green-700/10 pt-8 max-w-xl">
              {[
                { value: '10+', label: 'Years in Yala' },
                { value: '30+', label: 'Expert Guides' },
                { value: '99%', label: 'Happy Guests' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="stat-number text-2xl sm:text-3xl font-black">{stat.value}</div>
                  <div className="text-green-900 text-xs sm:text-sm tracking-wide mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative hidden md:block">
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-300 to-green-100 rounded-full blur-3xl opacity-60 animate-pulse transform scale-110" />
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white/40 transform hover:scale-[1.02] transition-transform duration-500">
              <img src="/images/hero_bg.jpg" alt="Safari Jeep in Yala" className="w-full h-full object-cover aspect-[4/3]" />
              
              {/* Floating stat badge on image */}
              <div className="absolute bottom-6 left-6 glass-card bg-white/70 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white/50">
                <div className="text-green-900 text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>1,000+</div>
                <div className="text-green-900 text-xs tracking-wide font-bold uppercase mt-1">Safaris Completed</div>
              </div>

              {/* Sri Lanka badge on image */}
              <div className="absolute top-6 right-6 glass-card bg-white/70 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/50 text-center">
                <div className="text-2xl">🇱🇰</div>
                <div className="text-green-900 text-[10px] font-bold tracking-wider uppercase mt-1">Sri Lanka</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
