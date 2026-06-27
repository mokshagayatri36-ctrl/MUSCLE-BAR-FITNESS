import Link from 'next/link';
import { Mail, Phone, MapPin, Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0e] text-zinc-400 border-t border-zinc-900/60 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center w-10 h-10 bg-red-600 rounded-full border border-amber-500 overflow-hidden shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                <span className="text-[7px]">👑</span>
                <Dumbbell className="w-5 h-5 text-white mt-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-widest text-white leading-none">MBF</span>
                <span className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold">Muscle Bar Fitness</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed pt-2">
              Premium training environment with state-of-the-art strength and cardio equipment. Under the expert coaching of Aluri Sandilya, we turn goals into realities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-red-500 transition-colors">About Facility</Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-red-500 transition-colors">Membership Plans</Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-red-500 transition-colors">Workout Programs</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-red-500 transition-colors">Gym Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">Gym Timings</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li className="flex justify-between text-xs">
                <span>Mon - Sat Morning:</span>
                <span className="text-zinc-300 font-medium">05:00 AM - 11:00 AM</span>
              </li>
              <li className="flex justify-between text-xs">
                <span>Mon - Sat Evening:</span>
                <span className="text-zinc-300 font-medium">04:00 PM - 09:00 PM</span>
              </li>
              <li className="flex justify-between text-xs">
                <span>Sunday:</span>
                <span className="text-amber-500 font-semibold">07:00 AM - 11:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-zinc-300">
                  Muscle Bar Fitness,<br />
                  Amarvani Estates, Panta Kaluva Rd,<br />
                  Maruti Colony, Patamata, Benz Circle,<br />
                  Vijayawada, Andhra Pradesh 520010
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href="tel:+917981285051" className="text-zinc-300 hover:text-white transition-colors">
                  +91 79812 85051
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-zinc-300">contact@musclebar.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-zinc-900/80 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 gap-4">
          <p>© {new Date().getFullYear()} Muscle Bar Fitness Centre. All rights reserved.</p>
          <p>
            Designed & Managed by <span className="text-zinc-400 font-semibold">Aluri Sandilya</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
