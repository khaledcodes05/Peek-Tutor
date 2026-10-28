import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage.js';
import { isSlotInPast, getFutureDateString } from '../utils/dateUtils.js';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [tutors, setTutors] = useState(() => storage.getTutors());
  const [bookings, setBookings] = useState(() => storage.getBookings());
  const [profile, setProfile] = useState(() => storage.getProfile());
  const [compareIds, setCompareIds] = useState(() => storage.getCompareList());
  const [studyGroups, setStudyGroups] = useState(() => storage.getStudyGroups());
  const [auth, setAuth] = useState(() => storage.getAuthUser());
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync state changes with localStorage
  useEffect(() => {
    storage.saveTutors(tutors);
  }, [tutors]);

  useEffect(() => {
    storage.saveBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    storage.saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    storage.saveCompareList(compareIds);
  }, [compareIds]);

  useEffect(() => {
    storage.saveStudyGroups(studyGroups);
  }, [studyGroups]);

  useEffect(() => {
    storage.saveAuthUser(auth);
  }, [auth]);

  // Book a tutor slot
  const bookSession = useCallback(({
    tutorId,
    slotId,
    subject,
    topic,
    format,
    durationMinutes = 60,
    studentNotes = '',
    studentName,
    studentEmail
  }) => {
    const tutor = tutors.find((t) => t.id === tutorId);
    if (!tutor) {
      return { success: false, error: 'Tutor not found.' };
    }

    const slot = tutor.slots.find((s) => s.id === slotId);
    if (!slot) {
      return { success: false, error: 'Selected time slot does not exist.' };
    }

    if (slot.isBooked) {
      return {
        success: false,
        error: 'This time slot was just booked by another student. Please pick another available time.'
      };
    }

    if (isSlotInPast(slot.date, slot.startTime)) {
      return {
        success: false,
        error: 'This time slot is in the past and cannot be booked.'
      };
    }

    // Calculate total price based on duration and tutor rate
    const calculatedPrice = tutor.hourlyRate === 0
      ? 0
      : Math.round((tutor.hourlyRate * (durationMinutes / 60)) * 100) / 100;

    // Generate unique reference ID
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `PTB-${randomDigits}`;

    const locationDetails = format === 'Online'
      ? 'Zoom Meeting Room (link generated & sent to student)'
      : tutor.campusLocation || 'Campus Science Library, Group Study Pod 2B';

    const newBooking = {
      referenceId,
      tutorId: tutor.id,
      tutorName: tutor.name,
      tutorAvatar: tutor.avatar,
      tutorTitle: tutor.title,
      subject: subject || tutor.subjects[0],
      topic: topic || tutor.topics[0] || 'General Tutoring',
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      durationMinutes,
      format: format || slot.format || tutor.sessionFormat,
      location: locationDetails,
      slotId: slot.id,
      hourlyRate: tutor.hourlyRate,
      totalPrice: calculatedPrice,
      status: 'CONFIRMED',
      notes: studentNotes.trim(),
      studentName: studentName || profile.fullName,
      studentEmail: studentEmail || profile.email,
      bookedAt: new Date().toISOString()
    };

    // Update tutor slot state
    const updatedTutors = tutors.map((t) => {
      if (t.id !== tutorId) return t;
      return {
        ...t,
        slots: t.slots.map((s) => (s.id === slotId ? { ...s, isBooked: true } : s))
      };
    });

    setTutors(updatedTutors);
    setBookings((prev) => [newBooking, ...prev]);

    addToast(`Session successfully reserved! Ref: ${referenceId}`, 'success');

    return {
      success: true,
      booking: newBooking,
      referenceId
    };
  }, [tutors, profile, addToast]);

  // Cancel an existing booking and release the slot
  const cancelBooking = useCallback((referenceId, reason = 'Student requested cancellation') => {
    const booking = bookings.find((b) => b.referenceId === referenceId);
    if (!booking) {
      return { success: false, error: 'Booking not found.' };
    }

    if (booking.status === 'CANCELLED') {
      return { success: false, error: 'Booking is already cancelled.' };
    }

    // Update booking status
    const updatedBookings = bookings.map((b) => {
      if (b.referenceId !== referenceId) return b;
      return {
        ...b,
        status: 'CANCELLED',
        cancelledAt: new Date().toISOString(),
        cancelReason: reason
      };
    });

    // Release tutor slot
    const updatedTutors = tutors.map((t) => {
      if (t.id !== booking.tutorId) return t;
      return {
        ...t,
        slots: t.slots.map((s) => {
          if (s.id === booking.slotId) {
            return { ...s, isBooked: false };
          }
          return s;
        })
      };
    });

    setBookings(updatedBookings);
    setTutors(updatedTutors);

    addToast(`Booking ${referenceId} has been cancelled. Time slot released for other students.`, 'info');

    return { success: true };
  }, [bookings, tutors, addToast]);

  // Toggle tutor in comparison list (max 2)
  const toggleCompare = useCallback((tutorId) => {
    if (compareIds.includes(tutorId)) {
      setCompareIds((prev) => prev.filter((id) => id !== tutorId));
      addToast('Tutor removed from comparison.', 'info');
      return true;
    }

    if (compareIds.length >= 2) {
      addToast('Comparison limit reached (max 2 tutors). Remove one first.', 'error');
      return false;
    }

    setCompareIds((prev) => [...prev, tutorId]);
    addToast('Tutor added to side-by-side comparison.', 'success');
    return true;
  }, [compareIds, addToast]);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
    addToast('Comparison board cleared.', 'info');
  }, [addToast]);

  // Study Groups: Join or Leave
  const toggleJoinGroup = useCallback((groupId) => {
    setStudyGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        const nowJoined = !g.isJoined;
        const newCount = nowJoined ? g.membersCount + 1 : Math.max(1, g.membersCount - 1);
        addToast(
          nowJoined ? `Joined "${g.title}"! Study schedule added to your dashboard.` : `Left "${g.title}".`,
          nowJoined ? 'success' : 'info'
        );
        return {
          ...g,
          isJoined: nowJoined,
          membersCount: newCount
        };
      })
    );
  }, [addToast]);

  // Create new study group
  const createStudyGroup = useCallback((groupData) => {
    const newGroup = {
      id: `sg-${Date.now()}`,
      title: groupData.title,
      subject: groupData.subject,
      description: groupData.description,
      leadTutor: profile.fullName || 'Peer Student',
      leadAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      membersCount: 1,
      maxMembers: Number(groupData.maxMembers) || 15,
      schedule: groupData.schedule || 'Weekly • Schedule TBA',
      format: groupData.format || 'Online Zoom / Discord',
      tags: groupData.tags || ['Study Group', groupData.subject],
      isJoined: true
    };

    setStudyGroups((prev) => [newGroup, ...prev]);
    addToast(`Study group "${newGroup.title}" created successfully!`, 'success');
    return { success: true, group: newGroup };
  }, [profile, addToast]);

  // "Become a Tutor" application
  const becomeTutor = useCallback((tutorData) => {
    const tutorId = `tutor-${Date.now()}`;
    const d1 = getFutureDateString(1);
    const d2 = getFutureDateString(2);
    const d3 = getFutureDateString(3);

    const generatedSlots = [
      { id: `${tutorId}-s1`, date: d1, startTime: '11:00 AM', endTime: '12:00 PM', format: tutorData.sessionFormat || 'Online', isBooked: false },
      { id: `${tutorId}-s2`, date: d1, startTime: '03:00 PM', endTime: '04:00 PM', format: tutorData.sessionFormat || 'Online', isBooked: false },
      { id: `${tutorId}-s3`, date: d2, startTime: '01:00 PM', endTime: '02:00 PM', format: tutorData.sessionFormat || 'Online', isBooked: false },
      { id: `${tutorId}-s4`, date: d3, startTime: '04:30 PM', endTime: '05:30 PM', format: tutorData.sessionFormat || 'Online', isBooked: false }
    ];

    const newTutorProfile = {
      id: tutorId,
      name: tutorData.name || profile.fullName,
      title: `${tutorData.major} • Verified Peer Mentor`,
      major: tutorData.major || profile.major,
      year: tutorData.year || profile.year,
      gpa: tutorData.gpa || '3.90 / 4.0',
      avatar: tutorData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      bio: tutorData.bio || 'Excited to mentor peers and share course intuition, problem sets, and study tips!',
      subjects: Array.isArray(tutorData.subjects) && tutorData.subjects.length > 0 ? tutorData.subjects : ['Data Structures and Algorithms'],
      topics: tutorData.topics || ['Concept Explanations', 'Problem Sets', 'Midterm Review'],
      expertise: ['Friendly Guidance', 'Clean Explanations', 'Peer Encouragement'],
      languages: tutorData.languages || ['English'],
      rating: 5.0,
      reviewsCount: 1,
      hourlyRate: Number(tutorData.hourlyRate) || 0,
      sessionFormat: tutorData.sessionFormat || 'Hybrid',
      campusLocation: tutorData.campusLocation || 'Campus Library / Zoom',
      badges: ['Newly Certified Mentor', 'Dean’s Honor Roll'],
      slots: generatedSlots,
      stats: { sessionsCompleted: 0, responseTime: '< 15 min', studentPassRate: '100%' }
    };

    setTutors((prev) => [newTutorProfile, ...prev]);
    setAuth((prev) => ({ ...prev, role: 'tutor' }));
    addToast(`Congratulations ${newTutorProfile.name}! You are now registered as an active peer tutor.`, 'success', 5000);
    return { success: true, tutor: newTutorProfile };
  }, [profile, addToast]);

  // Auth: Login / Switch demo identity
  const login = useCallback((userData, role = 'student') => {
    const updatedAuth = {
      isLoggedIn: true,
      role,
      user: userData
    };
    setAuth(updatedAuth);
    setProfile(userData);
    addToast(`Welcome back, ${userData.fullName}!`, 'success');
  }, [addToast]);

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
      role: 'guest',
      user: null
    });
    addToast('Signed out successfully.', 'info');
  }, [addToast]);

  const updateProfile = useCallback((newProfileData) => {
    setProfile(newProfileData);
    setAuth((prev) => ({
      ...prev,
      user: { ...prev.user, ...newProfileData }
    }));
    addToast('Profile preferences saved successfully!', 'success');
  }, [addToast]);

  const resetAllDemoData = useCallback(() => {
    storage.resetAllData();
    const freshTutors = storage.getTutors();
    const freshBookings = storage.getBookings();
    const freshProfile = storage.getProfile();
    const freshGroups = storage.getStudyGroups();
    const freshAuth = storage.getAuthUser();

    setTutors(freshTutors);
    setBookings(freshBookings);
    setProfile(freshProfile);
    setStudyGroups(freshGroups);
    setAuth(freshAuth);
    setCompareIds([]);
    addToast('All demo data and slot availability reset to pristine defaults.', 'info');
  }, [addToast]);

  const getTutorById = useCallback((id) => {
    return tutors.find((t) => t.id === id);
  }, [tutors]);

  const getBookingByReference = useCallback((referenceId) => {
    return bookings.find((b) => b.referenceId === referenceId);
  }, [bookings]);

  return (
    <BookingContext.Provider
      value={{
        tutors,
        bookings,
        profile,
        compareIds,
        studyGroups,
        auth,
        toasts,
        addToast,
        removeToast,
        bookSession,
        cancelBooking,
        toggleCompare,
        clearCompare,
        toggleJoinGroup,
        createStudyGroup,
        becomeTutor,
        login,
        logout,
        updateProfile,
        resetAllDemoData,
        getTutorById,
        getBookingByReference
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
