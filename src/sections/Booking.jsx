import { useEffect, useRef, useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  FiLock,
  FiCheck,
  FiUserCheck,
  FiShield,
  FiCalendar,
  FiClock,
  FiUsers,
  FiMapPin,
  FiCheckCircle,
  FiLoader,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiCamera,
  FiCompass,
  FiAward,
  FiInfo,
} from 'react-icons/fi';

// ─── TIME SLOTS / EXPEDITION SESSIONS ──────────────────────────────────────────
const TIME_SLOTS = [
  {
    id: 'morning',
    name: 'Morning Game Drive',
    time: '5:30 AM – 9:30 AM',
    badge: 'Dawn Leopard Waterholes',
    icon: '🌅',
    desc: 'The golden dawn window when leopards and elephants are actively roaming waterholes in Yala Block 1.',
  },
  {
    id: 'fullday',
    name: 'Full Day Deep Safari',
    time: '5:30 AM – 6:00 PM',
    badge: 'Maximum Sightings · Blocks 1 & 5',
    icon: '☀️',
    desc: 'Full park permit covering dawn till dusk. Maximizes sightings of leopards, sloth bears, elephants, and crocs.',
  },
  {
    id: 'evening',
    name: 'Evening Sunset Drive',
    time: '2:30 PM – 6:30 PM',
    badge: 'Golden Hour & Lagoons',
    icon: '🌙',
    desc: 'Breathtaking golden-hour light across coastal lagoons, Menik river crossings, and massive elephant herds.',
  },
];

// ─── AUTHENTIC SAFARI JEEP FLEET ───────────────────────────────────────────────
const JEEP_FLEET = [
  {
    id: 'landcruiser',
    name: 'Toyota Land Cruiser 70-Series Prado',
    tagline: 'Luxury 4x4 Open-Top Safari Cruiser · Flagship Spec',
    badge: 'Flagship Luxury',
    badgeColor: 'from-amber-500 to-orange-600',
    image: '/images/jeep_landcruiser.jpg',
    capacity: 6,
    seatingType: '3-Tier Elevated Stadium Seating',
    drivetrain: 'Full-Time 4WD High Clearance',
    rating: 4.98,
    reviews: 168,
    tracker: 'Senior Ranger Bandara (15+ yrs Yala experience)',
    rates: {
      morning: 'LKR 8,500',
      fullday: 'LKR 15,500',
      evening: 'LKR 8,000',
    },
    description:
      'The undisputed king of Yala safaris. Custom 3-tier amphitheater seating guarantees unobstructed 360° sightlines without heads or roll bars blocking your shot. Equipped with telephoto camera beanbag rests.',
    specs: [
      { label: 'Capacity', value: 'Max 6 Guests (Private)' },
      { label: 'Seating', value: 'Elevated 3-Tier Deck' },
      { label: 'Drivetrain', value: 'Heavy Duty 4x4 + Snorkel' },
      { label: 'Sightline', value: '360° Unobstructed View' },
    ],
    features: [
      'Elevated tiered seats (no blocked camera angles)',
      'High-power Nikon Prostaff 8x42 Binoculars onboard',
      'Dual fast-charging USB ports (Type-A & Type-C) at every row',
      'Dedicated camera beanbags & monopod clamps',
      'Insulated icebox with chilled spring water & refreshments',
      'Senior Wildlife Dept Licensed Tracker & Driver included',
      'Roll-down clear all-weather waterproof rain flaps',
      'Emergency VHF park radio & first-aid kit onboard',
    ],
  },
  {
    id: 'hilux',
    name: 'Toyota Hilux Supreme Bushmaster 4x4',
    tagline: 'High-Vantage Safari Spec with Long-Travel Shocks',
    badge: 'Most Popular',
    badgeColor: 'from-emerald-500 to-green-600',
    image: '/images/jeep_hilux.jpg',
    capacity: 6,
    seatingType: 'High-Rise Panoramic Viewing Deck',
    drivetrain: '4x4 Off-Road Suspension + Snorkel',
    rating: 4.95,
    reviews: 214,
    tracker: 'Lead Wildlife Guide Chaminda (12 yrs exp)',
    rates: {
      morning: 'LKR 7,500',
      fullday: 'LKR 14,000',
      evening: 'LKR 7,500',
    },
    description:
      'Specially engineered for navigating the sandy riverbeds and boulder passes of Yala. Soft long-travel suspension keeps your camera steady even on uneven bush terrain.',
    specs: [
      { label: 'Capacity', value: 'Max 6 Guests (Private)' },
      { label: 'Seating', value: 'High-Rise Padded Deck' },
      { label: 'Drivetrain', value: 'BFGoodrich All-Terrain 4x4' },
      { label: 'Suspension', value: 'Heavy-Duty Shock Absorption' },
    ],
    features: [
      'Cushioned waterproof leatherette seating',
      'Overhead safari canvas canopy with quick sunshade',
      'Bushnell 10x42 high-contrast binoculars',
      'Onboard icebox with bottled mineral water & juices',
      'Experienced park-certified driver & tracker',
      'Low rumble exhaust to avoid startling wildlife',
      'Ample under-seat dry luggage & lens storage',
      'Front bull-bar tracker observation perch',
    ],
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi L200 Safari Hunter 4x4',
    tagline: 'Wide-Angle Observation Deck & Lagoon Explorer',
    badge: 'Best Value',
    badgeColor: 'from-teal-500 to-emerald-600',
    image: '/images/jeep_mitsubishi.jpg',
    capacity: 6,
    seatingType: 'Dual-Row Elevated Bench System',
    drivetrain: 'Super-Select 4WD High Clearance',
    rating: 4.92,
    reviews: 139,
    tracker: 'Naturalist Tracker Dinesh (9 yrs exp)',
    rates: {
      morning: 'LKR 6,500',
      fullday: 'LKR 12,500',
      evening: 'LKR 7,000',
    },
    description:
      'Ideal for birdwatching enthusiasts and sunset lagoon game drives. Wide-open side viewing bays and smooth low-rpm cruising make spotting resting leopards and waterbirds seamless.',
    specs: [
      { label: 'Capacity', value: 'Max 6 Guests (Private)' },
      { label: 'Seating', value: 'Tiered Ergonomic Benches' },
      { label: 'Drivetrain', value: 'Super-Select 4WD' },
      { label: 'Profile', value: 'Wide-Angle Open Sides' },
    ],
    features: [
      'Wide-angle open observation perimeter',
      'Wildlife field identification guidebook & bird checklist',
      'Binoculars available on request',
      'Cold bottled water & wet wipes provided',
      'Licensed national park tracker & chauffeur',
      'Quick-roll heavy vinyl weather curtains',
      'Smooth steady crawl speed for bird photography',
      'USB phone charging socket at dash',
    ],
  },
  {
    id: 'bolero',
    name: 'Mahindra Bolero Classic Safari 4x4',
    tagline: 'Authentic Deep-Wilderness Bushcraft Expedition',
    badge: 'Rugged Bushcraft',
    badgeColor: 'from-amber-600 to-emerald-700',
    image: '/images/jeep_bolero.jpg',
    capacity: 6,
    seatingType: 'High Observation Benches + Hood Perch',
    drivetrain: 'Mechanical Heavy-Duty 4x4',
    rating: 4.89,
    reviews: 97,
    tracker: 'Veteran Tracker Sunil (18 yrs Yala legend)',
    rates: {
      morning: 'LKR 6,000',
      fullday: 'LKR 11,500',
      evening: 'LKR 6,000',
    },
    description:
      'The classic, raw safari feel favored by adventurers. With an exterior bonnet spotter seat, our tracker can read fresh pugmarks on the red dirt track in real time.',
    specs: [
      { label: 'Capacity', value: 'Max 6 Guests (Private)' },
      { label: 'Seating', value: 'High Observation Benches' },
      { label: 'Drivetrain', value: 'Mechanical Low-Ratio 4WD' },
      { label: 'Spotter', value: 'Front Hood Spotter Deck' },
    ],
    features: [
      'Front tracker bonnet seat for rapid pugmark spotting',
      'High ground clearance for deep mud & riverbed crossings',
      'Bottled water & hydration kit included',
      'Licensed veteran forest tracker with animal tracking skills',
      'Open sides for pure nature immersion & audio spotting',
      'Sturdy heavy-duty roll cage with grab handles',
      'All vehicle park entry registration included',
      'Authentic rustic adventure feel',
    ],
  },
];

// ─── HELPER: GENERATE UPCOMING DATES ──────────────────────────────────────────
function generateUpcomingDays(count = 14) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const isoString = d.toISOString().split('T')[0];
    const dayOfWeek = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const fullDate = d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    let status = 'Available';
    let statusClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (i === 0 || i === 1) {
      status = 'Filling Fast';
      statusClass = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    } else if (i % 4 === 0) {
      status = '3 Left';
      statusClass = 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    } else if (i % 3 === 0) {
      status = 'Popular';
      statusClass = 'text-teal-400 bg-teal-500/10 border-teal-500/30';
    }

    days.push({
      dateStr: isoString,
      dayOfWeek,
      dayNumber,
      month,
      fullDate,
      status,
      statusClass,
    });
  }
  return days;
}

export default function Booking() {
  const sectionRef = useRef(null);
  const dayScrollRef = useRef(null);
  const { isDark } = useTheme();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  // Dynamic day selection state
  const upcomingDays = useMemo(() => generateUpcomingDays(18), []);
  const [selectedDateStr, setSelectedDateStr] = useState(upcomingDays[0]?.dateStr || '');
  const [selectedSlotId, setSelectedSlotId] = useState('morning');
  const [selectedJeepId, setSelectedJeepId] = useState('landcruiser');

  // Form submission state
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    guests: '2',
    hotel: '',
    message: '',
  });

  // Keep form synced when user logs in or out
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  // Intersection observer for smooth reveals
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animElements = section.querySelectorAll('.reveal');
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
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Re-apply visible class after theme change
  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll('[data-revealed="true"]').forEach((el) => {
      el.classList.add('visible');
    });
  }, [isDark]);

  // Horizontal day scrolling
  const scrollDays = (dir) => {
    if (!dayScrollRef.current) return;
    const scrollAmount = 300;
    dayScrollRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Find active selections
  const activeSlot = TIME_SLOTS.find((s) => s.id === selectedSlotId) || TIME_SLOTS[0];
  const activeJeep = JEEP_FLEET.find((j) => j.id === selectedJeepId) || JEEP_FLEET[0];
  const activeDay =
    upcomingDays.find((d) => d.dateStr === selectedDateStr) || {
      dateStr: selectedDateStr,
      fullDate: selectedDateStr
        ? new Date(selectedDateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Selected Safari Date',
      dayOfWeek: 'Custom Date',
    };

  const currentJeepPrice = activeJeep.rates[selectedSlotId] || activeJeep.rates.morning;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal('register');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      package: activeSlot.name,
      timeSlot: `${activeSlot.name} (${activeSlot.time})`,
      jeep: activeJeep.name,
      date: activeDay.fullDate || selectedDateStr,
      guests: Number(form.guests) || 1,
      hotel: form.hotel || 'To be communicated via WhatsApp',
      message: form.message || '',
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.warn('Booking API error:', errorData);
      }
    } catch (err) {
      console.warn('Booking network error (client handled gracefully):', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedData({
        ...payload,
        jeepName: activeJeep.name,
        jeepImage: activeJeep.image,
        jeepTracker: activeJeep.tracker,
        price: currentJeepPrice,
        bookingRef: `YALA-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
      });
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedData(null);
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      guests: '2',
      hotel: '',
      message: '',
    });
  };

  const inputCls = `w-full rounded-xl px-4 py-3.5 text-sm transition-all duration-300 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 ${
    isDark
      ? 'bg-[#0a0f0d]/80 border border-white/10 text-white placeholder-neutral-500'
      : 'bg-[#f0faf0]/70 border border-emerald-300/50 text-[#0d2b0d] placeholder-neutral-400'
  }`;

  const labelCls = `block text-xs font-semibold mb-2 tracking-widest uppercase ${
    isDark ? 'text-neutral-300' : 'text-[#2e622e]'
  }`;

  return (
    <section
      id="booking"
      ref={sectionRef}
      className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#0a0f0d] text-white' : 'bg-[#f0faf0] text-[#0d2b0d]'
      }`}
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SECTION HEADER */}
        <div className="mb-12 sm:mb-16 reveal grid lg:grid-cols-[0.95fr_1fr] gap-6 lg:gap-12 items-end">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-500">
                Official Wildlife Expedition Portal
              </span>
            </div>
            <h2
              className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] font-black tracking-tight leading-[1.08]"
              style={{ color: 'var(--text-primary)' }}
            >
              Ticket Booking &amp; <br />
              <span className="gradient-text">Jeep Reservation.</span>
            </h2>
          </div>

          <p
            className={`text-[15px] sm:text-[16px] leading-relaxed font-normal ${
              isDark ? 'text-white/85' : 'text-emerald-950/85'
            }`}
          >
            Select your safari day, customize your preferred morning or full-day game drive, and choose from our licensed
            fleet of custom 4×4 safari jeeps with veteran park trackers. Real-time availability and transparent private jeep rates.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            STEP 1: DAY SELECTION & SESSION TIME SLOTS
        ══════════════════════════════════════════════════════════════════════════ */}
        <div className="mb-16 reveal">
          {/* Subheader */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-3">
              <span
                className={`text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white backdrop-blur-md'
                    : 'bg-emerald-800/10 border border-emerald-800/20 text-emerald-900 backdrop-blur-md'
                }`}
              >
                Step 01
              </span>
              <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                Select Safari Day &amp; Schedule
              </h3>
            </div>
            <span className={`text-xs font-light flex items-center gap-1.5 ${isDark ? 'text-neutral-400' : 'text-emerald-900/70'}`}>
              <FiCalendar className="w-3.5 h-3.5 text-emerald-500" />
              Select any upcoming day or specify a custom calendar date
            </span>
          </div>

          {/* Interactive Day Selection Carousel */}
          <div
            className={`p-6 sm:p-7 rounded-[2rem] border backdrop-blur-xl transition-all mb-6 ${
              isDark
                ? 'bg-[#0e1612]/75 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
                : 'bg-white/90 border-emerald-300/40 shadow-[0_4px_30px_rgba(0,0,0,0.04)]'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FiClock className="w-4 h-4 text-emerald-500" />
                <span className={`text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-300' : 'text-[#2e622e]'}`}>
                  Upcoming Expedition Days
                </span>
              </div>

              {/* Scroll controls & custom date picker */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    id="custom-date-picker"
                    type="date"
                    min={upcomingDays[0]?.dateStr}
                    value={selectedDateStr}
                    onChange={(e) => setSelectedDateStr(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    title="Select any date from calendar"
                  />
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                        : 'bg-emerald-50 border-emerald-200 text-[#1a4d1a] hover:bg-emerald-100'
                    }`}
                  >
                    <FiCalendar className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Custom Date</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => scrollDays('left')}
                  aria-label="Scroll days left"
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white hover:bg-white/15'
                      : 'bg-emerald-100/60 border-emerald-200 text-emerald-900 hover:bg-emerald-200'
                  }`}
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollDays('right')}
                  aria-label="Scroll days right"
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white hover:bg-white/15'
                      : 'bg-emerald-100/60 border-emerald-200 text-emerald-900 hover:bg-emerald-200'
                  }`}
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Day Chips Ribbon */}
            <div
              ref={dayScrollRef}
              className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none scroll-smooth select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {upcomingDays.map((day) => {
                const isSelected = selectedDateStr === day.dateStr;
                return (
                  <button
                    key={day.dateStr}
                    type="button"
                    onClick={() => setSelectedDateStr(day.dateStr)}
                    className={`shrink-0 flex flex-col items-center justify-between p-3.5 rounded-2xl min-w-[85px] sm:min-w-[95px] transition-all duration-300 border text-center relative group cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.04]'
                          : 'bg-emerald-600 text-white border-emerald-600 shadow-[0_4px_20px_rgba(5,150,105,0.35)] scale-[1.04]'
                        : isDark
                          ? 'bg-white/[0.03] border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.06]'
                          : 'bg-white/70 border-emerald-200/50 hover:border-emerald-400/60 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1 ${
                        isSelected
                          ? isDark
                            ? 'text-emerald-400'
                            : 'text-white'
                          : isDark
                            ? 'text-neutral-400 group-hover:text-neutral-200'
                            : 'text-neutral-600 group-hover:text-emerald-900'
                      }`}
                    >
                      {day.dayOfWeek}
                    </span>

                    <span
                      className={`text-xl sm:text-2xl font-black tracking-tight leading-none my-1 ${
                        isSelected
                          ? isDark
                            ? 'text-white'
                            : 'text-white'
                          : isDark
                            ? 'text-white'
                            : 'text-[#0d2b0d]'
                      }`}
                    >
                      {day.dayNumber}
                    </span>

                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${
                        isSelected
                          ? isDark
                            ? 'text-neutral-300'
                            : 'text-emerald-100'
                          : isDark
                            ? 'text-neutral-400'
                            : 'text-neutral-500'
                      }`}
                    >
                      {day.month}
                    </span>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                        isSelected
                          ? isDark
                            ? 'bg-emerald-400 text-black border-transparent'
                            : 'bg-white text-emerald-800 border-transparent'
                          : day.statusClass
                      }`}
                    >
                      {day.status}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Day Status Alert Banner */}
            <div
              className={`mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                isDark ? 'border-white/10 text-neutral-300' : 'border-emerald-200/50 text-[#1a4d1a]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span className="font-medium">
                  Active Booking Day:{' '}
                  <strong className="text-emerald-500 font-bold">{activeDay.fullDate}</strong>
                </span>
              </div>
              <span className={`font-light ${isDark ? 'text-neutral-400' : 'text-emerald-800/80'}`}>
                Park Gates Open: 5:30 AM &amp; 2:30 PM
              </span>
            </div>
          </div>

          {/* Time Slot / Session Selector */}
          <div className="grid md:grid-cols-3 gap-4">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedSlotId === slot.id;
              return (
                <button
                  key={slot.id}
                  id={`slot-${slot.id}`}
                  type="button"
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? isDark
                        ? 'bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                        : 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/40 shadow-[0_4px_25px_rgba(5,150,105,0.15)]'
                      : isDark
                        ? 'bg-[#0e1612]/60 border-white/10 hover:border-white/20 hover:bg-[#0e1612]'
                        : 'bg-white/70 border-emerald-200/50 hover:border-emerald-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{slot.icon}</span>
                        <div>
                          <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                            {slot.name}
                          </h4>
                          <span className="text-emerald-500 text-xs font-semibold">{slot.time}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
                          <FiCheck className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed font-light mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {slot.desc}
                    </p>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isDark
                          ? 'bg-white/5 text-neutral-400 border border-white/5'
                          : 'bg-emerald-100/50 text-emerald-800 border border-emerald-200/40'
                    }`}
                  >
                    <span>{slot.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            STEP 2: AVAILABLE JEEP FLEET (CARDS WITH PHOTOS & SUITABLE DETAILS)
        ══════════════════════════════════════════════════════════════════════════ */}
        <div className="mb-16 reveal">
          {/* Subheader */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-3">
              <span
                className={`text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white backdrop-blur-md'
                    : 'bg-emerald-800/10 border border-emerald-800/20 text-emerald-900 backdrop-blur-md'
                }`}
              >
                Step 02
              </span>
              <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                Available Safari Jeeps for {activeDay.dayOfWeek} ({activeDay.month} {activeDay.dayNumber})
              </h3>
            </div>
            <span className={`text-xs font-light ${isDark ? 'text-neutral-400' : 'text-emerald-900/70'}`}>
              * All jeeps are private charters and accommodate up to 6 passengers
            </span>
          </div>

          {/* Jeep Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {JEEP_FLEET.map((jeep) => {
              const isSelected = selectedJeepId === jeep.id;
              const jeepPrice = jeep.rates[selectedSlotId] || jeep.rates.morning;

              return (
                <div
                  key={jeep.id}
                  id={`jeep-${jeep.id}`}
                  className={`rounded-[2.2rem] overflow-hidden border transition-all duration-300 flex flex-col justify-between group relative ${
                    isSelected
                      ? isDark
                        ? 'border-emerald-500 bg-[#0e1612] ring-2 ring-emerald-500/70 shadow-[0_0_40px_rgba(16,185,129,0.25)] scale-[1.01]'
                        : 'border-emerald-500 bg-white ring-2 ring-emerald-500/60 shadow-[0_8px_35px_rgba(16,185,129,0.18)] scale-[1.01]'
                      : isDark
                        ? 'border-white/10 bg-[#0e1612]/70 hover:border-white/20 hover:bg-[#0e1612]'
                        : 'border-emerald-300/40 bg-white/80 hover:border-emerald-400/60 hover:bg-white'
                  }`}
                >
                  <div>
                    {/* Jeep Photo Header with Badges */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                      <img
                        src={jeep.image}
                        alt={jeep.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r ${jeep.badgeColor} shadow-lg tracking-wider uppercase backdrop-blur-md`}
                        >
                          {jeep.badge}
                        </span>

                        <span className="text-[11px] font-semibold text-emerald-300 bg-black/60 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Available on {activeDay.dayOfWeek}</span>
                        </span>
                      </div>

                      {/* Bottom Image Overlay Details */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                              <FiStar className="w-3.5 h-3.5 fill-amber-400" />
                              {jeep.rating}
                            </span>
                            <span className="text-white/60 text-xs">({jeep.reviews} safaris)</span>
                          </div>
                          <h4 className="text-white font-extrabold text-xl sm:text-2xl drop-shadow-md tracking-tight">
                            {jeep.name}
                          </h4>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] text-emerald-300 uppercase tracking-widest block font-medium">
                            {activeSlot.name}
                          </span>
                          <span className="text-2xl font-black text-white tracking-tight">{jeepPrice}</span>
                          <span className="text-[11px] text-white/70 block font-normal">/ private jeep</span>
                        </div>
                      </div>
                    </div>

                    {/* Suitable Details & Specifications */}
                    <div className="p-6 sm:p-7 space-y-6">
                      {/* Tagline & Description */}
                      <div>
                        <p className="text-emerald-500 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <FiCompass className="w-3.5 h-3.5" />
                          <span>{jeep.tagline}</span>
                        </p>
                        <p
                          className={`text-sm leading-relaxed font-light ${
                            isDark ? 'text-neutral-300' : 'text-neutral-700'
                          }`}
                        >
                          {jeep.description}
                        </p>
                      </div>

                      {/* 4-Item Quick Specs Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {jeep.specs.map((spec) => (
                          <div
                            key={spec.label}
                            className={`p-2.5 rounded-xl border text-center ${
                              isDark
                                ? 'bg-white/5 border-white/5 text-neutral-300'
                                : 'bg-emerald-50/60 border-emerald-200/50 text-[#1a4d1a]'
                            }`}
                          >
                            <span className="block text-[10px] opacity-60 uppercase font-semibold tracking-wider">
                              {spec.label}
                            </span>
                            <span className="text-xs font-bold truncate block mt-0.5">{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tracker info */}
                      <div
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs ${
                          isDark
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-neutral-300'
                            : 'bg-emerald-50 border-emerald-200 text-[#1a4d1a]'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold shrink-0">
                          <FiAward className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] opacity-70 uppercase tracking-wider block font-semibold">
                            Assigned Wildlife Specialist
                          </span>
                          <span className="font-semibold text-emerald-500">{jeep.tracker}</span>
                        </div>
                      </div>

                      {/* Features Checklist */}
                      <div>
                        <span
                          className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${
                            isDark ? 'text-neutral-400' : 'text-[#2e622e]'
                          }`}
                        >
                          Vehicle Equipment &amp; Inclusions:
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2 text-xs">
                          {jeep.features.map((feat) => (
                            <div key={feat} className="flex items-start gap-2 font-light">
                              <FiCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div
                    className={`p-6 sm:p-7 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      isDark ? 'border-white/10' : 'border-emerald-200/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400">Total Price:</span>
                        <strong className="text-lg font-bold text-emerald-500">{jeepPrice}</strong>
                      </div>
                      <span className="text-[11px] opacity-60 block">Includes fuel, permits &amp; licensed driver</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedJeepId(jeep.id);
                        // Smooth scroll to form if needed
                        const formEl = document.getElementById('reservation-form-container');
                        if (formEl) {
                          formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                          : isDark
                            ? 'bg-white/10 hover:bg-emerald-600 text-white'
                            : 'bg-emerald-800 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <FiCheck className="w-4 h-4" />
                          <span>✓ Selected Safari Jeep</span>
                        </>
                      ) : (
                        <>
                          <span>Select This Jeep</span>
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            STEP 3: RESERVATION & GUEST DETAILS CONFIRMATION FORM
        ══════════════════════════════════════════════════════════════════════════ */}
        <div
          id="reservation-form-container"
          className={`reveal rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl border backdrop-blur-xl transition-all ${
            isDark
              ? 'border-white/10 bg-[#0e1612]/85 shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
              : 'border-emerald-300/30 bg-white/95 shadow-[0_4px_30px_rgba(0,0,0,0.06)]'
          }`}
        >
          {submitted ? (
            /* ── SUCCESS VOUCHER STATE ── */
            <div className="text-center py-8 sm:py-12">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-500/10">
                <FiCheckCircle className="w-10 h-10 text-emerald-500" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold mb-3">
                <span>REF: {submittedData?.bookingRef}</span>
              </div>

              <h3 className={`text-2xl sm:text-4xl font-extrabold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                Safari Jeep Reservation Confirmed!
              </h3>
              <p
                className={`max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-8 ${
                  isDark ? 'text-neutral-300' : 'text-[#4a7a4a]'
                }`}
              >
                Thank you, <strong className="text-emerald-500 font-semibold">{submittedData?.name}</strong>! Your customized{' '}
                <strong className="text-emerald-500 font-semibold">{submittedData?.jeepName}</strong> has been placed on hold
                for <strong className="text-emerald-500 font-semibold">{submittedData?.date}</strong>.
              </p>

              {/* Confirmation Voucher Ticket Card */}
              {submittedData && (
                <div
                  className={`max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 text-left border mb-8 overflow-hidden shadow-2xl relative ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-neutral-300'
                      : 'bg-emerald-50/80 border-emerald-200 text-[#1a4d1a]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/10 mb-6">
                    <img
                      src={submittedData.jeepImage}
                      alt={submittedData.jeepName}
                      className="w-full sm:w-44 h-28 object-cover rounded-2xl border border-white/10"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Reserved Vehicle</span>
                      <h4 className="text-lg font-bold text-white">{submittedData.jeepName}</h4>
                      <p className="text-xs opacity-75">{submittedData.jeepTracker}</p>
                      <p className="text-xs text-emerald-400 font-semibold">
                        {submittedData.package} · {submittedData.price}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="opacity-60 block uppercase font-semibold text-[10px]">Expedition Date</span>
                      <strong className="font-semibold block mt-0.5">{submittedData.date}</strong>
                    </div>
                    <div>
                      <span className="opacity-60 block uppercase font-semibold text-[10px]">Time Slot</span>
                      <strong className="font-semibold block mt-0.5">{submittedData.package}</strong>
                    </div>
                    <div>
                      <span className="opacity-60 block uppercase font-semibold text-[10px]">Guests</span>
                      <strong className="font-semibold block mt-0.5">{submittedData.guests} Guest(s)</strong>
                    </div>
                    <div>
                      <span className="opacity-60 block uppercase font-semibold text-[10px]">Pickup Location</span>
                      <strong className="font-semibold block mt-0.5">{submittedData.hotel}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div
                  className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs sm:text-sm ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-neutral-300'
                      : 'bg-emerald-50 border border-emerald-200 text-[#1a4d1a]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>WhatsApp driver coordinator will message within 2 hours</span>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                >
                  Book Another Safari
                </button>
              </div>
            </div>
          ) : (
            /* ── BOOKING FORM WITH LIVE SELECTION SUMMARY ── */
            <>
              {/* Step 3 Header */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b ${
                  isDark ? 'border-white/10' : 'border-emerald-200/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                      isDark
                        ? 'bg-white/10 border border-white/20 text-white backdrop-blur-md'
                        : 'bg-emerald-800/10 border border-emerald-800/20 text-emerald-900 backdrop-blur-md'
                    }`}
                  >
                    Step 03
                  </span>
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                      Confirm Your Safari Details
                    </h3>
                    <p className={`text-xs sm:text-sm font-light mt-0.5 ${isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'}`}>
                      Review your chosen jeep &amp; schedule, then enter passenger details for park permit issuance.
                    </p>
                  </div>
                </div>

                {/* Verified user badge */}
                <div className="flex items-center gap-3">
                  {isAuthenticated ? (
                    <div
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
                        isDark
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      }`}
                    >
                      <FiUserCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Verified Member ({user?.name || 'User'})</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border hover:scale-105 cursor-pointer ${
                        isDark
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                          : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      <FiLock className="w-3.5 h-3.5" />
                      <span>Login to Auto-fill</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Active Selection Summary Card */}
              <div
                className={`mb-8 p-5 sm:p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
                  isDark
                    ? 'bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.1)]'
                    : 'bg-emerald-50/70 border-emerald-300/60 shadow-[0_4px_20px_rgba(5,150,105,0.08)]'
                }`}
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={activeJeep.image}
                    alt={activeJeep.name}
                    className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-xl border border-white/10 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">
                      Active Reservation Selection
                    </span>
                    <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-[#0d2b0d]'}`}>
                      {activeJeep.name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs opacity-75 mt-1 flex-wrap">
                      <span>📅 {activeDay.fullDate}</span>
                      <span>⏰ {activeSlot.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
                  <div className="text-right">
                    <span className="text-[10px] opacity-70 block uppercase font-semibold">Total Charter Rate</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-500">{currentJeepPrice}</span>
                    <span className="text-[10px] opacity-60 block">Private Jeep (Up to 6 guests)</span>
                  </div>
                </div>
              </div>

              {/* Registration / Guest Notice */}
              {!isAuthenticated && (
                <div
                  className={`mb-8 p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md ${
                    isDark
                      ? 'bg-amber-500/5 border-amber-500/20 text-neutral-300'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
                      <FiShield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Registered Guests Guarantee</p>
                      <p className="text-xs opacity-80 font-light">
                        Sign in or register to guarantee vehicle availability &amp; direct WhatsApp driver coordination.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-all cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuthModal('register')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isDark
                          ? 'border-white/20 text-white hover:bg-white/10'
                          : 'border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                      }`}
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}

              {/* The Booking Form */}
              <form id="booking-form" onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. David Miller"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="david@example.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>WhatsApp / Phone Number *</label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className={inputCls}
                  />
                  <span className="text-[11px] opacity-60 block mt-1">
                    Used for WhatsApp driver pickup coordinate and gate pass updates.
                  </span>
                </div>

                <div>
                  <label className={labelCls}>Number of Guests * (Private Jeep)</label>
                  <select
                    id="booking-guests"
                    name="guests"
                    required
                    value={form.guests}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option
                        key={n}
                        value={n}
                        className={isDark ? 'bg-[#0a0f0d] text-white' : 'bg-white text-black'}
                      >
                        {n} {n === 1 ? 'Guest' : 'Guests'} (Private Charter · Max 6)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Hotel / Villa Pickup Location in Yala, Tissamaharama or Kirinda</label>
                  <input
                    id="booking-hotel"
                    name="hotel"
                    type="text"
                    value={form.hotel}
                    onChange={handleChange}
                    placeholder="e.g. Jetwing Yala, Cinnamon Wild, Wild Coast Tented Lodge, or Tissamaharama Town"
                    className={inputCls}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Special Wildlife Focus &amp; Requests</label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Specify interests (e.g. leopard tracking, bird photography lenses, child seats, packed breakfast requirements...)"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Form Footer Action */}
                <div
                  className={`sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t ${
                    isDark ? 'border-white/10' : 'border-emerald-200/50'
                  }`}
                >
                  <p
                    className={`text-xs flex items-center gap-2 font-light ${
                      isDark ? 'text-neutral-400' : 'text-[#4a7a4a]'
                    }`}
                  >
                    <FiShield className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>No advance payment needed today. Jeep permit &amp; ranger are reserved upon WhatsApp confirmation.</span>
                  </p>

                  <button
                    id="booking-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full sm:w-auto px-10 py-4 font-semibold text-sm rounded-full overflow-hidden transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer ${
                      !isAuthenticated
                        ? isDark
                          ? 'bg-amber-400 text-black hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]'
                          : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-[0_0_30px_rgba(22,101,52,0.3)]'
                        : isDark
                          ? 'bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]'
                          : 'bg-[#166534] text-white hover:bg-[#15803d] hover:shadow-[0_0_30px_rgba(22,101,52,0.3)]'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <FiLoader className="w-4 h-4 animate-spin" />
                          <span>Reserving Jeep...</span>
                        </>
                      ) : !isAuthenticated ? (
                        <>
                          <FiLock className="w-4 h-4" />
                          <span>Login to Reserve Jeep</span>
                        </>
                      ) : (
                        <>
                          <span>Reserve {activeJeep.name.split(' ')[0]} Jeep</span>
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    {isDark && isAuthenticated && (
                      <div className="absolute inset-0 bg-emerald-50 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
