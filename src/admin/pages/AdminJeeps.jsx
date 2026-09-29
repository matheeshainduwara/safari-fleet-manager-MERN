import { useState } from 'react';

const initialPackages = [
  {
    id: 1,
    name: 'Morning Game Drive',
    duration: '3–4 Hours',
    price: 'LKR 6,500',
    badge: 'Most Popular',
    description: 'The best time to spot leopards and elephants as they head to waterholes at dawn in Yala Block 1.',
    features: ['5:30 AM – 9:30 AM', 'Max 6 passengers', 'Licensed tracker & driver', 'Bottled water included', 'Photo stop at key spots'],
    active: true,
  },
  {
    id: 2,
    name: 'Full Day Safari',
    duration: '8–9 Hours',
    price: 'LKR 14,500',
    badge: 'Best Value',
    description: 'Full park access from dawn to dusk — maximum wildlife sightings including leopard, sloth bear, and crocodile.',
    features: ['5:30 AM – 2:30 PM', 'Max 6 passengers', 'Senior tracker', 'Lunch & refreshments', 'Block 1 + Block 5 access'],
    active: true,
  },
  {
    id: 3,
    name: 'Evening Sunset Drive',
    duration: '3–4 Hours',
    price: 'LKR 7,000',
    badge: 'Scenic Choice',
    description: "Golden hour through Yala's lagoons — perfect for elephant herds, birds, and stunning Menik River sunsets.",
    features: ['2:30 PM – 6:30 PM', 'Max 6 passengers', 'Sunset lagoon route', 'Bottled water included'],
    active: true,
  },
];

const emptyForm = { name: '', duration: '', price: '', badge: '', description: '', features: '', active: true };

export default function AdminJeeps() {
  const [packages, setPackages] = useState(initialPackages);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (pkg) => {
    setForm({ ...pkg, features: pkg.features.join('\n') });
    setEditId(pkg.id);
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const featuresArr = form.features.split('\n').map((f) => f.trim()).filter(Boolean);
    if (editId) {
      setPackages((prev) => prev.map((p) => p.id === editId ? { ...form, id: editId, features: featuresArr } : p));
    } else {
      setPackages((prev) => [...prev, { ...form, id: Date.now(), features: featuresArr }]);
    }
    setShowForm(false);
    setEditId(null);
  };

  const handleToggle = (id) => setPackages((prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p));
  const handleDelete = (id) => { setPackages((prev) => prev.filter((p) => p.id !== id)); setDeleteId(null); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Jeep Packages</h1>
          <p className="text-sm text-neutral-500 mt-1">{packages.length} packages · Manage safari offerings</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-95">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Package
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#0f1712] border border-emerald-500/20 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5">{editId ? 'Edit Package' : 'New Package'}</h2>
          <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-5">
            {[
              { key: 'name', label: 'Package Name', placeholder: 'e.g. Morning Game Drive', required: true },
              { key: 'duration', label: 'Duration', placeholder: 'e.g. 3–4 Hours', required: true },
              { key: 'price', label: 'Price', placeholder: 'e.g. LKR 6,500', required: true },
              { key: 'badge', label: 'Badge (optional)', placeholder: 'e.g. Most Popular' },
            ].map(({ key, label, placeholder, required }) => (
              <div key={key} className="space-y-1">
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">{label}</label>
                <input
                  required={required}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            ))}

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Description *</label>
              <textarea
                required rows={3} value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Describe this safari package..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Features (one per line) *</label>
              <textarea
                required rows={4} value={form.features}
                onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                placeholder={"5:30 AM – 9:30 AM\nMax 6 passengers\nBottled water included"}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none font-mono"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-3">
              <label className="relative w-10 h-5 cursor-pointer">
                <input type="checkbox" className="sr-only" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />
                <div className={`w-10 h-5 rounded-full transition-colors ${form.active ? 'bg-emerald-500' : 'bg-white/10'}`} />
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.active ? 'left-[1.375rem]' : 'left-0.5'}`} />
              </label>
              <span className="text-sm text-neutral-300">Active (visible on site)</span>
            </div>

            <div className="sm:col-span-2 flex gap-3 justify-end pt-2 border-t border-white/5">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-sm font-medium border border-white/5 transition-all">Cancel</button>
              <button type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                {editId ? 'Save Changes' : 'Add Package'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Packages list */}
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`bg-[#0f1712] border rounded-2xl p-5 transition-all ${pkg.active ? 'border-white/5 hover:border-white/10' : 'border-white/5 opacity-60'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold text-white text-base">{pkg.name}</h3>
                  {pkg.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">{pkg.badge}</span>
                  )}
                  {!pkg.active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-500/15 text-neutral-500 border border-neutral-500/20 uppercase tracking-wider">Inactive</span>}
                </div>
                <p className="text-xs text-emerald-400 font-semibold mb-2">{pkg.duration} · {pkg.price} / jeep</p>
                <p className="text-sm text-neutral-400 leading-relaxed mb-3">{pkg.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pkg.features.map((f) => (
                    <span key={f} className="text-xs bg-white/5 border border-white/5 text-neutral-400 px-2.5 py-1 rounded-lg">{f}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {/* Toggle */}
                <button onClick={() => handleToggle(pkg.id)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
                  title={pkg.active ? 'Deactivate' : 'Activate'}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pkg.active ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'} />
                  </svg>
                </button>
                {/* Edit */}
                <button onClick={() => openEdit(pkg)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/30 flex items-center justify-center text-neutral-400 hover:text-emerald-400 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                {/* Delete */}
                <button onClick={() => setDeleteId(pkg.id)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/5 hover:border-red-500/30 flex items-center justify-center text-neutral-400 hover:text-red-400 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
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
            <h3 className="text-white font-bold text-center mb-2">Delete Package?</h3>
            <p className="text-neutral-400 text-sm text-center mb-6">This will permanently remove the package.</p>
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
