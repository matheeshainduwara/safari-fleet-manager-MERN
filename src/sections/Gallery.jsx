import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const images = [
  { src: '/images/gallery_1.jpg', title: 'Sri Lankan Leopard', desc: 'Yala Block 1, Sri Lanka', tag: 'Leopard' },
  { src: '/images/gallery_2.jpg', title: 'Elephant Bathing', desc: 'Menik River, Yala', tag: 'Elephants' },
  { src: '/images/gallery_3.jpg', title: 'Peacock Display', desc: 'Yala National Park', tag: 'Birds' },
  { src: '/images/gallery_4.jpg', title: 'Sloth Bear & Cubs', desc: 'Yala Block 1', tag: 'Sloth Bear' },
  { src: '/images/gallery_5.jpg', title: 'Jeep Safari Encounter', desc: 'Yala National Park', tag: 'On Safari' },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();
  const [lightbox, setLightbox] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animElements = section.querySelectorAll('.gallery-card-reveal, .reveal');
    if (!animElements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
              entry.target.setAttribute('data-revealed', 'true');
            }, Number(delay));
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Re-apply visible class after theme change re-renders the DOM
  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll('[data-revealed="true"]').forEach((el) => {
      el.classList.add('visible');
    });
  }, [isDark]);

  const displayImages = images;

  const tagCls = `text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block tracking-wider uppercase ${isDark ? 'bg-white/10 border border-white/20 text-white backdrop-blur-md' : 'bg-black/30 border border-white/20 text-white backdrop-blur-md'}`;

  return (
    <section id="gallery" ref={sectionRef} className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans transition-colors duration-300 ${isDark ? 'bg-[#0a0f0d] text-white' : 'bg-[#f0faf0] text-[#0d2b0d]'}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="mb-10 sm:mb-14 reveal grid lg:grid-cols-[0.95fr_1fr] gap-6 lg:gap-12 items-end">
          <div>
            <h2
              className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-black tracking-tight leading-[1.08]"
              style={{ color: 'var(--text-primary)' }}
            >
              Wildlife encounters in<br />
              <span className="gradient-text">their natural realm.</span>
            </h2>
          </div>

          <p
            className={`text-[15px] sm:text-[15.5px] leading-relaxed font-normal ${isDark ? 'text-white/90' : 'text-emerald-950/85'}`}
          >
            Every photo is an authentic memory from our open-top jeep trails Sri Lankan leopards,
            Asian elephants, sloth bears, and vibrant birds documented across Yala National Park.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 0: Featured Wide Card */}
          <div
            className={`gallery-card-reveal sm:col-span-2 lg:col-span-2 relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl border ${isDark ? 'border-white/10 bg-[#0e1612]' : 'border-emerald-300/30 bg-[#e7f5ea]'}`}
            style={{ height: '400px' }}
            data-delay="0"
            onClick={() => setLightbox(displayImages[0])}
          >
            {!loadedImages[displayImages[0].src] && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-emerald-800/15 to-emerald-950/20 animate-pulse pointer-events-none" />
            )}
            <img
              src={displayImages[0].src}
              alt={displayImages[0].title}
              loading="lazy"
              onLoad={() => setLoadedImages((prev) => ({ ...prev, [displayImages[0].src]: true }))}
              className={`gallery-img-smooth w-full h-full object-cover ${loadedImages[displayImages[0].src] ? 'opacity-100' : 'opacity-0 scale-105'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <span className={tagCls}>{displayImages[0].tag}</span>
              <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2">{displayImages[0].title}</h3>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {displayImages[0].desc}
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
              <div className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white text-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">⤢</div>
            </div>
          </div>

          {/* Card 1: Tall Card */}
          <div
            className={`gallery-card-reveal relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl border ${isDark ? 'border-white/10 bg-[#0e1612]' : 'border-emerald-300/30 bg-[#e7f5ea]'}`}
            style={{ height: '400px' }}
            data-delay="140"
            onClick={() => setLightbox(displayImages[1])}
          >
            {!loadedImages[displayImages[1].src] && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-emerald-800/15 to-emerald-950/20 animate-pulse pointer-events-none" />
            )}
            <img
              src={displayImages[1].src}
              alt={displayImages[1].title}
              loading="lazy"
              onLoad={() => setLoadedImages((prev) => ({ ...prev, [displayImages[1].src]: true }))}
              className={`gallery-img-smooth w-full h-full object-cover ${loadedImages[displayImages[1].src] ? 'opacity-100' : 'opacity-0 scale-105'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-6">
              <span className={tagCls}>{displayImages[1].tag}</span>
              <h3 className="text-white text-xl font-bold tracking-tight mb-2">{displayImages[1].title}</h3>
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {displayImages[1].desc}
              </div>
            </div>
          </div>

          {/* Cards 2, 3, 4: Row 2 with Staggered Cascading Delays */}
          {displayImages.slice(2).map((img, i) => (
            <div
              key={img.title}
              className={`gallery-card-reveal relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl border ${isDark ? 'border-white/10 bg-[#0e1612]' : 'border-emerald-300/30 bg-[#e7f5ea]'}`}
              style={{ height: '280px' }}
              data-delay={i * 120}
              onClick={() => setLightbox(img)}
            >
              {!loadedImages[img.src] && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-emerald-800/15 to-emerald-950/20 animate-pulse pointer-events-none" />
              )}
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                onLoad={() => setLoadedImages((prev) => ({ ...prev, [img.src]: true }))}
                className={`gallery-img-smooth w-full h-full object-cover ${loadedImages[img.src] ? 'opacity-100' : 'opacity-0 scale-105'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className={tagCls}>{img.tag}</span>
                <h3 className="text-white text-lg font-bold tracking-tight mb-1">{img.title}</h3>
                <div className="flex items-center gap-1.5 text-white/80 text-xs">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {img.desc}
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-emerald-400/0 group-hover:border-emerald-500/30 rounded-[2rem] transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
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

