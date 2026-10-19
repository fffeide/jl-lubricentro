import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Award, CreditCard, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const LOCAL_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1000&q=80',
    caption: 'Fosa de lubricación de alta precisión'
  },
  {
    url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Stock permanente de primeras marcas'
  },
  {
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80',
    caption: 'Atención personalizada en Vicente López'
  }
];

export const BenefitsSection: React.FC = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto(prev => (prev + 1) % LOCAL_PHOTOS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="nosotros" className="relative py-24 bg-slate-950 overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
            ¿Por qué elegirnos?
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-white leading-tight">
            La confianza es nuestra{' '}
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
              carta de presentación
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Combinamos tecnología moderna, repuestos originales y más de dos décadas de experiencia para cuidar el motor de tu vehículo como corresponde.
          </p>
        </div>

        {/* Grid 2 Columns: Benefits Cards on Left, Interactive Photo Slider on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 4 Benefits Cards (Col 1 to 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Servicio Rápido */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600/10 via-white/5 to-transparent border border-red-500/20 hover:border-red-500/40 transition-all hover:-translate-y-1 shadow-xl group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white w-fit mb-4 shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-white mb-2">
                Servicio Rápido
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Sin demoras ni turnos innecesarios. Servicio express realizado por mecánicos especializados en tiempo récord.
              </p>
            </div>

            {/* Card 2: Garantía Total */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600/10 via-white/5 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:-translate-y-1 shadow-xl group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white w-fit mb-4 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-white mb-2">
                Garantía Total
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Seguridad y respaldo en cada procedimiento. Utilizamos los filtros y fluidos homologados para cada marca y motor.
              </p>
            </div>

            {/* Card 3: Primeras Marcas */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-600/10 via-white/5 to-transparent border border-amber-500/20 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-xl group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white w-fit mb-4 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-white mb-2">
                Primeras Marcas
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Shell, Motul, Liqui Moly, Castrol, YPF y Mann Filter. Productos 100% originales con trazabilidad garantizada.
              </p>
            </div>

            {/* Card 4: Ticket Car */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 via-white/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all hover:-translate-y-1 shadow-xl group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white w-fit mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-white mb-2">
                Ticket Car & Pagos
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Aceptamos todos los medios de pago, tarjetas de débito/crédito, transferencias y tarjetas corporativas para flotas.
              </p>
            </div>

          </div>

          {/* Right Column: Local Photo Slider with stats overlay (Col 8 to 12) */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 aspect-[4/3] group">
              <img
                src={LOCAL_PHOTOS[currentPhoto].url}
                alt={LOCAL_PHOTOS[currentPhoto].caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <span>{LOCAL_PHOTOS[currentPhoto].caption}</span>
                <div className="flex gap-1">
                  {LOCAL_PHOTOS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPhoto(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentPhoto ? 'bg-red-500 w-4' : 'bg-slate-600'
                      }`}
                      aria-label={`Foto ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Slider Controls */}
              <button
                onClick={() => setCurrentPhoto(prev => (prev - 1 + LOCAL_PHOTOS.length) % LOCAL_PHOTOS.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPhoto(prev => (prev + 1) % LOCAL_PHOTOS.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -left-6 sm:bottom-4 sm:-left-6 p-4 rounded-2xl bg-slate-900/95 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div>
                <div className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                  Servicio Garantizado
                </div>
                <div className="text-sm font-extrabold text-white">
                  100% Satisfacción
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
