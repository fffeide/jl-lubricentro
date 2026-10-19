import React from 'react';
import { Building2, Truck, BellRing, FileText, ArrowRight, ShieldCheck, Users } from 'lucide-react';

interface EmpresasSectionProps {
  onNavigate: (path: string) => void;
}

export const EmpresasSection: React.FC<EmpresasSectionProps> = ({ onNavigate }) => {
  return (
    <section id="empresas" className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Decorative Amber / Orange ambient blobs */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Container */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-amber-600/10 via-white/5 to-orange-600/5 border border-amber-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Truck className="w-4 h-4" />
                <span>Empresas y Flotas</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-white leading-tight">
                ¿Tenés una empresa <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  con vehículos?
                </span>
              </h2>

              <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                Centralizá el mantenimiento de tu flota de utilitarios, camionetas y autos corporativos en un solo lugar. Facturación unificada, historial digitalizado por unidad y atención preferencial.
              </p>

              {/* 3 mini feature items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10">
                  <Truck className="w-5 h-5 text-amber-400 mb-2" />
                  <div className="font-bold text-xs text-white">Control total</div>
                  <div className="text-[11px] text-slate-400">Panel exclusivo para tu flota</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10">
                  <BellRing className="w-5 h-5 text-orange-400 mb-2" />
                  <div className="font-bold text-xs text-white">Recordatorios</div>
                  <div className="text-[11px] text-slate-400">Avisos de km antes de viajar</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10">
                  <FileText className="w-5 h-5 text-yellow-400 mb-2" />
                  <div className="font-bold text-xs text-white">Todo documentado</div>
                  <div className="text-[11px] text-slate-400">Historial para auditorías</div>
                </div>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/empresas')}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Conocer más</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Card Destacada */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl space-y-6">
                
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">
                      Portal Exclusivo
                    </h3>
                    <p className="text-xs text-amber-400 font-semibold">
                      Para empresas y transportes
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Users className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-white block">Roles para encargados y choferes</span>
                      <span className="text-slate-400">Acceso personalizado con niveles de gestión y lectura.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-white block">Prioridad de atención en taller</span>
                      <span className="text-slate-400">Reducción de tiempos muertos para tus vehículos de trabajo.</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/5491127963982?text=Hola!%20Represento%20a%20una%20empresa%20y%20me%20gustaría%20sumar%20nuestra%20flota%20a%20JL%20Lubricentro."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider text-center border border-white/20 hover:border-white/30 transition-all block"
                >
                  Hablar con un asesor corporativo
                </a>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
