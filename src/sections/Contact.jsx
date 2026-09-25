import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: '📍', title: 'Our Location', lines: ['Yala Road, Thissamaharama', 'Southern Province, Sri Lanka 82600'] },
    { icon: '📞', title: 'Call / WhatsApp', lines: ['+94 77 234 5678', '+94 71 987 6543'] },
    { icon: '✉️', title: 'Email Us', lines: ['info@yalasafarijeep.lk', 'booking@yalasafarijeep.lk'] },
    { icon: '⏰', title: 'Operating Hours', lines: ['Daily: 5:00 AM – 7:00 PM', 'Park Season: Jan – Oct (Best)'] },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0a0f0d] font-sans text-white">
      {/* Dynamic Background Effects */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-green-900/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="text-[10px] md:text-xs font-medium tracking-widest text-emerald-400 uppercase">Get In Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-2 mb-6 tracking-tight">Contact Us</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-8" />
          <p className="text-neutral-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-light px-2 sm:px-0">
            Based in Thissamaharama, just minutes from Yala National Park's main entrance. Reach us any time — we're always happy to help plan your safari.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-4 reveal">
            {contactInfo.map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex items-start gap-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#0a0f0d] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/50">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-2 tracking-wide">{item.title}</h4>
                  {item.lines.map((line) => <p key={line} className="text-neutral-400 text-sm leading-relaxed font-light">{line}</p>)}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center sm:items-start">
              <h4 className="text-white font-bold text-sm mb-4 tracking-widest uppercase">Follow Our Safaris</h4>
              <div className="flex gap-4">
                {[
                  { label: 'Facebook', icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                  ) },
                  { label: 'Instagram', icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  ) },
                  { label: 'WhatsApp', icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  ) },
                ].map((s) => (
                  <button key={s.label} id={`social-${s.label.toLowerCase()}`} aria-label={s.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-emerald-500 hover:border-emerald-500 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-emerald-500/50">
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 reveal">
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 sm:py-20">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Message Sent!</h3>
                  <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-md mx-auto">
                    Our team in Thissamaharama will reply to you very soon. Get ready for an unforgettable Yala experience!
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Send a Message</h3>
                  <p className="text-neutral-400 text-sm font-light mb-8">Have a question? Drop us a line below.</p>
                  
                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-neutral-300 text-xs font-semibold mb-2 tracking-widest uppercase">Your Name *</label>
                        <input id="contact-name" name="name" type="text" required value={form.name} onChange={handleChange}
                          placeholder="Your name"
                          className="w-full bg-[#0a0f0d]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm transition-all duration-300 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none" />
                      </div>
                      <div>
                        <label className="block text-neutral-300 text-xs font-semibold mb-2 tracking-widest uppercase">Email *</label>
                        <input id="contact-email" name="email" type="email" required value={form.email} onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full bg-[#0a0f0d]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm transition-all duration-300 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-neutral-300 text-xs font-semibold mb-2 tracking-widest uppercase">Subject *</label>
                      <input id="contact-subject" name="subject" type="text" required value={form.subject} onChange={handleChange}
                        placeholder="Safari inquiry, booking help, group rates..."
                        className="w-full bg-[#0a0f0d]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm transition-all duration-300 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none" />
                    </div>
                    <div>
                      <label className="block text-neutral-300 text-xs font-semibold mb-2 tracking-widest uppercase">Message *</label>
                      <textarea id="contact-message" name="message" rows={5} required value={form.message} onChange={handleChange}
                        placeholder="Tell us about your planned visit to Yala..."
                        className="w-full bg-[#0a0f0d]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm resize-none transition-all duration-300 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none" />
                    </div>
                    <button id="contact-submit-btn" type="submit"
                      className="group relative w-full sm:w-auto px-10 py-4 bg-white text-black font-semibold text-sm rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                      <span className="relative z-10 flex items-center justify-center gap-2">Send Message <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                      <div className="absolute inset-0 bg-emerald-50 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 reveal px-4 sm:px-0">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] overflow-hidden p-8 sm:p-12 relative flex flex-col items-center justify-center text-center shadow-2xl">
            <div className="absolute inset-0 bg-[url('/images/hero_bg.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/50 to-[#0a0f0d]/50" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Yala National Park</h4>
              <p className="text-neutral-400 text-sm font-light mb-8">Thissamaharama · Southern Province · Sri Lanka</p>
              <a id="map-directions-btn"
                href="https://maps.google.com/?q=Yala+National+Park+Sri+Lanka"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 border border-white/20 backdrop-blur-md text-white font-semibold text-sm rounded-full hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 group">
                Get Directions <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
