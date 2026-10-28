import { INITIAL_TUTORS } from '../data/tutorsData.js';
import { INITIAL_STUDY_GROUPS } from '../data/studyGroupsData.js';
import { getFutureDateString } from './dateUtils.js';

const KEYS = {
  TUTORS: 'ptb_tutors_catalog_v2',
  BOOKINGS: 'ptb_student_bookings_v2',
  PROFILE: 'ptb_demo_student_profile_v2',
  COMPARE: 'ptb_tutor_compare_ids_v2',
  STUDY_GROUPS: 'ptb_study_groups_v2',
  AUTH_USER: 'ptb_active_auth_user_v2'
};

const DEFAULT_PROFILE = {
  fullName: 'Alex Morgan',
  email: 'alex.morgan@campus.edu',
  studentId: 'STU-2026-894',
  major: 'Computer Science & Engineering',
  year: 'Junior (Year 3)',
  gpa: '3.88 / 4.0',
  preferredLanguage: 'English',
  preferredFormat: 'Hybrid',
  bio: 'Junior CS student preparing for upcoming software engineering internships. Passionate about systems design, tree algorithms, and collaborating with senior peer mentors.'
};

const DEFAULT_AUTH = {
  isLoggedIn: true,
  role: 'student', // 'student' | 'tutor'
  user: DEFAULT_PROFILE
};

// Initial realistic demo bookings
const getInitialDemoBookings = () => {
  const dTomorrow = getFutureDateString(1);
  const dPast = '2026-10-15';

  return [
    {
      referenceId: 'PTB-83921',
      tutorId: 'tutor-1',
      tutorName: 'Elena Rostova',
      tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      subject: 'Data Structures and Algorithms',
      topic: 'Binary Search Trees & Traversal',
      date: dTomorrow,
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      durationMinutes: 60,
      format: 'Online',
      location: 'Zoom Meeting Room (link provided upon confirmation)',
      slotId: 'tutor-1-s1',
      hourlyRate: 18,
      totalPrice: 18,
      status: 'CONFIRMED',
      notes: 'Need help visualizing node deletions and balanced AVL rotation cases for CS201 assignment.',
      bookedAt: new Date().toISOString()
    },
    {
      referenceId: 'PTB-49201',
      tutorId: 'tutor-3',
      tutorName: 'Priya Sharma',
      tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      subject: 'Database Management Systems',
      topic: 'SQL Normalization 3NF/BCNF',
      date: dPast,
      startTime: '02:00 PM',
      endTime: '03:00 PM',
      durationMinutes: 60,
      format: 'In-Person',
      location: 'Science Center 3rd Floor Peer Pods',
      slotId: 'tutor-3-demo-past',
      hourlyRate: 15,
      totalPrice: 15,
      status: 'COMPLETED',
      notes: 'Walkthrough of database schemas and functional dependencies.',
      bookedAt: '2026-10-14T08:30:00Z'
    }
  ];
};

export const storage = {
  getTutors: () => {
    try {
      const data = localStorage.getItem(KEYS.TUTORS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read tutors from localStorage:', e);
    }
    const tutors = JSON.parse(JSON.stringify(INITIAL_TUTORS));
    const elena = tutors.find(t => t.id === 'tutor-1');
    if (elena && elena.slots && elena.slots[0]) {
      elena.slots[0].isBooked = true;
    }
    storage.saveTutors(tutors);
    return tutors;
  },

  saveTutors: (tutors) => {
    try {
      localStorage.setItem(KEYS.TUTORS, JSON.stringify(tutors));
    } catch (e) {
      console.error('Failed to save tutors to localStorage:', e);
    }
  },

  getBookings: () => {
    try {
      const data = localStorage.getItem(KEYS.BOOKINGS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read bookings from localStorage:', e);
    }
    const demoBookings = getInitialDemoBookings();
    storage.saveBookings(demoBookings);
    return demoBookings;
  },

  saveBookings: (bookings) => {
    try {
      localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage:', e);
    }
  },

  getProfile: () => {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read profile from localStorage:', e);
    }
    storage.saveProfile(DEFAULT_PROFILE);
    return DEFAULT_PROFILE;
  },

  saveProfile: (profile) => {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
  },

  getStudyGroups: () => {
    try {
      const data = localStorage.getItem(KEYS.STUDY_GROUPS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read study groups from localStorage:', e);
    }
    const groups = JSON.parse(JSON.stringify(INITIAL_STUDY_GROUPS));
    storage.saveStudyGroups(groups);
    return groups;
  },

  saveStudyGroups: (groups) => {
    try {
      localStorage.setItem(KEYS.STUDY_GROUPS, JSON.stringify(groups));
    } catch (e) {
      console.error('Failed to save study groups to localStorage:', e);
    }
  },

  getAuthUser: () => {
    try {
      const data = localStorage.getItem(KEYS.AUTH_USER);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read auth user from localStorage:', e);
    }
    storage.saveAuthUser(DEFAULT_AUTH);
    return DEFAULT_AUTH;
  },

  saveAuthUser: (auth) => {
    try {
      localStorage.setItem(KEYS.AUTH_USER, JSON.stringify(auth));
    } catch (e) {
      console.error('Failed to save auth user to localStorage:', e);
    }
  },

  getCompareList: () => {
    try {
      const data = localStorage.getItem(KEYS.COMPARE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read compare list from localStorage:', e);
    }
    return [];
  },

  saveCompareList: (ids) => {
    try {
      localStorage.setItem(KEYS.COMPARE, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to save compare list to localStorage:', e);
    }
  },

  resetAllData: () => {
    localStorage.removeItem(KEYS.TUTORS);
    localStorage.removeItem(KEYS.BOOKINGS);
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.COMPARE);
    localStorage.removeItem(KEYS.STUDY_GROUPS);
    localStorage.removeItem(KEYS.AUTH_USER);
  }
};
