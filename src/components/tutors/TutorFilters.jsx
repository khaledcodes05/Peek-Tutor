import React from 'react';
import { Search, Filter, RotateCcw, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ALL_SUBJECTS, ALL_LANGUAGES, ALL_FORMATS } from '../../data/tutorsData';

export default function TutorFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalMatching,
  totalAvailable
}) {
  const hasActiveFilters =
    filters.search.trim() !== '' ||
    filters.subject !== 'ALL' ||
    filters.language !== 'ALL' ||
    filters.format !== 'ALL' ||
    filters.priceTier !== 'ALL';

  // Popular quick subject filters
  const quickSubjects = ['ALL', ...ALL_SUBJECTS.slice(0, 4)];

  return (
    <div className="bg-[#111A2E] rounded-3xl border border-white/10 shadow-dark-card p-5 lg:p-6 mb-8 transition-all">
      {/* Top Search & Sort Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 mb-5">
        {/* Search Input */}
        <div className="md:col-span-7 relative">
          <label htmlFor="tutor-search-input" className="sr-only">
            Search tutors by name, subject, or topic
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-electric-400" />
          </div>
          <input
            id="tutor-search-input"
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search by tutor name, subject (e.g. Java, Python), or topic (e.g. Trees, SQL)..."
            className="w-full pl-10 pr-10 py-3 rounded-2xl border border-white/10 bg-dark-bg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-electric-400 focus:border-electric-400 transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange('search', '')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-5 flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-bold text-slate-400 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="w-full py-3 px-3.5 rounded-2xl border border-white/10 bg-dark-bg text-xs sm:text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-electric-400 cursor-pointer"
          >
            <option value="rating-desc">Highest Rated ⭐</option>
            <option value="price-asc">Price: Low to High 🏷️</option>
            <option value="price-desc">Price: High to Low 💎</option>
            <option value="name-asc">Tutor Name (A-Z) 🔤</option>
            <option value="slots-desc">Most Available Slots ⏱️</option>
          </select>
        </div>
      </div>

      {/* Quick Subject Tabs with smooth active indicator (Section 3.K) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none border-b border-white/5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pr-1">
          Quick Filter:
        </span>
        {quickSubjects.map((sub) => {
          const isSelected = filters.subject === sub;
          return (
            <button
              key={sub}
              type="button"
              onClick={() => onFilterChange('subject', sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-electric-500 text-white shadow-glow-blue'
                  : 'bg-dark-bg/60 text-slate-400 hover:text-white hover:bg-dark-bg border border-white/5'
              }`}
            >
              {sub === 'ALL' ? 'All Subjects' : sub}
            </button>
          );
        })}
      </div>

      {/* Secondary Multi-Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {/* Full Subject Filter */}
        <div>
          <label htmlFor="filter-subject" className="block text-xs font-bold text-slate-400 mb-1">
            All Subjects
          </label>
          <select
            id="filter-subject"
            value={filters.subject}
            onChange={(e) => onFilterChange('subject', e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-white/10 bg-dark-bg text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-electric-400 cursor-pointer"
          >
            <option value="ALL">All Subjects ({ALL_SUBJECTS.length})</option>
            {ALL_SUBJECTS.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Session Format Filter */}
        <div>
          <label htmlFor="filter-format" className="block text-xs font-bold text-slate-400 mb-1">
            Session Format
          </label>
          <select
            id="filter-format"
            value={filters.format}
            onChange={(e) => onFilterChange('format', e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-white/10 bg-dark-bg text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-electric-400 cursor-pointer"
          >
            <option value="ALL">All Formats</option>
            {ALL_FORMATS.map((fmt) => (
              <option key={fmt} value={fmt}>
                {fmt}
              </option>
            ))}
          </select>
        </div>

        {/* Spoken Language Filter */}
        <div>
          <label htmlFor="filter-language" className="block text-xs font-bold text-slate-400 mb-1">
            Spoken Language
          </label>
          <select
            id="filter-language"
            value={filters.language}
            onChange={(e) => onFilterChange('language', e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-white/10 bg-dark-bg text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-electric-400 cursor-pointer"
          >
            <option value="ALL">All Languages</option>
            {ALL_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Pricing / Free Toggle */}
        <div>
          <label htmlFor="filter-price" className="block text-xs font-bold text-slate-400 mb-1">
            Pricing Tier
          </label>
          <select
            id="filter-price"
            value={filters.priceTier}
            onChange={(e) => onFilterChange('priceTier', e.target.value)}
            className="w-full py-2 px-3 rounded-xl border border-white/10 bg-dark-bg text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-electric-400 cursor-pointer"
          >
            <option value="ALL">All Rates</option>
            <option value="FREE">Free Peer Volunteers Only ($0)</option>
            <option value="UNDER_16">Under $16 / hr</option>
            <option value="UNDER_21">Under $21 / hr</option>
          </select>
        </div>
      </div>

      {/* Filter Summary & Reset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-electric-400 animate-pulse"></span>
          <span>
            Showing <strong className="text-white">{totalMatching}</strong> of {totalAvailable} peer tutors
          </span>
          {hasActiveFilters && (
            <span className="text-[11px] font-medium bg-electric-500/20 text-electric-300 px-2 py-0.5 rounded-full ml-1 border border-electric-500/30">
              Filters Active
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-950 border border-rose-500/30 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
