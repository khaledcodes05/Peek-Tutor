import React, { useState } from 'react';
import Modal from './Modal';
import { useBooking } from '../../context/BookingContext';
import { ALL_SUBJECTS, ALL_FORMATS } from '../../data/tutorsData';
import { GraduationCap, Award, DollarSign, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

export default function BecomeTutorModal({ isOpen, onClose }) {
  const { becomeTutor, profile } = useBooking();

  const [name, setName] = useState(profile.fullName || '');
  const [major, setMajor] = useState(profile.major || 'Computer Science');
  const [year, setYear] = useState(profile.year || 'Senior (Year 4)');
  const [gpa, setGpa] = useState('3.92 / 4.0');
  const [selectedSubjects, setSelectedSubjects] = useState(['Data Structures and Algorithms']);
  const [hourlyRate, setHourlyRate] = useState(0); // Default $0 volunteer
  const [sessionFormat, setSessionFormat] = useState('Hybrid');
  const [bio, setBio] = useState('Passionate about breaking down tricky algorithms and helping peers feel confident in exam prep.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleSubject = (sub) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length === 1) return; // Keep at least one
      setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required.';
    if (!major.trim()) errs.major = 'Major is required.';
    if (selectedSubjects.length === 0) errs.subjects = 'Select at least one subject.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      becomeTutor({
        name: name.trim(),
        major: major.trim(),
        year,
        gpa,
        subjects: selectedSubjects,
        hourlyRate: Number(hourlyRate),
        sessionFormat,
        bio: bio.trim(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        campusLocation: sessionFormat === 'Online' ? 'Online Zoom Room' : 'Engineering Library Collaborative Area'
      });
      setIsSubmitting(false);
      onClose();
    }, 450);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Apply to Become a Peer Mentor"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="p-3.5 rounded-2xl bg-electric-500/10 border border-electric-500/20 text-electric-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Join 12+ verified collegiate peer tutors. Choose your own rates, offer volunteer sessions, and mentor fellow students in courses you’ve mastered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
            />
            {errors.name && <p className="text-rose-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Academic Major *
            </label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Academic Standing
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
            >
              <option value="Sophomore (Year 2)">Sophomore (Year 2)</option>
              <option value="Junior (Year 3)">Junior (Year 3)</option>
              <option value="Senior (Year 4)">Senior (Year 4)</option>
              <option value="Master's Candidate">Master's Candidate</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Course Grade / Verified GPA
            </label>
            <input
              type="text"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              placeholder="e.g. 3.92 / 4.0 (Grade A)"
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
            />
          </div>
        </div>

        {/* Subjects Checklist */}
        <div>
          <label className="block font-bold text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Subjects You Can Mentor ({selectedSubjects.length} selected)</span>
            <span className="text-[10px] text-slate-500">Pick 1 or more</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1.5 rounded-xl bg-dark-bg border border-white/10">
            {ALL_SUBJECTS.map((sub) => {
              const isSelected = selectedSubjects.includes(sub);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubject(sub)}
                  className={`p-2 rounded-lg text-left text-[11px] font-semibold border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-electric-500/20 text-electric-300 border-electric-500/40'
                      : 'bg-dark-surface/50 text-slate-400 border-transparent hover:bg-dark-surface'
                  }`}
                >
                  <span className="truncate">{sub}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-electric-400 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rate & Format */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Hourly Rate ($USD)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="50"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
              />
              <span className="absolute right-3 top-2.5 text-[11px] font-bold text-slate-400">
                {Number(hourlyRate) === 0 ? 'Free Volunteer' : '$/hr'}
              </span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Session Format
            </label>
            <select
              value={sessionFormat}
              onChange={(e) => setSessionFormat(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
            >
              {ALL_FORMATS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block font-bold text-slate-300 mb-1">
            Short Bio & Mentorship Style
          </label>
          <textarea
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-electric px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-lg shadow-electric-500/25 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Registering Mentor...' : 'Complete Registration'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
