import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Languages,
  Award,
  CheckCircle2,
  Video,
  Scale,
  Sparkles,
  BookOpen,
  DollarSign,
  AlertCircle,
  Share2
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import RatingStars from '../components/common/RatingStars';
import SlotPicker from '../components/booking/SlotPicker';
import TutorCompareDrawer from '../components/tutors/TutorCompareDrawer';
import EmptyState from '../components/common/EmptyState';

export default function TutorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTutorById, compareIds, toggleCompare, addToast } = useBooking();

  const tutor = getTutorById(id);

  // Booking form state
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(tutor?.subjects[0] || '');
  const [selectedTopic, setSelectedTopic] = useState(tutor?.topics[0] || '');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [sessionFormat, setSessionFormat] = useState(tutor?.sessionFormat || 'Online');
  const [errorMsg, setErrorMsg] = useState('');

  if (!tutor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          title="Tutor Profile Not Found"
          description="The requested tutor profile could not be located in the catalog."
          actionLabel="Back to All Tutors"
          actionLink="/tutors"
        />
      </div>
    );
  }

  const isCompared = compareIds.includes(tutor.id);

  // Live session price calculation based on duration
  const calculatedPrice = tutor.hourlyRate === 0
    ? 0
    : Math.round((tutor.hourlyRate * (durationMinutes / 60)) * 100) / 100;

  const handleSelectSlot = (slot) => {
    setErrorMsg('');
    setSelectedSlot(slot);
    if (slot.format) {
      setSessionFormat(slot.format);
    }
  };

  const handleProceedToReview = () => {
    if (!selectedSlot) {
      setErrorMsg('Please select an available date and time slot before proceeding.');
      return;
    }

    if (selectedSlot.isBooked) {
      setErrorMsg('This slot was already booked. Please choose another open slot.');
      return;
    }

    navigate('/book/review', {
      state: {
        tutorId: tutor.id,
        slotId: selectedSlot.id,
        date: selectedSlot.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        durationMinutes,
        subject: selectedSubject,
        topic: selectedTopic,
        format: sessionFormat,
        calculatedPrice
      }
    });
  };

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Tutor profile link copied to clipboard!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/tutors"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tutors Catalog</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyShare}
            className="p-2 rounded-xl border border-white/10 bg-[#111A2E] hover:bg-[#162038] text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Share tutor profile"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            type="button"
            onClick={() => toggleCompare(tutor.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isCompared
                ? 'bg-electric-500 text-white border-electric-500 shadow-glow-blue'
                : 'bg-[#111A2E] hover:bg-[#162038] text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isCompared ? 'In Compare List' : 'Add to Compare'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tutor Details & Bio */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Profile Header Card */}
          <div className="bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-white/10">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-electric-400/40 shadow-xl shrink-0"
              />

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {tutor.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-electric-500/20 text-electric-300 border border-electric-500/30">
                    Verified Mentor
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-electric-300">
                  {tutor.title}
                </p>

                <p className="text-xs text-slate-400 font-medium">
                  {tutor.major} • {tutor.year} (GPA: {tutor.gpa})
                </p>

                <div className="pt-1 flex items-center gap-4 flex-wrap">
                  <RatingStars
                    rating={tutor.rating}
                    reviewsCount={tutor.reviewsCount}
                    size="md"
                  />
                  <span className="text-slate-600">•</span>
                  <div className="text-xs font-semibold text-slate-300">
                    {tutor.stats?.sessionsCompleted || 80}+ Sessions Mentored
                  </div>
                </div>
              </div>
            </div>

            {/* Badges Bar */}
            <div className="py-4 flex flex-wrap gap-2">
              {tutor.badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white/5 text-slate-200 border border-white/10"
                >
                  <Award className="w-3.5 h-3.5 text-electric-400" />
                  <span>{b}</span>
                </span>
              ))}
            </div>

            {/* About Bio */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h3 className="font-bold text-sm sm:text-base text-white">
                About the Tutor
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {tutor.bio}
              </p>
            </div>

            {/* Quick meta grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-dark-bg/60 border border-white/5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Spoken Languages
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Languages className="w-4 h-4 text-electric-400" />
                  <span>{tutor.languages.join(', ')}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-dark-bg/60 border border-white/5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Location / Meeting Format
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-white truncate">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{tutor.campusLocation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects & Topics Covered */}
          <div className="bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-electric-400" />
              <span>Subjects & Specializations</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((sub) => (
                <span
                  key={sub}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-electric-500/15 text-electric-300 border border-electric-500/30"
                >
                  {sub}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-slate-400 block mb-2">
                Coursework Topics Frequently Covered:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tutor.topics.map((top) => (
                  <span
                    key={top}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-dark-bg/70 text-slate-300 border border-white/5"
                  >
                    • {top}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="text-xs font-bold text-slate-400 block mb-2">
                Mentorship Strengths:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {tutor.expertise.map((exp) => (
                  <li key={exp} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Booking Widget */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="bg-[#111A2E] rounded-3xl border-2 border-electric-500/30 shadow-2xl shadow-black/60 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
                  Book a Session
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Select Time & Topic
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-medium block">Rate</span>
                <span className="text-xl font-black text-emerald-400">
                  {tutor.hourlyRate === 0 ? 'Free' : `$${tutor.hourlyRate}/hr`}
                </span>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Subject Dropdown */}
            <div>
              <label htmlFor="select-subject" className="block text-xs font-bold text-slate-300 mb-1.5">
                Which subject do you want help with?
              </label>
              <select
                id="select-subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-white/10 bg-dark-bg text-xs font-bold text-white focus:outline-none focus:border-electric-400 cursor-pointer"
              >
                {tutor.subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Session Duration Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Session Duration
                </label>
                <span className="text-xs font-bold text-electric-400">
                  {durationMinutes} Minutes
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[30, 45, 60, 90].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDurationMinutes(mins)}
                    className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                      durationMinutes === mins
                        ? 'bg-electric-500 text-white border-electric-400 shadow-glow-blue'
                        : 'bg-dark-bg text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Meeting Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSessionFormat('Online')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    sessionFormat === 'Online'
                      ? 'bg-blue-950/70 border-blue-400 text-blue-200 ring-1 ring-blue-400/40'
                      : 'bg-dark-bg border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Video className="w-4 h-4 text-blue-400" />
                  <span>Online Zoom</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSessionFormat('In-Person')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    sessionFormat === 'In-Person'
                      ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400/40'
                      : 'bg-dark-bg border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Campus Library</span>
                </button>
              </div>
            </div>

            {/* Interactive Slot Picker */}
            <div className="pt-2 border-t border-white/10">
              <SlotPicker
                slots={tutor.slots}
                selectedSlotId={selectedSlot?.id}
                onSelectSlot={handleSelectSlot}
                tutorRate={tutor.hourlyRate}
              />
            </div>

            {/* Price calculation */}
            <div className="pt-4 border-t border-white/10 bg-dark-bg/80 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Duration ({durationMinutes} mins):</span>
                <span className="font-semibold text-white">{durationMinutes / 60} hrs</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Base Rate:</span>
                <span className="font-semibold text-white">${tutor.hourlyRate}/hr</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-sm font-black text-white">
                <span>Total Estimated Price:</span>
                <span className="text-base text-emerald-400">
                  {calculatedPrice === 0 ? 'Free (Volunteer)' : `$${calculatedPrice.toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Proceed CTA */}
            <button
              type="button"
              onClick={handleProceedToReview}
              className="btn-electric w-full py-3.5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-xl shadow-electric-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Proceed to Booking Review</span>
            </button>

            <p className="text-[11px] text-center text-slate-500">
              Slot is held temporarily. Zero payment required in demo mode.
            </p>
          </div>
        </div>
      </div>

      <TutorCompareDrawer />
    </div>
  );
}
