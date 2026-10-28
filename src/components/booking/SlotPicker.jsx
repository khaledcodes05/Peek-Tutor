import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Video, MapPin, Check, AlertCircle } from 'lucide-react';
import { formatReadableDate, getRelativeDayLabel, isSlotInPast } from '../../utils/dateUtils';

export default function SlotPicker({
  slots = [],
  selectedSlotId,
  onSelectSlot,
  tutorRate = 0
}) {
  const uniqueDates = useMemo(() => {
    const dates = Array.from(new Set(slots.map((s) => s.date)));
    return dates.sort();
  }, [slots]);

  const [activeDate, setActiveDate] = useState(() => {
    const firstAvailable = slots.find((s) => !s.isBooked);
    return firstAvailable ? firstAvailable.date : uniqueDates[0] || '';
  });

  const activeDateSlots = useMemo(() => {
    return slots.filter((s) => s.date === activeDate);
  }, [slots, activeDate]);

  if (slots.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-dark-bg/60 border border-white/10 text-center">
        <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-slate-200">No time slots scheduled currently.</p>
        <p className="text-xs text-slate-400 mt-1">Check back later or contact the tutor directly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Date Tabs */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-electric-400" />
          <span>Select Available Date</span>
        </label>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {uniqueDates.map((dateStr) => {
            const isSelected = dateStr === activeDate;
            const dateSlots = slots.filter((s) => s.date === dateStr);
            const openCount = dateSlots.filter((s) => !s.isBooked).length;

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => setActiveDate(dateStr)}
                className={`flex flex-col items-center min-w-[95px] p-2.5 rounded-2xl border text-center transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-tr from-electric-600 to-violetAccent-600 text-white border-electric-400 shadow-glow-blue ring-2 ring-electric-400/40'
                    : 'bg-dark-bg/70 hover:bg-dark-bg text-slate-300 border-white/10'
                }`}
              >
                <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                  {getRelativeDayLabel(dateStr)}
                </span>
                <span className="text-xs font-black mt-0.5">
                  {formatReadableDate(dateStr).split(',')[1]?.trim() || dateStr}
                </span>
                <span
                  className={`text-[10px] font-semibold mt-1 px-1.5 py-0.2 rounded-full ${
                    openCount > 0
                      ? isSelected
                        ? 'bg-black/30 text-emerald-300'
                        : 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/20'
                      : isSelected
                      ? 'bg-black/30 text-rose-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {openCount > 0 ? `${openCount} open` : 'Full'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Time Slots Grid */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-electric-400" />
            <span>Select Time Slot ({formatReadableDate(activeDate)})</span>
          </label>
          <span className="text-[11px] text-slate-400 font-medium">
            Local campus time
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {activeDateSlots.map((slot) => {
            const isBooked = slot.isBooked;
            const isPast = isSlotInPast(slot.date, slot.startTime);
            const isUnavailable = isBooked || isPast;
            const isSelected = selectedSlotId === slot.id;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={isUnavailable}
                onClick={() => onSelectSlot(slot)}
                className={`relative p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-electric-500/20 border-electric-400 ring-2 ring-electric-500/40 text-white shadow-glow-blue'
                    : isUnavailable
                    ? 'bg-dark-bg/40 border-white/5 text-slate-500 cursor-not-allowed opacity-50'
                    : 'bg-dark-bg/80 border-white/10 hover:border-electric-400/50 hover:bg-dark-bg text-slate-200 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-electric-500 text-white'
                        : isUnavailable
                        ? 'bg-slate-800 text-slate-500'
                        : 'bg-white/5 text-electric-400'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div>
                    <span className="text-sm font-bold block leading-snug">
                      {slot.startTime} – {slot.endTime}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                      {slot.format === 'Online' ? (
                        <>
                          <Video className="w-3 h-3 text-blue-400" />
                          <span>Online Zoom</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          <span>Campus Library</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="shrink-0 text-right">
                  {isUnavailable ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-white/5">
                      {isBooked ? 'Already Booked' : 'Expired'}
                    </span>
                  ) : isSelected ? (
                    <span className="text-[11px] font-black text-electric-300 bg-electric-500/30 px-2 py-0.5 rounded-md border border-electric-500/40">
                      Selected
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      Available
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
