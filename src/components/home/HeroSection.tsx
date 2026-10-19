import React from 'react';
import { Clock, Phone, MapPin, ChevronRight, MessageCircle, Wrench, ShieldCheck, Award } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=2000&q=80"
          alt="Taller automotriz JL Lubricentro"
          className="w-full h-full object-cover object-center filter brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/60 to-slate-950 pointer-events-none" />
      </div>

      {/* Decorative ambient glowing blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-8 text-center lg:text-left">
            
            {/* Pill Header Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                Atención rápida sin turno previo
              </span>
            </div>

            {/* Display Typography */}
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.95] text-white">
              Tu auto en <br />
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-emerald-500 bg-clip-text text-transparent">
                buenas manos
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed">
              Servicio de excelencia en mantenimiento automotriz. Cambios de aceite express, lubricantes premium y atención personalizada que marca la diferencia.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollToSection('servicios')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Nuestros Servicios</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <a
                href="https://wa.me/5491127963982?text=Hola%20JL%20Lubricentro!%20Quería%20hacer%20una%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-base border border-white/20 hover:border-white/40 backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Key Stats Counter */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="text-left">
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  +1000
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">
                  Clientes
                </div>
              </div>

              <div className="text-left border-l border-white/10 pl-4">
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-red-500 tracking-tight">
                  +6
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">
                  Marcas premium
                </div>
              </div>

              <div className="text-left border-l border-white/10 pl-4">
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-emerald-400 tracking-tight">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">
                  Garantía
                </div>
              </div>
            </div>

          </div>

          {/* Lateral Info Cards (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
            
            {/* Horarios Card */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 shadow-2xl">
              <div className="flex items-center gap-3 text-red-500 mb-2">
                <div className="p-2 rounded-xl bg-red-600/10 border border-red-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Horarios de Atención
                </h2>
              </div>
              <div className="space-y-1 pl-1">
                <div className="text-sm font-semibold text-white">
                  Lun a Vie: <span className="text-slate-300 font-normal">8:00 a 18:00</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  Sábados: <span className="text-slate-300 font-normal">8:30 a 13:00</span>
                </div>
              </div>
            </div>

            {/* Contacto Card */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 shadow-2xl">
              <div className="flex items-center gap-3 text-emerald-400 mb-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Contacto Directo
                </h2>
              </div>
              <a
                href="https://wa.me/5491127963982"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-white hover:text-emerald-400 transition-colors block pl-1"
              >
                +54 9 11 2796-3982
              </a>
              <span className="text-xs text-slate-400 pl-1 block mt-0.5">
                Respondemos consultas en el acto
              </span>
            </div>

            {/* Ubicación Card */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Ubicación Taller
                </h2>
              </div>
              <p className="text-sm font-semibold text-white pl-1">
                Av. Mitre 1592, Florida
              </p>
              <p className="text-xs text-slate-400 pl-1">
                Vicente López, Buenos Aires
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
