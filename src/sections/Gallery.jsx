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
    <section id="gallery" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-green-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="text-green-900 text-sm font-semibold tracking-widest uppercase">Wildlife of Yala</span>
          <h2 className="text-4xl sm:text-5xl font-black text-green-900 mt-3 mb-4">Safari Gallery</h2>
          <div className="section-divider mb-6" />
          <p className="text-green-900 max-w-xl mx-auto text-base">
            Every photo is a memory from our jeep trails — Sri Lankan leopards, Asian elephants, sloth bears, peacocks and more await inside Yala National Park.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Featured large */}
          <div className="reveal gallery-item sm:col-span-2 lg:col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl shadow-black/50"
            style={{ height: '400px' }} onClick={() => setLightbox(displayImages[0])}>
            <img src={displayImages[0].src} alt={displayImages[0].title} className="gallery-img w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-50/90 via-green-50/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="glass-card text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">{displayImages[0].tag}</span>
              <h3 className="text-green-900 text-2xl font-bold">{displayImages[0].title}</h3>
              <p className="text-green-900 text-sm mt-1">📍 {displayImages[0].desc}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-green-900 text-lg">⤢</div>
            </div>
          </div>

          {/* Right */}
          <div className="reveal gallery-item relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl shadow-black/50"
            style={{ height: '400px' }} onClick={() => setLightbox(displayImages[1])}>
            <img src={displayImages[1].src} alt={displayImages[1].title} className="gallery-img w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-50/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <span className="glass-card text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">{displayImages[1].tag}</span>
              <h3 className="text-green-900 text-lg font-bold">{displayImages[1].title}</h3>
              <p className="text-green-900 text-xs">📍 {displayImages[1].desc}</p>
            </div>
          </div>

          {/* Bottom 3 */}
          {displayImages.slice(2).map((img) => (
            <div key={img.title} className="reveal gallery-item relative rounded-2xl overflow-hidden cursor-pointer group shadow-xl shadow-black/40"
              style={{ height: '280px' }} onClick={() => setLightbox(img)}>
              <img src={img.src} alt={img.title} className="gallery-img w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-50/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="glass-card text-green-900 text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block">{img.tag}</span>
                <h3 className="text-green-900 text-base font-bold">{img.title}</h3>
                <p className="text-green-900 text-xs">📍 {img.desc}</p>
              </div>
              <div className="absolute inset-0 border-2 border-green-400/0 group-hover:border-green-700/40 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <button id="gallery-more-btn" onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 glass-card text-green-900 font-semibold rounded-full hover:bg-green-400/10 hover:border-green-700/40 transition-all duration-300 text-sm">
            Book a Safari & Create Your Own Yala Memory →
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-50/90 backdrop-blur-sm p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} className="w-full h-auto max-h-[80vh] object-contain" />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-green-50/80 to-transparent">
              <h3 className="text-green-900 text-xl font-bold">{lightbox.title}</h3>
              <p className="text-green-900 text-sm">📍 {lightbox.desc}</p>
            </div>
            <button id="lightbox-close-btn" onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-green-200/60 rounded-full flex items-center justify-center text-green-900 hover:bg-green-300/80 transition-colors text-lg">✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
