import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart, Sparkles, BookOpen, Clock, Users, ExternalLink, Code2 } from 'lucide-react';
import { ALL_SUBJECTS } from '../../data/tutorsData';

export default function Footer() {
  return (
    <footer className="bg-[#0B1020] border-t border-white/10 text-slate-400 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-electric-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-electric-600 via-electric-500 to-violetAccent-500 flex items-center justify-center text-white shadow-glow-blue">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Peer<span className="text-electric-400">Tutor</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Empowering college students through high-impact peer mentorship, collaborative study sessions, and verified subject tutors.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-electric-300 bg-electric-500/10 p-3 rounded-2xl border border-electric-500/20">
              <ShieldCheck className="w-4 h-4 text-electric-400 shrink-0" />
              <span>Verified Campus Mentors • Grade Confirmed</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-xs tracking-wider uppercase mb-4">
              Platform Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-electric-400 transition-colors flex items-center gap-2 group">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500 group-hover:text-electric-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-electric-400 transition-colors flex items-center gap-2 group">
                  <Sparkles className="w-3.5 h-3.5 text-slate-500 group-hover:text-electric-400" />
                  <span>Student Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="hover:text-electric-400 transition-colors flex items-center gap-2 group">
                  <Users className="w-3.5 h-3.5 text-slate-500 group-hover:text-electric-400" />
                  <span>Find Tutors</span>
                </Link>
              </li>
              <li>
                <Link to="/study-groups" className="hover:text-electric-400 transition-colors flex items-center gap-2 group">
                  <Users className="w-3.5 h-3.5 text-slate-500 group-hover:text-electric-400" />
                  <span>Study Groups</span>
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-electric-400 transition-colors flex items-center gap-2 group">
                  <Sparkles className="w-3.5 h-3.5 text-slate-500 group-hover:text-electric-400" />
                  <span>Compare Mentors</span>
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:text-electric-400 transition-colors flex items-center gap-2 group">
                  <Clock className="w-3.5 h-3.5 text-slate-500 group-hover:text-electric-400" />
                  <span>My Bookings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Subjects */}
          <div>
            <h4 className="font-bold text-white text-xs tracking-wider uppercase mb-4">
              Supported Disciplines
            </h4>
            <ul className="space-y-1.5 text-xs">
              {ALL_SUBJECTS.slice(0, 6).map((subject) => (
                <li key={subject}>
                  <Link
                    to={`/tutors?subject=${encodeURIComponent(subject)}`}
                    className="hover:text-electric-400 transition-colors block py-0.5 truncate"
                  >
                    {subject}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/tutors"
                  className="text-electric-400 font-bold hover:underline inline-block pt-1.5"
                >
                  View all 8 subjects &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Trust & Demo Scope */}
          <div className="bg-[#111A2E]/80 p-5 rounded-2xl border border-white/10 space-y-3">
            <h4 className="font-bold text-white text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-electric-400" />
              <span>Collegiate Peer Mentorship</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed to connect collegiate classmates for stress-free peer learning, exam preparation, and collaborative coding sessions.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 border-t border-white/5 space-y-1">
              <div>• Grade Verified Tutors (A/A- grade required)</div>
              <div>• Free Volunteer Mentors Available</div>
              <div>• Real Local Storage State Persistence</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Peer Tutor. Built for college peer mentorship and academic collaboration.
          </p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Powered by</span>
            <span className="font-semibold text-slate-300">React 18</span>
            <span>•</span>
            <span className="font-semibold text-slate-300">Tailwind CSS</span>
            <span>•</span>
            <span className="font-semibold text-slate-300">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
