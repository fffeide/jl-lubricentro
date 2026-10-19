import React from 'react';
import { Car, MessageCircle } from 'lucide-react';

interface FloatingButtonsProps {
  onNavigate: (path: string) => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onNavigate }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      
      {/* Botón flotante Mi Lubricentro */}
      <div className="relative group">
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Mi Lubricentro
        </span>
        <button
          onClick={() => onNavigate('/MiLubricentro')}
          className="w-13 h-13 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-600/40 hover:shadow-red-600/60 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer border border-red-500/40"
          aria-label="Abrir Mi Lubricentro"
        >
          <Car className="w-6 h-6" />
        </button>
      </div>

      {/* Botón flotante WhatsApp */}
      <div className="relative group">
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp
        </span>
        <a
          href="https://wa.me/5491127963982?text=Hola%20JL%20Lubricentro!%20Quería%20hacer%20una%20consulta."
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-slate-950" />
        </a>
      </div>

    </div>
  );
};
