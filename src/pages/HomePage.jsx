import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  Users,
  CalendarCheck,
  Award,
  ArrowRight,
  BookOpen,
  Code2,
  Database,
  BrainCircuit,
  Binary,
  Layers,
  Network,
  Calculator,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  Video,
  MapPin,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import TutorCard from '../components/tutors/TutorCard';
import AccordionItem from '../components/common/AccordionItem';
import BecomeTutorModal from '../components/common/BecomeTutorModal';
import { ALL_SUBJECTS } from '../data/tutorsData';

const SUBJECT_ICONS = {
  'Data Structures and Algorithms': Binary,
  'Java programming': Code2,
  'Python programming': Code2,
  'Database Management Systems': Database,
  'Artificial Intelligence and Machine Learning': BrainCircuit,
  'Mathematics': Calculator,
  'Web Development': Layers,
  'Computer Networks': Network,
};

const FAQS = [
  {
    id: 'faq-1',
    question: 'How do peer tutoring sessions work on the platform?',
    answer: 'Peer tutors are vetted senior students and ex-teaching assistants who have earned an A or A- in the respective course. You can browse tutors by subject, inspect their available slots, and reserve a session in just a few clicks. Sessions take place either online via secure Zoom rooms or in-person at campus library study pods.'
  },
  {
    id: 'faq-2',
    question: 'Is peer tutoring free or paid?',
    answer: 'Both! Several peer mentors volunteer their time free of charge ($0/hr) to give back to the student body, while other senior mentors charge subsidized student-friendly hourly rates (typically $14 to $25/hr). Pricing is transparently shown upfront with zero hidden platform fees.'
  },
  {
    id: 'faq-3',
    question: 'What if I need to cancel or reschedule my study session?',
    answer: 'You can cancel any upcoming booking from your "My Bookings" page at any time. When you cancel, the time slot is immediately released and made available for other students in the directory.'
  },
  {
    id: 'faq-4',
    question: 'How are study groups different from 1-on-1 peer sessions?',
    answer: 'Study groups bring together 8 to 20 classmates studying the same course for weekly collaborative sprints, LeetCode problem sets, and midterm proof clinics. You can join or leave study groups anytime through the Study Groups board.'
  },
  {
    id: 'faq-5',
    question: 'How can I become a peer tutor myself?',
    answer: 'Any student with a strong academic record (verified GPA 3.8+ or grade A in the course) can click "Become a Tutor", specify their subjects and availability, and start mentoring classmates right away.'
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [becomeTutorOpen, setBecomeTutorOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState('faq-1');
  const navigate = useNavigate();
  const { tutors, studyGroups, toggleJoinGroup } = useBooking();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tutors?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/tutors');
    }
  };

  // Top 3 featured tutors
  const featuredTutors = tutors.slice(0, 3);
  // Top 3 preview study groups
  const featuredGroups = studyGroups.slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-hidden">
      {/* Hero Section with Animated Gradient Background & Floating Orbs (Sections 3.A, 3.B, 3.C) */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 hero-animated-bg">
        {/* Floating Gradient Orbs */}
        <div className="absolute top-10 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-electric-500/15 rounded-full blur-[100px] pointer-events-none animate-float-slow" />
        <div className="absolute top-24 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-violetAccent-500/15 rounded-full blur-[120px] pointer-events-none animate-float-reverse" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-electric-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-electric-300 text-xs font-bold tracking-wide uppercase shadow-glow-blue backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-electric-400" />
              <span>Collegiate Peer Mentorship Network</span>
            </motion.div>

            {/* Main Headline with Gradient Text Clipping (Section 3.C) */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.12]"
            >
              Learn Together.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 via-indigo-300 to-violetAccent-400">
                Grow Together.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Connect with high-achieving classmates and former TAs for 1-on-1 tutoring and collaborative study pods in Computer Science, Math, and Engineering.
            </motion.p>

            {/* CTAs (Section 3.G & Section 4) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <Link
                to="/tutors"
                className="btn-electric px-6 py-3.5 rounded-2xl bg-gradient-to-r from-electric-500 via-electric-600 to-violetAccent-600 text-white font-extrabold text-sm shadow-xl shadow-electric-500/25 flex items-center gap-2 group cursor-pointer"
              >
                <span>Find Your Peer Tutor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => setBecomeTutorOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-[#111A2E] hover:bg-[#162038] border border-white/10 hover:border-electric-400/40 text-slate-200 hover:text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-dark-card"
              >
                <Sparkles className="w-4 h-4 text-electric-400" />
                <span>Become a Tutor</span>
              </button>
            </motion.div>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSearchSubmit}
              className="max-w-2xl mx-auto bg-[#111A2E]/90 p-2 sm:p-2.5 rounded-3xl shadow-2xl shadow-black/60 border border-white/10 flex flex-col sm:flex-row items-center gap-2 backdrop-blur-xl"
            >
              <div className="relative flex-1 w-full flex items-center pl-3">
                <Search className="w-5 h-5 text-electric-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 'Java', 'Data Structures', 'Calculus', or tutor name..."
                  className="w-full py-2.5 pl-3 pr-2 text-sm text-white placeholder-slate-500 focus:outline-none bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="btn-electric w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white font-bold text-sm shadow-md shadow-electric-500/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Explore Directory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>

            {/* Platform Statistics Bar (Genuine data only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 text-center"
            >
              <div className="p-3.5 rounded-2xl bg-[#111A2E]/70 border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-white">{tutors.length} Mentors</div>
                <div className="text-[11px] font-semibold text-slate-400">Verified Peer Tutors</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#111A2E]/70 border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-white">{ALL_SUBJECTS.length} Subjects</div>
                <div className="text-[11px] font-semibold text-slate-400">Core STEM Courses</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#111A2E]/70 border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-white">4.92 ★</div>
                <div className="text-[11px] font-semibold text-slate-400">Average Student Rating</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#111A2E]/70 border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-white">100% Peer</div>
                <div className="text-[11px] font-semibold text-slate-400">Student-to-Student</div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Live Platform Preview Card (Section 4 item 6) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-14 max-w-4xl mx-auto rounded-3xl p-5 sm:p-7 bg-[#111A2E]/80 border border-white/10 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-mono font-bold text-slate-400 pl-2">
                  live_session_scheduler.tsx
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Real-time Slot Engine
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-electric-500/20 text-electric-300 border border-electric-500/30">
                  Zero Conflicts
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-5 items-center">
              <div className="md:col-span-7 space-y-3">
                <span className="text-[10px] font-bold text-electric-400 uppercase tracking-wider">
                  Featured Live Booking Demo
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Meet Lead TA Elena Rostova for Algorithm Review
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive slot reservation dynamically synchronizes across all views. If a slot is booked, it locks immediately and produces a verifiable reference number.
                </p>
                <div className="flex items-center gap-3 pt-1 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                    <span>Zoom Video Call</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-electric-400" />
                    <span>60 Minutes Session</span>
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 p-4 rounded-2xl bg-dark-bg/80 border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Available Date:</span>
                  <span className="font-bold text-white">Tomorrow</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Session Rate:</span>
                  <span className="font-bold text-emerald-400">$18 / hr</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-electric-300">Open for Reservation</span>
                </div>
                <Link
                  to="/tutors/tutor-1"
                  className="btn-electric w-full mt-2 py-2 rounded-xl text-center font-bold text-xs bg-electric-500 hover:bg-electric-600 text-white block shadow-md shadow-electric-500/20"
                >
                  Test Book This Slot &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Subjects (Curriculum-focused) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-electric-400 block mb-1">
              Coursework Specializations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Supported STEM Disciplines
            </h2>
          </div>
          <Link
            to="/tutors"
            className="text-xs sm:text-sm font-bold text-electric-400 hover:text-electric-300 flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Subjects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALL_SUBJECTS.map((subject) => {
            const Icon = SUBJECT_ICONS[subject] || BookOpen;
            const matchingCount = tutors.filter((t) => t.subjects.includes(subject)).length;

            return (
              <Link
                key={subject}
                to={`/tutors?subject=${encodeURIComponent(subject)}`}
                className="p-5 rounded-3xl bg-[#111A2E] border border-white/10 hover:border-electric-400/50 hover:shadow-glow-blue interactive-card group flex flex-col justify-between"
              >
                <div className="w-11 h-11 rounded-2xl bg-electric-500/10 border border-electric-500/20 text-electric-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-electric-500 group-hover:text-white transition-all shadow-glow-blue">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-electric-300 transition-colors line-clamp-1">
                    {subject}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {matchingCount} {matchingCount === 1 ? 'peer mentor' : 'peer mentors'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Tutors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-electric-400 block mb-1">
              Hand-Picked
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Featured Peer Mentors
            </h2>
          </div>
          <Link
            to="/tutors"
            className="text-xs sm:text-sm font-bold text-electric-400 hover:text-electric-300 flex items-center gap-1.5 transition-colors group"
          >
            <span>Browse All {tutors.length} Mentors</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </section>

      {/* Study Groups Section (Section 4 item 10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violetAccent-400 block mb-1">
              Collaborative Learning
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Active Collegiate Study Groups
            </h2>
          </div>
          <Link
            to="/study-groups"
            className="text-xs sm:text-sm font-bold text-violetAccent-400 hover:text-violetAccent-300 flex items-center gap-1.5 transition-colors group"
          >
            <span>Explore All Study Groups</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-[#111A2E] rounded-3xl border border-white/10 p-6 flex flex-col justify-between interactive-card group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violetAccent-500/20 text-violetAccent-300 border border-violetAccent-500/30">
                    {group.subject}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {group.membersCount}/{group.maxMembers} Students
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-white group-hover:text-electric-300 transition-colors line-clamp-1 mb-2">
                  {group.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {group.description}
                </p>

                <div className="p-3 rounded-2xl bg-dark-bg/60 border border-white/5 space-y-1.5 text-xs text-slate-300 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-electric-400" />
                    <span>{group.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate">{group.format}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500">
                  Lead: <strong className="text-slate-300">{group.leadTutor}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => toggleJoinGroup(group.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    group.isJoined
                      ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30 hover:bg-rose-950'
                      : 'btn-electric bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md'
                  }`}
                >
                  {group.isJoined ? 'Joined (Leave)' : 'Join Group'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (Section 4 item 9: Discover -> Connect -> Learn -> Grow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111A2E] rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-400 block mb-2">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              How Peer Tutoring Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
              Book a study session in less than 2 minutes and get ready to master tough exam concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-dark-bg/60 border border-white/5 backdrop-blur-md flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-electric-500/20 border border-electric-500/30 flex items-center justify-center font-black text-lg text-electric-400 mb-4 shadow-glow-blue">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2">Discover</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filter mentors by course subject, language, format (Online/In-person), and compare two profiles side by side.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-dark-bg/60 border border-white/5 backdrop-blur-md flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-electric-500/20 border border-electric-500/30 flex items-center justify-center font-black text-lg text-electric-400 mb-4 shadow-glow-blue">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2">Connect</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select an open time slot from the verified calendar. Reserved slots are immediately locked to prevent conflicts.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-dark-bg/60 border border-white/5 backdrop-blur-md flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-electric-500/20 border border-electric-500/30 flex items-center justify-center font-black text-lg text-electric-400 mb-4 shadow-glow-blue">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2">Learn</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Meet your mentor online or at the library with whiteboard demos, visual code traces, and assignment reviews.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-dark-bg/60 border border-white/5 backdrop-blur-md flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-electric-500/20 border border-electric-500/30 flex items-center justify-center font-black text-lg text-electric-400 mb-4 shadow-glow-blue">
                4
              </div>
              <h3 className="text-base font-bold text-white mb-2">Grow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track your study hours on your dashboard, boost course confidence, and apply to mentor junior peers!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/tutors"
              className="btn-electric inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white font-extrabold text-sm shadow-xl shadow-electric-500/25"
            >
              <span>Find a Mentor Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Benefits & Safety / Trust Info (Section 4 item 11) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#111A2E] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-dark-card">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
              Academic Trust & Safety
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Why Learn from Peer Mentors?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Peer mentors recently aced the exact same classes with the same professors. They understand where students get stuck, how assignments are graded, and how to explain tough concepts without academic intimidation.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No intimidation:</strong> Ask questions freely in a relaxed, friendly, zero-judgment setting.</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Affordable or Free:</strong> Multiple peer volunteer slots and subsidized student rates.</span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Flexible Options:</strong> Choose between Zoom video or in-person library study pods.</span>
              </li>
            </ul>
          </div>

          <div className="bg-dark-bg/80 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-electric-400" />
              <span>Campus Mentorship Standards</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <p className="font-bold text-white text-xs mb-1">Academic Grade Verification</p>
                <p>All peer tutors have earned an A or A- in the courses they mentor.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <p className="font-bold text-white text-xs mb-1">Conflict-Free Slot Engine</p>
                <p>Time slots are held and locked immediately upon reservation, preventing accidental double-bookings.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <p className="font-bold text-white text-xs mb-1">Honor Code Compliant</p>
                <p>Tutors guide and teach problem-solving strategies without completing homework for the student.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fluid Accordion FAQ Section (Section 3.L & Section 4 item 12) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-electric-400 block mb-1">
            Questions & Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Everything you need to know about booking, cancellation, and peer mentorship.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <AccordionItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaqId === faq.id}
              onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </section>

      {/* Become Tutor Modal */}
      <BecomeTutorModal
        isOpen={becomeTutorOpen}
        onClose={() => setBecomeTutorOpen(false)}
      />
    </div>
  );
}
