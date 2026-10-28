import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Users, RotateCcw } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import TutorCard from '../components/tutors/TutorCard';
import TutorFilters from '../components/tutors/TutorFilters';
import EmptyState from '../components/common/EmptyState';
import TutorCompareDrawer from '../components/tutors/TutorCompareDrawer';

export default function FindTutorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { tutors } = useBooking();

  // Filters state
  const [filters, setFilters] = useState(() => ({
    search: searchParams.get('search') || '',
    subject: searchParams.get('subject') || 'ALL',
    format: searchParams.get('format') || 'ALL',
    language: searchParams.get('language') || 'ALL',
    priceTier: 'ALL',
    sortBy: 'rating-desc'
  }));

  // Update filters if URL params change
  useEffect(() => {
    const qSearch = searchParams.get('search');
    const qSubject = searchParams.get('subject');
    if (qSearch !== null || qSubject !== null) {
      setFilters((prev) => ({
        ...prev,
        search: qSearch || '',
        subject: qSubject || prev.subject
      }));
    }
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'search') {
        if (value) {
          searchParams.set('search', value);
        } else {
          searchParams.delete('search');
        }
        setSearchParams(searchParams, { replace: true });
      } else if (key === 'subject') {
        if (value !== 'ALL') {
          searchParams.set('subject', value);
        } else {
          searchParams.delete('subject');
        }
        setSearchParams(searchParams, { replace: true });
      }
      return updated;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      subject: 'ALL',
      format: 'ALL',
      language: 'ALL',
      priceTier: 'ALL',
      sortBy: 'rating-desc'
    });
    setSearchParams({}, { replace: true });
  };

  // Filter & Sort Logic
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // Search term
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesName = tutor.name.toLowerCase().includes(query);
        const matchesSubject = tutor.subjects.some((s) => s.toLowerCase().includes(query));
        const matchesTopic = tutor.topics.some((top) => top.toLowerCase().includes(query));
        const matchesBio = tutor.bio.toLowerCase().includes(query);

        if (!matchesName && !matchesSubject && !matchesTopic && !matchesBio) {
          return false;
        }
      }

      // Subject filter
      if (filters.subject !== 'ALL') {
        if (!tutor.subjects.includes(filters.subject)) {
          return false;
        }
      }

      // Format filter
      if (filters.format !== 'ALL') {
        if (filters.format === 'Online' && tutor.sessionFormat === 'In-Person') return false;
        if (filters.format === 'In-Person' && tutor.sessionFormat === 'Online') return false;
      }

      // Language filter
      if (filters.language !== 'ALL') {
        if (!tutor.languages.includes(filters.language)) {
          return false;
        }
      }

      // Price tier
      if (filters.priceTier === 'FREE' && tutor.hourlyRate > 0) {
        return false;
      }
      if (filters.priceTier === 'UNDER_16' && tutor.hourlyRate >= 16) {
        return false;
      }
      if (filters.priceTier === 'UNDER_21' && tutor.hourlyRate >= 21) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating-desc') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'price-asc') {
        return a.hourlyRate - b.hourlyRate;
      }
      if (filters.sortBy === 'price-desc') {
        return b.hourlyRate - a.hourlyRate;
      }
      if (filters.sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (filters.sortBy === 'slots-desc') {
        const slotsA = a.slots.filter((s) => !s.isBooked).length;
        const slotsB = b.slots.filter((s) => !s.isBooked).length;
        return slotsB - slotsA;
      }
      return 0;
    });
  }, [tutors, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-electric-400 block mb-1">
          Explore Mentors Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Find a Peer Tutor
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Browse verified collegiate tutors across computer science, engineering, and mathematics courses.
        </p>
      </div>

      {/* Filter Component */}
      <TutorFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalMatching={filteredTutors.length}
        totalAvailable={tutors.length}
      />

      {/* Tutors Grid or Empty State */}
      {filteredTutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No peer tutors matched your filters"
          description="We couldn't find any tutors matching your current search or filter combination. Try clearing your search keyword or relaxing format and price filters."
          actionLabel="Clear All Filters"
          onActionClick={handleResetFilters}
        />
      )}

      {/* Floating compare drawer */}
      <TutorCompareDrawer />
    </div>
  );
}
