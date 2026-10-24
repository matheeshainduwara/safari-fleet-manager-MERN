import { useEffect, useState } from 'react';

const defaultBookings = [
  { id: 'BK001', name: 'James Perera', email: 'james@email.com', phone: '+94771234567', package: 'Full Day Safari', jeep: 'Toyota Land Cruiser 70-Series Prado', timeSlot: 'Full Day (5:30 AM)', date: '2026-10-25', guests: 4, hotel: 'Yala Village Hotel', message: 'Binoculars requested', status: 'Confirmed' },
  { id: 'BK002', name: 'Aisha Fernando', email: 'aisha@email.com', phone: '+94712345678', package: 'Morning Game Drive', jeep: 'Toyota Hilux Supreme Bushmaster 4x4', timeSlot: 'Morning (5:30 AM)', date: '2026-10-26', guests: 2, hotel: 'Cinnamon Wild', message: 'Early pickup please', status: 'Pending' },
  { id: 'BK003', name: 'Tom Nakamura', email: 'tom@email.com', phone: '+94773456789', package: 'Evening Sunset Drive', jeep: 'Mitsubishi L200 Safari Hunter 4x4', timeSlot: 'Evening (2:30 PM)', date: '2026-10-27', guests: 6, hotel: 'Tissamaharama Resort', message: 'Anniversary trip', status: 'Confirmed' },
  { id: 'BK004', name: 'Sara Wijesinghe', email: 'sara@email.com', phone: '+94714567890', package: 'Full Day Safari', jeep: 'Mahindra Bolero Classic Safari 4x4', timeSlot: 'Full Day (5:30 AM)', date: '2026-10-28', guests: 3, hotel: 'Jetwing Yala', message: 'Wildlife photography', status: 'Pending' },
];

const STATUS_COLORS = {
  Confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  Cancelled: 'bg-red-500/15 text-red-400 border-red-500/20',
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState(defaultBookings);
  const [filter, setFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBookings(
            data.map((b) => ({
              id: b._id ? `BK-${b._id.slice(-4).toUpperCase()}` : b.id || 'BK-LIVE',
              _id: b._id,
              name: b.name,
              email: b.email,
              phone: b.phone,
              package: b.package,
              jeep: b.jeep || 'Toyota Land Cruiser 70-Series Prado',
              timeSlot: b.timeSlot || 'Morning Game Drive',
              date: b.date,
              guests: b.guests,
              hotel: b.hotel,
              message: b.message,
              status: b.status || 'Pending',
            }))
          );
        }
      })
      .catch((err) => console.warn('Could not fetch real bookings, using fallback:', err));
  }, []);

  const handleStatusChange = async (id, newStatus, mongoId) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    if (mongoId) {
      try {
        await fetch(`/api/bookings/${mongoId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (err) {
        console.error('Failed to update status on server:', err);
      }
    }
  };

  const filteredBookings = filter === 'All' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Safari Jeep Bookings</h1>
          <p className="text-sm text-neutral-500 mt-1">{bookings.length} reservations recorded</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filter === s
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                  : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0f1712] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[850px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                {['ID', 'Customer', 'Assigned Jeep', 'Safari Day & Slot', 'Guests', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-neutral-500">{b.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{b.name}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{b.email}</p>
                    {b.phone && <p className="text-[11px] text-emerald-400/90">{b.phone}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🚙</span>
                      <div>
                        <p className="font-medium text-emerald-300 text-xs">{b.jeep}</p>
                        <p className="text-[10px] text-neutral-500">{b.package}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="text-neutral-200 font-medium text-xs">📅 {b.date}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">⏰ {b.timeSlot}</p>
                  </td>
                  <td className="px-5 py-4 text-neutral-300 text-center font-medium">
                    {b.guests}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[b.status] || STATUS_COLORS.Pending}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {b.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'Confirmed', b._id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-medium transition-all"
                        >
                          Confirm
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-300 text-xs font-medium transition-all"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1612] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">{selectedBooking.id}</span>
                <h3 className="text-lg font-bold text-white">Booking Overview</h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-2xl">
                <div>
                  <span className="text-xs text-neutral-400 block">Safari Date</span>
                  <strong className="text-white">📅 {selectedBooking.date}</strong>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Session</span>
                  <strong className="text-white">⏰ {selectedBooking.timeSlot}</strong>
                </div>
                <div className="col-span-2 pt-2 border-t border-white/5">
                  <span className="text-xs text-neutral-400 block">Selected Jeep</span>
                  <strong className="text-emerald-400">🚙 {selectedBooking.jeep}</strong>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 block">Customer Information</span>
                <p className="text-white font-medium">{selectedBooking.name}</p>
                <p className="text-xs text-neutral-400">Email: {selectedBooking.email}</p>
                <p className="text-xs text-neutral-400">Phone: {selectedBooking.phone || 'Not provided'}</p>
                <p className="text-xs text-neutral-400">Party Size: {selectedBooking.guests} Guests</p>
                <p className="text-xs text-neutral-400">Hotel Pickup: {selectedBooking.hotel || 'None specified'}</p>
                {selectedBooking.message && (
                  <div className="mt-2 p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[11px] text-neutral-500 block">Special Requests:</span>
                    <p className="text-xs text-neutral-300 italic">{selectedBooking.message}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all"
              >
                Close
              </button>
              {selectedBooking.status !== 'Confirmed' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedBooking.id, 'Confirmed', selectedBooking._id);
                    setSelectedBooking(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-all shadow-lg"
                >
                  Confirm Reservation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
