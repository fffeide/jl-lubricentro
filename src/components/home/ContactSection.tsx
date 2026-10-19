import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, ExternalLink, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contacto" className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Decorative blobs & Grid texture */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
            Contacto
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-white leading-tight">
            Visitanos o{' '}
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
              escribinos
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Estamos estratégicamente ubicados en Florida, Vicente López. Acercate con tu vehículo o envianos un mensaje directo.
          </p>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: WhatsApp / Teléfono */}
          <a
            href="https://wa.me/5491127963982"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600/10 via-white/5 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 backdrop-blur-xl transition-all hover:-translate-y-1.5 shadow-2xl group flex flex-col justify-between"
          >
            <div>
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 w-fit mb-6 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                WhatsApp Directo
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white tracking-tight mb-2">
                +54 9 11 2796-3982
              </h3>
              <p className="text-xs text-slate-400">
                Atención rápida para consultas de precios, stock de aceites y filtros.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span>Abrir WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Card 2: Dirección */}
          <a
            href="https://maps.google.com/?q=Av.+Bartolomé+Mitre+1592,+Florida,+Vicente+López"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-3xl bg-gradient-to-br from-red-600/10 via-white/5 to-transparent border border-red-500/20 hover:border-red-500/40 backdrop-blur-xl transition-all hover:-translate-y-1.5 shadow-2xl group flex flex-col justify-between"
          >
            <div>
              <div className="p-3.5 rounded-2xl bg-red-600/20 text-red-500 w-fit mb-6 border border-red-500/30 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 block mb-1">
                Dirección
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white tracking-tight mb-2">
                Av. Mitre 1592
              </h3>
              <p className="text-xs text-slate-300 font-semibold mb-1">
                Florida, Vicente López
              </p>
              <p className="text-xs text-slate-400">
                Buenos Aires, Argentina (Fácil acceso desde Panamericana y Maipú).
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-red-400">
              <Navigation className="w-3.5 h-3.5" />
              <span>Cómo llegar con GPS</span>
            </div>
          </a>

          {/* Card 3: Horarios */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 via-white/5 to-transparent border border-blue-500/20 backdrop-blur-xl transition-all shadow-2xl flex flex-col justify-between">
            <div>
              <div className="p-3.5 rounded-2xl bg-blue-600/20 text-blue-400 w-fit mb-6 border border-blue-500/30">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
                Horarios
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white tracking-tight mb-4">
                Atención Continua
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">Lunes a Viernes</span>
                  <span className="font-bold text-white">8:00 a 18:00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">Sábados</span>
                  <span className="font-bold text-white">8:30 a 13:00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Domingos y Feriados</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-white/5 text-[11px] text-slate-400">
              Ingreso por orden de llegada sin turno
            </div>
          </div>

        </div>

        {/* Big Shimmer WhatsApp Card & Embedded Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Shimmer WhatsApp Action Card (5 Cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-emerald-600/20 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden space-y-6">
            
            {/* Shimmer effect bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Canal Oficial</span>
            </div>

            <h3 className="font-display font-black text-3xl uppercase tracking-tight text-white leading-tight">
              ¿Tenés dudas sobre qué aceite lleva tu motor?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mandanos la marca, modelo y año de tu auto por WhatsApp y te cotizamos el servicio con filtros en menos de 5 minutos.
            </p>

            <a
              href="https://wa.me/5491127963982?text=Hola%20JL%20Lubricentro!%20Quería%20cotizar%20un%20cambio%20de%20aceite%20y%20filtros."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider text-center shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 block"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>Escribinos por WhatsApp</span>
            </a>
          </div>

          {/* Embedded Google Maps (7 Cols) with Dark Invert Filter */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/20 shadow-2xl h-[340px] bg-slate-900 relative">
            <iframe
              title="Ubicación JL Lubricentro Florida"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.7451458902517!2d-58.49755492358826!3d-34.53468895386241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb136e053f47b%3A0x6331a986d4e4ebfa!2sAv.%20Bartolom%C3%A9%20Mitre%201592%2C%20B1602%20Florida%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.85)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay badge with location name */}
            <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/10 text-white shadow-xl flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-red-500" />
              <div>
                <div className="font-bold text-xs uppercase">JL Lubricentro</div>
                <div className="text-[10px] text-slate-400">Av. Mitre 1592, Florida</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
