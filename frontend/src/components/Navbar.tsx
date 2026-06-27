'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import GymLogo from './GymLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    // Listen for storage changes or custom login events
    window.addEventListener('storage', checkUser);
    window.addEventListener('auth-change', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('auth-change', checkUser);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Plans', path: '/plans' },
    { name: 'Trainer', path: '/trainer' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  // Don't show public navbar on full-screen admin/member subpages if needed, 
  // but showing it as a top header keeps it standard and responsive.
  const isAdminPage = pathname?.startsWith('/admin');
  const isMemberPage = pathname?.startsWith('/member');

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f12]/80 backdrop-blur-md border-b border-zinc-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 shrink-0">
              <GymLogo variant="transparent" size="100%" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-500 leading-none">
                MBF
              </span>
              <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold -mt-0.5">
                Muscle Bar Fitness
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-red-500 bg-red-500/10'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Portal & Auth buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={user.role === 'ADMIN' ? '/admin' : '/member'}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full border border-zinc-700 hover:border-red-500 text-xs font-semibold text-zinc-300 hover:text-white transition-all bg-zinc-900/50"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{user.role === 'ADMIN' ? 'Admin Panel' : 'Member Portal'}</span>
                </Link>
                <div className="text-xs text-zinc-400">
                  Hi, <span className="text-white font-medium">{user.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/login"
                  className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 rounded-full shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.5)] transition-all hover:scale-105"
                >
                  Join Class
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger button */}
          <div className="flex md:hidden items-center">
            {user && (
              <span className="mr-3 text-xs text-zinc-400 font-medium">
                {user.name.split(' ')[0]}
              </span>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0f0f12] border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                    isActive ? 'text-red-500 bg-red-500/10' : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="border-t border-zinc-800 my-4 pt-4 px-3">
              {user ? (
                <div className="space-y-2">
                  <Link
                    href={user.role === 'ADMIN' ? '/admin' : '/member'}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 w-full py-2.5 px-4 rounded-md bg-zinc-800 text-sm font-semibold hover:bg-zinc-700 text-center text-white"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{user.role === 'ADMIN' ? 'Admin Dashboard' : 'Member Dashboard'}</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-md border border-zinc-700 text-sm font-semibold text-red-500 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-2.5 px-4 rounded-md border border-zinc-700 text-sm font-semibold text-center text-zinc-300 hover:text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-2.5 px-4 rounded-md bg-gradient-to-r from-red-600 to-amber-500 text-sm font-bold text-center text-white shadow-md"
                  >
                    Register / Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
