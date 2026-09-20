import { useEffect, useRef } from 'react';

const features = [
  { icon: '🐆', title: 'Leopard Tracking', desc: 'Yala has the world\'s highest density of wild leopards. Our trackers know every territory and give you the best sighting chances.' },
  { icon: '🚙', title: 'Premium Jeeps', desc: 'Open-top 4x4 Toyota Land Cruisers built for Yala\'s rugged terrain — with charging ports, coolers, and expert drivers.' },
  { icon: '🌅', title: 'Dawn & Dusk Drives', desc: 'Early morning and evening drives when leopards, elephants, and sloth bears are most active in the park.' },
  { icon: '🛡️', title: 'Licensed & Safe', desc: 'Fully licensed by the Sri Lanka Department of Wildlife Conservation. Safety-trained guides on every drive.' },
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
    <section id="about" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-green-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-green-900 text-sm font-semibold tracking-widest uppercase">Our Story</span>
          <h2 className="text-4xl sm:text-5xl font-black text-green-900 mt-3 mb-4">About Yala Safari Jeep</h2>
          <div className="section-divider mb-6" />
          <p className="text-green-900 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Born from a deep love of Sri Lanka's wild places, Yala Safari Jeep has been taking guests deep into the heart of Yala National Park since 2014 — crafting wildlife encounters that last a lifetime.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <div className="reveal relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60">
              <img src="/images/about.jpg" alt="Expert Yala safari guide with jeep in Yala National Park Sri Lanka" className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-50/60 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-8 glass-card rounded-2xl p-4 sm:p-5 shadow-xl">
              <div className="text-3xl font-black stat-number">10+</div>
              <div className="text-green-900 text-xs tracking-wide">Years in Yala</div>
              <div className="flex mt-2 gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-green-400 text-xs">★</span>)}</div>
            </div>
            <div className="absolute -top-4 -left-4 sm:-left-6 glass-card rounded-xl p-3 text-center">
              <div className="text-2xl">🇱🇰</div>
              <div className="text-green-900 text-xs mt-1">Sri Lanka</div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div className="reveal">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
                Yala's Most Trusted <span className="gradient-text">Jeep Safari</span> Service
              </h3>
              <p className="text-green-900 leading-relaxed mb-4">
                Founded by veteran wildlife tracker <strong className="text-green-900">Suresh Bandara</strong>, our team has spent over a decade learning every trail, waterhole, and leopard territory inside Yala National Park's iconic Block 1 — Sri Lanka's most biodiverse wildlife zone.
              </p>
              <p className="text-green-900 leading-relaxed">
                We operate exclusively within the park regulations set by the Department of Wildlife Conservation Sri Lanka, ensuring a respectful, sustainable experience that protects the wildlife and habitat for generations to come.
              </p>
            </div>

            <div className="reveal grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: '🐆', label: 'Leopard Sightings' },
                { icon: '🐘', label: 'Elephant Herds' },
                { icon: '🏆', label: 'Top Rated on TripAdvisor' },
                { icon: '🌿', label: 'Eco-Responsible' },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-3 flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-green-900 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="reveal">
              <button onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 bg-gradient-to-r from-green-500 to-green-600 text-green-50 font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-sm">
                Book a Jeep Now →
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={f.title} className="reveal glass-card rounded-2xl p-6 hover:border-green-700/40 transition-all duration-300 group cursor-default" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
              <h4 className="text-green-900 font-bold text-base mb-2">{f.title}</h4>
              <p className="text-green-900 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
