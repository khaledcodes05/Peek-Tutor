import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  MapPin,
  Copy,
  Check,
  Download,
  ArrowRight,
  Search,
  BookOpen,
  Mail,
  User,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatReadableDate, generateIcsContent } from '../utils/dateUtils';
import EmptyState from '../components/common/EmptyState';

export default function BookingConfirmationPage() {
  const { referenceId } = useParams();
  const navigate = useNavigate();
  const { getBookingByReference, addToast } = useBooking();
  const [copied, setCopied] = useState(false);

  const booking = getBookingByReference(referenceId);

  useEffect(() => {
    if (booking) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // decorative
      }
    }
  }, [booking]);

  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          title="Booking Reference Not Found"
          description={`We could not locate any booking with reference ID "${referenceId}". It may have been cleared or cancelled.`}
          actionLabel="Go to My Bookings"
          actionLink="/bookings"
        />
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(booking.referenceId);
    setCopied(true);
    addToast('Booking reference copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadIcs = () => {
    try {
      const ics = generateIcsContent({
        title: `Peer Tutoring: ${booking.subject} with ${booking.tutorName}`,
        description: `Topic: ${booking.topic}\nReference: ${booking.referenceId}\nFormat: ${booking.format}\nNotes: ${booking.notes || 'None'}`,
        location: booking.location,
        dateString: booking.date,
        timeString: booking.startTime,
        durationMinutes: booking.durationMinutes
      });

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${booking.referenceId}_tutoring_session.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Calendar (.ics) invite downloaded!', 'success');
    } catch (e) {
      console.error(e);
      addToast('Could not generate calendar file.', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Success Hero Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-blue border border-emerald-500/30">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-electric-500/20 text-electric-300 uppercase tracking-wider border border-electric-500/30">
          <Sparkles className="w-3.5 h-3.5 text-electric-400" />
          <span>Booking Successfully Confirmed</span>
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          You're All Set for Study Time!
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Your time slot has been locked and a calendar notification has been generated.
        </p>
      </div>

      {/* Main Confirmation Card */}
      <div className="bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-6 sm:p-8 space-y-6">
        {/* Reference Number Box */}
        <div className="p-4 rounded-2xl bg-dark-bg/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Booking Reference Code
            </span>
            <span className="text-xl sm:text-2xl font-black text-electric-400 tracking-wider font-mono">
              {booking.referenceId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#162038] hover:bg-[#1B2744] text-slate-200 border border-white/10 active:scale-95 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-electric-400" />
                  <span>Copy Reference</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="btn-electric inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>

        {/* Tutor Details */}
        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <img
            src={booking.tutorAvatar}
            alt={booking.tutorName}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-white/10 shrink-0"
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-electric-400">
              Your Peer Mentor
            </span>
            <h3 className="text-lg font-bold text-white">
              {booking.tutorName}
            </h3>
            <p className="text-xs text-slate-400">
              {booking.tutorTitle}
            </p>
          </div>
        </div>

        {/* Session details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-dark-bg/60 border border-white/5 space-y-1">
            <span className="text-slate-400 block font-semibold">Subject & Topic:</span>
            <span className="font-bold text-white text-sm block">{booking.subject}</span>
            <span className="text-slate-300 block">{booking.topic}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-bg/60 border border-white/5 space-y-1">
            <span className="text-slate-400 block font-semibold">Date & Time:</span>
            <span className="font-bold text-white text-sm block">
              {formatReadableDate(booking.date)}
            </span>
            <span className="text-slate-300 block">
              {booking.startTime} – {booking.endTime} ({booking.durationMinutes}m)
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-bg/60 border border-white/5 space-y-1">
            <span className="text-slate-400 block font-semibold">Meeting Format:</span>
            <span className="font-bold text-white block flex items-center gap-1.5">
              {booking.format === 'Online' ? (
                <Video className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{booking.format}</span>
            </span>
            <span className="text-slate-300 block line-clamp-1">{booking.location}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-bg/60 border border-white/5 space-y-1">
            <span className="text-slate-400 block font-semibold">Student & Contact:</span>
            <span className="font-bold text-white block">{booking.studentName}</span>
            <span className="text-slate-300 block">{booking.studentEmail}</span>
          </div>
        </div>

        {booking.notes && (
          <div className="p-3.5 rounded-2xl bg-dark-bg/60 border border-white/5 text-xs">
            <span className="font-bold text-slate-300 block mb-1">Your Stated Study Notes:</span>
            <p className="text-slate-400 italic">"{booking.notes}"</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to="/tutors"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-dark-bg hover:bg-[#162038] border border-white/10 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Book Another Session</span>
          </Link>

          <Link
            to="/bookings"
            className="btn-electric w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-electric-500 to-violetAccent-600 shadow-md active:scale-95 transition-all"
          >
            <span>Manage My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
