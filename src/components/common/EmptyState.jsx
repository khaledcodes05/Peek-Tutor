import React from 'react';
import { SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon: Icon = SearchX,
  title = 'No results found',
  description = 'Try adjusting your search criteria or removing active filters to discover tutors.',
  actionLabel,
  actionLink,
  onActionClick
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-[#111A2E]/70 border border-white/10 rounded-3xl shadow-dark-card my-6 max-w-xl mx-auto backdrop-blur-md">
      <div className="w-16 h-16 rounded-2xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-electric-400 mb-4 shadow-glow-blue">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && (
        actionLink ? (
          <Link
            to={actionLink}
            className="btn-electric inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-lg shadow-electric-500/25 cursor-pointer"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onActionClick}
            className="btn-electric inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-electric-500 to-violetAccent-600 text-white shadow-lg shadow-electric-500/25 cursor-pointer"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
