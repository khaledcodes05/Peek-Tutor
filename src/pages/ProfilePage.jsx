import React, { useState } from 'react';
import {
  User,
  Mail,
  GraduationCap,
  Languages,
  ShieldCheck,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { ALL_LANGUAGES, ALL_FORMATS } from '../data/tutorsData';
import Modal from '../components/common/Modal';

export default function ProfilePage() {
  const { profile, updateProfile, resetAllDemoData } = useBooking();

  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    email: profile.email || '',
    studentId: profile.studentId || '',
    major: profile.major || '',
    year: profile.year || 'Junior (Year 3)',
    gpa: profile.gpa || '3.88 / 4.0',
    preferredLanguage: profile.preferredLanguage || 'English',
    preferredFormat: profile.preferredFormat || 'Hybrid',
    bio: profile.bio || ''
  });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleConfirmReset = () => {
    resetAllDemoData();
    setIsResetModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title */}
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-electric-400 block mb-1">
          Settings & Identity
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Student Profile & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your collegiate identity used to auto-fill peer tutoring booking requests.
        </p>
      </div>

      {/* Demo Notice Banner */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm flex items-start gap-3.5 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-300">Local Demonstration Notice</p>
          <p className="text-xs text-amber-200/80 leading-relaxed">
            This profile and all booking records are stored strictly in your browser's <code>localStorage</code> for demonstration purposes. This is not a production backend with server-side authentication.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Profile Card Preview */}
        <div className="md:col-span-4 bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-6 text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-electric-500 to-violetAccent-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-glow-blue ring-2 ring-white/10">
            {formData.fullName ? formData.fullName.charAt(0) : 'A'}
          </div>

          <div>
            <h3 className="font-extrabold text-white text-lg">
              {formData.fullName || 'Student Name'}
            </h3>
            <p className="text-xs font-semibold text-electric-300">
              {formData.major || 'Major Not Set'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {formData.studentId} • {formData.year}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-left text-xs space-y-2 text-slate-300">
            <div>
              <span className="font-bold block text-slate-400">Email:</span>
              <span className="truncate block text-white">{formData.email}</span>
            </div>
            <div>
              <span className="font-bold block text-slate-400">Preferred Language:</span>
              <span className="text-white">{formData.preferredLanguage}</span>
            </div>
            <div>
              <span className="font-bold block text-slate-400">Session Mode:</span>
              <span className="text-white">{formData.preferredFormat}</span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="md:col-span-8 bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-5">
            <h2 className="text-base font-bold text-white pb-3 border-b border-white/10 flex items-center gap-2">
              <User className="w-4 h-4 text-electric-400" />
              <span>Edit Profile Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="full-name" className="block text-xs font-bold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-dark-bg text-xs font-medium text-white focus:outline-none focus:border-electric-400"
                />
              </div>

              <div>
                <label htmlFor="student-email" className="block text-xs font-bold text-slate-300 mb-1">
                  College Email
                </label>
                <input
                  id="student-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-dark-bg text-xs font-medium text-white focus:outline-none focus:border-electric-400"
                />
              </div>

              <div>
                <label htmlFor="student-id" className="block text-xs font-bold text-slate-300 mb-1">
                  Student ID Number
                </label>
                <input
                  id="student-id"
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => handleChange('studentId', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-dark-bg text-xs font-medium text-white focus:outline-none focus:border-electric-400"
                />
              </div>

              <div>
                <label htmlFor="major-field" className="block text-xs font-bold text-slate-300 mb-1">
                  Academic Major
                </label>
                <input
                  id="major-field"
                  type="text"
                  value={formData.major}
                  onChange={(e) => handleChange('major', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-dark-bg text-xs font-medium text-white focus:outline-none focus:border-electric-400"
                />
              </div>

              <div>
                <label htmlFor="year-select" className="block text-xs font-bold text-slate-300 mb-1">
                  Academic Standing
                </label>
                <select
                  id="year-select"
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-dark-bg text-xs font-medium text-white focus:outline-none focus:border-electric-400"
                >
                  <option value="Freshman (Year 1)">Freshman (Year 1)</option>
                  <option value="Sophomore (Year 2)">Sophomore (Year 2)</option>
                  <option value="Junior (Year 3)">Junior (Year 3)</option>
                  <option value="Senior (Year 4)">Senior (Year 4)</option>
                  <option value="Master's Candidate">Master's Candidate</option>
                </select>
              </div>

              <div>
                <label htmlFor="pref-lang" className="block text-xs font-bold text-slate-300 mb-1">
                  Preferred Spoken Language
                </label>
                <select
                  id="pref-lang"
                  value={formData.preferredLanguage}
                  onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-dark-bg text-xs font-medium text-white focus:outline-none focus:border-electric-400"
                >
                  {ALL_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="pref-format" className="block text-xs font-bold text-slate-300 mb-1">
                Preferred Meeting Format
              </label>
              <select
                id="pref-format"
                value={formData.preferredFormat}
                onChange={(e) => handleChange('preferredFormat', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-white/10 bg-dark-bg text-xs font-medium text-white focus:outline-none focus:border-electric-400"
              >
                {ALL_FORMATS.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/40 hover:bg-rose-950 border border-rose-500/30 transition-colors active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Demo Data</span>
              </button>

              <button
                type="submit"
                className="btn-electric inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset All Demo Data?"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <p>
            This action will clear all your locally saved tutor slot reservations, your custom bookings, study groups, and reset the student profile back to the initial state.
          </p>
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsResetModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmReset}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-rose-600 text-white hover:bg-rose-700 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
