import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ToastContainer from './components/common/ToastContainer';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import FindTutorsPage from './pages/FindTutorsPage';
import StudyGroupsPage from './pages/StudyGroupsPage';
import TutorDetailPage from './pages/TutorDetailPage';
import BookingReviewPage from './pages/BookingReviewPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import CompareTutorsPage from './pages/CompareTutorsPage';
import ProfilePage from './pages/ProfilePage';
import EmptyState from './components/common/EmptyState';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1020] text-slate-100 font-sans selection:bg-electric-500/30 selection:text-white">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tutors" element={<FindTutorsPage />} />
          <Route path="/study-groups" element={<StudyGroupsPage />} />
          <Route path="/tutors/:id" element={<TutorDetailPage />} />
          <Route path="/book/review" element={<BookingReviewPage />} />
          <Route path="/book/confirmation/:referenceId" element={<BookingConfirmationPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/compare" element={<CompareTutorsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <EmptyState
                  title="Page Not Found"
                  description="The page you are looking for does not exist or has been moved."
                  actionLabel="Return to Home"
                  actionLink="/"
                />
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}
