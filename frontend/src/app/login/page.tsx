'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GymLogo from '../../components/GymLogo';
import { api } from '../../lib/api';
import { ShieldAlert, Key, Eye, EyeOff, Check, X, HelpCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // States for loader, errors, and custom popup modals
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const role = user.role?.toUpperCase();
        if (role === 'ADMIN') {
          router.replace('/admin');
        } else if (role === 'MEMBER') {
          router.replace('/member');
        }
      } catch (e) {
        // Clear corrupt storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    // Auto-fill email if remember me was set previously
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.auth.login({ email, password });
      
      // Save session credentials
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Notify other components (Navbar, etc.) of credentials update
      window.dispatchEvent(new Event('auth-change'));

      // Redirect depending on user role
      const role = res.user.role?.toUpperCase();
      if (role === 'ADMIN') {
        router.replace('/admin');
      } else {
        router.replace('/member');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="w-full max-w-md p-8 sm:p-10 bg-zinc-950/80 border border-zinc-900 rounded-3xl space-y-6 shadow-2xl relative">
          <div className="text-center space-y-3">
            <div className="w-24 h-24 mx-auto hover:scale-105 transition-transform duration-300">
              <GymLogo variant="transparent" size="100%" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-2">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Muscle Bar</span>
            </h2>
            <p className="text-zinc-500 text-xs max-w-xs mx-auto">
              Access your personalized dashboard, manage schedules, payments, and workouts.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Email or Username</label>
              <input
                type="text"
                placeholder="Enter email or username..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none transition-all placeholder:text-zinc-650"
                required
              />
            </div>

            <div className="space-y-1.5 relative">
              <div className="flex justify-between items-center">
                <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-amber-500 hover:text-amber-400 text-[10px] font-bold hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 pr-10 rounded-xl focus:outline-none transition-all placeholder:text-zinc-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2 py-1">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center peer-checked:bg-red-600 peer-checked:border-red-500 transition-colors">
                  {rememberMe && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                </div>
                <span className="ml-2 text-zinc-400 text-xs select-none hover:text-zinc-300 transition-colors">Remember Me</span>
              </label>
            </div>

            {error && (
              <div className="p-3.5 bg-red-950/30 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2 animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-zinc-900/50">
            <p className="text-[11px] text-zinc-650">
              New member? Register first on the{' '}
              <Link href="/contact?tab=register" className="text-red-500 font-semibold hover:underline">
                Registration Tab
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Forgot Password Diagnostic Popup Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md p-6 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute right-4 top-4 p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-full hover:scale-105 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2.5 text-amber-500">
              <HelpCircle className="w-6 h-6" />
              <h3 className="text-lg font-black tracking-tight text-white">Resetting Password</h3>
            </div>

            <div className="space-y-3 text-xs text-zinc-400 leading-relaxed">
              <p>
                To maintain high security, self-service password resets are handled directly by the administrative team.
              </p>
              <p>
                Please email <strong className="text-white">admin@musclebar.com</strong> or contact the front desk at the fitness centre to request a credentials reset.
              </p>
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-850 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Developer Default Seed Passwords:</span>
                <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-amber-400">
                  <li>Admin: admin@musclebar.com (pass: admin123)</li>
                  <li>Member: member@musclebar.com (pass: member123)</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full py-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white font-bold text-xs rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
