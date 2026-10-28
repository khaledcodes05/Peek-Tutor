import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  XCircle,
  AlertCircle,
  CheckCircle2,
  CalendarX,
  Search,
  Download,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatReadableDate, generateIcsContent } from '../utils/dateUtils';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';

export default function MyBookingsPage() {
  const { bookings, cancelBooking, addToast } = useBooking();
  const [activeTab, setActiveTab] = useState('upcoming');

  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('Schedule conflict');

  const upcomingBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const pastOrCancelledBookings = bookings.filter(
    (b) => b.status === 'COMPLETED' || b.status === 'CANCELLED'
  );

  const displayedBookings =
    activeTab === 'upcoming'
      ? upcomingBookings
      : activeTab === 'past'
      ? pastOrCancelledBookings
      : bookings;

  const handleOpenCancelModal = (booking) => {
    setCancellingBooking(booking);
    setCancelReason('Schedule conflict');
  };

  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    cancelBooking(cancellingBooking.referenceId, cancelReason);
    setCancellingBooking(null);
  };

  const handleDownloadCalendar = (booking) => {
    try {
      const ics = generateIcsContent({
        title: `Peer Tutoring: ${booking.subject} with ${booking.tutorName}`,
        description: `Topic: ${booking.topic}\nReference: ${booking.referenceId}\nFormat: ${booking.format}`,
        location: booking.location,
        dateString: booking.date,
        timeString: booking.startTime,
        durationMinutes: booking.durationMinutes
      });

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${booking.referenceId}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('Calendar (.ics) invite downloaded!', 'success');
    } catch (e) {
      addToast('Could not download invite.', 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-electric-400 block mb-1">
            Session History & Calendar
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            My Study Sessions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your reserved peer tutoring slots, meeting links, and session status.
          </p>
        </div>

        <Link
          to="/tutors"
          className="btn-electric inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-lg shadow-electric-500/25 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Book Another Tutor</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-electric-500 text-white shadow-glow-blue'
              : 'bg-dark-bg text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <span>Upcoming Sessions</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'upcoming' ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-300'
            }`}
          >
            {upcomingBookings.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('past')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'past'
              ? 'bg-electric-500 text-white shadow-glow-blue'
              : 'bg-dark-bg text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <span>Past & Cancelled</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'past' ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-300'
            }`}
          >
            {pastOrCancelledBookings.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-electric-500 text-white shadow-glow-blue'
              : 'bg-dark-bg text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          All ({bookings.length})
        </button>
      </div>

      {/* Bookings List or Empty State */}
      {displayedBookings.length > 0 ? (
        <div className="space-y-4">
          {displayedBookings.map((b) => {
            const isConfirmed = b.status === 'CONFIRMED';
            const isCancelled = b.status === 'CANCELLED';
            const isCompleted = b.status === 'COMPLETED';

            return (
              <div
                key={b.referenceId}
                className="bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-5 sm:p-6 transition-all hover:border-electric-400/40"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: Tutor & Session Meta */}
                  <div className="flex items-start gap-4">
                    <img
                      src={b.tutorAvatar}
                      alt={b.tutorName}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-white/10 shrink-0"
                    />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-base text-white">
                          {b.tutorName}
                        </span>
                        <span className="text-xs font-mono font-bold text-electric-400 bg-electric-500/10 px-2 py-0.5 rounded-md border border-electric-500/20">
                          {b.referenceId}
                        </span>
                        <span
                          className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                            isConfirmed
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : isCancelled
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isConfirmed ? 'Confirmed' : isCancelled ? 'Cancelled' : 'Completed'}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-electric-300">
                        {b.subject} • <span className="text-slate-400 font-medium">{b.topic}</span>
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1">
                        <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                          <Calendar className="w-3.5 h-3.5 text-electric-400" />
                          <span>{formatReadableDate(b.date)}</span>
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-electric-400" />
                          <span>
                            {b.startTime} – {b.endTime} ({b.durationMinutes}m)
                          </span>
                        </span>

                        <span className="flex items-center gap-1.5">
                          {b.format === 'Online' ? (
                            <Video className="w-3.5 h-3.5 text-blue-400" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                          <span>{b.format}</span>
                        </span>
                      </div>

                      {b.notes && (
                        <p className="text-xs text-slate-400 italic pt-1">
                          Note: "{b.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex flex-wrap lg:flex-col items-end gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-white/5">
                    <div className="text-right mb-1 hidden lg:block">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Total</span>
                      <span className="text-sm font-black text-white">
                        {b.totalPrice === 0 ? 'Free' : `$${b.totalPrice.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isConfirmed && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleDownloadCalendar(b)}
                            className="p-2 rounded-xl text-slate-300 hover:text-white bg-dark-bg hover:bg-[#162038] border border-white/10 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            title="Export Calendar Invite"
                          >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Calendar</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenCancelModal(b)}
                            className="px-3 py-2 rounded-xl text-xs font-bold text-rose-300 hover:bg-rose-950/60 border border-rose-500/30 transition-colors cursor-pointer"
                          >
                            Cancel Session
                          </button>
                        </>
                      )}

                      <Link
                        to={`/tutors/${b.tutorId}`}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
                      >
                        View Tutor
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={CalendarX}
          title={
            activeTab === 'upcoming'
              ? 'No Upcoming Sessions Booked'
              : 'No Sessions in this category'
          }
          description="Explore our peer mentor catalog to find available slots in Data Structures, Java, AI, Math, and more."
          actionLabel="Find a Peer Tutor"
          actionLink="/tutors"
        />
      )}

      {/* Cancellation Confirmation Modal */}
      <Modal
        isOpen={Boolean(cancellingBooking)}
        onClose={() => setCancellingBooking(null)}
        title="Cancel Tutoring Session"
      >
        {cancellingBooking && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <p>
              Are you sure you want to cancel your session with{' '}
              <strong className="text-white">{cancellingBooking.tutorName}</strong>?
            </p>

            <div className="p-4 rounded-2xl bg-dark-bg border border-rose-500/30 text-xs space-y-1 text-rose-300">
              <div><strong>Reference:</strong> {cancellingBooking.referenceId}</div>
              <div><strong>Date:</strong> {formatReadableDate(cancellingBooking.date)} at {cancellingBooking.startTime}</div>
              <div><strong>Subject:</strong> {cancellingBooking.subject}</div>
            </div>

            <div>
              <label htmlFor="cancel-reason" className="block text-xs font-bold text-slate-300 mb-1">
                Reason for cancellation:
              </label>
              <select
                id="cancel-reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-white/10 bg-dark-bg text-xs font-medium text-white focus:outline-none focus:border-electric-400"
              >
                <option value="Schedule conflict">Schedule conflict</option>
                <option value="Topic already resolved">Topic already resolved</option>
                <option value="Need different subject">Need different subject</option>
                <option value="Personal emergency">Personal emergency</option>
              </select>
            </div>

            <p className="text-xs text-slate-400">
              Cancelling will instantly free up this time slot so other students can book it.
            </p>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCancellingBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Keep Session
              </button>

              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-rose-600 text-white hover:bg-rose-700 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Yes, Cancel & Release Slot
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
