import { useState } from 'react';

const initialMessages = [
  { id: 1, name: 'Liam Carter', email: 'liam@email.com', subject: 'Group Safari Inquiry', message: 'Hi, we are a group of 8 people planning to visit Yala in November. Do you have group rates for the full day safari?', time: '2026-09-29 14:32', read: false },
  { id: 2, name: 'Priya Sharma', email: 'priya@email.com', subject: 'Photography Package', message: 'I am a wildlife photographer and would love to arrange a dedicated early morning drive. Is there a special photography-focused package?', time: '2026-09-29 11:15', read: false },
  { id: 3, name: 'Daniel Müller', email: 'daniel@email.com', subject: 'Booking Confirmation', message: 'Can you confirm my booking for the morning game drive on October 10th for 2 guests?', time: '2026-09-28 18:44', read: true },
  { id: 4, name: 'Sophie Nguyen', email: 'sophie@email.com', subject: 'Hotel Pickup', message: 'We are staying at Cinnamon Wild Yala. Do you offer pickup from there?', time: '2026-09-28 09:20', read: true },
  { id: 5, name: 'Ravi Kumar', email: 'ravi@email.com', subject: 'Accessibility Question', message: 'My father uses a wheelchair. Is it possible to accommodate him on a jeep safari?', time: '2026-09-27 15:05', read: true },
];

export default function AdminMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [selected, setSelected] = useState(null);

  const markRead = (id) => {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  };

  const handleSelect = (msg) => {
    setSelected(msg);
    markRead(msg.id);
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Messages</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {messages.length} messages · <span className="text-amber-400 font-medium">{unread} unread</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-4 h-[calc(100vh-14rem)]">
        {/* Message list */}
        <div className="lg:col-span-2 bg-[#0f1712] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Inbox</span>
            <span className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold">{unread} new</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`w-full text-left px-4 py-3.5 transition-all hover:bg-white/5 ${selected?.id === msg.id ? 'bg-emerald-500/10 border-l-2 border-emerald-500' : 'border-l-2 border-transparent'}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />}
                    <p className={`text-sm truncate ${!msg.read ? 'font-semibold text-white' : 'font-medium text-neutral-300'}`}>{msg.name}</p>
                  </div>
                  <p className="text-[10px] text-neutral-600 whitespace-nowrap shrink-0">{msg.time.split(' ')[1]}</p>
                </div>
                <p className={`text-xs truncate mb-1 ${!msg.read ? 'text-neutral-300' : 'text-neutral-500'}`}>{msg.subject}</p>
                <p className="text-[11px] text-neutral-600 truncate">{msg.message}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Message viewer */}
        <div className="lg:col-span-3 bg-[#0f1712] border border-white/5 rounded-2xl flex flex-col overflow-hidden">
          {selected ? (
            <>
              <div className="px-6 py-4 border-b border-white/5">
                <h2 className="font-bold text-white text-base">{selected.subject}</h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500">
                  <span className="font-medium text-neutral-300">{selected.name}</span>
                  <span>·</span>
                  <a href={`mailto:${selected.email}`} className="text-emerald-400 hover:text-emerald-300 transition-colors">{selected.email}</a>
                  <span>·</span>
                  <span>{selected.time}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 text-sm text-neutral-300 leading-relaxed">
                  {selected.message}
                </div>
              </div>

              {/* Reply area */}
              <div className="px-6 pb-6 pt-4 border-t border-white/5">
                <textarea
                  rows={3}
                  placeholder={`Reply to ${selected.name}...`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none mb-3"
                />
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="text-xs text-neutral-500 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Open in email client
                  </a>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Reply
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-neutral-500 text-sm font-medium">Select a message to read</p>
              <p className="text-neutral-600 text-xs mt-1">Choose from the inbox on the left</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
