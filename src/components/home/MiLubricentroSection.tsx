import React from 'react';
import { History, Bell, ShieldCheck, ArrowRight, Car, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { LOGO_URL } from './Navbar';

interface MiLubricentroSectionProps {
  onNavigate: (path: string) => void;
}

export const MiLubricentroSection: React.FC<MiLubricentroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="mi-lubricentro" className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      
      {/* Background Radial Dots pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Decorative ambient lights */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Features */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nueva Tecnología</span>
            </div>

            {/* Display Title */}
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight uppercase text-white leading-tight">
              Tu tarjeta de servicio, <br />
              <span className="bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                ahora digital
              </span>
            </h2>

            {/* Text description */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Olvidate de la tarjeta física. Con Mi Lubricentro, llevá el historial completo de tu auto en tu celular. Consultá en cualquier momento los kilómetros, filtros cambiados y la fecha estimada de tu próximo service.
            </p>

            {/* 3 Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left">
                <div className="p-2.5 rounded-xl bg-red-600/10 text-red-500 w-fit mb-3">
                  <History className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">
                  Historial completo
                </h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Detalle de aceites, litros y filtros en cada visita.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-3">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">
                  Alertas de service
                </h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Recordatorios antes de que venza el kilometraje.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">
                  Toda tu info segura
                </h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Acceso directo y seguro con tu patente o DNI.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate('/MiLubricentro')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-red-600 via-orange-600 to-emerald-600 hover:opacity-95 text-white font-bold text-base shadow-2xl shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <Car className="w-5 h-5" />
                <span>Entrar a Mi Lubricentro</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('/consulta')}
                className="text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                ¿Querés consultar sin ingresar? Click acá
              </button>
            </div>

          </div>

          {/* Right Column: Phone Mockup Simulation (Desktop only / responsive) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] rounded-[42px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-2xl shadow-black border border-white/20">
              
              {/* Notch / Speaker */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Screen Container */}
              <div className="relative bg-slate-950 rounded-[34px] p-5 pt-8 overflow-hidden border border-white/5 space-y-4">
                
                {/* Simulated App Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <img src={LOGO_URL} alt="JL" className="h-6 w-auto invert" />
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-tight">Mi Lubricentro</div>
                      <div className="text-[10px] text-slate-400">Tu panel digital</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full font-bold">
                    ONLINE
                  </span>
                </div>

                {/* Simulated Vehicle Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold">Vehículo</div>
                      <div className="text-base font-bold text-white">Chevrolet Onix</div>
                      <div className="text-xs text-slate-300">2020 • 45,000 km</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-white font-mono font-bold text-xs tracking-wider">
                      AE123CD
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Último servicio</span>
                      <span className="font-semibold text-white">15 Dic 2025</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Aceite usado</span>
                      <span className="font-semibold text-amber-400">Shell 10W40</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Status Alert */}
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400">
                      Próximo service: Febrero 2026
                    </div>
                    <div className="text-[11px] text-slate-300">
                      O al alcanzar los 55,000 km
                    </div>
                  </div>
                </div>

                {/* Quick actions mockup */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-red-500" />
                    <span>Ver Servicios</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Al día</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
