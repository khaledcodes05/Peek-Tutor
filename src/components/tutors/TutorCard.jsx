import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Languages,
  MapPin,
  Check,
  Scale,
  Sparkles,
  Award,
  Video,
  Clock,
  ArrowRight
} from 'lucide-react';
import RatingStars from '../common/RatingStars';
import { useBooking } from '../../context/BookingContext';

export default function TutorCard({ tutor }) {
  const { compareIds, toggleCompare } = useBooking();
  const isCompared = compareIds.includes(tutor.id);

  // Count unbooked available future slots
  const availableSlotsCount = tutor.slots.filter((s) => !s.isBooked).length;

  return (
    <div className="bg-[#111A2E] rounded-3xl border border-white/10 interactive-card flex flex-col h-full group overflow-hidden">
      {/* Top Banner / Avatar Header */}
      <div className="p-5 pb-4 flex items-start gap-4">
        {/* Avatar with zoom container */}
        <div className="relative shrink-0 zoom-container rounded-2xl ring-2 ring-white/10 group-hover:ring-electric-400/50 transition-all">
          <img
            src={tutor.avatar}
            alt={tutor.name}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover zoom-image"
          />
          <span
            className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold border shadow-xs ${
              tutor.sessionFormat === 'Online'
                ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                : tutor.sessionFormat === 'In-Person'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                : 'bg-violet-950 text-violet-300 border-violet-500/40'
            }`}
          >
            {tutor.sessionFormat}
          </span>
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <Link
              to={`/tutors/${tutor.id}`}
              className="font-bold text-white group-hover:text-electric-400 transition-colors text-base sm:text-lg truncate block hover:underline"
            >
              {tutor.name}
            </Link>

            {/* Compare Toggle Button */}
            <button
              type="button"
              onClick={() => toggleCompare(tutor.id)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isCompared
                  ? 'bg-electric-500 text-white border-electric-500 shadow-glow-blue'
                  : 'bg-dark-bg/60 hover:bg-dark-bg text-slate-300 hover:text-white border-white/10'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Compare with another tutor'}
              aria-label={`Compare ${tutor.name}`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>
          </div>

          <p className="text-xs text-electric-300/80 font-medium truncate mt-0.5">
            {tutor.title}
          </p>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <RatingStars
              rating={tutor.rating}
              reviewsCount={tutor.reviewsCount}
              size="sm"
            />
            <span className="text-slate-600">•</span>
            <span className="text-xs font-semibold text-slate-400">
              GPA {tutor.gpa.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Bio excerpt */}
      <div className="px-5 pb-3">
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {tutor.bio}
        </p>
      </div>

      {/* Subjects Badges */}
      <div className="px-5 pb-3 flex flex-wrap gap-1.5">
        {tutor.subjects.map((sub, idx) => (
          <span
            key={sub}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
              idx === 0
                ? 'bg-electric-500/15 text-electric-300 border border-electric-500/30'
                : 'bg-white/5 text-slate-300 border border-white/5'
            }`}
          >
            {sub}
          </span>
        ))}
      </div>

      {/* Languages & Location */}
      <div className="px-5 pb-3 text-xs text-slate-400 flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex items-center gap-1.5 truncate max-w-[60%]">
          <Languages className="w-3.5 h-3.5 text-electric-400 shrink-0" />
          <span className="truncate">{tutor.languages.join(', ')}</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-md shrink-0">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span>
            {availableSlotsCount > 0
              ? `${availableSlotsCount} slots open`
              : 'Fully booked'}
          </span>
        </div>
      </div>

      {/* Card Footer: Pricing & Action */}
      <div className="mt-auto p-5 pt-3.5 bg-dark-bg/60 border-t border-white/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">
            Rate
          </span>
          <div className="flex items-baseline gap-1">
            {tutor.hourlyRate === 0 ? (
              <span className="text-sm sm:text-base font-extrabold text-emerald-400">
                Free Volunteer
              </span>
            ) : (
              <>
                <span className="text-base sm:text-lg font-black text-white">
                  ${tutor.hourlyRate}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ hr</span>
              </>
            )}
          </div>
        </div>

        <Link
          to={`/tutors/${tutor.id}`}
          className="btn-electric inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md shadow-electric-500/20 active:scale-95 transition-all group"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Session</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
