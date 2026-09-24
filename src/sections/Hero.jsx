import { useEffect, useRef } from 'react';

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200);
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20 pb-16 font-sans">
      {/* Abstract Modern Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-green-50/80 blur-3xl" />
        <div className="absolute bottom-[0%] -left-[10%] w-[50%] h-[50%] rounded-full bg-yellow-50/60 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left Content */}
          <div ref={textRef} className="w-full lg:w-[55%] text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.1] mb-6">
              Experience the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Untamed Wild</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-500 mb-10 leading-relaxed max-w-lg font-light">
              Embark on a modern safari adventure. Discover the highest density of wild leopards and majestic elephants in their natural habitat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button id="hero-book-btn" onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white font-medium text-sm rounded-full hover:bg-green-600 hover:shadow-lg hover:shadow-green-600/20 hover:-translate-y-0.5 transition-all duration-300">
                Book Safari Now
              </button>
              <button id="hero-gallery-btn" onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-white border border-neutral-200 text-neutral-700 font-medium text-sm rounded-full hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                View Gallery
              </button>
            </div>

            {/* Modern Stats */}
            <div className="flex items-center gap-8 md:gap-12 max-w-xl">
              {[
                { value: '10+', label: 'Years Exp.' },
                { value: '4.9', label: 'Rating', icon: '⭐' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <div className="text-2xl sm:text-3xl font-bold text-neutral-900 flex items-center gap-1">
                    {stat.value}
                    {stat.icon && <span className="text-lg">{stat.icon}</span>}
                  </div>
                  <div className="text-neutral-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sticker Area */}
          <div className="w-full lg:w-[45%] relative hidden md:flex items-center justify-center min-h-[400px]">
            {/* Soft backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-100/50 to-transparent rounded-full blur-3xl opacity-70 transform scale-150" />

            <div className="relative group">
              {/* Floating Jeep Sticker */}
              <div className="animate-bounce-slow relative z-10 transform group-hover:scale-105 transition-transform duration-500 cursor-pointer">
                {/* Thick white border effect (sticker) */}
                <div className="text-[10rem] md:text-[14rem] leading-none" style={{ filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))' }}>
                  <div className="relative">
                    <span className="absolute inset-0 text-white" style={{ WebkitTextStroke: '16px white' }}>🚙</span>
                    <span className="relative z-10">🚙</span>
                  </div>
                </div>

                {/* Animated Dust Particles */}
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-neutral-200/50 rounded-full blur-md animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute bottom-2 -right-4 w-8 h-8 bg-neutral-200/60 rounded-full blur-md animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
              </div>

              {/* Modern floating badge */}
              <div className="absolute -right-8 top-10 bg-white/80 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-white/60 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-neutral-800">Booking Open</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </section>
  );
}
