import React from 'react';
import { ArrowLeft, Building2, Truck, MessageCircle, ShieldCheck, ArrowRight, CheckCircle2, FileText, BellRing, LogIn } from 'lucide-react';
import { LOGO_URL } from '../components/home/Navbar';

interface EmpresasProps {
  onNavigate: (path: string) => void;
}

export const Empresas: React.FC<EmpresasProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-amber-500 selection:text-slate-950 pb-20">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Volver a inicio"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <img src={LOGO_URL} alt="JL Lubricentro" className="h-7 w-auto invert" />
              <div>
                <span className="font-display font-black text-lg uppercase tracking-tight text-white block leading-none">
                  Empresas & Flotas
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Mantenimiento Corporativo
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/portal-empresa')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-slate-200 transition-colors"
          >
            <LogIn className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Iniciar sesión</span>
            <span className="sm:hidden">Ingresar</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-4 h-4" />
            <span>Gestión de flotas y transportes</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-tight">
            LLEVÁ TU FLOTA A <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
              JL LUBRICENTRO
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Mantené todos los vehículos de tu empresa al día, con control unificado, facturas centralizadas y avisos preventivos para no parar nunca tu operación.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/5491127963982?text=Hola!%20Quiero%20sumar%20mi%20empresa%20a%20JL%20Lubricentro."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>Quiero sumar mi empresa</span>
            </a>

            <button
              onClick={() => onNavigate('/portal-empresa')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Ya tengo cuenta</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-400 pt-2">
            Para registrarte, escribinos por WhatsApp y te activamos la cuenta en minutos.
          </p>
        </div>
      </section>

      {/* Sección Beneficios */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 w-fit">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white">
              Control total
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Visualizá cada camioneta, utilitario o auto de la empresa en un panel unificado con su kilometraje actual y responsable asignado.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
            <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400 w-fit">
              <BellRing className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white">
              Recordatorios
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Notificaciones automáticas por WhatsApp para choferes y encargados antes de alcanzar el kilometraje de recambio de aceite o filtros.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
            <div className="p-3 rounded-2xl bg-yellow-500/20 text-yellow-400 w-fit">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white">
              Todo documentado
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Historial técnico imborrable por cada vehículo para facilitar auditorías, controles de costos y mantenimiento preventivo.
            </p>
          </div>
        </div>
      </section>

      {/* Sección CÓMO FUNCIONA */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-center text-white mb-12">
          CÓMO FUNCIONA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="font-display font-bold text-lg uppercase text-white">
              Escribinos por WhatsApp
            </h3>
            <p className="text-xs text-slate-400">
              Nos contás cuántos vehículos tiene tu flota y qué tipo de uso realizan.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="font-display font-bold text-lg uppercase text-white">
              Te creamos la cuenta
            </h3>
            <p className="text-xs text-slate-400">
              Damos de alta tu empresa en el sistema y habilitamos las patentes de tus choferes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="font-display font-bold text-lg uppercase text-white">
              Gestioná tu flota
            </h3>
            <p className="text-xs text-slate-400">
              Ingresás al portal exclusivo para consultar servicios, facturación y programar cambios.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-600/30 via-orange-600/20 to-yellow-600/20 border border-amber-500/40 text-center space-y-6">
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            ¿LISTO PARA EMPEZAR?
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Contactate hoy mismo y recibí una bonificación especial para el primer service de tu flota.
          </p>
          <a
            href="https://wa.me/5491127963982?text=Hola!%20Quiero%20hablar%20con%20un%20asesor%20por%20la%20flota%20de%20mi%20empresa."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-2xl transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>

        <div className="text-center text-xs text-slate-500 pt-12">
          JL Lubricentro · Av. Bartolomé Mitre 1592, Florida
        </div>
      </section>

    </div>
  );
};
