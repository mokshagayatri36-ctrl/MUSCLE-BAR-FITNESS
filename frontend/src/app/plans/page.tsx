'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { api } from '../../lib/api';
import { Check, Star, Sparkles, Zap, Target, Shield, Crown, ArrowRight } from 'lucide-react';

const includedFeatures = [
  'Unlimited Gym Access',
  'Professional Trainer Support',
  'Cardio & Strength Training Equipment',
  'Fitness Assessment',
  'Locker Facility',
  'Progress Tracking',
  'Group Workout Sessions'
];

interface PlanConfig {
  id: string;
  name: string;
  duration: string;
  price: number;
  subtitle: string;
  savings: string;
  badge: string;
  extraWording: string;
  themeClass: string;
  btnThemeClass: string;
  icon: 'zap' | 'target' | 'shield' | 'crown';
  isPopular: boolean;
}

const staticPlans: PlanConfig[] = [
  {
    id: 'monthly-plan-id',
    name: 'Monthly Plan',
    duration: 'Month',
    price: 2499,
    subtitle: 'Perfect for beginners',
    savings: '',
    badge: '',
    extraWording: '',
    themeClass: 'bg-gradient-to-b from-[#0d1635]/40 to-[#02050f]/90 border-[#1e293b]/30 hover:border-blue-500/40 shadow-black/60 hover:shadow-[0_20px_40px_rgba(30,58,138,0.15)]',
    btnThemeClass: 'bg-[#0a0f24] hover:bg-[#121c44] text-slate-300 hover:text-white border border-[#223366] hover:border-[#334e99]',
    icon: 'zap',
    isPopular: false,
  },
  {
    id: 'quarterly-plan-id',
    name: 'Quarterly Plan',
    duration: '3 Months',
    price: 6499,
    subtitle: 'Popular choice for short-term goals',
    savings: '',
    badge: '',
    extraWording: '',
    themeClass: 'bg-gradient-to-b from-[#0d1635]/40 to-[#02050f]/90 border-[#1e293b]/30 hover:border-blue-500/40 shadow-black/60 hover:shadow-[0_20px_40px_rgba(30,58,138,0.15)]',
    btnThemeClass: 'bg-[#0a0f24] hover:bg-[#121c44] text-slate-300 hover:text-white border border-[#223366] hover:border-[#334e99]',
    icon: 'target',
    isPopular: false,
  },
  {
    id: 'half-yearly-plan-id',
    name: 'Half-Yearly Plan',
    duration: '6 Months',
    price: 11999,
    subtitle: 'Best for consistent fitness progress',
    savings: 'Save 20%',
    badge: '',
    extraWording: 'Save more compared to monthly payments',
    themeClass: 'bg-gradient-to-b from-[#0f204c]/50 to-[#02050f]/90 border-blue-900/30 hover:border-blue-500/50 shadow-black/70 hover:shadow-[0_20px_40px_rgba(37,99,235,0.18)]',
    btnThemeClass: 'bg-[#0a0f24] hover:bg-[#121c44] text-slate-300 hover:text-white border border-[#223366] hover:border-[#334e99]',
    icon: 'shield',
    isPopular: false,
  },
  {
    id: 'yearly-plan-id',
    name: 'Yearly Plan',
    duration: 'Year',
    price: 19999,
    subtitle: 'Best Value',
    savings: 'Save 33%',
    badge: 'Best Value',
    extraWording: 'Maximum savings • Most Popular',
    themeClass: 'bg-gradient-to-b from-[#162a6b]/80 via-[#0a122e]/95 to-[#02040c]/98 border-amber-500/50 hover:border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.12)] hover:shadow-[0_0_60px_rgba(245,158,11,0.22)] scale-[1.01] md:scale-[1.03] lg:scale-[1.05] z-10',
    btnThemeClass: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black font-extrabold shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.4)]',
    icon: 'crown',
    isPopular: true,
  }
];

export default function Plans() {
  const [plans, setPlans] = useState<PlanConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await api.plans.getAll();
        if (data && data.length > 0) {
          // Merge database data with our visual-oriented static configuration
          const merged = staticPlans.map(sp => {
            const dbMatch = data.find((dp: any) => 
              dp.name.toLowerCase().replace(/[^a-z]/g, '') === sp.name.toLowerCase().replace(/[^a-z]/g, '')
            );
            if (dbMatch) {
              return {
                ...sp,
                id: dbMatch.id,
                price: dbMatch.price,
              };
            }
            return sp;
          });
          setPlans(merged);
        } else {
          setPlans(staticPlans);
        }
      } catch (err) {
        console.error('Error fetching plans from DB, using fallback static data', err);
        setPlans(staticPlans);
      } finally {
        setLoading(false);
      }
    }
    loadPlans();
  }, []);

  const renderIcon = (iconName: string, isPopular: boolean) => {
    const iconClass = isPopular ? 'text-amber-400' : 'text-blue-400';
    switch (iconName) {
      case 'zap': return <Zap className={`w-5 h-5 ${iconClass}`} />;
      case 'target': return <Target className={`w-5 h-5 ${iconClass}`} />;
      case 'shield': return <Shield className={`w-5 h-5 ${iconClass}`} />;
      case 'crown': return <Crown className={`w-5 h-5 ${iconClass}`} />;
      default: return <Zap className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  return (
    <div className="bg-[#020205] text-zinc-100 min-h-screen flex flex-col font-sans relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[650px] h-[650px] bg-indigo-950/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[550px] bg-purple-950/10 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />

      {/* Header Banner */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#050b1d] via-[#02050f] to-[#020205] text-center border-b border-blue-950/30">
        <div className="relative max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Premium Membership Plans</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Invest In Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300">Fitness Journey</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Choose a plan that fits your physical goals and schedule. Sign up online for instant enrollment.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8 items-stretch pt-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-8 rounded-3xl backdrop-blur-xl border ${plan.themeClass} flex flex-col justify-between transition-all duration-500 hover:-translate-y-2.5 group`}
              >
                {/* Popular / Best Value Badge */}
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg border border-yellow-300/30 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-black text-black shrink-0" />
                    {plan.badge}
                  </span>
                )}

                {/* Savings tag */}
                {plan.savings && (
                  <span className="absolute top-6 right-6 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {plan.savings}
                  </span>
                )}

                <div className="space-y-6">
                  {/* Card Header Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-2 rounded-xl ${plan.isPopular ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-blue-500/10 border border-blue-500/20'} shrink-0`}>
                        {renderIcon(plan.icon, plan.isPopular)}
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest block">
                        {plan.duration === 'Month' ? 'Monthly' : plan.duration}
                      </span>
                    </div>
                    
                    <h3 className="font-extrabold text-2xl text-white leading-none flex items-center gap-1.5 pt-1">
                      {plan.name}
                      {plan.isPopular && <span className="text-amber-400">⭐</span>}
                    </h3>
                    <p className="text-slate-400 text-xs font-medium leading-normal">{plan.subtitle}</p>
                  </div>

                  {/* Pricing Display */}
                  <div className="pt-2">
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400 tracking-tight">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500">/ {plan.duration.toLowerCase()}</span>
                    </div>
                    {/* Monthly equivalence explanation */}
                    {plan.duration !== 'Month' && (
                      <p className="text-[10px] text-slate-500 mt-1 font-medium">
                        Equivalent to ₹{Math.round(plan.price / (plan.duration.includes('3') ? 3 : plan.duration.includes('6') ? 6 : 12)).toLocaleString('en-IN')}/month
                      </p>
                    )}
                  </div>

                  {/* Extra highlights */}
                  {plan.extraWording && (
                    <div className="py-2.5 px-3 bg-blue-950/25 border border-blue-900/20 rounded-xl">
                      <p className="text-[10px] text-blue-300 font-bold text-center leading-normal">
                        {plan.extraWording}
                      </p>
                    </div>
                  )}

                  <hr className="border-blue-950/40" />

                  {/* Included Features List */}
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Included Features:</span>
                    <ul className="space-y-3">
                      {includedFeatures.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-3 text-xs text-slate-300 group-hover:text-white transition-colors">
                          <div className={`p-0.5 rounded-full ${plan.isPopular ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'} shrink-0 mt-0.5`}>
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Enrollment Button */}
                <div className="pt-8">
                  <Link
                    href={`/contact?tab=register&plan=${encodeURIComponent(plan.name.replace(' ⭐', ''))}`}
                    className={`block w-full py-4 text-center text-xs font-extrabold rounded-xl transition-all duration-300 ${plan.btnThemeClass}`}
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-28 relative max-w-5xl mx-auto w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-indigo-950/30 to-purple-950/20 rounded-[32px] blur-3xl pointer-events-none" />
          <div className="relative p-10 sm:p-14 rounded-[32px] bg-gradient-to-br from-[#0c142e]/60 to-[#02050f]/90 border border-blue-900/30 backdrop-blur-xl text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Ambient decorative glowing corners */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Your Transformation</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight text-white">
              Choose Your Plan. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300">Start Your Transformation Today</span> at AntiGravity Fitness.
            </h2>
            
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Whether you are a beginner looking to take the first step or an experienced athlete aiming for peak performance, our premium facilities and trainer support are here to elevate you.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact?tab=register"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:scale-105"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white font-bold text-sm rounded-full transition-all duration-300 hover:bg-[#070c1f]/40"
              >
                Explore Facility
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

