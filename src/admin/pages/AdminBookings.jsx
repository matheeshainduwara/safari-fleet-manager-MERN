const bookings = [
  { id: 'BK001', name: 'James Perera', email: 'james@email.com', phone: '+94771234567', package: 'Full Day Safari', date: '2026-10-02', guests: 4, hotel: 'Yala Village Hotel', message: '', status: 'Confirmed' },
  { id: 'BK002', name: 'Aisha Fernando', email: 'aisha@email.com', phone: '+94712345678', package: 'Morning Game Drive', date: '2026-10-03', guests: 2, hotel: 'Cinnamon Wild', message: 'Early pickup please', status: 'Pending' },
  { id: 'BK003', name: 'Tom Nakamura', email: 'tom@email.com', phone: '+94773456789', package: 'Evening Sunset Drive', date: '2026-10-04', guests: 6, hotel: 'Tissamaharama Resort', message: 'Anniversary trip', status: 'Confirmed' },
  { id: 'BK004', name: 'Sara Wijesinghe', email: 'sara@email.com', phone: '+94714567890', package: 'Full Day Safari', date: '2026-10-05', guests: 3, hotel: 'Jetwing Yala', message: 'Wildlife photography', status: 'Pending' },
  { id: 'BK005', name: 'Mark Davis', email: 'mark@email.com', phone: '+94775678901', package: 'Morning Game Drive', date: '2026-10-06', guests: 2, hotel: '', message: '', status: 'Cancelled' },
];

const STATUS_COLORS = {
  Confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  Cancelled: 'bg-red-500/15 text-red-400 border-red-500/20',
};

export default function AdminBookings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Bookings</h1>
          <p className="text-sm text-neutral-500 mt-1">{bookings.length} total bookings</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map((s) => (
            <button key={s} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${s === 'All' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-white'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="bg-[#0f1712] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5">
                {['ID', 'Customer', 'Package', 'Date', 'Guests', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-neutral-500">{b.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">{b.name}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{b.email}</p>
                  </td>
                  <td className="px-5 py-4 text-neutral-300 whitespace-nowrap">{b.package}</td>
                  <td className="px-5 py-4 text-neutral-400 whitespace-nowrap">{b.date}</td>
                  <td className="px-5 py-4 text-neutral-400 text-center">{b.guests}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-medium transition-all">Confirm</button>
                      <button className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-400 text-xs font-medium transition-all">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
