'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../lib/api';
import { Dumbbell, Users, Trophy, ChevronRight, Star, Quote, Calendar, Phone, ArrowRight } from 'lucide-react';

export default function Home() {
  const [plans, setPlans] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [plansData, programsData, galleryData, feedbackData] = await Promise.all([
          api.plans.getAll().catch(() => []),
          api.programs.getAll().catch(() => []),
          api.gallery.getAll().catch(() => []),
          api.feedback.getApproved().catch(() => [])
        ]);

        setPlans(plansData.slice(0, 4));
        setPrograms(programsData.slice(0, 4));
        setGallery(galleryData.slice(0, 4));
        setTestimonials(feedbackData);
      } catch (err) {
        console.error('Error loading homepage data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle animated background shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Hero Background overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop')` }}
        />
        {/* Dark radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/40 to-transparent" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          <div className="inline-flex items-center space-x-2 bg-zinc-950/80 px-4 py-1.5 rounded-full border border-zinc-800 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Premium Gym & Performance Facility</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none">
            UNLEASH YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-400 to-amber-200">
              INNER STRENGTH
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed">
            Welcome to Muscle Bar Fitness Centre. Build your physique, gain raw strength, and achieve ultimate wellness under expert training and tailored programs.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href="/plans"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold bg-gradient-to-r from-red-600 to-amber-500 rounded-full shadow-[0_4px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_4px_25px_rgba(220,38,38,0.6)] transition-all hover:scale-105"
            >
              Choose Your Plan
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold border border-zinc-700 hover:border-red-500 rounded-full hover:bg-zinc-950/80 transition-all"
            >
              Book Free Trial
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto border-t border-zinc-900/60 mt-16 text-left">
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-white">8+</h3>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Years Experience</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-white">500+</h3>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Transformed Clients</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-white">50+</h3>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Modern Equipment</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-white">100%</h3>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">Dedication</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GYM INTRODUCTION */}
      <section className="py-24 bg-[#0d0d10] border-y border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Stacked image aesthetic */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-red-600/30 rounded-2xl -z-10" />
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop"
                alt="Gym Interior"
                className="rounded-2xl shadow-2xl object-cover w-full h-[400px] border border-zinc-800"
              />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                <span className="w-8 h-[1px] bg-red-500" />
                <span>About Muscle Bar</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Where Dedication Meets High-Performance
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                At Muscle Bar Fitness Centre, we don't just provide equipment; we create an environment designed to push limits. Whether you are a beginner stepping on the gym floor for the first time or a competitive athlete aiming for new milestones, our training programs and atmosphere keep you motivated.
              </p>
              <ul className="space-y-3.5 text-zinc-300">
                <li className="flex items-center space-x-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>State of the art cardio & high-volume plate loaded equipment</span>
                </li>
                <li className="flex items-center space-x-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Spacious strength training sections and personal lockers</span>
                </li>
                <li className="flex items-center space-x-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>1-on-1 nutritional guides and assessment tracking</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center text-sm font-bold text-white hover:text-red-500 transition-colors"
                >
                  Explore Our Facility <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OWNER INTRODUCTION */}
      <section className="py-24 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 text-amber-500 text-xs font-bold uppercase tracking-widest">
                <span className="w-8 h-[1px] bg-amber-500" />
                <span>Founder & Head Coach</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Train With Aluri Sandilya
              </h2>
              <p className="text-zinc-400 leading-relaxed font-semibold">
                "Your goals don't care about your excuses. Let's put in the work."
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm">
                With over 8 years of coaching experience, ISSA certifications, and a successful history of physical transformations, Aluri Sandilya provides custom instruction to optimize your results.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-900">
                  <h4 className="text-white font-bold text-sm">Expertise</h4>
                  <p className="text-xs text-zinc-500 pt-1">Hypertrophy, Powerlifting, Fat Loss Nutrition</p>
                </div>
                <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-900">
                  <h4 className="text-white font-bold text-sm">Certifications</h4>
                  <p className="text-xs text-zinc-500 pt-1">ISSA CPT, Sports Nutritionist Specialist</p>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/trainer"
                  className="inline-flex items-center text-sm font-bold text-white hover:text-amber-400 transition-colors"
                >
                  View Profile details <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-red-600 to-amber-500 rounded-2xl -z-10 blur-md opacity-25" />
                <img
                  src="/owner.jpg"
                  alt="Aluri Sandilya"
                  className="rounded-2xl border border-zinc-800 object-cover w-full h-[450px]"
                />
              </div>
              
              {/* Professional Certificate */}
              <div className="max-w-sm mx-auto space-y-3 bg-zinc-950 p-5 rounded-2xl border border-zinc-900 shadow-lg">
                <span className="text-[9px] uppercase tracking-wider font-bold text-amber-500 block">Verified Board Credential</span>
                <img
                  src="/certificate.jpg"
                  alt="Fitness Expertise Certification - Aluri Sandilya"
                  className="rounded-xl border border-zinc-850 hover:scale-[1.02] transition-all cursor-pointer"
                  onClick={() => alert("Verified Fitness Expert Certification. Issued on 23 June 2026. Valid until 23 June 2029.")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FITNESS PROGRAM HIGHLIGHTS */}
      <section className="py-24 bg-[#0d0d10] border-t border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Our Programs</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Engineered For Growth</h2>
            <p className="max-w-xl mx-auto text-sm text-zinc-400">
              Browse our training blueprints designed to take you from your starting point to peak physical performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.length > 0 ? (
              programs.map((prog: any) => (
                <div key={prog.id} className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-900 hover:border-red-500/50 transition-all hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{prog.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">{prog.description}</p>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    {prog.duration}
                  </span>
                </div>
              ))
            ) : (
              // Fallback skeleton
              ['Weight Loss', 'Muscle Gain', 'Strength Base', 'General Fitness'].map((title, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-900">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">High performance conditioning plan curated under professional guidance.</p>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded">
                    8-12 Weeks
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="text-center pt-12">
            <Link
              href="/programs"
              className="inline-flex items-center text-sm font-bold text-white hover:text-red-500 transition-colors"
            >
              See Workout Details <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. MEMBERSHIP HIGHLIGHTS */}
      <section className="py-24 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Pricing Matrix</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Flexible Membership Plans</h2>
            <p className="max-w-xl mx-auto text-sm text-zinc-400">
              Select the pricing plan that fits your calendar and goals. Start training today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.length > 0 ? (
              plans.map((plan: any, idx: number) => (
                <div 
                  key={plan.id} 
                  className={`relative p-8 rounded-3xl bg-zinc-950/80 border ${
                    idx === 1 ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.15)]' : 'border-zinc-900'
                  } space-y-6 flex flex-col justify-between`}
                >
                  {idx === 1 && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl text-white">{plan.name}</h3>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-4xl font-black">₹{plan.price}</span>
                      <span className="text-xs text-zinc-500">/ {plan.duration}</span>
                    </div>
                    <hr className="border-zinc-900" />
                    <ul className="space-y-3">
                      {plan.benefits.split('\n').map((benefit: string, bIdx: number) => (
                        <li key={bIdx} className="flex items-center space-x-2.5 text-xs text-zinc-400">
                          <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                    className={`block w-full py-3.5 text-center text-xs font-bold rounded-xl transition-all ${
                      idx === 1 
                        ? 'bg-red-600 text-white hover:bg-red-700 shadow-md' 
                        : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    Join Program
                  </Link>
                </div>
              ))
            ) : (
              // Fallback
              [
                { name: 'Monthly Plan', price: '2,499+', duration: '1 Month' },
                { name: 'Quarterly Plan', price: '6,499+', duration: '3 Months' },
                { name: 'Half-Yearly Plan', price: '11,999+', duration: '6 Months' },
                { name: 'Yearly Plan', price: '19,999+', duration: '12 Months' }
              ].map((plan, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-900 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-bold text-xl text-white">{plan.name}</h3>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-3xl font-black">₹{plan.price}</span>
                      <span className="text-xs text-zinc-500">/ {plan.duration}</span>
                    </div>
                    <hr className="border-zinc-900" />
                    <ul className="space-y-2 text-xs text-zinc-400">
                      <li className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-amber-500" />
                        <span>Cardio & strength equipment access</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-amber-500" />
                        <span>Locker room access</span>
                      </li>
                    </ul>
                  </div>
                  <Link href="/plans" className="block w-full py-3.5 text-center text-xs font-bold rounded-xl bg-zinc-900 text-zinc-300">
                    View Plan Options
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL FEEDBACK PREVIEW */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-[#0d0d10] border-y border-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Testimonials</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Approved Athlete Feedbacks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((test: any) => (
                <div key={test.id} className="p-8 rounded-2xl bg-zinc-950/80 border border-zinc-900 relative">
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-zinc-800" />
                  <div className="flex items-center space-x-1 text-amber-400 mb-4">
                    {Array.from({ length: test.rating }).map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed italic mb-6">
                    "{test.review}"
                  </p>
                  <h4 className="font-bold text-sm text-white">{test.name}</h4>
                  <span className="text-[10px] text-zinc-500">Verified Muscle Bar Member</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. CONTACT & CTA SECTION */}
      <section className="py-24 bg-[#0a0a0c] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Build Your Legacy?
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
            Get in touch with Aluri Sandilya, check out the facility in person, or register online to lock in your membership slot today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact?tab=register"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transition-all"
            >
              Register Online
            </Link>
            <a
              href="tel:+917981285051"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold border border-zinc-800 text-zinc-300 hover:text-white rounded-full bg-zinc-950/60 hover:bg-zinc-900 transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 79812 85051</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
