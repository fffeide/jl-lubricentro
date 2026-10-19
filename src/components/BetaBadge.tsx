import React from 'react';

export const BetaBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm shadow-red-500/20 ${className}`}
    >
      BETA
    </span>
  );
};
