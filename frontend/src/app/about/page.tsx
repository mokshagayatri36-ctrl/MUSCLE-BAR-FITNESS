'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Shield, Clock, Compass, Eye, Heart, Zap, Award } from 'lucide-react';

export default function About() {
  const facilities = [
    { title: 'Strength Training Section', desc: 'Heavy-duty power racks, plate loaded systems, dumbbells up to 50kg, and custom lifting platforms.' },
    { title: 'Cardio Zones', desc: 'Commercial grade treadmills, elliptical trainers, rowing machines, and upright bicycles.' },
    { title: 'Locker & Steam Rooms', desc: 'Spacious personal storage lockers, clean shower stalls, and dry steam rooms for post-workout recovery.' },
    { title: 'General Fitness Guidance', desc: 'Dedicated gym floor trainers to assist you with posture, spot assistance, and machine explanations.' },
  ];

  const equipments = [
    { name: 'Plate Loaded Chest & Shoulder Press', type: 'Strength' },
    { name: 'Linear Leg Press & Hack Squats', type: 'Lower Body' },
    { name: 'Lat Pull-Down & Cable Row Stations', type: 'Back/Arms' },
    { name: 'Olympic Barbells & Bumper Plates', type: 'Free Weights' },
    { name: 'Dual Cable Cross-Over Stations', type: 'Functional' },
    { name: 'High-Performance Treadmills & Air Bikes', type: 'Cardio' },
  ];

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#0f0f12] to-[#0a0a0c] text-center border-b border-zinc-900/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Gym Information</h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Discover the training environment, mission guidelines, and facilities at Muscle Bar Fitness Centre.
          </p>
        </div>
      </section>

      {/* About & Mission/Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">About Muscle Bar Fitness Centre</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Founded by Aluri Sandilya, Muscle Bar Fitness Centre was built around one key philosophy: to provide an uncompromising, professional environment for strength development and physical conditioning. We eliminate unnecessary distractions to focus on what drives physical growth—intensity, proper technique, and dedication.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Located conveniently with easy navigation, our facility acts as a daily workspace for dedicated members. With pristine locker amenities, ventilation, and structured zones, every session is optimized for performance.
            </p>
          </div>

          <div className="space-y-8 bg-zinc-950/80 p-8 rounded-3xl border border-zinc-900">
            {/* Mission */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-red-600/10 rounded-2xl text-red-500 shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-lg text-white">Our Mission</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  To supply every member with the equipment, floor-guidance, and tailored training programs required to break personal lifting records, burn excess fat, and achieve a healthy cardiovascular status.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500 shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-lg text-white">Our Vision</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  To become the primary strength training gym in Madhapur, known for fostering a supportive, zero-ego community focused on physical development and clean athletic progression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-[#0d0d10] border-y border-zinc-900/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight">Our Premium Facilities</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              We design every zone inside Muscle Bar to offer safety, comfort, and max output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((fac, idx) => (
              <div key={idx} className="p-8 bg-zinc-950/80 rounded-2xl border border-zinc-900 flex items-start space-x-4">
                <div className="p-2.5 bg-red-600/10 rounded-xl text-red-500 shrink-0 mt-0.5">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-white">{fac.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight">Lifting Equipment</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We choose biomechanically correct equipment to ensure minimal joint stress and maximum target load during isolation exercises.
            </p>
            <div className="flex items-center space-x-3 text-xs text-zinc-500 pt-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Commercial Grade ISO-Lateral Equipment</span>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {equipments.map((eq, idx) => (
              <div key={idx} className="p-5 bg-zinc-950/80 rounded-xl border border-zinc-900 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-200">{eq.name}</span>
                <span className="text-[10px] uppercase font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                  {eq.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gym Timings Section */}
      <section className="py-20 bg-[#0d0d10] border-t border-zinc-900/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-zinc-950/80 p-8 sm:p-12 rounded-3xl border border-zinc-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />
          <Clock className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-3xl font-extrabold tracking-tight">Gym Operating Timings</h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
            We offer separate morning and evening split hours to accommodate working professionals and early-morning athletes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto pt-4 text-left">
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Morning Shift</span>
              <h4 className="text-white font-bold text-sm">05:00 AM - 11:00 AM</h4>
              <p className="text-[10px] text-zinc-500">Mon - Sat</p>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Evening Shift</span>
              <h4 className="text-white font-bold text-sm">04:00 PM - 09:00 PM</h4>
              <p className="text-[10px] text-zinc-500">Mon - Sat</p>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Sunday Shift</span>
              <h4 className="text-amber-500 font-extrabold text-sm">07:00 AM - 11:00 AM</h4>
              <p className="text-[10px] text-zinc-500">Sunday Only</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
