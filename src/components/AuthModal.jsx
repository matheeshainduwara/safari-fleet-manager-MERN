import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiX, FiMail, FiLock, FiUser, FiPhone, FiCheck, FiArrowRight } from 'react-icons/fi';

export default function AuthModal() {
  const { authModalOpen, authMode, setAuthMode, login, closeAuthModal } = useAuth();
  const { isDark } = useTheme();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Lock background window scrolling when auth modal is open
  useEffect(() => {
    if (authModalOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [authModalOpen]);

  if (!authModalOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (authMode === 'register') {
        if (!form.name || !form.email || !form.password) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }

        // Save registered user into local storage list
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const existing = registeredUsers.find((u) => u.email === form.email);
        if (existing) {
          setError('This email is already registered. Please login.');
          setLoading(false);
          return;
        }

        const newUser = {
          name: form.name,
          email: form.email,
          phone: form.phone || '',
          password: form.password,
          createdAt: new Date().toISOString(),
        };

        registeredUsers.push(newUser);
        localStorage.setItem('registered_users', JSON.stringify(registeredUsers));

        setSuccess('Registration successful! Logging you in...');
        setTimeout(() => {
          login({ name: newUser.name, email: newUser.email, phone: newUser.phone });
          setLoading(false);
          setSuccess('');
        }, 800);
      } else {
        // Login mode
        if (!form.email || !form.password) {
          setError('Please enter your email and password');
          setLoading(false);
          return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const existing = registeredUsers.find((u) => u.email === form.email);

        if (existing) {
          if (existing.password === form.password) {
            setSuccess('Welcome back! Logging you in...');
            setTimeout(() => {
              login({ name: existing.name, email: existing.email, phone: existing.phone });
              setLoading(false);
              setSuccess('');
            }, 600);
          } else {
            setError('Incorrect password. Please try again.');
            setLoading(false);
          }
        } else {
          // Allow demo login or auto-register convenience
          const defaultUser = {
            name: form.email.split('@')[0],
            email: form.email,
            phone: form.phone || '',
          };
          login(defaultUser);
          setLoading(false);
        }
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={closeAuthModal}
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-lg max-h-[92vh] overflow-y-auto sm:overflow-visible rounded-3xl p-4 sm:p-7 z-10 transition-all duration-300 shadow-2xl border ${
          isDark
            ? 'bg-[#0f1713] border-white/10 text-white'
            : 'bg-white border-emerald-200/80 text-[#0d2b0d]'
        }`}
        style={{
          boxShadow: isDark
            ? '0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)'
            : '0 25px 60px rgba(16,185,129,0.15), 0 0 0 1px rgba(16,185,129,0.1)',
        }}
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isDark
              ? 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              : 'bg-black/5 text-neutral-500 hover:text-black hover:bg-black/10'
          }`}
          aria-label="Close modal"
        >
          <FiX className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-3 sm:mb-5 pr-4 pl-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1 sm:mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Yala Safari Portal
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p
            className={`text-[11px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 ${
              isDark ? 'text-neutral-400' : 'text-emerald-800/70'
            }`}
          >
            {authMode === 'login'
              ? 'Log in to reserve and manage your safari jeeps'
              : 'Register in seconds to book verified safari drives'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          className={`grid grid-cols-2 p-1 rounded-xl mb-3 sm:mb-5 border ${
            isDark
              ? 'bg-white/5 border-white/5'
              : 'bg-emerald-50 border-emerald-200/50'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setError('');
            }}
            className={`py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              authMode === 'login'
                ? isDark
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-emerald-700 text-white shadow-md'
                : isDark
                ? 'text-neutral-400 hover:text-white'
                : 'text-emerald-800 hover:text-emerald-950'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setError('');
            }}
            className={`py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              authMode === 'register'
                ? isDark
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-emerald-700 text-white shadow-md'
                : isDark
                ? 'text-neutral-400 hover:text-white'
                : 'text-emerald-800 hover:text-emerald-950'
            }`}
          >
            Register
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center gap-2">
            <FiCheck className="w-4 h-4" />
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className={`grid gap-2.5 sm:gap-4 ${authMode === 'register' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
            {authMode === 'register' && (
              <div>
                <label
                  className={`block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-neutral-300' : 'text-emerald-900'
                  }`}
                >
                  Full Name *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all border ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                        : 'bg-neutral-50 border-emerald-200 text-[#0d2b0d] placeholder-neutral-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                className={`block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                  isDark ? 'text-neutral-300' : 'text-emerald-900'
                }`}
              >
                Email Address *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                      : 'bg-neutral-50 border-emerald-200 text-[#0d2b0d] placeholder-neutral-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                  }`}
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label
                  className={`block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-neutral-300' : 'text-emerald-900'
                  }`}
                >
                  WhatsApp / Phone
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className={`w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all border ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                        : 'bg-neutral-50 border-emerald-200 text-[#0d2b0d] placeholder-neutral-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                className={`block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                  isDark ? 'text-neutral-300' : 'text-emerald-900'
                }`}
              >
                Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                      : 'bg-neutral-50 border-emerald-200 text-[#0d2b0d] placeholder-neutral-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                  }`}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2.5 sm:mt-3 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] shadow-lg disabled:opacity-50 ${
              isDark
                ? 'bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]'
                : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{authMode === 'login' ? 'Login Now' : 'Create My Account'}</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-neutral-400">
            {authMode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setError('');
                  }}
                  className="text-emerald-500 font-semibold hover:underline"
                >
                  Register here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setError('');
                  }}
                  className="text-emerald-500 font-semibold hover:underline"
                >
                  Login here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
