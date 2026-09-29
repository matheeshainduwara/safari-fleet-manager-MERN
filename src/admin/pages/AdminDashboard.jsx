const stats = [
  { label: 'Total Bookings', value: '128', change: '+12%', up: true, icon: '📅' },
  { label: 'Gallery Images', value: '24', change: '+3', up: true, icon: '🖼️' },
  { label: 'Jeep Packages', value: '3', change: 'Active', up: true, icon: '🚙' },
  { label: 'New Messages', value: '7', change: 'Unread', up: false, icon: '✉️' },
];

const recentBookings = [
  { name: 'James Perera', package: 'Full Day Safari', date: '2026-10-02', guests: 4, status: 'Confirmed' },
  { name: 'Aisha Fernando', package: 'Morning Game Drive', date: '2026-10-03', guests: 2, status: 'Pending' },
  { name: 'Tom Nakamura', package: 'Evening Sunset Drive', date: '2026-10-04', guests: 6, status: 'Confirmed' },
  { name: 'Sara Wijesinghe', package: 'Full Day Safari', date: '2026-10-05', guests: 3, status: 'Pending' },
];

const statusColors = {
  Confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  Cancelled: 'bg-red-500/15 text-red-400 border-red-500/20',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Welcome back. Here's what's happening at Yala Safari.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#0f1712] border border-white/5 rounded-2xl p-5 hover:border-emerald-500/20 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${s.up ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                {s.change}
              </span>
            </div>
            <p className="text-3xl font-black text-white tracking-tight">{s.value}</p>
            <p className="text-xs text-neutral-500 mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings table */}
      <div className="bg-[#0f1712] border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">Recent Bookings</h2>
          <a href="/admin/bookings" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['Customer', 'Package', 'Date', 'Guests', 'Status'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentBookings.map((b) => (
                <tr key={b.name} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{b.name}</td>
                  <td className="px-6 py-4 text-neutral-400">{b.package}</td>
                  <td className="px-6 py-4 text-neutral-400">{b.date}</td>
                  <td className="px-6 py-4 text-neutral-400">{b.guests}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <a href="/admin/gallery"
          className="group bg-[#0f1712] border border-white/5 hover:border-emerald-500/30 rounded-2xl p-5 flex items-center gap-4 transition-all hover:bg-emerald-500/5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🖼️</div>
          <div>
            <p className="font-semibold text-white text-sm">Manage Gallery</p>
            <p className="text-xs text-neutral-500 mt-0.5">Upload or remove safari photos</p>
          </div>
          <svg className="w-4 h-4 text-neutral-600 ml-auto group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
        <a href="/admin/jeeps"
          className="group bg-[#0f1712] border border-white/5 hover:border-emerald-500/30 rounded-2xl p-5 flex items-center gap-4 transition-all hover:bg-emerald-500/5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🚙</div>
          <div>
            <p className="font-semibold text-white text-sm">Manage Jeep Packages</p>
            <p className="text-xs text-neutral-500 mt-0.5">Add, edit or remove safari packages</p>
          </div>
          <svg className="w-4 h-4 text-neutral-600 ml-auto group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
