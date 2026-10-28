import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Clock,
  BookOpen,
  ArrowRight,
  Video,
  MapPin,
  Sparkles,
  Award,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatReadableDate } from '../utils/dateUtils';
import RatingStars from '../components/common/RatingStars';
import EmptyState from '../components/common/EmptyState';
import CreateGroupModal from '../components/common/CreateGroupModal';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile, bookings, tutors, studyGroups, auth } = useBooking();
  const [createGroupOpen, setCreateGroupOpen] = useState(false);

  // Active upcoming bookings
  const upcomingBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const pastBookings = bookings.filter((b) => b.status === 'COMPLETED');
  const cancelledBookings = bookings.filter((b) => b.status === 'CANCELLED');

  // Next session is the earliest upcoming booking
  const nextSession = upcomingBookings[0] || null;

  // Joined study groups
  const joinedGroups = studyGroups.filter((g) => g.isJoined);

  // Recommended tutors (excluding tutors already booked or top 3)
  const recommendedTutors = tutors.slice(0, 3);

  // Total study hours calculated from completed + upcoming sessions
  const totalStudyMinutes = bookings
    .filter((b) => b.status !== 'CANCELLED')
    .reduce((acc, curr) => acc + (curr.durationMinutes || 60), 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  // Distinct subjects covered
  const distinctSubjects = Array.from(
    new Set(bookings.filter((b) => b.status !== 'CANCELLED').map((b) => b.subject))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Welcome Banner */}
      <div className="bg-[#111A2E] rounded-3xl border border-white/10 p-6 sm:p-8 mb-8 shadow-dark-card relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-electric-500 to-violetAccent-500 text-white font-black text-2xl flex items-center justify-center shadow-glow-blue shrink-0">
              {profile.fullName ? profile.fullName.charAt(0) : 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Welcome back, {profile.fullName || 'Student'}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-electric-500/20 text-electric-300 border border-electric-500/30">
                  {auth?.role === 'tutor' ? 'Verified Mentor' : 'Active Student'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {profile.major} • {profile.year} • GPA: {profile.gpa || '3.88'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              to="/tutors"
              className="btn-electric flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md shadow-electric-500/20 text-center"
            >
              Book a Tutor
            </Link>
            <Link
              to="/profile"
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-dark-bg border border-white/10 hover:border-electric-400/40 text-slate-300 hover:text-white transition-all text-center"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-[#111A2E] border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Upcoming Sessions
            </span>
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{upcomingBookings.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Confirmed on calendar</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Study Time
            </span>
            <Clock className="w-4 h-4 text-electric-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalStudyHours} hrs</div>
          <p className="text-[11px] text-slate-400 mt-1">Peer learning hours</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Active Subjects
            </span>
            <BookOpen className="w-4 h-4 text-violetAccent-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {distinctSubjects.length > 0 ? distinctSubjects.length : 1}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Course specializations</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111A2E] border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Study Groups
            </span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{joinedGroups.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Collaborative pods joined</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Next Session + Upcoming Sessions List */}
        <div className="lg:col-span-8 space-y-8">
          {/* Next Session Spotlight */}
          {nextSession ? (
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-tr from-electric-950/60 via-[#111A2E] to-[#162038] border border-electric-500/30 shadow-dark-card">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-electric-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Next Scheduled Session</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-300 bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5">
                  Ref: {nextSession.referenceId}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <img
                    src={nextSession.tutorAvatar}
                    alt={nextSession.tutorName}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-electric-400/50 shadow-md shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-lg text-white">
                      {nextSession.tutorName}
                    </h3>
                    <p className="text-xs font-bold text-electric-300">
                      {nextSession.subject}
                    </p>
                    <p className="text-xs text-slate-400">
                      {nextSession.topic}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-emerald-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatReadableDate(nextSession.date)} @ {nextSession.startTime}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {nextSession.format === 'Online' ? <Video className="w-3.5 h-3.5 text-blue-400" /> : <MapPin className="w-3.5 h-3.5 text-emerald-400" />}
                        <span>{nextSession.format}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <a
                    href="https://zoom.us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-electric px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md text-center"
                  >
                    Join Zoom Room
                  </a>
                  <Link
                    to="/bookings"
                    className="px-4 py-2 rounded-xl text-center text-xs font-semibold text-slate-400 hover:text-white bg-dark-bg border border-white/10"
                  >
                    Manage Booking
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-[#111A2E] border border-white/10 text-center space-y-3">
              <CalendarCheck className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="font-bold text-white text-base">No Sessions Scheduled</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Ready to prepare for your next assignment? Browse our verified peer mentors to reserve a slot.
              </p>
              <Link
                to="/tutors"
                className="btn-electric inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs bg-electric-500 text-white shadow-md"
              >
                <span>Find Peer Tutors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Upcoming & Recent Sessions List */}
          <div className="bg-[#111A2E] rounded-3xl border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-electric-400" />
                <span>My Booked Study Sessions</span>
              </h3>
              <Link
                to="/bookings"
                className="text-xs font-bold text-electric-400 hover:text-electric-300"
              >
                View All ({bookings.length}) &rarr;
              </Link>
            </div>

            {bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.slice(0, 3).map((b) => (
                  <div
                    key={b.referenceId}
                    className="p-4 rounded-2xl bg-dark-bg/70 border border-white/5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={b.tutorAvatar}
                        alt={b.tutorName}
                        className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/10"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{b.tutorName}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${
                            b.status === 'CONFIRMED'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : b.status === 'CANCELLED'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{b.subject} • {formatReadableDate(b.date)}</p>
                      </div>
                    </div>

                    <Link
                      to="/bookings"
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3 text-center">No bookings recorded.</p>
            )}
          </div>

          {/* Joined Study Groups */}
          <div className="bg-[#111A2E] rounded-3xl border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-violetAccent-400" />
                <span>My Active Study Groups</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCreateGroupOpen(true)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-electric-400 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Group</span>
                </button>
                <Link
                  to="/study-groups"
                  className="text-xs font-bold text-violetAccent-400 hover:text-violetAccent-300"
                >
                  Explore All &rarr;
                </Link>
              </div>
            </div>

            {joinedGroups.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {joinedGroups.map((g) => (
                  <div
                    key={g.id}
                    className="p-4 rounded-2xl bg-dark-bg/60 border border-white/5 space-y-2"
                  >
                    <span className="text-[10px] font-bold text-violetAccent-300 bg-violetAccent-500/20 px-2 py-0.5 rounded-md">
                      {g.subject}
                    </span>
                    <h4 className="font-bold text-xs text-white line-clamp-1">{g.title}</h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-electric-400" />
                      <span>{g.schedule}</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">
                You haven't joined any study groups yet. Browse available cohorts to study together!
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Recommended Tutors + Recent Activity */}
        <div className="lg:col-span-4 space-y-8">
          {/* Recommended Tutors Card */}
          <div className="bg-[#111A2E] rounded-3xl border border-white/10 p-6 space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2 pb-3 border-b border-white/10">
              <Sparkles className="w-4 h-4 text-electric-400" />
              <span>Recommended Mentors</span>
            </h3>

            <div className="space-y-3.5">
              {recommendedTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="p-3.5 rounded-2xl bg-dark-bg/60 border border-white/5 flex items-center justify-between gap-3 group hover:border-electric-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-white truncate group-hover:text-electric-300">
                        {tutor.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {tutor.subjects[0]}
                      </p>
                      <RatingStars rating={tutor.rating} size="sm" showNumber={true} />
                    </div>
                  </div>

                  <Link
                    to={`/tutors/${tutor.id}`}
                    className="btn-electric px-3 py-1.5 rounded-xl text-[11px] font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shrink-0 shadow-sm"
                  >
                    Book
                  </Link>
                </div>
              ))}
            </div>

            <Link
              to="/tutors"
              className="block text-center text-xs font-bold text-electric-400 hover:text-electric-300 pt-2"
            >
              Browse All {tutors.length} Mentors &rarr;
            </Link>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-[#111A2E] rounded-3xl border border-white/10 p-6 space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2 pb-3 border-b border-white/10">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Recent Activity</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">Session Confirmed with Elena Rostova</p>
                  <span className="text-[10px] text-slate-500">Tomorrow at 10:00 AM</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-electric-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">Joined CS201 LeetCode Sprint Pod</p>
                  <span className="text-[10px] text-slate-500">2 days ago</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-violetAccent-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">Completed session with Priya Sharma</p>
                  <span className="text-[10px] text-slate-500">Oct 15, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateGroupModal
        isOpen={createGroupOpen}
        onClose={() => setCreateGroupOpen(false)}
      />
    </div>
  );
}
