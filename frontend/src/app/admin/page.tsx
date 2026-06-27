'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { api } from '../../lib/api';
import {
  ShieldAlert,
  Users,
  FileText,
  HelpCircle,
  Star,
  Award,
  CreditCard,
  Image as ImageIcon,
  Edit2,
  Trash2,
  Check,
  X,
  Plus,
  RefreshCw,
  TrendingUp,
  Grid
} from 'lucide-react';

// Dynamically import Recharts to avoid SSR hydration mismatches in Next.js
const ResponsiveContainer = dynamic(() => import('recharts').then((m) => m.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import('recharts').then((m) => m.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then((m) => m.Area), { ssr: false });
const BarChart = dynamic(() => import('recharts').then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then((m) => m.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((m) => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((m) => m.Tooltip), { ssr: false });
const PieChart = dynamic(() => import('recharts').then((m) => m.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then((m) => m.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then((m) => m.Cell), { ssr: false });

export default function AdminPortal() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState('dashboard');

  // Admin Data states
  const [analytics, setAnalytics] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [trainer, setTrainer] = useState<any>(null);

  // Loading indicator for tabs refresh
  const [loadingTab, setLoadingTab] = useState(false);

  // CRUD Edit states
  const [editPlan, setEditPlan] = useState<any>(null);
  const [newPlan, setNewPlan] = useState({ name: '', duration: '', price: '', benefits: '' });

  const [editProgram, setEditProgram] = useState<any>(null);
  const [newProgram, setNewProgram] = useState({ title: '', description: '', duration: '', benefits: '' });

  const [editTrainer, setEditTrainer] = useState({ name: '', photo: '', experience: '', certifications: '', achievements: '' });

  // Gallery adding state
  const [galleryItem, setGalleryItem] = useState({ imageUrl: '', category: 'Gym Interior' });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.role?.toUpperCase() === 'ADMIN') {
          setToken(storedToken);
          setAuthorized(true);
          loadAllAdminData();
        } else {
          setAuthorized(false);
        }
      } catch (e) {
        handleLogout();
      }
    } else {
      router.replace('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setAuthorized(false);
    window.dispatchEvent(new Event('auth-change'));
    router.replace('/login');
  };

  const loadAllAdminData = async () => {
    setLoadingTab(true);
    try {
      const [
        analyticsData,
        plansData,
        registrationsData,
        enquiriesData,
        feedbacksData,
        paymentsData,
        programsData,
        galleryData,
        trainerData,
      ] = await Promise.all([
        api.analytics.get().catch(() => null),
        api.plans.getAll().catch(() => []),
        api.registrations.getAll().catch(() => []),
        api.enquiries.getAll().catch(() => []),
        api.feedback.getAll().catch(() => []),
        api.payments.getAll().catch(() => []),
        api.programs.getAll().catch(() => []),
        api.gallery.getAll().catch(() => []),
        api.trainer.get().catch(() => null),
      ]);

      setAnalytics(analyticsData);
      setPlans(plansData);
      setRegistrations(registrationsData);
      setEnquiries(enquiriesData);
      setFeedbacks(feedbacksData);
      setPayments(paymentsData);
      setPrograms(programsData);
      setGallery(galleryData);
      if (trainerData) {
        setTrainer(trainerData);
        setEditTrainer({
          name: trainerData.name,
          photo: trainerData.photo,
          experience: trainerData.experience,
          certifications: trainerData.certifications,
          achievements: trainerData.achievements,
        });
      }
    } catch (err) {
      console.error('Error fetching admin details', err);
    } finally {
      setLoadingTab(false);
    }
  };

  // ================= ACTION HANDLERS =================

  // Plans Management
  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.plans.create(newPlan);
      setNewPlan({ name: '', duration: '', price: '', benefits: '' });
      loadAllAdminData();
    } catch (err) {
      alert('Error creating membership plan');
    }
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.plans.update(editPlan.id, editPlan);
      setEditPlan(null);
      loadAllAdminData();
    } catch (err) {
      alert('Error updating membership plan');
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (!confirm('Delete this membership plan?')) return;
    try {
      await api.plans.delete(id);
      loadAllAdminData();
    } catch (err) {
      alert('Error deleting membership plan');
    }
  };

  // Workout Programs Management
  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.programs.create(newProgram);
      setNewProgram({ title: '', description: '', duration: '', benefits: '' });
      loadAllAdminData();
    } catch (err) {
      alert('Error creating program');
    }
  };

  const handleUpdateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.programs.update(editProgram.id, editProgram);
      setEditProgram(null);
      loadAllAdminData();
    } catch (err) {
      alert('Error updating program');
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm('Delete this workout program?')) return;
    try {
      await api.programs.delete(id);
      loadAllAdminData();
    } catch (err) {
      alert('Error deleting workout program');
    }
  };

  // Trainer Management
  const handleUpdateTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.trainer.update(editTrainer);
      alert('Trainer details updated successfully!');
      loadAllAdminData();
    } catch (err) {
      alert('Error updating trainer details');
    }
  };

  // Gallery Management
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryItem.imageUrl.trim()) return;
    try {
      await api.gallery.upload(galleryItem);
      setGalleryItem({ imageUrl: '', category: 'Gym Interior' });
      loadAllAdminData();
    } catch (err) {
      alert('Error adding gallery image');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Delete gallery image?')) return;
    try {
      await api.gallery.delete(id);
      loadAllAdminData();
    } catch (err) {
      alert('Error deleting gallery item');
    }
  };

  // Registrations Status
  const handleRegistrationStatus = async (id: string, status: string) => {
    try {
      await api.registrations.updateStatus(id, status);
      loadAllAdminData();
    } catch (err) {
      alert('Error updating registration status');
    }
  };

  // Feedback Approval
  const handleFeedbackStatus = async (id: string, status: string) => {
    try {
      await api.feedback.updateStatus(id, status);
      loadAllAdminData();
    } catch (err) {
      alert('Error updating feedback status');
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm('Delete this testimonial feedback?')) return;
    try {
      await api.feedback.delete(id);
      loadAllAdminData();
    } catch (err) {
      alert('Error deleting feedback');
    }
  };

  // Payments Status
  const handlePaymentStatus = async (id: string, status: string) => {
    try {
      await api.payments.updateStatus(id, status);
      loadAllAdminData();
    } catch (err) {
      alert('Error updating payment status');
    }
  };

  const COLORS = ['#dc2626', '#d97706', '#059669', '#3b82f6'];

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow flex flex-col">
        {authorized === null ? (
          /* Verification Loading Spinner */
          <div className="flex-grow flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : authorized === false ? (
          /* Access Denied View */
          <div className="flex-grow flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-md p-8 bg-zinc-950/80 border border-zinc-900 rounded-3xl space-y-6 text-center shadow-2xl">
              <div className="w-12 h-12 bg-red-600/10 rounded-full border border-red-500/20 flex items-center justify-center text-red-500 mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black text-white">Access Denied</h2>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Administrator privileges are required to view this dashboard. Your account is registered as a general gym member.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => router.replace('/member')}
                  className="flex-1 py-3 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Go to Member Portal
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Admin Dashboard Layout */
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Admin Navigation Sidebar */}
            <div className="lg:w-64 shrink-0 space-y-4">
              <div className="p-5 bg-zinc-950/80 border border-zinc-900 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-white">Aluri Sandilya</h4>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-red-500">Chief Admin</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-zinc-500 hover:text-red-500 text-xs font-bold uppercase transition-colors"
                >
                  Log Out
                </button>
              </div>

              {/* Sidebar Menu */}
              <div className="p-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 select-none">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                  { id: 'plans', label: 'Pricing Plans', icon: Award },
                  { id: 'registrations', label: 'Registrations', icon: Users },
                  { id: 'enquiries', label: 'Enquiries', icon: HelpCircle },
                  { id: 'feedback', label: 'Feedback Testimonials', icon: Star },
                  { id: 'payments', label: 'Payments', icon: CreditCard },
                  { id: 'programs', label: 'Workout Programs', icon: FileText },
                  { id: 'trainer', label: 'Trainer Bio', icon: Users },
                  { id: 'gallery', label: 'Media Gallery', icon: ImageIcon },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all shrink-0 lg:shrink ${
                        activeTab === tab.id
                          ? 'bg-red-600 text-white'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={loadAllAdminData}
                disabled={loadingTab}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-red-500/20 text-zinc-400 hover:text-white rounded-2xl text-xs font-semibold transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingTab ? 'animate-spin' : ''}`} />
                <span>{loadingTab ? 'Syncing...' : 'Sync Database'}</span>
              </button>
            </div>

            {/* Right Column: Tab Content */}
            <div className="flex-1 bg-zinc-950/80 p-6 sm:p-8 rounded-3xl border border-zinc-900 min-h-[70vh]">
              {loadingTab && !analytics && (
                <div className="flex justify-center items-center py-20">
                  <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* 1. DASHBOARD VIEW */}
              {activeTab === 'dashboard' && analytics && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Grid cards */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { label: 'Total Members', count: analytics.totalMembers, color: 'text-red-500', icon: Users },
                      { label: 'Registrations', count: analytics.totalRegistrations, color: 'text-amber-500', icon: Users },
                      { label: 'Enquiries', count: analytics.totalEnquiries, color: 'text-blue-500', icon: HelpCircle },
                      { label: 'Feedbacks', count: analytics.totalFeedbacks, color: 'text-emerald-500', icon: Star },
                      { label: 'Pricing Plans', count: analytics.totalPlans, color: 'text-purple-500', icon: Award },
                    ].map((card, index) => {
                      const Icon = card.icon;
                      return (
                        <div key={index} className="p-5 bg-zinc-900/60 rounded-2xl border border-zinc-850 space-y-2">
                          <div className={`p-2 bg-zinc-950 rounded-xl w-8 h-8 flex items-center justify-center ${card.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-medium leading-tight">
                            {card.label}
                          </span>
                          <h4 className="text-2xl font-black text-white leading-none">{card.count}</h4>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recharts Analytics Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                    {/* Registrations & Enquiries Monthly Line/Area Chart */}
                    <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-850 space-y-4">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-400">Monthly Traffic Trends</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={analytics.monthlyRegistrations}>
                            <defs>
                              <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} />
                            <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
                            <Area type="monotone" dataKey="count" stroke="#dc2626" fillOpacity={1} fill="url(#colorReg)" name="Registrations" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Enquiry Traffic Chart */}
                    <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-850 space-y-4">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-400">Monthly Enquiries</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analytics.monthlyEnquiries}>
                            <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} />
                            <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
                            <Bar dataKey="count" fill="#d97706" radius={[4, 4, 0, 0]} name="Enquiries" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Membership Plan Distribution (Pie Chart) */}
                    <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-850 space-y-4">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-400">Plan Enrollment Share</h4>
                      <div className="h-64 flex items-center justify-center">
                        {analytics.planDistribution?.length === 0 ? (
                          <p className="text-xs text-zinc-650">No plan data available</p>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={analytics.planDistribution}
                                cx="50%"
                                cy="50%"
                                label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                                outerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {analytics.planDistribution?.map((entry: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>

                    {/* Payments Status (Bar Chart) */}
                    <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-850 space-y-4">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-400">Payment Collections (Paid vs Pending)</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analytics.paymentOverview}>
                            <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} />
                            <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
                            <Bar dataKey="amount" fill="#059669" radius={[4, 4, 0, 0]} name="Collect Amount (₹)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. PLANS MANAGEMENT */}
              {activeTab === 'plans' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Create New Plan */}
                  <div className="p-6 bg-zinc-900/40 rounded-2xl border border-zinc-850 space-y-4">
                    <h3 className="font-bold text-sm text-white">Create Membership Plan</h3>
                    <form onSubmit={handleCreatePlan} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Plan Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Monthly Plan"
                          value={newPlan.name}
                          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 1 Month"
                          value={newPlan.duration}
                          onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Price (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g. 1500"
                          value={newPlan.price}
                          onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-all flex items-center justify-center space-x-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Plan</span>
                      </button>
                      <div className="sm:col-span-4 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Benefits (Newline-separated)</label>
                        <textarea
                          placeholder="Benefit line 1&#10;Benefit line 2"
                          rows={3}
                          value={newPlan.benefits}
                          onChange={(e) => setNewPlan({ ...newPlan, benefits: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none resize-none"
                          required
                        />
                      </div>
                    </form>
                  </div>

                  {/* List Plans */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-sm text-white">Active Plans</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plans.map((plan) => (
                        <div key={plan.id} className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-850 space-y-4">
                          {editPlan?.id === plan.id ? (
                            /* Edit Mode Form */
                            <form onSubmit={handleUpdatePlan} className="space-y-3">
                              <input
                                type="text"
                                value={editPlan.name}
                                onChange={(e) => setEditPlan({ ...editPlan, name: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-lg"
                                required
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={editPlan.duration}
                                  onChange={(e) => setEditPlan({ ...editPlan, duration: e.target.value })}
                                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-lg"
                                  required
                                />
                                <input
                                  type="number"
                                  value={editPlan.price}
                                  onChange={(e) => setEditPlan({ ...editPlan, price: e.target.value })}
                                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-lg"
                                  required
                                />
                              </div>
                              <textarea
                                value={editPlan.benefits}
                                onChange={(e) => setEditPlan({ ...editPlan, benefits: e.target.value })}
                                rows={3}
                                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-lg resize-none"
                                required
                              />
                              <div className="flex space-x-2">
                                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded text-[10px] font-bold">Save</button>
                                <button type="button" onClick={() => setEditPlan(null)} className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded text-[10px]">Cancel</button>
                              </div>
                            </form>
                          ) : (
                            /* Read Mode View */
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <h4 className="font-extrabold text-sm text-white">{plan.name}</h4>
                                <p className="text-xs text-amber-500 font-bold">₹{plan.price} / {plan.duration}</p>
                                <ul className="list-disc pl-4 text-[10px] text-zinc-450 space-y-1">
                                  {plan.benefits.split('\n').map((b: string, idx: number) => <li key={idx}>{b}</li>)}
                                </ul>
                              </div>
                              <div className="flex space-x-1 shrink-0">
                                <button onClick={() => setEditPlan(plan)} className="p-1.5 hover:text-red-500 text-zinc-550"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDeletePlan(plan.id)} className="p-1.5 hover:text-red-500 text-zinc-550"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. REGISTRATIONS LIST */}
              {activeTab === 'registrations' && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-bold text-sm text-white">Membership Registrations Log</h3>
                  {registrations.length === 0 ? (
                    <p className="text-xs text-zinc-500">No registration forms submitted yet.</p>
                  ) : (
                    <div className="overflow-x-auto border border-zinc-900 rounded-2xl">
                      <table className="w-full text-left text-xs text-zinc-400">
                        <thead className="bg-zinc-900/60 text-[10px] text-zinc-500 uppercase tracking-wider">
                          <tr>
                            <th className="p-4">Applicant</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Age/Gender</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                          {registrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-zinc-900/30">
                              <td className="p-4">
                                <p className="font-bold text-white leading-none">{reg.name}</p>
                                <span className="text-[10px] text-zinc-500 leading-normal">{reg.address}</span>
                              </td>
                              <td className="p-4">
                                <p>{reg.phone}</p>
                                <p className="text-[10px] text-zinc-500">{reg.email}</p>
                              </td>
                              <td className="p-4 font-semibold text-zinc-300">{reg.selectedPlan}</td>
                              <td className="p-4">{reg.age} y/o ({reg.gender})</td>
                              <td className="p-4">
                                <span
                                  className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                    reg.status === 'APPROVED'
                                      ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/10'
                                      : reg.status === 'REJECTED'
                                      ? 'bg-red-600/10 text-red-400 border border-red-500/10'
                                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
                                  }`}
                                >
                                  {reg.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                {reg.status === 'PENDING' && (
                                  <div className="inline-flex space-x-1">
                                    <button
                                      onClick={() => handleRegistrationStatus(reg.id, 'APPROVED')}
                                      className="p-1 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded border border-emerald-500/20"
                                      title="Approve Member"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleRegistrationStatus(reg.id, 'REJECTED')}
                                      className="p-1 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded border border-red-500/20"
                                      title="Reject Member"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* 4. ENQUIRIES LIST */}
              {activeTab === 'enquiries' && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-bold text-sm text-white">Online Enquiries</h3>
                  {enquiries.length === 0 ? (
                    <p className="text-xs text-zinc-500">No enquiries submitted yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {enquiries.map((enq) => (
                        <div key={enq.id} className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-850 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-extrabold text-sm text-white">{enq.name}</h4>
                              <p className="text-[10px] text-zinc-550">{new Date(enq.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className="text-[9px] uppercase font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10">
                              {enq.plan}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-400 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-900 italic">
                            "{enq.message}"
                          </div>
                          <div className="flex items-center space-x-4 text-[10px] text-zinc-500 pt-1">
                            <span>Phone: <b className="text-zinc-300">{enq.phone}</b></span>
                            <span>Email: <b className="text-zinc-300">{enq.email}</b></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 5. FEEDBACK MANAGEMENT */}
              {activeTab === 'feedback' && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-bold text-sm text-white">User Feedbacks & Reviews</h3>
                  {feedbacks.length === 0 ? (
                    <p className="text-xs text-zinc-500">No reviews written yet.</p>
                  ) : (
                    <div className="overflow-x-auto border border-zinc-900 rounded-2xl">
                      <table className="w-full text-left text-xs text-zinc-400">
                        <thead className="bg-zinc-900/60 text-[10px] text-zinc-500 uppercase tracking-wider">
                          <tr>
                            <th className="p-4">Member Name</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Review Text</th>
                            <th className="p-4">Moderation</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                          {feedbacks.map((fb) => (
                            <tr key={fb.id} className="hover:bg-zinc-900/30">
                              <td className="p-4 font-bold text-white">{fb.name}</td>
                              <td className="p-4">
                                <div className="flex text-amber-400">
                                  {Array.from({ length: fb.rating }).map((_, idx) => (
                                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                                  ))}
                                </div>
                              </td>
                              <td className="p-4 text-zinc-350 max-w-sm leading-relaxed">{fb.review}</td>
                              <td className="p-4">
                                <span
                                  className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                                    fb.approvalStatus === 'APPROVED'
                                      ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/10'
                                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
                                  }`}
                                >
                                  {fb.approvalStatus}
                                </span>
                              </td>
                              <td className="p-4 text-right shrink-0">
                                <div className="inline-flex space-x-1">
                                  {fb.approvalStatus === 'PENDING' && (
                                    <button
                                      onClick={() => handleFeedbackStatus(fb.id, 'APPROVED')}
                                      className="p-1 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded border border-emerald-500/20"
                                      title="Approve Feedback"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteFeedback(fb.id)}
                                    className="p-1 bg-zinc-900 hover:bg-red-600 text-zinc-550 hover:text-white rounded border border-zinc-800 hover:border-red-500/20"
                                    title="Delete Review"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* 6. PAYMENT MANAGEMENT */}
              {activeTab === 'payments' && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-bold text-sm text-white">Membership Payments tracking</h3>
                  {payments.length === 0 ? (
                    <p className="text-xs text-zinc-500">No transactions created yet.</p>
                  ) : (
                    <div className="overflow-x-auto border border-zinc-900 rounded-2xl">
                      <table className="w-full text-left text-xs text-zinc-400">
                        <thead className="bg-zinc-900/60 text-[10px] text-zinc-500 uppercase tracking-wider">
                          <tr>
                            <th className="p-4">Member</th>
                            <th className="p-4">Plan Selected</th>
                            <th className="p-4">Cost (Amount)</th>
                            <th className="p-4">Payment Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                          {payments.map((pay) => (
                            <tr key={pay.id} className="hover:bg-zinc-900/30">
                              <td className="p-4 font-bold text-white">{pay.memberName}</td>
                              <td className="p-4">{pay.plan}</td>
                              <td className="p-4 font-semibold text-zinc-200">₹{pay.amount}</td>
                              <td className="p-4">{new Date(pay.paymentDate).toLocaleDateString()}</td>
                              <td className="p-4">
                                <span
                                  className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                    pay.status === 'PAID'
                                      ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/10'
                                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
                                  }`}
                                >
                                  {pay.status}
                                </span>
                              </td>
                              <td className="p-4 text-right shrink-0">
                                {pay.status === 'PENDING' ? (
                                  <button
                                    onClick={() => handlePaymentStatus(pay.id, 'PAID')}
                                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] uppercase tracking-wider rounded transition-all"
                                  >
                                    Mark as Paid
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handlePaymentStatus(pay.id, 'PENDING')}
                                    className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500 text-[9px] uppercase tracking-wider rounded"
                                  >
                                    Set Pending
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* 7. PROGRAMS MANAGEMENT */}
              {activeTab === 'programs' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Create New Program */}
                  <div className="p-6 bg-zinc-900/40 rounded-2xl border border-zinc-855 space-y-4">
                    <h3 className="font-bold text-sm text-white">Add Workout Program</h3>
                    <form onSubmit={handleCreateProgram} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Program Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Strength Training"
                          value={newProgram.title}
                          onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 12 Weeks"
                          value={newProgram.duration}
                          onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-all flex items-center justify-center space-x-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Program</span>
                      </button>
                      <div className="sm:col-span-3 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Description</label>
                        <textarea
                          placeholder="Program description..."
                          rows={2}
                          value={newProgram.description}
                          onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none resize-none"
                          required
                        />
                      </div>
                      <div className="sm:col-span-3 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Benefits (Newline-separated)</label>
                        <textarea
                          placeholder="Benefit line 1&#10;Benefit line 2"
                          rows={3}
                          value={newProgram.benefits}
                          onChange={(e) => setNewProgram({ ...newProgram, benefits: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none resize-none"
                          required
                        />
                      </div>
                    </form>
                  </div>

                  {/* List Programs */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-sm text-white">Active Workout Programs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {programs.map((prog) => (
                        <div key={prog.id} className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-850 space-y-4">
                          {editProgram?.id === prog.id ? (
                            /* Edit Mode Form */
                            <form onSubmit={handleUpdateProgram} className="space-y-3">
                              <input
                                type="text"
                                value={editProgram.title}
                                onChange={(e) => setEditProgram({ ...editProgram, title: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-lg"
                                required
                              />
                              <input
                                type="text"
                                value={editProgram.duration}
                                onChange={(e) => setEditProgram({ ...editProgram, duration: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-lg"
                                required
                              />
                              <textarea
                                value={editProgram.description}
                                onChange={(e) => setEditProgram({ ...editProgram, description: e.target.value })}
                                rows={2}
                                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-lg resize-none"
                                required
                              />
                              <textarea
                                value={editProgram.benefits}
                                onChange={(e) => setEditProgram({ ...editProgram, benefits: e.target.value })}
                                rows={3}
                                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded-lg resize-none"
                                required
                              />
                              <div className="flex space-x-2">
                                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded text-[10px] font-bold">Save</button>
                                <button type="button" onClick={() => setEditProgram(null)} className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded text-[10px]">Cancel</button>
                              </div>
                            </form>
                          ) : (
                            /* Read Mode View */
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <h4 className="font-extrabold text-sm text-white">{prog.title}</h4>
                                <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">{prog.duration}</span>
                                <p className="text-[11px] text-zinc-400 leading-normal">{prog.description}</p>
                                <ul className="list-disc pl-4 text-[10px] text-zinc-550 space-y-1 pt-1">
                                  {prog.benefits.split('\n').map((b: string, idx: number) => <li key={idx}>{b}</li>)}
                                </ul>
                              </div>
                              <div className="flex space-x-1 shrink-0">
                                <button onClick={() => setEditProgram(prog)} className="p-1.5 hover:text-red-500 text-zinc-550"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteProgram(prog.id)} className="p-1.5 hover:text-red-500 text-zinc-550"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 8. TRAINER PROFILE BIOGRAPHY */}
              {activeTab === 'trainer' && trainer && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-bold text-sm text-white">Update Trainer Profile details</h3>
                  <form onSubmit={handleUpdateTrainer} className="space-y-5 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Trainer Name</label>
                        <input
                          type="text"
                          value={editTrainer.name}
                          onChange={(e) => setEditTrainer({ ...editTrainer, name: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-3 rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Trainer Photo URL</label>
                        <input
                          type="url"
                          value={editTrainer.photo}
                          onChange={(e) => setEditTrainer({ ...editTrainer, photo: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-3 rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-zinc-500">Coaching Experience</label>
                      <input
                        type="text"
                        value={editTrainer.experience}
                        onChange={(e) => setEditTrainer({ ...editTrainer, experience: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-3 rounded-xl focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-zinc-500">Certifications (Newline-separated)</label>
                      <textarea
                        value={editTrainer.certifications}
                        onChange={(e) => setEditTrainer({ ...editTrainer, certifications: e.target.value })}
                        rows={4}
                        className="w-full bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-3 rounded-xl focus:outline-none resize-none"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-zinc-500">Achievements (Newline-separated)</label>
                      <textarea
                        value={editTrainer.achievements}
                        onChange={(e) => setEditTrainer({ ...editTrainer, achievements: e.target.value })}
                        rows={4}
                        className="w-full bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-3 rounded-xl focus:outline-none resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      Update Trainer Details
                    </button>
                  </form>
                </div>
              )}

              {/* 9. GALLERY MANAGEMENT */}
              {activeTab === 'gallery' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Upload photo */}
                  <div className="p-6 bg-zinc-900/40 rounded-2xl border border-zinc-850 space-y-4">
                    <h3 className="font-bold text-sm text-white">Upload Gallery Image</h3>
                    <form onSubmit={handleAddGallery} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Image URL</label>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={galleryItem.imageUrl}
                          onChange={(e) => setGalleryItem({ ...galleryItem, imageUrl: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-zinc-500">Category</label>
                        <select
                          value={galleryItem.category}
                          onChange={(e) => setGalleryItem({ ...galleryItem, category: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none"
                        >
                          <option value="Gym Interior">Gym Interior</option>
                          <option value="Equipment">Equipment</option>
                          <option value="Workout Sessions">Workout Sessions</option>
                          <option value="Transformations">Transformations</option>
                        </select>
                      </div>
                      <div className="sm:col-span-3">
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all"
                        >
                          Upload Image
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List Photos */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-sm text-white">Gallery Items</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {gallery.map((item) => (
                        <div key={item.id} className="relative group aspect-4/3 rounded-xl overflow-hidden border border-zinc-900 bg-zinc-950">
                          <img src={item.imageUrl} alt={item.category} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => handleDeleteGallery(item.id)}
                              className="p-2 bg-red-600 text-white rounded-full transition-all hover:scale-105"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="absolute bottom-2 left-2 text-[8px] bg-black/80 px-2 py-0.5 rounded text-amber-500 font-bold uppercase border border-zinc-900">
                            {item.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
