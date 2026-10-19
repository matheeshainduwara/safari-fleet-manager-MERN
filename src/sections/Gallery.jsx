import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Gallery() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();
  const [lightbox, setLightbox] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch gallery images directly from backend API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch('/api/gallery')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data)) {
          setDisplayImages(
            data.map((d) => ({
              src: d.imageUrl || d.src,
              title: d.title || 'Yala Wildlife',
              desc: d.desc || 'Yala National Park, Sri Lanka',
              tag: d.tag || 'Wildlife',
            }))
          );
        }
      })
      .catch((err) => console.warn('Could not fetch gallery images from API:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Escape key for Lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // 3. Ensure cards are smoothly revealed when images load or theme changes
  useEffect(() => {
    if (!sectionRef.current) return;
    const timer = setTimeout(() => {
      sectionRef.current?.querySelectorAll('.gallery-card-reveal, .reveal').forEach((el) => {
        el.classList.add('visible');
        el.setAttribute('data-revealed', 'true');
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [displayImages, isDark, loading]);

  const tagCls = `text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block tracking-wider uppercase ${
    isDark
      ? 'bg-white/10 border border-white/20 text-white backdrop-blur-md'
      : 'bg-black/30 border border-white/20 text-white backdrop-blur-md'
  }`;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#0a0f0d] text-white' : 'bg-[#f0faf0] text-[#0d2b0d]'
      }`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />

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
            className={`text-[15px] sm:text-[15.5px] leading-relaxed font-normal ${
              isDark ? 'text-white/90' : 'text-emerald-950/85'
            }`}
          >
            Every photo is an authentic memory from our open-top jeep trails Sri Lankan leopards,
            Asian elephants, sloth bears, and vibrant birds documented across Yala National Park.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="sm:col-span-2 lg:col-span-2 h-[400px] rounded-[2rem] bg-emerald-950/20 border border-emerald-500/10 animate-pulse" />
            <div className="h-[400px] rounded-[2rem] bg-emerald-950/20 border border-emerald-500/10 animate-pulse" />
            <div className="h-[280px] rounded-[2rem] bg-emerald-950/20 border border-emerald-500/10 animate-pulse" />
            <div className="h-[280px] rounded-[2rem] bg-emerald-950/20 border border-emerald-500/10 animate-pulse" />
            <div className="h-[280px] rounded-[2rem] bg-emerald-950/20 border border-emerald-500/10 animate-pulse" />
          </div>
        ) : displayImages.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-emerald-500/20 bg-emerald-950/10 p-8">
            <p className="text-sm font-medium text-neutral-400">No gallery photos found in database.</p>
            <p className="text-xs text-neutral-500 mt-1">Upload photos in the Admin Gallery section to display them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 0: Featured Wide Card */}
            {displayImages[0] && (
              <div
                className={`gallery-card-reveal ${
                  displayImages.length > 1 ? 'sm:col-span-2 lg:col-span-2' : 'col-span-full'
                } relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl border ${
                  isDark ? 'border-white/10 bg-[#0e1612]' : 'border-emerald-300/30 bg-[#e7f5ea]'
                }`}
                style={{ height: '400px' }}
                data-delay="0"
                onClick={() => setLightbox(displayImages[0])}
              >
                <img
                  src={displayImages[0].src}
                  alt={displayImages[0].title}
                  loading="lazy"
                  className="gallery-img-smooth w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <span className={tagCls}>{displayImages[0].tag}</span>
                  <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    {displayImages[0].title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {displayImages[0].desc}
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white text-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    ⤢
                  </div>
                </div>
              </div>
            )}

            {/* Card 1: Tall Card */}
            {displayImages[1] && (
              <div
                className={`gallery-card-reveal relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl border ${
                  isDark ? 'border-white/10 bg-[#0e1612]' : 'border-emerald-300/30 bg-[#e7f5ea]'
                }`}
                style={{ height: '400px' }}
                data-delay="140"
                onClick={() => setLightbox(displayImages[1])}
              >
                <img
                  src={displayImages[1].src}
                  alt={displayImages[1].title}
                  loading="lazy"
                  className="gallery-img-smooth w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                  <span className={tagCls}>{displayImages[1].tag}</span>
                  <h3 className="text-white text-xl font-bold tracking-tight mb-2">
                    {displayImages[1].title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {displayImages[1].desc}
                  </div>
                </div>
              </div>
            )}

            {/* Cards 2+: Remaining Cards */}
            {displayImages.slice(2).map((img, i) => (
              <div
                key={img.src || img.title || i}
                className={`gallery-card-reveal relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl border ${
                  isDark ? 'border-white/10 bg-[#0e1612]' : 'border-emerald-300/30 bg-[#e7f5ea]'
                }`}
                style={{ height: '280px' }}
                data-delay={i * 120}
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="gallery-img-smooth w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 p-5">
                  <span className={tagCls}>{img.tag}</span>
                  <h3 className="text-white text-lg font-bold tracking-tight mb-1">
                    {img.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {img.desc}
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-emerald-400/0 group-hover:border-emerald-500/30 rounded-[2rem] transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-[#0a0f0d]"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.src} alt={lightbox.title} className="w-full h-auto max-h-[85vh] object-contain bg-black" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {lightbox.title}
              </h3>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {lightbox.desc}
              </div>
            </div>
            <button
              id="lightbox-close-btn"
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 text-xl shadow-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
