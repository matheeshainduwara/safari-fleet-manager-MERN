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
    <section id="contact" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-green-50">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="text-green-900 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-black text-green-900 mt-3 mb-4">Contact Us</h2>
          <div className="section-divider mb-6" />
          <p className="text-green-900 max-w-xl mx-auto text-base">
            Based in Thissamaharama, just minutes from Yala National Park's main entrance. Reach us any time — we're always happy to help plan your safari.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-4 reveal">
            {contactInfo.map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-5 flex items-start gap-4 hover:border-green-700/30 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-green-900 font-semibold text-sm mb-1">{item.title}</h4>
                  {item.lines.map((line) => <p key={line} className="text-green-900 text-sm leading-relaxed">{line}</p>)}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="glass-card rounded-2xl p-5">
              <h4 className="text-green-900 font-semibold text-sm mb-3">Follow Our Safaris</h4>
              <div className="flex gap-3">
                {[
                  { label: 'Facebook', icon: 'f', color: '#1877f2' },
                  { label: 'Instagram', icon: '◎', color: '#e1306c' },
                  { label: 'WhatsApp', icon: '✆', color: '#25d366' },
                  { label: 'YouTube', icon: '▶', color: '#ff0000' },
                ].map((s) => (
                  <button key={s.label} id={`social-${s.label.toLowerCase()}`} aria-label={s.label}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110"
                    style={{ color: s.color }}>
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 reveal">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-green-700/20">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🐆</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-3">Message Sent!</h3>
                  <p className="text-green-900">Our team in Thissamaharama will reply to you very soon. Get ready for Yala!</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-green-900 mb-6">Send a Message</h3>
                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Your Name *</label>
                        <input id="contact-name" name="name" type="text" required value={form.name} onChange={handleChange}
                          placeholder="Your name"
                          className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 placeholder-white/20 text-sm transition-all duration-300" />
                      </div>
                      <div>
                        <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Email *</label>
                        <input id="contact-email" name="email" type="email" required value={form.email} onChange={handleChange}
                          placeholder="your@email.com"
                          className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 placeholder-white/20 text-sm transition-all duration-300" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Subject *</label>
                      <input id="contact-subject" name="subject" type="text" required value={form.subject} onChange={handleChange}
                        placeholder="Safari inquiry, booking help, group rates..."
                        className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 placeholder-white/20 text-sm transition-all duration-300" />
                    </div>
                    <div>
                      <label className="block text-green-900 text-xs font-semibold mb-2 tracking-wide uppercase">Message *</label>
                      <textarea id="contact-message" name="message" rows={5} required value={form.message} onChange={handleChange}
                        placeholder="Tell us about your planned visit to Yala..."
                        className="safari-input w-full bg-white/5 border border-green-900/10 rounded-xl px-4 py-3 text-green-900 placeholder-white/20 text-sm resize-none transition-all duration-300" />
                    </div>
                    <button id="contact-submit-btn" type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-green-50 font-bold text-sm rounded-full hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300">
                      Send Message 🐆
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 reveal">
          <div className="glass-card rounded-3xl overflow-hidden h-48 sm:h-64 flex items-center justify-center relative border border-green-700/20">
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/hero_bg.jpg')" }} />
            <div className="relative z-10 text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-green-900 font-semibold">Yala National Park, Sri Lanka</p>
              <p className="text-green-900 text-sm">Thissamaharama · Southern Province · Sri Lanka</p>
              <a id="map-directions-btn"
                href="https://maps.google.com/?q=Yala+National+Park+Sri+Lanka"
                target="_blank" rel="noreferrer"
                className="mt-3 inline-block px-5 py-2 bg-green-500/20 border border-green-700/40 text-green-900 text-xs font-semibold rounded-full hover:bg-green-500/30 transition-colors">
                Get Directions to Yala →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
