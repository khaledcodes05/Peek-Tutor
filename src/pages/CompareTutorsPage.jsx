import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  X,
  Plus,
  CheckCircle2,
  Calendar,
  Languages,
  DollarSign,
  Award,
  Video,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import RatingStars from '../components/common/RatingStars';
import EmptyState from '../components/common/EmptyState';
import { formatReadableDate } from '../utils/dateUtils';

export default function CompareTutorsPage() {
  const { compareIds, toggleCompare, clearCompare, tutors } = useBooking();
  const navigate = useNavigate();

  const comparedTutors = tutors.filter((t) => compareIds.includes(t.id));
  const availableToAdd = tutors.filter((t) => !compareIds.includes(t.id));

  const [selectedTutorToAdd, setSelectedTutorToAdd] = useState('');

  const handleAddFromDropdown = () => {
    if (selectedTutorToAdd) {
      toggleCompare(selectedTutorToAdd);
      setSelectedTutorToAdd('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-electric-400 block mb-1">
            Side-by-Side Analysis
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Compare Peer Mentors</span>
            <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-electric-500/20 text-electric-300 border border-electric-500/30">
              {comparedTutors.length}/2 Selected
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluate subject expertise, rates, ratings, and slot availability to make the right choice for your coursework.
          </p>
        </div>

        {comparedTutors.length > 0 && (
          <button
            type="button"
            onClick={clearCompare}
            className="text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 px-3.5 py-2 rounded-xl border border-white/10 transition-colors self-start sm:self-auto cursor-pointer"
          >
            Clear Comparison
          </button>
        )}
      </div>

      {/* When 0 tutors are selected */}
      {comparedTutors.length === 0 && (
        <EmptyState
          icon={Scale}
          title="No Tutors Selected for Comparison"
          description="Browse our peer mentor catalog and click 'Compare' on up to 2 profiles to view their differences side by side."
          actionLabel="Browse Peer Tutors"
          actionLink="/tutors"
        />
      )}

      {/* Comparison Grid */}
      {comparedTutors.length > 0 && (
        <div className="space-y-8">
          {/* Add 2nd tutor banner if only 1 selected */}
          {comparedTutors.length === 1 && (
            <div className="bg-[#111A2E] border border-electric-500/30 p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-dark-card">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center font-bold text-sm shrink-0 border border-electric-500/30">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Select a 2nd Tutor to Compare
                  </h4>
                  <p className="text-xs text-slate-400">
                    Choose from the list below or click "Compare" on any tutor card in the directory.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedTutorToAdd}
                  onChange={(e) => setSelectedTutorToAdd(e.target.value)}
                  className="p-2.5 rounded-xl border border-white/10 bg-dark-bg text-xs font-semibold text-white flex-1 sm:w-60 focus:outline-none focus:border-electric-400"
                >
                  <option value="">-- Choose Tutor to Compare --</option>
                  {availableToAdd.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.subjects[0]})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={!selectedTutorToAdd}
                  onClick={handleAddFromDropdown}
                  className="btn-electric px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Side by side comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparedTutors.map((tutor, idx) => {
              const otherTutor = comparedTutors.find((t) => t.id !== tutor.id);
              const availableSlots = tutor.slots.filter((s) => !s.isBooked);
              const nextSlot = availableSlots[0];

              const isLowerRate =
                otherTutor && tutor.hourlyRate < otherTutor.hourlyRate;
              const isHigherRating =
                otherTutor && tutor.rating > otherTutor.rating;
              const hasMoreSlots =
                otherTutor &&
                availableSlots.length >
                  otherTutor.slots.filter((s) => !s.isBooked).length;

              return (
                <div
                  key={tutor.id}
                  className="bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Top Bar with Remove */}
                  <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-white/10"
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-electric-400 block">
                          Tutor #{idx + 1}
                        </span>
                        <h3 className="text-xl font-black text-white leading-tight">
                          {tutor.name}
                        </h3>
                        <p className="text-xs text-slate-300 font-medium">
                          {tutor.major}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {tutor.year} • GPA {tutor.gpa}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCompare(tutor.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Remove from comparison"
                      aria-label="Remove tutor"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Highlights / Comparison Rows */}
                  <div className="py-4 space-y-2.5">
                    {/* Hourly Rate Row */}
                    <div className="p-3 rounded-2xl bg-dark-bg/60 border border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Hourly Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-black text-white">
                          {tutor.hourlyRate === 0 ? 'Free Volunteer' : `$${tutor.hourlyRate}/hr`}
                        </span>
                        {isLowerRate && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Lower Rate
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating Row */}
                    <div className="p-3 rounded-2xl bg-dark-bg/60 border border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Student Rating</span>
                      <div className="flex items-center gap-2">
                        <RatingStars rating={tutor.rating} reviewsCount={tutor.reviewsCount} />
                        {isHigherRating && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-electric-500/20 text-electric-300 border border-electric-500/30">
                            Higher Rated
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Session Format */}
                    <div className="p-3 rounded-2xl bg-dark-bg/60 border border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Session Format</span>
                      <span className="text-xs font-bold text-white px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/5">
                        {tutor.sessionFormat}
                      </span>
                    </div>

                    {/* Spoken Languages */}
                    <div className="p-3 rounded-2xl bg-dark-bg/60 border border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Languages</span>
                      <span className="text-xs font-semibold text-white">
                        {tutor.languages.join(', ')}
                      </span>
                    </div>

                    {/* Next Available Slot */}
                    <div className="p-3 rounded-2xl bg-dark-bg/60 border border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Next Slot</span>
                      <span className="text-xs font-bold text-electric-400">
                        {nextSlot
                          ? `${formatReadableDate(nextSlot.date)} @ ${nextSlot.startTime}`
                          : 'Fully Booked'}
                      </span>
                    </div>

                    {/* Open Slots Count */}
                    <div className="p-3 rounded-2xl bg-dark-bg/60 border border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Open Slots</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {availableSlots.length} open
                        </span>
                        {hasMoreSlots && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-violetAccent-500/20 text-violetAccent-300 border border-violetAccent-500/30">
                            More Open Slots
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subjects Covered */}
                  <div className="pt-2 pb-4">
                    <span className="text-xs font-bold text-slate-400 block mb-2">
                      Course Subjects:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tutor.subjects.map((sub) => (
                        <span
                          key={sub}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-electric-500/15 text-electric-300 border border-electric-500/30"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Book Session CTA */}
                  <div className="pt-4 border-t border-white/10">
                    <Link
                      to={`/tutors/${tutor.id}`}
                      className="btn-electric w-full py-3 rounded-xl font-black text-xs bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Session with {tutor.name.split(' ')[0]}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
