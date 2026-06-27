'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { api } from '../../lib/api';
import { Phone, MapPin, Mail, Clock, Send, CheckCircle2, ShieldAlert, Compass } from 'lucide-react';

function ContactContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'enquiry';
  const initialPlan = searchParams.get('plan') || '';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [plans, setPlans] = useState<any[]>([]);

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    plan: initialPlan,
    message: '',
  });
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryError, setEnquiryError] = useState('');
  const [enquiryLoading, setEnquiryLoading] = useState(false);

  // Registration Form State
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'Male',
    age: '',
    phone: '',
    address: '',
    selectedPlan: initialPlan,
  });
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await api.plans.getAll();
        setPlans(data);
        if (data.length > 0 && !enquiryForm.plan) {
          setEnquiryForm(prev => ({ ...prev, plan: data[0].name }));
        }
        if (data.length > 0 && !registerForm.selectedPlan) {
          setRegisterForm(prev => ({ ...prev, selectedPlan: data[0].name }));
        }
      } catch (err) {
        console.error('Error fetching plans', err);
      }
    }
    loadPlans();
  }, []);

  // Update plan fields if they change in the search params
  useEffect(() => {
    if (initialPlan) {
      setEnquiryForm(prev => ({ ...prev, plan: initialPlan }));
      setRegisterForm(prev => ({ ...prev, selectedPlan: initialPlan }));
    }
  }, [initialPlan]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryLoading(true);
    setEnquiryError('');
    setEnquirySuccess(false);

    try {
      await api.enquiries.submit(enquiryForm);
      setEnquirySuccess(true);
      setEnquiryForm({
        name: '',
        phone: '',
        email: '',
        plan: plans[0]?.name || '',
        message: '',
      });
    } catch (err: any) {
      setEnquiryError(err.message || 'Failed to submit enquiry. Check server status.');
    } finally {
      setEnquiryLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError('');
    setRegisterSuccess(false);

    try {
      await api.auth.register({
        ...registerForm,
        age: parseInt(registerForm.age),
      });
      setRegisterSuccess(true);
      setRegisterForm({
        name: '',
        email: '',
        password: '',
        gender: 'Male',
        age: '',
        phone: '',
        address: '',
        selectedPlan: plans[0]?.name || '',
      });
    } catch (err: any) {
      setRegisterError(err.message || 'Failed to register. Email might already be in use.');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#0f0f12] to-[#0a0a0c] text-center border-b border-zinc-900/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Contact Facility</h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Get directions, send an online enquiry, or register directly to begin your strength training routine.
          </p>
        </div>
      </section>

      {/* Core Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight">Muscle Bar Fitness Centre</h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Reach out to facility owner and chief coach **Aluri Sandilya**. Visit our location during business hours for a custom facility tour.
              </p>
            </div>

            {/* Cards Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-zinc-950/80 rounded-2xl border border-zinc-900 space-y-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Gym Address</h4>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Muscle Bar Fitness, Amarvani Estates, Panta Kaluva Rd, Maruti Colony, Patamata, Benz Circle, Vijayawada, Andhra Pradesh 520010
                </p>
              </div>

              <div className="p-5 bg-zinc-950/80 rounded-2xl border border-zinc-900 space-y-2">
                <Phone className="w-5 h-5 text-red-500" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Phone Call</h4>
                <a href="tel:+917981285051" className="text-zinc-300 hover:text-white text-xs block transition-colors">
                  +91 79812 85051
                </a>
                <p className="text-[10px] text-zinc-500">Call / WhatsApp Support</p>
              </div>

              <div className="p-5 bg-zinc-950/80 rounded-2xl border border-zinc-900 space-y-2">
                <Clock className="w-5 h-5 text-red-500" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Business Hours</h4>
                <p className="text-zinc-400 text-[11px] leading-normal">
                  Mon - Sat: 5AM - 11AM & 4PM - 9PM
                </p>
                <p className="text-[11px] text-amber-500 font-medium">Sun: 7AM - 11AM</p>
              </div>

              <div className="p-5 bg-zinc-950/80 rounded-2xl border border-zinc-900 space-y-2">
                <Mail className="w-5 h-5 text-red-500" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Email Mail</h4>
                <p className="text-zinc-400 text-[11px] leading-normal">
                  contact@musclebar.com
                </p>
              </div>
            </div>

            {/* Embedded Google Maps & Navigate Button */}
            <div className="p-6 bg-zinc-950/80 rounded-3xl border border-zinc-900 space-y-4">
              <h3 className="font-bold text-sm text-white">Find Us on the Map</h3>
              {/* Embed Google Maps */}
              <div className="h-60 rounded-2xl overflow-hidden border border-zinc-850">
                <iframe
                  src="https://maps.google.com/maps?q=Muscle%20Bar%20Fitness%20Amarvani%20Estates%20Panta%20Kaluva%20Rd%20Vijayawada&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              {/* Click to Navigate */}
              <a
                href="https://maps.app.goo.gl/SB23j4zL76bbv5e29?g_st=aw"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all hover:scale-102"
              >
                <Compass className="w-4 h-4" />
                <span>Open in Google Maps / Navigate</span>
              </a>
            </div>
          </div>

          {/* Right Column: Enquiry & Registration Forms Tab Panel */}
          <div className="lg:col-span-7 bg-zinc-950/85 p-6 sm:p-10 rounded-3xl border border-zinc-900 space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-zinc-900 p-1 bg-zinc-900/60 rounded-xl">
              <button
                onClick={() => setActiveTab('enquiry')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'enquiry'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Online Enquiry Form
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'register'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Online Registration Form
              </button>
            </div>

            {/* TAB 1: ENQUIRY FORM */}
            {activeTab === 'enquiry' && (
              <form onSubmit={handleEnquirySubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-white">Send an Enquiry</h3>
                  <p className="text-zinc-500 text-xs">Interested in a program or custom plan? Shoot us a message.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 99999 88888"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Interested Plan</label>
                    <select
                      value={enquiryForm.plan}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, plan: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-3.5 py-3.5 rounded-xl focus:outline-none"
                    >
                      {plans.map((p) => (
                        <option key={p.id} value={p.name}>{p.name} ({p.duration})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Enquiry Message</label>
                  <textarea
                    placeholder="Enter your questions here..."
                    rows={4}
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none resize-none"
                    required
                  />
                </div>

                {enquirySuccess && (
                  <div className="p-4 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Your enquiry was stored in the database! Coach Sandilya will contact you shortly.</span>
                  </div>
                )}

                {enquiryError && (
                  <div className="p-4 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>{enquiryError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={enquiryLoading}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{enquiryLoading ? 'Submitting...' : 'Submit Enquiry'}</span>
                </button>
              </form>
            )}

            {/* TAB 2: REGISTRATION FORM */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-white">Gym Registration</h3>
                  <p className="text-zinc-500 text-xs">Fill out details below to create your member profile and record subscription.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Password (Portal Login)</label>
                    <input
                      type="password"
                      placeholder="Create login password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 99999 88888"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Gender</label>
                    <select
                      value={registerForm.gender}
                      onChange={(e) => setRegisterForm({ ...registerForm, gender: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-3.5 py-3.5 rounded-xl focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Age (Years)</label>
                    <input
                      type="number"
                      placeholder="e.g. 25"
                      min={10}
                      max={90}
                      value={registerForm.age}
                      onChange={(e) => setRegisterForm({ ...registerForm, age: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Selected Membership</label>
                    <select
                      value={registerForm.selectedPlan}
                      onChange={(e) => setRegisterForm({ ...registerForm, selectedPlan: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-3.5 py-3.5 rounded-xl focus:outline-none"
                    >
                      {plans.map((p) => (
                        <option key={p.id} value={p.name}>{p.name} (₹{p.price})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Residential Address</label>
                  <textarea
                    placeholder="Enter permanent house address..."
                    rows={3}
                    value={registerForm.address}
                    onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3.5 rounded-xl focus:outline-none resize-none"
                    required
                  />
                </div>

                {registerSuccess && (
                  <div className="p-4 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Your registration is saved in pending status! Go to Member Portal to view status.</span>
                  </div>
                )}

                {registerError && (
                  <div className="p-4 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>{registerError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={registerLoading}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50 shadow-md"
                >
                  {registerLoading ? 'Registering...' : 'Register Profile'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-20 bg-[#0a0a0c] text-white min-h-screen">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
