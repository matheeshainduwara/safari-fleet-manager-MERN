import { useEffect, useRef, useState } from 'react';

const images = [
  { src: '/images/gallery_1.jpg', title: 'Sri Lankan Leopard', desc: 'Yala Block 1, Sri Lanka', tag: 'Leopard' },
  { src: '/images/gallery_2.jpg', title: 'Elephant Bathing', desc: 'Menik River, Yala', tag: 'Elephants' },
  { src: '/images/gallery_3.jpg', title: 'Peacock Display', desc: 'Yala National Park', tag: 'Birds' },
  { src: '/images/gallery_4.jpg', title: 'Sloth Bear & Cubs', desc: 'Yala Block 1', tag: 'Sloth Bear' },
  { src: '/images/gallery_5.jpg', title: 'Jeep Safari Encounter', desc: 'Yala National Park', tag: 'On Safari' },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Use gallery_4 as gallery_5 fallback since we only generated 4 Yala images
  const displayImages = [
    images[0], images[1], images[2], images[3],
    { ...images[3], src: '/images/gallery_1.jpg', title: 'Leopard Close-Up', desc: 'Yala Block 1, Sri Lanka', tag: 'Leopard' },
  ];

  return (
    <section id="gallery" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0a0f0d] font-sans text-white">
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="text-[10px] md:text-xs font-medium tracking-widest text-emerald-400 uppercase">Wildlife of Yala</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-2 mb-6 tracking-tight">Safari Gallery</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-8" />
          <p className="text-neutral-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-light px-2 sm:px-0">
            Every photo is a memory from our jeep trails — Sri Lankan leopards, Asian elephants, sloth bears, peacocks and more await inside Yala National Park.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Featured large */}
          <div className="reveal gallery-item sm:col-span-2 lg:col-span-2 relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl border border-white/10"
            style={{ height: '400px' }} onClick={() => setLightbox(displayImages[0])}>
            <img src={displayImages[0].src} alt={displayImages[0].title} className="gallery-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <span className="bg-white/10 border border-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block tracking-wider uppercase">{displayImages[0].tag}</span>
              <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2">{displayImages[0].title}</h3>
              <div className="flex items-center gap-2 text-neutral-300 text-sm">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {displayImages[0].desc}
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
              <div className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white text-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">⤢</div>
            </div>
          </div>

          {/* Right */}
          <div className="reveal gallery-item relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl border border-white/10"
            style={{ height: '400px' }} onClick={() => setLightbox(displayImages[1])}>
            <img src={displayImages[1].src} alt={displayImages[1].title} className="gallery-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-6">
              <span className="bg-white/10 border border-white/20 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full mb-3 inline-block tracking-wider uppercase">{displayImages[1].tag}</span>
              <h3 className="text-white text-xl font-bold tracking-tight mb-2">{displayImages[1].title}</h3>
              <div className="flex items-center gap-2 text-neutral-300 text-xs">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {displayImages[1].desc}
              </div>
            </div>
          </div>

          {/* Bottom 3 */}
          {displayImages.slice(2).map((img) => (
            <div key={img.title} className="reveal gallery-item relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl border border-white/10"
              style={{ height: '280px' }} onClick={() => setLightbox(img)}>
              <img src={img.src} alt={img.title} className="gallery-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="bg-white/10 border border-white/20 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full mb-2 inline-block tracking-wider uppercase">{img.tag}</span>
                <h3 className="text-white text-lg font-bold tracking-tight mb-1">{img.title}</h3>
                <div className="flex items-center gap-1.5 text-neutral-300 text-xs">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {img.desc}
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-emerald-400/0 group-hover:border-emerald-500/30 rounded-[2rem] transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal px-4 sm:px-0">
          <button id="gallery-more-btn" onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-semibold text-sm rounded-full overflow-hidden transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 flex items-center justify-center gap-2 mx-auto">
            Book a Safari & Create Your Own Yala Memory <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8" onClick={() => setLightbox(null)}>
          <div className="relative max-w-5xl w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-[#0a0f0d]" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} className="w-full h-auto max-h-[85vh] object-contain bg-black" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2">{lightbox.title}</h3>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {lightbox.desc}
              </div>
            </div>
            <button id="lightbox-close-btn" onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 text-xl shadow-2xl">✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
