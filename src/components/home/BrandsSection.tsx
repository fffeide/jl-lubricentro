import React from 'react';

const BRANDS = [
  { name: 'SHELL', tag: 'Helix & PurePlus', color: '#DE2910' },
  { name: 'MOTUL', tag: '8100 100% Sintético', color: '#E30613' },
  { name: 'LIQUI MOLY', tag: 'Tecnología Alemana', color: '#005CA9' },
  { name: 'CASTROL', tag: 'Magnatec & Edge', color: '#00853F' },
  { name: 'YPF ELAION', tag: 'Línea Oficial Aurum', color: '#004B87' },
  { name: 'ELF', tag: 'Evolution & Competición', color: '#10529C' },
  { name: 'MANN FILTER', tag: 'Filtración Original', color: '#00833E' },
  { name: 'BOSCH', tag: 'Fluidos y Frenos', color: '#E20015' }
];

export const BrandsSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-950 border-y border-white/10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
          Marcas con las que trabajamos
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-white">
          Productos de primera línea
        </h2>
      </div>

      {/* Infinite scrolling carousel container with side gradient fades */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee py-2 w-max">
          {/* Duplicate brands list twice for infinite loop visual */}
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center w-52 h-24 rounded-2xl bg-white/95 text-slate-900 border border-white/20 shadow-xl hover:scale-105 transition-transform select-none px-4"
            >
              <span className="font-display font-black text-2xl tracking-tighter uppercase text-slate-950">
                {brand.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wide mt-0.5">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
