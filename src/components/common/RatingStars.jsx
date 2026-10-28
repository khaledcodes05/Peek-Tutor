import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating, size = 'sm', showNumber = true, reviewsCount }) {
  const iconSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= fullStars;
          return (
            <Star
              key={starIndex}
              className={`${iconSize} ${
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : starIndex === fullStars + 1 && hasHalf
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-slate-700 fill-slate-800'
              }`}
            />
          );
        })}
      </div>

      {showNumber && (
        <span className="text-xs font-bold text-slate-200 tracking-tight">
          {rating.toFixed(2)}
        </span>
      )}

      {reviewsCount !== undefined && (
        <span className="text-xs text-slate-400 font-normal">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
}
