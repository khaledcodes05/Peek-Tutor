import React, { useState } from 'react';
import Modal from './Modal';
import { useBooking } from '../../context/BookingContext';
import { User, Mail, GraduationCap, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { login, profile } = useBooking();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('Junior (Year 3)');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Quick demo student accounts
  const DEMO_ACCOUNTS = [
    {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@campus.edu',
      studentId: 'STU-2026-894',
      major: 'Computer Science & Engineering',
      year: 'Junior (Year 3)',
      gpa: '3.88 / 4.0',
      preferredLanguage: 'English',
      preferredFormat: 'Hybrid',
      bio: 'Junior CS student passionate about systems programming and algorithmic problem solving.'
    },
    {
      fullName: 'Sara Jenkins',
      email: 'sara.jenkins@campus.edu',
      studentId: 'STU-2026-312',
      major: 'Applied Mathematics & Pre-Med',
      year: 'Sophomore (Year 2)',
      gpa: '3.94 / 4.0',
      preferredLanguage: 'English',
      preferredFormat: 'Online',
      bio: 'Sophomore preparing for medical school entrance exams, seeking peer tutoring in Discrete Math and Python.'
    }
  ];

  const handleQuickLogin = (acc) => {
    setIsLoading(true);
    setTimeout(() => {
      login(acc, 'student');
      setIsLoading(false);
      onClose();
    }, 350);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (tab === 'register' && !fullName.trim()) errs.fullName = 'Full name is required.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid college email is required.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const userObj = {
        fullName: tab === 'register' ? fullName.trim() : (profile.fullName || 'Student User'),
        email: email.trim(),
        studentId: `STU-2026-${Math.floor(100 + Math.random() * 900)}`,
        major: major || 'Computer Science',
        year: year || 'Junior (Year 3)',
        gpa: '3.85 / 4.0',
        preferredLanguage: 'English',
        preferredFormat: 'Hybrid',
        bio: 'Peer student learner.'
      };
      login(userObj, 'student');
      setIsLoading(false);
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tab === 'login' ? 'Sign In to Peer Tutor' : 'Create Student Account'}
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-dark-bg border border-white/10">
          <button
            type="button"
            onClick={() => { setTab('login'); setErrors({}); }}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'login'
                ? 'bg-electric-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setErrors({}); }}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'register'
                ? 'bg-electric-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Switcher */}
        {tab === 'login' && (
          <div className="space-y-2 p-3.5 rounded-2xl bg-dark-bg border border-white/5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick 1-Click Demo Profiles:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleQuickLogin(acc)}
                  disabled={isLoading}
                  className="p-2.5 rounded-xl bg-[#162038] hover:bg-[#1B2744] border border-white/5 hover:border-electric-500/40 text-left flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-electric-500/20 text-electric-400 font-bold text-xs flex items-center justify-center">
                      {acc.fullName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-electric-300">
                        {acc.fullName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {acc.major} • {acc.year}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-electric-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleCustomSubmit} className="space-y-3.5">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Jordan Hayes"
                className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              College Email (.edu) *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@campus.edu"
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
            />
            {errors.email && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
            )}
          </div>

          {tab === 'register' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Major
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Academic Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-xs font-medium text-white focus:outline-none focus:border-electric-400"
                >
                  <option value="Freshman (Year 1)">Freshman</option>
                  <option value="Sophomore (Year 2)">Sophomore</option>
                  <option value="Junior (Year 3)">Junior</option>
                  <option value="Senior (Year 4)">Senior</option>
                  <option value="Master's Candidate">Master's</option>
                </select>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-electric w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-lg shadow-electric-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{tab === 'login' ? 'Sign In as Student' : 'Create Free Student Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
