import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  CalendarCheck2,
  Scale,
  User,
  Menu,
  X,
  Sparkles,
  BookOpen,
  LayoutDashboard,
  Users,
  LogIn,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import AuthModal from '../common/AuthModal';
import BecomeTutorModal from '../common/BecomeTutorModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [becomeTutorOpen, setBecomeTutorOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { bookings, compareIds, profile, auth, logout } = useBooking();
  const navigate = useNavigate();

  // Active upcoming bookings count & compare count
  const upcomingCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const compareCount = compareIds.length;

  // Detect scroll for sticky glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: BookOpen },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Find Tutors', path: '/tutors', icon: Search },
    { name: 'Study Groups', path: '/study-groups', icon: Users },
    {
      name: 'Compare',
      path: '/compare',
      icon: Scale,
      badge: compareCount > 0 ? compareCount : null,
      badgeColor: 'bg-electric-500 text-white'
    },
    {
      name: 'My Bookings',
      path: '/bookings',
      icon: CalendarCheck2,
      badge: upcomingCount > 0 ? upcomingCount : null,
      badgeColor: 'bg-emerald-500 text-white'
    },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-nav shadow-2xl shadow-black/40'
            : 'bg-[#0B1020]/90 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-400 rounded-xl p-1"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-electric-600 via-electric-500 to-violetAccent-500 flex items-center justify-center text-white shadow-glow-blue group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-electric-300 transition-colors">
                  Peer<span className="text-electric-400">Tutor</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                  Mentorship Board <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 group ${
                        isActive
                          ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-electric-400 group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                    {link.badge !== null && link.badge !== undefined && (
                      <span
                        className={`ml-0.5 px-1.5 py-0.2 text-[10px] font-extrabold rounded-full ${link.badgeColor}`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Action: Become a Tutor + Auth/Profile */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Secondary CTA: Become a Tutor */}
              <button
                type="button"
                onClick={() => setBecomeTutorOpen(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-dark-card hover:bg-dark-cardHover border border-white/10 hover:border-electric-400/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-electric-400" />
                <span>Become a Tutor</span>
              </button>

              {/* Profile or Sign In */}
              {auth?.isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-dark-card hover:bg-dark-cardHover border border-white/10 hover:border-electric-400/40 transition-all text-left cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-electric-500 to-violetAccent-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {profile.fullName ? profile.fullName.charAt(0) : 'A'}
                    </div>
                    <span className="text-xs font-bold text-white max-w-[100px] truncate">
                      {profile.fullName || 'Student'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-[#111A2E] border border-white/10 shadow-2xl z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                      <div className="p-2.5 border-b border-white/10 mb-1">
                        <p className="font-bold text-white truncate">{profile.fullName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{profile.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-electric-500/20 text-electric-300">
                          {auth.role === 'tutor' ? 'Verified Mentor' : 'Collegiate Student'}
                        </span>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5"
                      >
                        <LayoutDashboard className="w-4 h-4 text-electric-400" />
                        <span>My Dashboard</span>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5"
                      >
                        <User className="w-4 h-4 text-electric-400" />
                        <span>Profile & Settings</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setAuthModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-left"
                      >
                        <Users className="w-4 h-4 text-violetAccent-400" />
                        <span>Switch Demo Account</span>
                      </button>

                      <div className="pt-1 mt-1 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-left font-bold"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="btn-electric px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md shadow-electric-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-dark-card border border-white/10 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-400"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0B1020]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2.5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-electric-500/20 text-electric-300 border border-electric-500/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-electric-400" />
                      <span>{link.name}</span>
                    </div>
                    {link.badge !== null && link.badge !== undefined && (
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}

              <NavLink
                to="/profile"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-electric-500/20 text-electric-300 border border-electric-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <User className="w-4 h-4 text-electric-400" />
                <span>Student Profile ({profile.fullName})</span>
              </NavLink>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  setBecomeTutorOpen(true);
                }}
                className="py-2.5 rounded-xl font-bold text-xs bg-dark-card border border-white/10 text-white flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-electric-400" />
                <span>Become Tutor</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  setAuthModalOpen(true);
                }}
                className="btn-electric py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white flex items-center justify-center gap-1.5 shadow-md"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Switch User</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <BecomeTutorModal isOpen={becomeTutorOpen} onClose={() => setBecomeTutorOpen(false)} />
    </>
  );
}
