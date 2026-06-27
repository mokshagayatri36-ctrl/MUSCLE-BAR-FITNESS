'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { api } from '../../lib/api';
import { User, ShieldAlert, Award, CreditCard, Clock, FileText, CheckCircle2, MessageSquare, Star, Send } from 'lucide-react';

export default function MemberPortal() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  // Portal states
  const [memberData, setMemberData] = useState<any>(null);
  const [loadingMe, setLoadingMe] = useState(false);

  // Testimonial submission state
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 5,
    review: '',
  });
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.role?.toUpperCase() === 'MEMBER') {
          setToken(storedToken);
          setAuthorized(true);
          fetchMe();
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

  const fetchMe = async () => {
    setLoadingMe(true);
    try {
      const data = await api.auth.getMe();
      setMemberData(data);
    } catch (err) {
      console.error('Error fetching member profile', err);
      handleLogout();
    } finally {
      setLoadingMe(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setMemberData(null);
    setAuthorized(false);
    window.dispatchEvent(new Event('auth-change'));
    router.replace('/login');
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.review.trim()) return;

    setFeedbackLoading(true);
    setFeedbackError('');
    setFeedbackSuccess(false);

    try {
      await api.feedback.submit({
        name: memberData?.user?.name || 'Anonymous Member',
        rating: feedbackForm.rating,
        review: feedbackForm.review,
      });
      setFeedbackSuccess(true);
      setFeedbackForm({ rating: 5, review: '' });
    } catch (err: any) {
      setFeedbackError(err.message || 'Failed to submit feedback');
    } finally {
      setFeedbackLoading(false);
    }
  };

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
                  General member privileges are required to view this portal. Your account is registered as an administrator.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => router.replace('/admin')}
                  className="flex-1 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-855 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Go to Admin Panel
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
        ) : loadingMe || !memberData ? (
          /* Loading View */
          <div className="flex-grow flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Authenticated Member Dashboard */
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
            {/* Header banner */}
            <div className="p-8 bg-zinc-950/80 border border-zinc-900 rounded-3xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-500">Member Portal</span>
                <h1 className="text-3xl font-black tracking-tight text-white">Welcome, {memberData.user.name}</h1>
                <p className="text-zinc-500 text-xs">Email: {memberData.user.email} (General Gym Member)</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-red-500 text-zinc-300 hover:text-white rounded-xl text-xs font-bold transition-all self-start sm:self-center"
              >
                Sign Out
              </button>
            </div>

            {/* Grid 1: Plan Details & Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Membership details */}
              <div className="p-8 bg-zinc-950/80 border border-zinc-900 rounded-3xl space-y-6">
                <div className="flex items-center space-x-3 text-red-500">
                  <Award className="w-6 h-6" />
                  <h3 className="font-extrabold text-base uppercase tracking-wider text-white">Membership Plan</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-850 space-y-2">
                    <span className="text-[10px] uppercase text-zinc-500 tracking-wider block">Selected Plan</span>
                    <h4 className="text-xl font-bold text-white">
                      {memberData.registration?.selectedPlan || 'General Admission'}
                    </h4>
                  </div>

                  <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-850 space-y-2">
                    <span className="text-[10px] uppercase text-zinc-500 tracking-wider block">Registration Status</span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          memberData.registration?.status === 'APPROVED'
                            ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20'
                            : memberData.registration?.status === 'REJECTED'
                            ? 'bg-red-600/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {memberData.registration?.status || 'PENDING'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="p-8 bg-zinc-950/80 border border-zinc-900 rounded-3xl space-y-6 lg:col-span-2">
                <div className="flex items-center space-x-3 text-red-500">
                  <CreditCard className="w-6 h-6" />
                  <h3 className="font-extrabold text-base uppercase tracking-wider text-white">Payments & Dues</h3>
                </div>

                {memberData.payments?.length === 0 ? (
                  <p className="text-zinc-500 text-xs">No payments recorded yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-zinc-400">
                      <thead className="text-[10px] text-zinc-500 uppercase tracking-wider border-b border-zinc-900">
                        <tr>
                          <th className="pb-3">Plan</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {memberData.payments?.map((payment: any) => (
                          <tr key={payment.id} className="hover:bg-zinc-900/30">
                            <td className="py-3.5 font-bold text-white">{payment.plan}</td>
                            <td className="py-3.5">₹{payment.amount}</td>
                            <td className="py-3.5">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                            <td className="py-3.5 text-right">
                              <span
                                className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  payment.status === 'PAID'
                                    ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/10'
                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Grid 2: Assigned Workout Programs & Testimonial Feedback Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Workout Programs */}
              <div className="p-8 bg-zinc-950/80 border border-zinc-900 rounded-3xl lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-3 text-red-500">
                  <FileText className="w-6 h-6" />
                  <h3 className="font-extrabold text-base uppercase tracking-wider text-white">Workout Programs</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {memberData.programs?.map((prog: any) => (
                    <div key={prog.id} className="p-5 bg-zinc-900/60 rounded-2xl border border-zinc-850 space-y-3">
                      <h4 className="font-extrabold text-sm text-white">{prog.title}</h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-3 leading-normal">{prog.description}</p>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        {prog.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Feedback */}
              <div className="p-8 bg-zinc-950/80 border border-zinc-900 rounded-3xl space-y-6">
                <div className="flex items-center space-x-3 text-red-500">
                  <MessageSquare className="w-6 h-6" />
                  <h3 className="font-extrabold text-base uppercase tracking-wider text-white">Submit Rating / Testimonial</h3>
                </div>

                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Rating (Stars)</label>
                    <div className="flex space-x-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= feedbackForm.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Review Message</label>
                    <textarea
                      placeholder="Write your review here... How has your training experience been?"
                      rows={3}
                      value={feedbackForm.review}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, review: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-3.5 py-3 rounded-xl focus:outline-none resize-none"
                      required
                    />
                  </div>

                  {feedbackSuccess && (
                    <div className="p-3 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Review submitted! Awaiting admin approval.</span>
                    </div>
                  )}

                  {feedbackError && (
                    <div className="p-3 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-1.5">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{feedbackError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={feedbackLoading}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{feedbackLoading ? 'Submitting...' : 'Post Review'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
