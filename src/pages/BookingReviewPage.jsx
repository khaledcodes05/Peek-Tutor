import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  Mail,
  FileText
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatReadableDate } from '../utils/dateUtils';
import Modal from '../components/common/Modal';

export default function BookingReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTutorById, bookSession, profile } = useBooking();

  const state = location.state;
  const tutor = state?.tutorId ? getTutorById(state.tutorId) : null;

  const [studentName, setStudentName] = useState(profile?.fullName || '');
  const [studentEmail, setStudentEmail] = useState(profile?.email || '');
  const [notes, setNotes] = useState('');
  const [agreeToPolicy, setAgreeToPolicy] = useState(true);

  const [errors, setErrors] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  if (!state || !tutor) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">No Booking in Progress</h2>
        <p className="text-sm text-slate-400">
          Please select a tutor and time slot from the catalog first.
        </p>
        <Link
          to="/tutors"
          className="btn-electric inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-electric-500 text-white hover:bg-electric-600"
        >
          <span>Find Tutors</span>
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs = {};
    if (!studentName.trim()) {
      errs.studentName = 'Full name is required.';
    }
    if (!studentEmail.trim()) {
      errs.studentEmail = 'College email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
      errs.studentEmail = 'Please provide a valid email address.';
    }
    if (!agreeToPolicy) {
      errs.agree = 'You must acknowledge the peer attendance policy.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleOpenConfirmModal = (e) => {
    e.preventDefault();
    setServerError('');
    if (validateForm()) {
      setIsConfirmModalOpen(true);
    }
  };

  const handleFinalBookingSubmit = () => {
    setIsSubmitting(true);
    setServerError('');

    const result = bookSession({
      tutorId: tutor.id,
      slotId: state.slotId,
      subject: state.subject,
      topic: state.topic,
      format: state.format,
      durationMinutes: state.durationMinutes,
      studentNotes: notes,
      studentName,
      studentEmail
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsConfirmModalOpen(false);
      navigate(`/book/confirmation/${result.referenceId}`);
    } else {
      setIsConfirmModalOpen(false);
      setServerError(result.error || 'Failed to complete booking.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate(`/tutors/${tutor.id}`)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Change Selections</span>
        </button>
      </div>

      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-electric-400 block mb-1">
          Step 2 of 3
        </span>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Review & Confirm Booking
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Please verify your session details and provide study goals for your peer mentor.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-sm font-semibold flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Booking Conflict Detected</p>
            <p className="text-xs text-rose-300 mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Student Info Form */}
        <div className="md:col-span-7 bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-6 sm:p-8 space-y-6">
          <h2 className="text-base font-bold text-white pb-3 border-b border-white/10 flex items-center gap-2">
            <User className="w-5 h-5 text-electric-400" />
            <span>Student Information</span>
          </h2>

          <form onSubmit={handleOpenConfirmModal} className="space-y-4">
            <div>
              <label htmlFor="student-name" className="block text-xs font-bold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                id="student-name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className={`w-full p-2.5 rounded-xl border text-sm font-medium text-white focus:outline-none focus:border-electric-400 bg-dark-bg ${
                  errors.studentName ? 'border-rose-500/80 bg-rose-950/20' : 'border-white/10'
                }`}
              />
              {errors.studentName && (
                <p className="text-xs text-rose-400 mt-1">{errors.studentName}</p>
              )}
            </div>

            <div>
              <label htmlFor="student-email" className="block text-xs font-bold text-slate-300 mb-1">
                College Email Address *
              </label>
              <input
                id="student-email"
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="e.g. alex.morgan@campus.edu"
                className={`w-full p-2.5 rounded-xl border text-sm font-medium text-white focus:outline-none focus:border-electric-400 bg-dark-bg ${
                  errors.studentEmail ? 'border-rose-500/80 bg-rose-950/20' : 'border-white/10'
                }`}
              />
              {errors.studentEmail && (
                <p className="text-xs text-rose-400 mt-1">{errors.studentEmail}</p>
              )}
            </div>

            <div>
              <label htmlFor="session-notes" className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                <span>Session Goals & Questions (Optional)</span>
                <span className="text-[10px] text-slate-500">Max 300 chars</span>
              </label>
              <textarea
                id="session-notes"
                rows={3}
                value={notes}
                maxLength={300}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What topics or homework questions do you want to cover? (e.g. Need help tracing recursion stack for tomorrow's lab)..."
                className="w-full p-2.5 rounded-xl border border-white/10 bg-dark-bg text-sm font-medium text-white focus:outline-none focus:border-electric-400"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToPolicy}
                  onChange={(e) => setAgreeToPolicy(e.target.checked)}
                  className="mt-1 w-4 h-4 text-electric-500 rounded border-white/20 bg-dark-bg focus:ring-electric-400"
                />
                <span className="text-xs text-slate-400 leading-relaxed">
                  I agree to arrive on time and understand that peer tutors volunteer or charge subsidized rates to support student learning.
                </span>
              </label>
              {errors.agree && (
                <p className="text-xs text-rose-400 mt-1">{errors.agree}</p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="btn-electric w-full py-3.5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-xl shadow-electric-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Reserve Slot</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="md:col-span-5 space-y-5">
          <div className="bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-6 space-y-5">
            <h3 className="font-bold text-base text-white pb-3 border-b border-white/10">
              Booking Breakdown
            </h3>

            {/* Tutor mini card */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-white text-sm truncate">
                  {tutor.name}
                </h4>
                <p className="text-xs text-electric-300 font-semibold truncate">
                  {state.subject}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {state.topic || 'General Coaching'}
                </p>
              </div>
            </div>

            {/* Details list */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-electric-400" />
                  <span>Date:</span>
                </span>
                <span className="font-bold text-white text-right">
                  {formatReadableDate(state.date)}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-electric-400" />
                  <span>Time & Duration:</span>
                </span>
                <span className="font-bold text-white text-right">
                  {state.startTime} – {state.endTime} ({state.durationMinutes}m)
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  {state.format === 'Online' ? (
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span>Format:</span>
                </span>
                <span className="font-bold text-white text-right">
                  {state.format === 'Online' ? 'Online Zoom Room' : 'Campus In-Person'}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-slate-400">Hourly Rate:</span>
                <span className="font-semibold text-white">
                  {tutor.hourlyRate === 0 ? 'Free' : `$${tutor.hourlyRate}/hr`}
                </span>
              </div>
            </div>

            {/* Pricing total */}
            <div className="pt-4 border-t border-white/10 bg-dark-bg/80 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-base font-black text-white">
                <span>Total Amount:</span>
                <span className="text-lg text-emerald-400">
                  {state.calculatedPrice === 0 ? 'Free' : `$${state.calculatedPrice.toFixed(2)}`}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Demo simulation: No payment card needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Your Peer Tutoring Session"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <p>
            You are reserving a session with <strong className="text-white">{tutor.name}</strong>:
          </p>

          <div className="p-4 rounded-2xl bg-dark-bg border border-white/10 text-xs space-y-1.5">
            <div><strong className="text-white">Subject:</strong> {state.subject}</div>
            <div><strong className="text-white">Date & Time:</strong> {formatReadableDate(state.date)} at {state.startTime}</div>
            <div><strong className="text-white">Format:</strong> {state.format}</div>
            <div><strong className="text-white">Student:</strong> {studentName} ({studentEmail})</div>
          </div>

          <p className="text-xs text-slate-400">
            Once confirmed, this slot will be locked to prevent duplicate bookings. You can cancel anytime from "My Bookings".
          </p>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsConfirmModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleFinalBookingSubmit}
              className="btn-electric px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md active:scale-95"
            >
              {isSubmitting ? 'Reserving Slot...' : 'Yes, Complete Booking'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
