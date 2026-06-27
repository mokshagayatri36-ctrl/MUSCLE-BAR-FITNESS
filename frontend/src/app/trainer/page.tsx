'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { api } from '../../lib/api';
import { Mail, Phone, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export default function Trainer() {
  const [trainer, setTrainer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fallback data in case server is loading or database hasn't populated yet
  const fallbackTrainer = {
    name: 'Aluri Sandilya',
    photo: '/trainer.jpg',
    experience: '8+ Years of Professional Coaching Experience',
    certifications: 'ISSA Certified Personal Trainer (CPT)\nISSA Sports Nutrition Specialist\nCPR/AED Certified First Responder\nAdvanced Strength and Conditioning Specialist',
    achievements: 'Represented state-level bodybuilding championships\nSuccessfully transformed over 500+ clients locally and online\nFounder and Chief Trainer at Muscle Bar Fitness Centre',
  };

  useEffect(() => {
    async function loadTrainer() {
      try {
        const data = await api.trainer.get();
        if (data) {
          setTrainer(data);
        } else {
          setTrainer(fallbackTrainer);
        }
      } catch (err) {
        console.error('Error fetching trainer details, using fallback', err);
        setTrainer(fallbackTrainer);
      } finally {
        setLoading(false);
      }
    }
    loadTrainer();
  }, []);

  const activeTrainer = trainer || fallbackTrainer;

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#0f0f12] to-[#0a0a0c] text-center border-b border-zinc-900/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Lead Coach</h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Meet the primary instructor responsible for building schedules and monitoring progress at Muscle Bar Fitness Centre.
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Photo Col */}
            <div className="lg:col-span-5 relative max-w-md mx-auto w-full space-y-6">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border border-red-600/30 rounded-3xl -z-10" />
                <img
                  src={activeTrainer.photo}
                  alt={activeTrainer.name}
                  className="rounded-3xl object-cover w-full h-[500px] border border-zinc-800 shadow-2xl"
                />
                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-zinc-950/90 backdrop-blur border border-zinc-850 rounded-2xl space-y-2">
                  <h3 className="font-extrabold text-xl text-white">{activeTrainer.name}</h3>
                  <span className="text-xs uppercase font-bold tracking-widest text-red-500">FOUNDER & CHIEF COACH</span>
                </div>
              </div>

              {/* Verified Professional Certification */}
              <div className="p-5 bg-zinc-950 rounded-3xl border border-zinc-900 shadow-lg space-y-3">
                <span className="text-[9px] uppercase tracking-wider font-bold text-amber-500 block">Verified Fitness Expert Board Certification</span>
                <img
                  src="/certificate.jpg"
                  alt="Certified Fitness Expert - Aluri Sandilya"
                  className="rounded-2xl border border-zinc-850 hover:scale-[1.02] transition-all cursor-zoom-in"
                  onClick={() => window.open('/certificate.jpg', '_blank')}
                />
              </div>
            </div>

            {/* Right Information Col */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <span className="inline-flex items-center space-x-2 bg-red-600/10 px-3 py-1 rounded-full text-xs font-semibold text-red-500 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Elite Personal Trainer</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">About Coach Sandilya</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Aluri Sandilya specializes in designing body transformations, functional muscle hypertrophy, and contest strength preparation. His training philosophy integrates intense compound movements, structured macronutrient scheduling, and progressive lifting tracking.
                </p>
                <div className="flex items-center space-x-4 text-sm text-zinc-500 pt-2">
                  <span className="flex items-center space-x-1.5">
                    <Phone className="w-4 h-4 text-red-500" />
                    <span className="text-zinc-300 font-medium">+91 79812 85051</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Mail className="w-4 h-4 text-red-500" />
                    <span className="text-zinc-300 font-medium">alurisandilya341s@gmail.com</span>
                  </span>
                </div>
              </div>

              {/* Experience Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-l-2 border-red-500 pl-3">Coaching Experience</h3>
                <p className="text-zinc-400 text-xs sm:text-sm bg-zinc-950 p-4 rounded-xl border border-zinc-900 leading-relaxed">
                  {activeTrainer.experience}
                </p>
              </div>

              {/* Certifications List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-l-2 border-red-500 pl-3">Certifications & Licenses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeTrainer.certifications.split('\n').map((cert: string, idx: number) => (
                    <div key={idx} className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-900 flex items-start space-x-3">
                      <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-zinc-300 text-xs leading-normal">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-l-2 border-red-500 pl-3">Accomplishments</h3>
                <div className="space-y-3">
                  {activeTrainer.achievements.split('\n').map((ach: string, idx: number) => (
                    <div key={idx} className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900/60 flex items-start space-x-3.5">
                      <Trophy className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-zinc-300 text-xs leading-normal">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
