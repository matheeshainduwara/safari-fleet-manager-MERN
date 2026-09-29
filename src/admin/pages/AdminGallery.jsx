import { useState } from 'react';

const initialImages = [
  { id: 1, src: '/images/gallery_1.jpg', title: 'Sri Lankan Leopard', tag: 'Leopard', desc: 'Yala Block 1, Sri Lanka' },
  { id: 2, src: '/images/gallery_2.jpg', title: 'Elephant Bathing', tag: 'Elephants', desc: 'Menik River, Yala' },
  { id: 3, src: '/images/gallery_3.jpg', title: 'Peacock Display', tag: 'Birds', desc: 'Yala National Park' },
  { id: 4, src: '/images/gallery_4.jpg', title: 'Sloth Bear & Cubs', tag: 'Sloth Bear', desc: 'Yala Block 1' },
  { id: 5, src: '/images/gallery_5.jpg', title: 'Jeep Safari Encounter', tag: 'On Safari', desc: 'Yala National Park' },
];

const TAGS = ['Leopard', 'Elephants', 'Birds', 'Sloth Bear', 'On Safari', 'Landscape', 'Other'];

export default function AdminGallery() {
  const [images, setImages] = useState(initialImages);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', tag: TAGS[0], desc: '', preview: null, file: null });
  const [deleteId, setDeleteId] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, file, preview }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.preview) return;
    const newImg = {
      id: Date.now(),
      src: form.preview,
      title: form.title,
      tag: form.tag,
      desc: form.desc,
    };
    setImages((prev) => [newImg, ...prev]);
    setForm({ title: '', tag: TAGS[0], desc: '', preview: null, file: null });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Gallery</h1>
          <p className="text-sm text-neutral-500 mt-1">{images.length} images · Manage your safari photo gallery</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Image
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-[#0f1712] border border-emerald-500/20 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5">Upload New Image</h2>
          <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-5">
            {/* Drop zone */}
            <label className={`sm:row-span-3 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all min-h-[180px] ${
              form.preview ? 'border-emerald-500/40' : 'border-white/10 hover:border-emerald-500/30'
            }`}>
              {form.preview ? (
                <img src={form.preview} alt="preview" className="w-full h-full object-cover rounded-xl max-h-[220px]" />
              ) : (
                <div className="flex flex-col items-center gap-2 p-6 text-center">
                  <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-neutral-500">Click to upload image</p>
                  <p className="text-[10px] text-neutral-600">JPG, PNG, WEBP</p>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Title *</label>
              <input
                required value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Sri Lankan Leopard"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Tag</label>
              <select
                value={form.tag}
                onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                className="w-full bg-[#0b0f0e] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition-all"
              >
                {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Location / Description</label>
              <input
                value={form.desc}
                onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                placeholder="e.g. Yala Block 1, Sri Lanka"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            <div className="sm:col-span-2 flex gap-3 justify-end pt-2 border-t border-white/5">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-sm font-medium transition-all border border-white/5">
                Cancel
              </button>
              <button type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                Add to Gallery
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative bg-[#0f1712] border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all">
            <div className="aspect-square overflow-hidden">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-white truncate">{img.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">{img.tag}</span>
              </div>
            </div>
            {/* Delete overlay */}
            <button
              onClick={() => setDeleteId(img.id)}
              className="absolute top-2 right-2 w-7 h-7 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
          <div className="bg-[#0f1712] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-center mb-2">Delete Image?</h3>
            <p className="text-neutral-400 text-sm text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-sm font-medium border border-white/5 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
