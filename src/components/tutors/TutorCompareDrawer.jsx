import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, ArrowRight, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function TutorCompareDrawer() {
  const { compareIds, toggleCompare, clearCompare, tutors } = useBooking();
  const navigate = useNavigate();

  if (compareIds.length === 0) return null;

  const comparedTutors = tutors.filter((t) => compareIds.includes(t.id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-[#111A2E]/95 backdrop-blur-xl border border-electric-500/30 rounded-3xl shadow-2xl shadow-black/80 p-3.5 sm:p-4 text-white"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left info & avatars */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-2xl bg-electric-500/20 border border-electric-500/30 flex items-center justify-center text-electric-400 shrink-0 shadow-glow-blue">
              <Scale className="w-5 h-5" />
            </div>

            <div className="flex-1 sm:flex-initial">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-electric-300">
                  Comparison Board
                </span>
                <span className="text-[10px] font-black px-2 py-0.2 bg-gradient-to-r from-electric-500 to-violetAccent-500 text-white rounded-full">
                  {comparedTutors.length}/2
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">
                {comparedTutors.length === 1
                  ? 'Select 1 more tutor to compare side by side'
                  : 'Ready to compare side by side!'}
              </p>
            </div>

            {/* Avatars */}
            <div className="flex items-center -space-x-2 shrink-0">
              {comparedTutors.map((tutor) => (
                <div key={tutor.id} className="relative group">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-8 h-8 rounded-full border-2 border-[#111A2E] object-cover shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => toggleCompare(tutor.id)}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center hover:bg-rose-500 cursor-pointer"
                    title={`Remove ${tutor.name}`}
                    aria-label={`Remove ${tutor.name}`}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={clearCompare}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => navigate('/compare')}
              className="btn-electric flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md shadow-electric-500/25 active:scale-95 cursor-pointer"
            >
              <span>View Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
