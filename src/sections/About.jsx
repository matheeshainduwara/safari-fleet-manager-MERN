import { useEffect, useRef } from 'react';

const features = [
  { title: 'Leopard Tracking', desc: 'Yala has the world\'s highest density of wild leopards. Our trackers know every territory and give you the best sighting chances.' },
  { title: 'Premium Jeeps', desc: 'Open-top 4x4 Toyota Land Cruisers built for Yala\'s rugged terrain — with charging ports, coolers, and expert drivers.' },
  { title: 'Dawn & Dusk Drives', desc: 'Early morning and evening drives when leopards, elephants, and sloth bears are most active in the park.' },
  { title: 'Licensed & Safe', desc: 'Fully licensed by the Sri Lanka Department of Wildlife Conservation. Safety-trained guides on every drive.' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0f0d] relative overflow-hidden font-sans text-white">
      {/* Dynamic Background Effects matching Hero */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-900/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="text-[10px] md:text-xs font-medium tracking-widest text-emerald-400 uppercase">Our Story</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-2 mb-6 tracking-tight">About Yala Safari Jeep</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-8" />
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-light">
            Born from a deep love of Sri Lanka's wild places, Yala Safari Jeep has been taking guests deep into the heart of Yala National Park since 2014 — crafting wildlife encounters that last a lifetime.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Image */}
          <div className="reveal relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm group">
              <img src="/images/about.jpg" alt="Expert Yala safari guide with jeep in Yala National Park Sri Lanka" className="w-full h-80 sm:h-[28rem] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/40 to-transparent opacity-80" />
            </div>
            
            {/* Floating glass cards */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-transform duration-500">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-green-500">10+</div>
              <div className="text-neutral-300 text-xs tracking-wider uppercase font-medium mt-1">Years in Yala</div>
              <div className="flex mt-3 gap-1">{[...Array(5)].map((_, i) => <span key={i} className="text-emerald-400 text-xs">★</span>)}</div>
            </div>
            
            <div className="absolute -top-6 -left-4 sm:-left-6 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-4 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-transform duration-500">
              <svg className="w-8 h-8 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div className="text-neutral-300 text-xs font-medium uppercase tracking-wider mt-2">Sri Lanka</div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="reveal">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                Yala's Most Trusted <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-400">Jeep Safari</span> Service
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-5 font-light text-base sm:text-lg">
                Founded by veteran wildlife tracker <strong className="text-white font-medium">Suresh Bandara</strong>, our team has spent over a decade learning every trail, waterhole, and leopard territory inside Yala National Park's iconic Block 1 — Sri Lanka's most biodiverse wildlife zone.
              </p>
              <p className="text-neutral-400 leading-relaxed font-light text-base sm:text-lg">
                We operate exclusively within the park regulations set by the Department of Wildlife Conservation Sri Lanka, ensuring a respectful, sustainable experience that protects the wildlife and habitat for generations to come.
              </p>
            </div>

            <div className="reveal grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              {[
                { label: 'Leopard Sightings' },
                { label: 'Elephant Herds' },
                { label: 'Top Rated on TripAdvisor' },
                { label: 'Eco-Responsible' },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 flex items-center justify-center hover:bg-white/10 transition-colors duration-300 text-center">
                  <span className="text-neutral-200 text-xs sm:text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="reveal pt-4 flex justify-center lg:justify-start">
              <button onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white text-black font-semibold text-sm rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <span className="relative z-10 flex items-center justify-center gap-2">Book a Jeep Now <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                <div className="absolute inset-0 bg-emerald-50 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className="reveal bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 group cursor-default" style={{ transitionDelay: `${i * 80}ms` }}>
              <h4 className="text-white font-bold text-lg mb-3 tracking-wide">{f.title}</h4>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
