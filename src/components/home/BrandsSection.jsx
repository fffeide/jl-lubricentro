import { motion } from 'framer-motion';

const brands = [
  { name: 'ELF', logo: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/7938d037d_descarga1.png' },
  { name: 'Motul', logo: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/f0fc21241_descarga2.png' },
  { name: 'Liqui Moly', logo: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/4ed767ce6_descarga3.png' },
  { name: 'YPF', logo: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/d787cac14_descarga.png' },
  { name: 'Castrol', logo: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/5f245476f_png-clipart-castrol-car-logo-decal-car-label-text-thumbnail.png' },
  { name: 'Shell', logo: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/6ce608bcb_png-clipart-logo-brand-company-shell-angle-company-thumbnail.png' },
];

// Duplicate for seamless loop
const allBrands = [...brands, ...brands];

export default function BrandsSection() {
  return (
    <section className="relative py-12 sm:py-20 bg-slate-950 border-y border-white/5 overflow-hidden">
      {/* Edge fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/30 text-red-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
            Marcas con las que trabajamos
          </span>
          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-white mt-5">
            Productos de{' '}
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-green-400 bg-clip-text text-transparent">
              primera línea
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Carousel - full width */}
      <div className="relative w-full">
        <motion.div
          className="flex gap-6 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 22,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{ width: 'max-content' }}
        >
          {allBrands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center shrink-0 w-32 h-20 sm:w-40 sm:h-24 bg-white/95 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl hover:scale-105 px-4 sm:px-6 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-16 max-w-32 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
