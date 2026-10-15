import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiArrowRight,
  FiArrowLeft,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';

export default function AdminLogin({ onLoginSuccess }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please provide both your administrator email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid administrator email or password.');
        return;
      }

      if (data.admin) {
        if (data.token) {
          localStorage.setItem('safari_token', data.token);
        }
        setSuccess('Authentication verified. Redirecting to dashboard...');
        setTimeout(() => {
          login(data.admin);
          if (onLoginSuccess) {
            onLoginSuccess(data.admin);
          } else {
            navigate('/admin');
          }
        }, 600);
      } else {
        setError('Unexpected error during authentication. Please try again.');
      }
    } catch (err) {
      setError('Unable to reach authentication server. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-[100dvh] w-full max-w-[100vw] bg-[#070b09] text-white flex flex-col justify-between items-center py-2 sm:py-5 px-3 sm:px-4 relative overflow-x-hidden overflow-y-auto no-scrollbar font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background Animated Glowing Ambient Orbs — constrained to prevent horizontal scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-emerald-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[480px] h-[480px] rounded-full bg-teal-600/10 blur-[150px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top Header / Back Link */}
      <div className="w-full max-w-[340px] sm:max-w-sm flex items-center justify-between z-10 shrink-0 pt-1 sm:pt-0">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors group py-1"
        >
          <FiArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-emerald-400" />
          <span>Return to Website</span>
        </button>

        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          Admin Portal
        </span>
      </div>

      {/* Main Login Card */}
      <div className="relative w-full max-w-[340px] sm:max-w-sm z-10 my-auto py-2 sm:py-0">
        {/* Glow halo behind card */}
        <div className="absolute -inset-0.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-emerald-500/20 blur-md opacity-70 pointer-events-none" />

        <div className="relative rounded-2xl sm:rounded-3xl bg-[#0e1511]/95 border border-white/10 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          {/* Top Decorative Border Accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent rounded-t-2xl sm:rounded-t-3xl" />

          {/* Logo & Header */}
          <div className="text-center mb-3 sm:mb-4">
            <div className="mx-auto w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.4)] mb-2 sm:mb-2.5 border border-emerald-300/30">
              <span className="text-white text-sm sm:text-base font-black tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
                YS
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1 sm:mb-1.5">
              <FiShield className="w-2.5 h-2.5 text-emerald-400" />
              <span>Restricted Access</span>
            </div>

            <h1 className="text-base sm:text-xl font-extrabold text-white tracking-tight">
              Sign In to Dashboard
            </h1>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 sm:mt-1 max-w-xs mx-auto leading-normal">
              Enter your administrator credentials to access the portal.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2 sm:p-2.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-300 text-[11px] flex items-start gap-2 animate-fadeIn">
              <FiAlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-3 p-2 sm:p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px] flex items-center gap-2 animate-fadeIn">
              <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
            {/* Email Field */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <FiMail className="w-3.5 h-3.5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="admin@yalasafari.lk"
                  autoComplete="email"
                  className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-[#080d0a] border border-white/10 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] sm:text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <FiLock className="w-3.5 h-3.5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2 sm:py-2.5 bg-[#080d0a] border border-white/10 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-white transition-colors"
                  tabIndex="-1"
                >
                  {showPassword ? <FiEyeOff className="w-3.5 h-3.5" /> : <FiEye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-[10px] sm:text-[11px] text-neutral-400 select-none hover:text-neutral-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3 h-3 rounded bg-[#080d0a] border-white/20 text-emerald-500 focus:ring-0 cursor-pointer accent-emerald-500"
                />
                <span>Stay signed in on this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 sm:mt-1.5 group relative py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-[#070b09] shadow-[0_4px_20px_rgba(52,211,153,0.3)] hover:shadow-[0_4px_30px_rgba(52,211,153,0.5)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#070b09] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer Notice */}
      <div className="text-center text-[10px] sm:text-[11px] text-neutral-500 z-10 shrink-0 py-1">
        &copy; {new Date().getFullYear()} Yala Safari Jeep Management Portal
      </div>
    </div>
  );
}

