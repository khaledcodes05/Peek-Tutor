import React, { useState, useMemo } from 'react';
import { Users, Search, Plus, Clock, MapPin, CheckCircle2, Sparkles, Filter, RotateCcw } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { ALL_SUBJECTS } from '../data/tutorsData';
import CreateGroupModal from '../components/common/CreateGroupModal';
import EmptyState from '../components/common/EmptyState';

export default function StudyGroupsPage() {
  const { studyGroups, toggleJoinGroup } = useBooking();
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Filter study groups
  const filteredGroups = useMemo(() => {
    return studyGroups.filter((g) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = g.title.toLowerCase().includes(q);
        const matchesDesc = g.description.toLowerCase().includes(q);
        const matchesLead = g.leadTutor.toLowerCase().includes(q);
        const matchesTags = g.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesLead && !matchesTags) return false;
      }

      if (selectedSubject !== 'ALL' && g.subject !== selectedSubject) {
        return false;
      }

      return true;
    });
  }, [studyGroups, search, selectedSubject]);

  const handleReset = () => {
    setSearch('');
    setSelectedSubject('ALL');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violetAccent-400 block mb-1">
            Collaborative Learning Pods
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Collegiate Study Groups
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Join weekly student cohorts tackling tough problem sets, coding labs, and exam cram sessions together.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className="btn-electric inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-lg shadow-electric-500/25 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Study Group</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111A2E] rounded-3xl border border-white/10 p-5 mb-8 shadow-dark-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          <div className="md:col-span-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4 text-electric-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search study groups by topic, keyword (e.g. LeetCode, SQL), or mentor name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 bg-dark-bg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full py-2.5 px-3 rounded-2xl border border-white/10 bg-dark-bg text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-electric-400 cursor-pointer"
            >
              <option value="ALL">All Course Subjects ({ALL_SUBJECTS.length})</option>
              {ALL_SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick subject chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-white/5">
          <button
            type="button"
            onClick={() => setSelectedSubject('ALL')}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedSubject === 'ALL'
                ? 'bg-electric-500 text-white shadow-glow-blue'
                : 'bg-dark-bg text-slate-400 hover:text-white'
            }`}
          >
            All ({studyGroups.length})
          </button>
          {ALL_SUBJECTS.slice(0, 5).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSubject === s
                  ? 'bg-electric-500 text-white shadow-glow-blue'
                  : 'bg-dark-bg text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Study Groups */}
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((g) => (
            <div
              key={g.id}
              className="bg-[#111A2E] rounded-3xl border border-white/10 p-6 flex flex-col justify-between interactive-card group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violetAccent-500/20 text-violetAccent-300 border border-violetAccent-500/30">
                    {g.subject}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {g.membersCount}/{g.maxMembers} Students
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-white group-hover:text-electric-300 transition-colors line-clamp-1 mb-2">
                  {g.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {g.description}
                </p>

                <div className="p-3.5 rounded-2xl bg-dark-bg/70 border border-white/5 space-y-2 text-xs text-slate-300 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-electric-400" />
                    <span>{g.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="truncate">{g.format}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {g.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={g.leadAvatar}
                    alt={g.leadTutor}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <span className="text-xs text-slate-400 truncate">
                    Lead: <strong className="text-white">{g.leadTutor}</strong>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleJoinGroup(g.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    g.isJoined
                      ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30 hover:bg-rose-950'
                      : 'btn-electric bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-md'
                  }`}
                >
                  {g.isJoined ? 'Joined (Leave)' : 'Join Group'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No study groups matched your filter"
          description="Try broadening your search term or switching to 'All Subjects'."
          actionLabel="Clear Filters"
          onActionClick={handleReset}
        />
      )}

      <CreateGroupModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
