'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { api } from '../../lib/api';
import { Flame, Activity, Award, Star, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Programs() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback data in case server is loading or database hasn't populated yet
  const fallbackPrograms = [
    {
      title: 'Weight Loss Program',
      description: 'A scientifically structured high-intensity program designed to burn fat rapidly while building muscle definition. Focuses on HIIT, caloric deficit guidance, and high-energy conditioning.',
      duration: '12 Weeks',
      benefits: 'Fat loss and core strengthening\nCardiovascular endurance improvement\nCustomized nutrition deficit plans\nWeekly body fat percentage tracking',
    },
    {
      title: 'Muscle Gain Program',
      description: 'Hypertrophy focused program using progressive overload, compound lifts, and targeted isolation routines to maximize lean muscle mass and volume growth.',
      duration: '16 Weeks',
      benefits: 'Significant increase in muscle mass\nStrength improvement on compound lifts\nHigh protein meal plans & supplement advice\nForm and technique correction tutorials',
    },
    {
      title: 'Strength Training Program',
      description: 'Powerlifting and functional strength base program designed to push your physical limits. Focusing on squat, bench press, deadlift, and military press.',
      duration: '8 Weeks',
      benefits: 'Increases raw physical strength & bone density\nImprovement in core power and stability\nNeuromuscular adaptation training\nSafety spotter and lift-off guidance',
    },
    {
      title: 'General Fitness Program',
      description: 'A balanced routine for beginners and professionals alike to maintain healthy heart rate, muscle tone, flexibility, and overall standard wellness.',
      duration: 'Ongoing',
      benefits: 'Improves daily energy levels and posture\nMaintains cardiovascular health\nFlexible timing and customizable exercises\nSocial and active environment',
    },
  ];

  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await api.programs.getAll();
        if (data && data.length > 0) {
          setPrograms(data);
        } else {
          setPrograms(fallbackPrograms);
        }
      } catch (err) {
        console.error('Error fetching programs, using fallback', err);
        setPrograms(fallbackPrograms);
      } finally {
        setLoading(false);
      }
    }
    loadPrograms();
  }, []);

  const activePrograms = programs.length > 0 ? programs : fallbackPrograms;

  // Helper to assign a fitting icon based on program title
  const getProgramIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('loss') || t.includes('weight') || t.includes('fat')) {
      return <Flame className="w-6 h-6 text-red-500" />;
    }
    if (t.includes('muscle') || t.includes('gain') || t.includes('bulk')) {
      return <Award className="w-6 h-6 text-amber-500" />;
    }
    if (t.includes('strength') || t.includes('power')) {
      return <Activity className="w-6 h-6 text-orange-500" />;
    }
    return <Heart className="w-6 h-6 text-emerald-500" />;
  };

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#0f0f12] to-[#0a0a0c] text-center border-b border-zinc-900/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Workout Programs</h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Explore our curated training plans designed to build lean mass, shed fat, or develop maximum strength.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activePrograms.map((prog: any) => (
              <div
                key={prog.id}
                className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-900 flex flex-col justify-between space-y-6 hover:border-red-500/30 transition-all duration-355"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800">
                      {getProgramIcon(prog.title)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                      {prog.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xl text-white">{prog.title}</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{prog.description}</p>

                  <hr className="border-zinc-900" />

                  <div className="space-y-3">
                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest block">
                      Program Benefits
                    </span>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {prog.benefits.split('\n').map((benefit: string, bIdx: number) => (
                        <li key={bIdx} className="flex items-start space-x-2.5 text-xs text-zinc-300">
                          <ShieldCheck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/contact?tab=register&program=${encodeURIComponent(prog.title)}`}
                    className="block w-full py-4 text-center text-xs font-bold rounded-xl bg-zinc-900 hover:bg-zinc-850 hover:text-white text-zinc-300 border border-zinc-800 hover:border-red-500 transition-all"
                  >
                    Select Program & Enroll
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
