import React, { useState } from 'react';
import Modal from './Modal';
import { useBooking } from '../../context/BookingContext';
import { ALL_SUBJECTS } from '../../data/tutorsData';
import { Users, BookOpen, Clock, MapPin, Sparkles } from 'lucide-react';

export default function CreateGroupModal({ isOpen, onClose }) {
  const { createStudyGroup } = useBooking();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(ALL_SUBJECTS[0]);
  const [schedule, setSchedule] = useState('Tuesdays • 5:00 PM EST');
  const [format, setFormat] = useState('Online Zoom / Discord');
  const [maxMembers, setMaxMembers] = useState(15);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!title.trim()) errs.title = 'Group title is required.';
    if (!description.trim()) errs.description = 'Please describe the focus of this study group.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createStudyGroup({
        title: title.trim(),
        subject,
        schedule: schedule.trim(),
        format: format.trim(),
        maxMembers: Number(maxMembers),
        description: description.trim(),
        tags: [subject, 'Peer Study Group', 'Midterm Prep']
      });
      setIsSubmitting(false);
      onClose();
    }, 350);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create a New Collegiate Study Group"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-300 mb-1">
            Study Group Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. CS201 Binary Trees & Graph Traversal Pod"
            className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-electric-400"
          />
          {errors.title && <p className="text-rose-400 mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Course Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
            >
              {ALL_SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Max Member Capacity
            </label>
            <input
              type="number"
              min="3"
              max="30"
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Meeting Schedule
            </label>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="e.g. Mondays & Wednesdays • 6 PM"
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Format / Location
            </label>
            <input
              type="text"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              placeholder="e.g. Online Discord / Library Rm 204"
              className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">
            Group Purpose & Covered Goals *
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What will this group work on? (e.g. Tracing recursive stack trees, weekly LeetCode mediums, exam review sessions)..."
            className="w-full p-2.5 rounded-xl bg-dark-bg border border-white/10 text-white focus:outline-none focus:border-electric-400"
          />
          {errors.description && <p className="text-rose-400 mt-1">{errors.description}</p>}
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-electric px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-lg shadow-electric-500/25 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Launching Group...' : 'Create Study Group'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
