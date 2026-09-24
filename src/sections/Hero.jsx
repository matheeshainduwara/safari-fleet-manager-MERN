import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      setCount(end * easeOut);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  const formatNumber = (num) => {
    if (decimals > 0) return num.toFixed(decimals);
    return Math.floor(num).toLocaleString();
  };

  return <span>{formatNumber(count)}{suffix}</span>;
};

export default function Hero() {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const animateEl = (el, delay) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    };

    animateEl(textRef.current, 100);
    animateEl(imageRef.current, 300);
    animateEl(statsRef.current, 500);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20 pb-16 font-sans">
      {/* Abstract Modern Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-green-50/80 blur-3xl" />
        <div className="absolute bottom-[0%] -left-[10%] w-[50%] h-[50%] rounded-full bg-yellow-50/60 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16">

          {/* Left Content */}
          <div ref={textRef} className="w-full lg:w-1/2 text-left">
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


          </div>

          {/* Right Image Area */}
          <div ref={imageRef} className="w-full lg:w-1/2 relative hidden md:block opacity-0">
            {/* Soft backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-100/50 to-transparent rounded-full blur-3xl opacity-70 transform scale-150" />

            <div className="relative group mt-8 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 border-4 border-white transform group-hover:-translate-y-1 group-hover:shadow-3xl transition-all duration-500">
                <img src="/images/hero_img.webp" alt="Safari Jeep in Yala" className="w-full h-full object-cover aspect-[16/9] transform group-hover:scale-105 transition-transform duration-700" />
              </div>

              {/* Modern floating badge - Top Right */}
              <div className="absolute -right-6 top-10 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-white/60 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-neutral-800">Booking Open</span>
                </div>
              </div>

              {/* Modern floating badge - Bottom Left */}
              <div className="absolute -left-6 bottom-10 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg border border-white/60 animate-float">
                <div className="text-neutral-900 text-2xl font-extrabold"><AnimatedCounter end={1000} suffix="+" /></div>
                <div className="text-neutral-500 text-xs font-semibold uppercase mt-1 tracking-wider">Happy Safaris</div>
              </div>
            </div>

            {/* Modern Stats - Moved below image */}
            <div ref={statsRef} className="flex items-center justify-between md:justify-center gap-6 lg:gap-10 mt-6 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl shadow-green-900/5 relative z-10 opacity-0">
              {[
                { value: <AnimatedCounter end={10} suffix="+" />, label: 'Years Exp.' },
                { value: <AnimatedCounter end={4.9} decimals={1} />, label: 'Rating' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-neutral-900 flex items-center gap-1">
                    {stat.value}
                    {stat.icon && <span className="text-lg">{stat.icon}</span>}
                  </div>
                  <div className="text-neutral-500 text-xs sm:text-sm mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
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
