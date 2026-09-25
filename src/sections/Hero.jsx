import { useEffect, useRef } from 'react';

export default function Hero() {
  const textRef = useRef(null);

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
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0a0f0d] pt-28 pb-12 md:pt-20 md:pb-0 font-sans text-white">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/hero_img.webp')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f0d]/50 to-[#0a0f0d]" />
        
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-green-900/40 blur-[150px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-yellow-500/10 blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center justify-center">

          {/* Content */}
          <div ref={textRef} className="w-full max-w-4xl text-center z-20 flex flex-col items-center">

            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter text-white leading-[1.1] md:leading-[1.05] mb-6 md:mb-8">
              Discover the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-200">Untamed Wild</span>
            </h1>

            <p className="text-base md:text-xl text-neutral-400 mb-8 md:mb-10 leading-relaxed max-w-2xl font-light mx-auto px-2 sm:px-0">
              Embark on an unforgettable journey. Experience the highest density of wild leopards and majestic elephants in their natural, pristine habitat.
            </p>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 md:gap-5 mb-12 md:mb-16 justify-center px-4 sm:px-0">
              <button onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative w-full sm:w-auto px-8 py-3.5 md:py-4 bg-white text-black font-semibold text-sm rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <span className="relative z-10">Book Safari Now</span>
                <div className="absolute inset-0 bg-emerald-50 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </button>
              
              <button onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="group w-full sm:w-auto px-8 py-3.5 md:py-4 bg-white/5 border border-white/10 text-white font-medium text-sm rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
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
