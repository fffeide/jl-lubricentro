import React from 'react';

export default function FiltroToggle({ label, value, onChange }) {
  const isSi = value === 'Sí';
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
      <span className="text-xs font-semibold text-slate-200">{label}</span>
      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-white/10">
        <button
          type="button"
          onClick={() => onChange('Sí')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
            isSi
              ? 'bg-green-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sí
        </button>
        <button
          type="button"
          onClick={() => onChange('No')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
            !isSi
              ? 'bg-slate-700 text-slate-200 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}
